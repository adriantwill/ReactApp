package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID int `json:"_id" bson:"_id"`
	Complete bool `json:"completed"`
	Body string `json:"body"`
}

var collection *mongo.Collection

func main() {
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
	fmt.Println("Hello, World!")
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB!")
// 	app := fiber.New()
// 	todos := []Todo{}
// 	app.Get("/api/todos", func(c *fiber.Ctx) error {
// 		return c.Status(200).JSON(todos)
// 	})
// 	app.Post("/api/todos", func(c *fiber.Ctx) error {
// 		todo:= &Todo{}
// 		if err := c.BodyParser(todo); err != nil {
// 			return err
// 		}
// 		if todo.Body == ""{
// 			return c.Status(400).JSON(fiber.Map{"error": "Body is required"})
// 		}
// 		todo.ID = len(todos) + 1
// 		todos = append(todos, *todo)
// 		return c.Status(201).JSON(todo)
// 	})
// 	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {
// 		id := c.Params("id")
// 		for i,todo := range todos {
// 			if fmt.Sprint(todo.ID) == id {
// 				todos[i].Complete = true
// 				return c.Status(200).JSON(todos[i])
// 			}
// 		}
// 		return c.Status(400).JSON(fiber.Map{"error": "Todo not found"})
// 	})
// 	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
// 		id := c.Params("id")
// 		for i,todo := range todos {
// 			if fmt.Sprint(todo.ID) == id{
// 				todos = append(todos[:i], todos[i+1:]...)
// 				return c.Status(200).JSON(fiber.Map{"success": true})
// 			}
// 		}
// 		return c.Status(200).JSON(fiber.Map{"success": true})
// 	})
// 	log.Fatal(app.Listen(":4000"))
}