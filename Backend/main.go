package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"io/ioutil"
	"log"
	"net/http"

	"github.com/go-rod/rod"
	"github.com/gocolly/colly"
	"github.com/joho/godotenv"
	"github.com/supabase-community/supabase-go"
	"github.com/tidwall/gjson"
)

type Team struct {
	EspnId 	 string `json:"espnid"`
	Name        string `json:"name"`
	Color 	 string `json:"color"`
	Abbreviation string `json:"abbreviation"`
	Division string `json:"division"`
	Secondary string `json:"secondary_color"`
}

type Player struct {
	Name     string `json:"name"`
	Team     string `json:"teamid"`
	Position string `json:"position"`
	Espnid  string `json:"espnid"`
	Number string `json:"number"`
	Height int `json:"height"`
	Weight int `json:"weight"`
	Age int `json:"age"`
}

type PlayerPassing struct {
	Espnid     string `json:"espnid"`
	PassingEPA float32 `json:"epa"`
	TTT float32 `json:"ttt"`
	YPA float32 `json:"ypa"`
	OnTarget float32 `json:"ontarget"`
	SackPercent float32 `json:"sackpercent"`
}

type PlayerRushing struct {
	Espnid     string `json:"espnid"`
	RushEPA float32 `json:"rush_epa"`
	YAC int `json:"yac"`
	BrokenTackles int `json:"broken_tackle"`
	FirstDowns int `json:"first_down"`
	Fumble int `json:"fumble"`
}

// Fetch data from ESPN API
func fetchData(url string) ([]byte, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code %d", resp.StatusCode)
	}

	return ioutil.ReadAll(resp.Body)
}

func addTeams(client *supabase.Client){
	var teamsToInsert []Team
	data, err := fetchData("https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams")
	if err != nil {
		log.Printf("Error fetching data: %v", err)
	}
	teams := gjson.GetBytes(data, "sports.0.leagues.0.teams")
	for _, team := range teams.Array() {
		espnid := team.Get("team.id").String()
		name := team.Get("team.displayName").String()
		color := team.Get("team.color").String()
		seconday := team.Get("team.alternateColor").String()
		abbreviation := team.Get("team.abbreviation").String()
		fmt.Println(abbreviation)
		division := "AFC West"
		if (abbreviation=="BAL" || abbreviation=="CIN" || abbreviation=="CLE" || abbreviation=="PIT"){
			division="AFC North"
		} else if (abbreviation=="TEN" || abbreviation=="IND" || abbreviation=="JAX" || abbreviation=="HOU"){
			division="AFC South"
		} else if (abbreviation=="NYJ" || abbreviation=="BUF" || abbreviation=="MIA" || abbreviation=="NE"){
			division="AFC East"
		} else if (abbreviation=="SEA" || abbreviation=="SF" || abbreviation=="LAR" || abbreviation=="ARI"){
			division="NFC West"
		} else if (abbreviation=="CHI" || abbreviation=="DET" || abbreviation=="GB" || abbreviation=="MIN"){
			division="NFC North"
		} else if (abbreviation=="NO" || abbreviation=="ATL" || abbreviation=="CAR" || abbreviation=="TB"){
			division="NFC South"
		} else if (abbreviation=="PHI" || abbreviation=="DAL" || abbreviation=="WSH" || abbreviation=="NYG"){
			division="NFC East"
		}
		teamsToInsert = append(teamsToInsert, Team{
			EspnId: espnid,
			Name:   name,
			Color:  color,
			Abbreviation: abbreviation,
			Division: division,
			Secondary: seconday,
		})
	}
	_,_,err = client.From("Team").Insert(teamsToInsert, true, "espnid", "", "").Execute()
	if err != nil {
		log.Printf("Error inserting teams: %v", err)
		return
	}
}

func getTeamPlayers(client *supabase.Client){
	var playersToInsert []Player
	for i := 1; i <= 34; i++ {
		apiURL := fmt.Sprintf("https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/teams/%d/depthcharts", i)
		data, err := fetchData(apiURL)
		if err != nil {
			log.Printf("Error fetching data: %v", err)
		}
		items := gjson.GetBytes(data, "items").Array()
		size := len(items)
		if size < 1{
			continue
		}
		fmt.Println(size)
		positions := gjson.GetBytes(data, "items.2.positions")
	
		for position := range positions.Map() {
			if position != "qb"{
				continue
			}
			athletes := positions.Get(position + ".athletes").Array()
			// Loop through athletes
			for _, athlete := range athletes {
				rank := int(athlete.Get("rank").Int())
				if rank > 1 && !(position == "wr" && rank <= 3) {
					continue
				}
				playerURL := athlete.Get("athlete.$ref").String()

				playerData, err := fetchData(playerURL)
				if err != nil {
					log.Printf("Error fetching player data: %v", err)
					continue
				}

				name := gjson.GetBytes(playerData, "fullName").String()
				espnid := gjson.GetBytes(playerData, "id").String()
				number := gjson.GetBytes(playerData, "jersey").String()
				age := gjson.GetBytes(playerData, "age").Int()
				weight := gjson.GetBytes(playerData, "weight").Int()
				height := gjson.GetBytes(playerData, "height").Int()
				position := gjson.GetBytes(playerData, "position.abbreviation").String()

				playersToInsert = append(playersToInsert, Player{
					Name:     name,
					Team:     fmt.Sprintf("%d", i),
					Position: position,
					Espnid:  espnid,
					Number: number,
					Age: int(age),
					Weight: int(weight),
					Height: int(height),
				})

			}
		}
	}
	_,_,err := client.From("Players").Insert(playersToInsert, true, "espnid", "", "").Execute()
	
	if err != nil {
		log.Printf("Error inserting players: %v", err)
		return
	}
}

