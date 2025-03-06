package main

import (
	"fmt"
	"os"

	"io/ioutil"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/supabase-community/postgrest-go"
	"github.com/supabase-community/supabase-go"
	"github.com/tidwall/gjson"
)

type Player struct {
	Name     string `json:"name"`
	Team     string `json:"teamid"`
	Position string `json:"position"`
	Headshot string `json:"headshot"`
	Espnid  string `json:"espnid"`

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

func getTeamPlayers(){
	API_URL := os.Getenv("API_URL")
	API_KEY := os.Getenv("API_KEY")

	client := postgrest.NewClient(API_URL, API_KEY, nil)
	if client.ClientError != nil {
		panic(client.ClientError)
	}
	apiURL := "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/24/depthcharts"

	data, err := fetchData(apiURL)
	if err != nil {
		log.Printf("Error fetching data: %v", err)
	}

	positions := gjson.GetBytes(data, "items.2.positions")
	

	var playersToInsert []Player

	// Loop through positions
	for position := range positions.Map() {
		if position != "qb" && position != "rb" && position != "wr" && position != "te" {
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
			team := gjson.GetBytes(playerData, "team.displayName").String()
			headshot := gjson.GetBytes(playerData, "headshot.href").String()
			espnid := gjson.GetBytes(playerData, "id").String()

			playersToInsert = append(playersToInsert, Player{
				Name:     name,
				Team:     team,
				Position: position,
				Headshot: headshot,
				Espnid:  espnid,
			})

		}
	}
	fmt.Println(playersToInsert)
	_,_,err = client.From("players").Insert(playersToInsert, false, "", "", "").Execute()
	if err != nil {
		log.Printf("Error inserting players: %v", err)
		return
	}
}

func getTop(){
	API_URL := os.Getenv("API_URL")
	API_KEY := os.Getenv("API_KEY")
	fmt.Println(API_URL)

	client, err := supabase.NewClient(API_URL, API_KEY, &supabase.ClientOptions{})
	if err != nil {
		fmt.Println("cannot initalize client", err)
	}
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
		headshot := gjson.GetBytes(playerData, "headshot.href").String()
		espnid := gjson.GetBytes(playerData, "id").String()

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
			Headshot: headshot,
			Espnid:  espnid,
		})

	}
	_,_,err = client.From("Players").Insert(playersToInsert, false, "", "", "").Execute()
	if err != nil {
		log.Printf("Error inserting players: %v", err)
		return
	}
}

func testInsert(){
	API_URL := os.Getenv("API_URL")
	API_KEY := os.Getenv("API_KEY")
	fmt.Println(API_URL)

	client, err := supabase.NewClient(API_URL, API_KEY, &supabase.ClientOptions{})
	if err != nil {
		fmt.Println("cannot initalize client", err)
	}
	playersToInsert := []Player{
		{
			Name:     "Jared Goff",
			Team:     "8",
			Position: "QB",
			Headshot: "https://a.espncdn.com/i/headshots/nfl/players/full/3046779.png",
			Espnid:  "3046779",
		},
	}
	_,_,err = client.From("Players").Insert(playersToInsert, false, "", "", "").Execute()
	if err != nil {
		log.Printf("Error inserting players: %v", err)
		return
	}
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	
	fmt.Println("Hello, World!");
	getTop()
	
}

