package main

import (
	"fmt"
	"os"

	"github.com/supabase-community/supabase-go"
)

func main() {
	fmt.Println("Hello, World!");
	API_URL := os.Getenv("API_URL")
	API_KEY := os.Getenv("API_KEY")
	client, err := supabase.NewClient(API_URL, API_KEY, &supabase.ClientOptions{})
	if err != nil {
	  fmt.Println("cannot initalize client", err)
	}
	data, count, err := client.From("countries").Select("*", "exact", false).Execute()
}