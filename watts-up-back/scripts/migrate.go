package main

import (
    "log"
    "github.com/golang-migrate/migrate/v4"
    _ "github.com/golang-migrate/migrate/v4/database/postgres"
    _ "github.com/golang-migrate/migrate/v4/source/file"
)

func main() {
    m, err := migrate.New(
        "file://migrations/postgresql",
        "postgres://your_user:your_password@localhost:5432/energy_monitoring?sslmode=disable",
    )
    if err != nil {
        log.Fatalf("Failed to create migrate instance: %v", err)
    }

    if err := m.Up(); err != nil && err != migrate.ErrNoChange {
        log.Fatalf("Migration failed: %v", err)
    }

    log.Println("Migrations applied successfully")
}

