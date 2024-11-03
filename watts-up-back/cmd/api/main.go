package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"gitlab.com/duolok/watts-up/internal/router"
	"gitlab.com/duolok/watts-up/watts-up-back/internal/router"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Println("No .env file found")
    }

    router.Init()
    r := router.Router

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080" // Default port
    }

    log.Printf("Starting server on port %s...", port)
    if err := r.Run(":" + port); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}
