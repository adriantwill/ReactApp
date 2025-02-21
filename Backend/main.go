package main

import (
	"fmt"

	"io/ioutil"
	"log"
	"net/http"

	"github.com/tidwall/gjson"
)

type Player struct {
	Name     string `json:"name"`
	Team     string `json:"team"`
	Position string `json:"position"`
	Rank     int    `json:"rank"`
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

// Insert players into Supabase
// func insertPlayers(supabase *postgrest.Client, players []Player) error {
// 	_, err := supabase.From("players").Insert(players, false, "", "", "").Execute()
// 	return err
// }

func main() {
	fmt.Println("Hello, World!");
	// API_URL := os.Getenv("API_URL")
	// API_KEY := os.Getenv("API_KEY")

	// _, err := supabase.NewClient(API_URL, API_KEY, &supabase.ClientOptions{})
	// if err != nil {
	//   fmt.Println("cannot initalize client", err)
	// }
	apiURL := "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/24/depthcharts"

	data, err := fetchData(apiURL)
	if err != nil {
		log.Printf("Error fetching data: %v", err)
	}

	positions := gjson.GetBytes(data, "items.2.positions")
	

	var playersToInsert []Player

	// Loop through positions
	for position := range positions.Map() {
		positionName := position
		athletes := positions.Get(positionName + ".athletes").Array()
		// Loop through athletes
		for _, athlete := range athletes {
			rank := int(athlete.Get("rank").Int())

			if rank > 3{
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

			playersToInsert = append(playersToInsert, Player{
				Name:     name,
				Team:     team,
				Position: positionName,
			})

		}
	}
	fmt.Println(playersToInsert)
		// Insert into Supabase
		// if len(playersToInsert) > 0 {
		// 	err = insertPlayers(supabase, playersToInsert)
		// 	if err != nil {
		// 		return c.Status(500).SendString(fmt.Sprintf("Error inserting players: %v", err))
		// 	}
		// }

}