func getTop(client *supabase.Client){

	apiURL := "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/types/2/leaders"

	data, err := fetchData(apiURL)
	if err != nil {
		log.Printf("Error fetching data: %v", err)
	}
	leaders := gjson.GetBytes(data, "categories.0.leaders").Array()
	var playersToInsert []Player
	for _, leader := range leaders {
		playerURL := leader.Get("athlete.$ref").String()
		playerData, err := fetchData(playerURL)
		if err != nil {
			log.Printf("Error fetching player data: %v", err)
			continue
		}
		name := gjson.GetBytes(playerData, "fullName").String()
		espnid := gjson.GetBytes(playerData, "id").String()
		number := gjson.GetBytes(playerData, "jersey").String()
		height := gjson.GetBytes(playerData, "height").Int()
		weight := gjson.GetBytes(playerData, "weight").Int()
		age := gjson.GetBytes(playerData, "age").Int()
		fmt.Println(weight)

		teamURL := leader.Get("team.$ref").String()	
		teamData, err := fetchData(teamURL)
		if err != nil {
			log.Printf("Error fetching player data: %v", err)
			continue
		}
		id := gjson.GetBytes(teamData, "id").String()

		playersToInsert = append(playersToInsert, Player{
			Name:     name,
			Team:     id,
			Position: "QB",
			Espnid:  espnid,
			Number: number,
			Height: int(height),
			Weight: int(weight),
			Age: int(age),
		})

	}
	fmt.Println(playersToInsert)
	_,_,err = client.From("Players").Insert(playersToInsert, true, "espnid", "", "").Execute()
	if err != nil {
		log.Printf("Error inserting players: %v", err)
		return
	}
}

func dynamicScrape (client *supabase.Client){
	browser := rod.New().MustConnect()
	defer browser.MustClose()

	// Open the page
	page := browser.MustPage("https://sumersports.com/players/quarterback/?plays=154")

	// Wait for the table to load
	page.MustWaitLoad()

	// Select all table rows
	rows := page.MustElements("tbody tr")
	var playersToInsert []PlayerPassing

	for _, row := range rows {
		// Extract player stats
		qbunsplit := row.MustElement(`[data-stat="quarterback"]`).MustText()
		qb := strings.Split(qbunsplit, ". ")[1]
		id := getPlayerID(client,qb)
		if id == "" {
            continue
        }
		fmt.Println(id)
		epa := row.MustElement(`[data-stat="passing_epa"]`).MustText()
		sack_rate := row.MustElement(`[data-stat="sack_rate"]`).MustText()
		sack_rate = strings.TrimSuffix(sack_rate, "%")
		time_to_throw := row.MustElement(`[data-stat="time_to_throw"]`).MustText()
		ypa := row.MustElement(`[data-stat="ypa"]`).MustText()
		playersToInsert = append(playersToInsert, PlayerPassing{
			Espnid: id,
			PassingEPA: float32(gjson.Parse(epa).Float()),
			TTT: float32(gjson.Parse(time_to_throw).Float()),
			YPA: float32(gjson.Parse(ypa).Float()),
			OnTarget: 0.0,
			SackPercent: float32(gjson.Parse(sack_rate).Float()),
		})
	}
	_,_,err := client.From("Passing_Stats").Insert(playersToInsert, true, "espnid", "", "").Execute()
	if err != nil {
		log.Printf("Error inserting players: %v", err)
		return
	}
}

func webScraperRushing(client *supabase.Client){
	c := colly.NewCollector(
	)
	var playersToInsert []PlayerRushing

	c.OnHTML("table#adv_rushing tbody", func(e *colly.HTMLElement) {
		e.ForEach("tr", func(_ int, el *colly.HTMLElement) {
			name := el.ChildText("td:nth-of-type(1) a")
			id := getPlayerID(client,name)
			if id == "" {
				return
			}
			yac := el.ChildText("td:nth-of-type(12)")
			brkntckl := el.ChildText("td:nth-of-type(14)")
			fstdwn := el.ChildText("td:nth-of-type(9)")
			playersToInsert = append(playersToInsert, PlayerRushing{
				Espnid: id,
				RushEPA: 0.0,
				YAC: int(gjson.Parse(yac).Int()),
				BrokenTackles: int(gjson.Parse(brkntckl).Int()),
				FirstDowns: int(gjson.Parse(fstdwn).Int()),
				Fumble: 0,
			})
			
		})
	})
	c.Visit("https://www.pro-football-reference.com/years/2024/rushing_advanced.htm")
	_,_,err := client.From("Rushing_Stat").Insert(playersToInsert, true, "espnid", "", "").Execute()
	if err != nil {
		log.Printf("Error inserting players: %v", err)
		return
	}
}

func getPlayerID(client *supabase.Client, name string) string {
	var players []Player
	data, count, err := client.From("Players").Select("espnid", "exact", false).Eq("name", name).Execute()
	if err != nil || count == 0 {
		log.Printf("Error querying players: %v", err)
		return ""
	}
	err = json.Unmarshal(data, &players)
	if err != nil {
		log.Printf("Error unmarshaling data: %v", err)
		return "";
	}

	return players[0].Espnid
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	API_URL := os.Getenv("API_URL")
	API_KEY := os.Getenv("API_KEY")

	client, err := supabase.NewClient(API_URL, API_KEY, &supabase.ClientOptions{})
	if err != nil {
		fmt.Println("cannot initalize client", err)
	}
	
	fmt.Println("Hello, World!");
	//addTeams(client)
	
}

