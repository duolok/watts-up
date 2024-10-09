package config

import (
	"github.com/urfave/cli"
)

type Config struct {
	ServerAddr string
	Debug      bool
	DevMode    bool
}

func SetupFlags() []cli.Flag {
	return []cli.Flag{
		cli.StringFlag{
			EnvVar: "SERVER_ADDR",
			Name:   "server-addr",
			Usage:  "server address",
			Value:  ":8080",
		},
		cli.BoolFlag{
			EnvVar: "DEBUG",
			Name:   "debug",
			Usage:  "start the server in debug mode",
		},
		cli.BoolFlag{
			EnvVar: "DEV",
			Name:   "dev",
			Usage:  "start the server in dev mode",
		},
	}
}

func LoadConfig(c *cli.Context) *Config {
	return &Config{
		ServerAddr: c.String("server-addr"),
		Debug:      c.Bool("debug"),
		DevMode:    c.Bool("dev"),
	}
}

