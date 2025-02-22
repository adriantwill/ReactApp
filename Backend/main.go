package main

import (
	"fmt"
	"os"

	"io/ioutil"
	"log"
	"net/http"

	"github.com/supabase-community/postgrest-go"
	"github.com/tidwall/gjson"
)

type Player struct {
	Name     string `json:"name"`
	Team     string `json:"team"`
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

func main() {
	fmt.Println("Hello, World!");
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