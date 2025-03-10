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

type WebRusher struct {
	Name     string `json:"name"`
	YAC	 string `json:"yac"`
}

type WebPasser struct {
	Espnid     string `json:"espnid"`
	PassingEPA string `json:"passingepa"`
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
	apiURL := "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/teams/1/depthcharts"

	data, err := fetchData(apiURL)
	if err != nil {
		log.Printf("Error fetching data: %v", err)
	}
	items := gjson.GetBytes(data, "items").Array()
	size := len(items)
	fmt.Println(size)
	positions := gjson.GetBytes(data, "items.1.positions")
	

	var playersToInsert []Player

	// Loop through positions
	fmt.Println(positions)
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
				Team:     "1",
				Position: position,
				Espnid:  espnid,
				Number: number,
				Age: int(age),
				Weight: int(weight),
				Height: int(height),
			})

		}
	}
	fmt.Println(playersToInsert)
	_,_,err = client.From("Players").Insert(playersToInsert, true, "espnid", "", "").Execute()
	
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
	page := browser.MustPage("https://sumersports.com/players/quarterback/")

	// Wait for the table to load
	page.MustWaitLoad()

	// Select all table rows
	rows := page.MustElements("tbody tr")

	for _, row := range rows {
		// Extract player stats
		qbunsplit := row.MustElement(`[data-stat="quarterback"]`).MustText()
		qb := strings.Split(qbunsplit, ". ")[1]
		epa := row.MustElement(`[data-stat="passing_epa"]`).MustText()
		sack_rate := row.MustElement(`[data-stat="sack_rate"]`).MustText()
		time_to_throw := row.MustElement(`[data-stat="time_to_throw"]`).MustText()
		ypa := row.MustElement(`[data-stat="ypa"]`).MustText()
		// Query Supabase to get the ESPN ID based on the QB name
		_, count, err := client.From("Players").Select("espnid", "1", false).Eq("name", qb).Execute()
		if err != nil || count == 0 {
			log.Printf("Error finding player %s: %v", qb, err)
			continue
		}

		fmt.Println(epa, sack_rate, time_to_throw, ypa)
		fmt.Printf("Added QB: %s, ESPN ID: %s\n", qb, "1")
	}
}


func webScraperPassing(client *supabase.Client){
	c := colly.NewCollector(
		colly.UserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"),
		colly.AllowURLRevisit(),
		)

	c.OnRequest(func(r *colly.Request) {
		r.Headers.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
		r.Headers.Set("Accept-Language", "en-US,en;q=0.5")
	})

	
	c.OnHTML("tbody", func(e *colly.HTMLElement) {
		e.ForEach("tr", func(_ int, el *colly.HTMLElement) {
			fmt.Println(el)
		})
	})
	c.Visit("https://nextgenstats.nfl.com/stats/passing#yards")

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

func test(client *supabase.Client){
	var players []Player
	data, count, err := client.From("Players").Select("espnid", "exact", false).Eq("name", "Josh Allen").Execute()
	if err != nil {
		log.Printf("Error querying players: %v", err)
		return
	}
	fmt.Println(players)
	
	err = json.Unmarshal(data, &players)
	if err != nil {
		log.Printf("Error unmarshaling data: %v", err)
		return
	}
	
	fmt.Printf("Found %d players\n", count)
	for _, player := range players {
		fmt.Printf("Player: %s\n", player.Espnid)
	}
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

