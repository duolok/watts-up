package config

import (
	"fmt"
	"os"

	"github.com/spf13/viper"
)

type Config struct {
	PostgreSQL  PostgreSql
	Redis  Redis
	Server Server
	Jwt    Jwt
}

var EnvConfig *Config

func LoadConfig() *Config {
    path, err := os.Getwd()
    if err != nil {
        panic(err)
    }

    fmt.Printf("Looking for config in: %s\n", path)

    viper.SetConfigName("config")
    viper.SetConfigType("yaml")
    viper.AddConfigPath(path)
    viper.AddConfigPath(".")
    viper.AddConfigPath("./config") 

    err = viper.ReadInConfig()
    if err != nil {
        fmt.Printf("Error reading config file: %v\n", err)
        panic(fmt.Errorf("fatal error config file: %w", err))
    }

    config := &Config{}
    err = viper.Unmarshal(config)
    if err != nil {
        fmt.Printf("Error unmarshaling config: %v\n", err)
        panic(err)
    }

    fmt.Println("Config successfully loaded.")
    return config
}


func Init() {
	EnvConfig = LoadConfig()
}
