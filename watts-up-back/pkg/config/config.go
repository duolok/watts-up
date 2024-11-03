package config

import (
	"fmt"
	"os"

	"github.com/spf13/viper"
)

type Config struct {
	PostgreSQL  Mysql
	Redis  Redis
	Server Server
	Jwt    Jwt
	Mongo  Mongo
}

var EnvConfig *Config

func LoadConfig() *Config {

	path, err := os.Getwd() // get curent path
	if err != nil {
		panic(err)
	}

	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(path + "/configs") 

	if err := viper.ReadInConfig(); err != nil { 
		panic(fmt.Errorf("fatal error config file: %w", err))
	}

	config := &Config{}
	if err := viper.Unmarshal(config); err != nil {
		panic(err)
	}

	return config
}

func Init() {
	EnvConfig = LoadConfig()
}
