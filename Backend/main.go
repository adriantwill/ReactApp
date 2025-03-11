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
	PassingEPA string `json:"epa"`
	TTT string `json:"ttt"`
	YPA string `json:"ypa"`
	OnTarget string `json:"ontarget"`
	SackPercent string `json:"sackpercent"`
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
	fmt.Println(playersToInsert)
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
	var playersToInsert []Player

	for _, row := range rows {
		// Extract player stats
		qbunsplit := row.MustElement(`[data-stat="quarterback"]`).MustText()
		qb := strings.Split(qbunsplit, ". ")[1]
		id := getPlayerID(client,qb)
		epa := row.MustElement(`[data-stat="passing_epa"]`).MustText()
		sack_rate := row.MustElement(`[data-stat="sack_rate"]`).MustText()
		time_to_throw := row.MustElement(`[data-stat="time_to_throw"]`).MustText()
		ypa := row.MustElement(`[data-stat="ypa"]`).MustText()
		_,_,err = client.From("Players").Insert(playersToInsert, true, "espnid", "", "").Execute()
		if err != nil {
			log.Printf("Error inserting players: %v", err)
			return
		}
	}
}

func webScraperRushing(client *supabase.Client){
	c := colly.NewCollector(
	)

	c.OnHTML("table#adv_rushing tbody", func(e *colly.HTMLElement) {
		e.ForEach("tr", func(_ int, el *colly.HTMLElement) {
			name := el.ChildText("td:nth-of-type(1) a")
			

			// Continue processing if player not found
			yac := el.ChildText("td:nth-of-type(12)")
			brkntckl := el.ChildText("td:nth-of-type(14)")
			fstdwn := el.ChildText("td:nth-of-type(9)")
			if name != "" {
				fmt.Println(name, yac,brkntckl,fstdwn)
			}
		})
	})
	c.Visit("https://www.pro-football-reference.com/years/2024/rushing_advanced.htm")
}

func getPlayerID(client *supabase.Client, name string) string {
	var players []Player
	data, _, err := client.From("Players").Select("espnid", "exact", false).Eq("name", name).Execute()
	if err != nil {
		log.Printf("Error querying players: %v", err)
		return ""
	}
	fmt.Println(players)
	
	err = json.Unmarshal(data, &players)
	if err != nil {
		log.Printf("Error unmarshaling data: %v", err)
		return ""
	}
	
	for _, player := range players {
		fmt.Printf("Player: %s\n", player.Espnid)
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
	getTeamPlayers(client)
	
}

