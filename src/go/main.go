package main

import (
	"employee/db"
	"employee/routes"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

func init() {
	db.DBConnect()
}

func main() {
	r := gin.Default()

	routes.Routes(r)

	err := r.Run()
	if err != nil {
		log.Fatalln("Server Run Failed:", err)
	}

	fmt.Printf("Server running on port 8080")

	db.DBConnect()

}
