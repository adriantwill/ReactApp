package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Completed bool `json:"completed"`
	Body string `json:"body"`
}

type Player struct {
	ID primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	ESPNID string `json:"espn_id" bson:"_espn_id"`
	Name string `json:"name"`
	Position string `json:"position"`
	Team string `json:"team"`
	YearYards int `json:"year_yards"`
}

var collection *mongo.Collection

func main() {
	fmt.Println("Hello, World!")
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	MONGODB_URI := os.Getenv("MONGO_URI")
	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client,err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())
	fmt.Println("Connected to MongoDB!")
	collection = client.Database("nfl").Collection("players")
	app := fiber.New()
	app.Get("/api/players", getPlayers)
	app.Put("/api/players/", upsertPlayer)
	app.Get("/api/update-roster", updateRoster)
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}
	log.Fatal(app.Listen(":" + port))
}

func getPlayers(c *fiber.Ctx) error {
	var players []Player
	cursor,err := collection.Find(context.Background(), bson.M{})//can pass in filter here
	if err != nil{
		return err
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()){
		var player Player
		if err := cursor.Decode(&player); err != nil {
			return err
		}
		players = append(players, player)
	}
	return c.JSON(players)
}

func upsertPlayer(c *fiber.Ctx) error {
	updateData := make(map[string]interface{})
	if err := c.BodyParser(&updateData); err != nil {
		return err
	}

	espnID, ok := updateData["espn_id"].(string)
	if !ok {
		return c.Status(400).SendString("ESPN ID is required")
	}

	filter := bson.M{"_espn_id": espnID}
	update := bson.M{"$set": updateData}
	opts := options.Update().SetUpsert(true)

	_, err := collection.UpdateOne(context.Background(), filter, update,opts)
	if err != nil {
		return err
	}

	return c.JSON(updateData)
}

func updateRoster(c *fiber.Ctx) error {
	resp, err := http.Get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/4/roster")
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return err
	}

	athletes, ok := result["athletes"].([]interface{})[0].(map[string]interface{})["items"].([]interface{})
	if !ok {
		return fmt.Errorf("unable to parse athletes array")
	}

	for _, athlete := range athletes {
		player := athlete.(map[string]interface{})
		id := player["id"].(string)
		name := player["fullName"].(string)
		position := player["position"].(map[string]interface{})["abbreviation"].(string)
		if position != "WR" {
			continue
		}
		headshot := player["headshot"].(map[string]interface{})["href"].(string)
		filter := bson.M{"_espn_id": id}
		update := bson.M{"$set": bson.M{
			"name": name,
			"position": position,
		}}
		opts := options.Update().SetUpsert(true)

		_, err := collection.UpdateOne(context.Background(), filter, update, opts)
		if err != nil {
			return err
		}
	}
	return nil
}