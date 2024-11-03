package main

import (
	"log"
	"gitlab.com/duolok/watts-up/watts-up-back/internal/router"
	"gitlab.com/duolok/watts-up/watts-up-back/pkg/config"
)

func main() {
    EnvConfig := config.LoadConfig()
    if EnvConfig == nil {
        log.Fatal("EnvConfig is not loaded")
    }

    router.Init()
    if router.Router == nil {
        log.Fatal("Router is not initialized")
    }

    r := router.Router

    port := EnvConfig.Server.Port
    log.Printf("Starting server on port %s...", port)
    if err := r.Run(":" + port); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}

