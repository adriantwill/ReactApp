package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
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
	collection = client.Database("goland_db").Collection("todos")
	app := fiber.New()
	app.Get("/api/todos", getTodos)
	app.Post("/api/todos", createTodos)
	// app.Patch("/api/todos/:id", updateTodo)
	// app.Delete("/api/todos/:id", deleteTodo)
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}
	log.Fatal(app.Listen(":" + port))
}

func getTodos(c *fiber.Ctx) error {
	var todos []Todo
	cursor,err := collection.Find(context.Background(), bson.M{})
	if err != nil{
		return err
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()){
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			return err
		}
		todos = append(todos, todo)
	}
	return c.JSON(todos)
}

func createTodos(c *fiber.Ctx) error {
	todo := new(Todo)
	if err := c.BodyParser(todo); err != nil {
		return err
	}
	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Body is required"})
	}
	insertResult,err := collection.InsertOne(context.Background(),todo)
	if err != nil {
		return err
	}
	
}

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
