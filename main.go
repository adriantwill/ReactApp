package main

import (
	"context"
	"fmt"
	"log"
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
	ESPNID int `json:"espn_id" bson:"_espn_id"`
	Name string `json:"name"`
	Position string `json:"position"`
	Team string `json:"team"`
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
	player := new(Player)
	if err := c.BodyParser(player); err != nil {
		return err
	}
	if player.ESPNID == 0 {
		return c.Status(400).JSON(fiber.Map{"error": "ESPN param is required"})
	}
	filter := bson.M{"_espn_id": player.ESPNID}
	update := bson.M{"$set": player}
	opts := options.Update().SetUpsert(true)
	result, err := collection.UpdateOne(context.Background(), filter, update, opts)
	if err != nil {
		return err
	}
	if result.UpsertedID != nil {
		player.ID = result.UpsertedID.(primitive.ObjectID)
	}
	return c.Status(200).JSON(player)

}