package main

import (
	"fmt"
	"os"

	"github.com/urfave/cli"
	"gitlab.com/duolok/watts-up/watts-up-back/pkg/config"
	"gitlab.com/duolok/watts-up/watts-up-back/pkg/server"
)

func main() {
	app := cli.NewApp()
	app.Name = "watts-up-back"
	app.Usage = "Backend for the Watts-Up electricity monitoring system"

	app.Flags = config.SetupFlags()

	app.Action = func(c *cli.Context) error {
		cfg := config.LoadConfig(c)

		if err := server.Serve(cfg); err != nil {
			fmt.Fprintf(os.Stderr, "Error starting server: %v\n", err)
			return err
		}
		return nil
	}

	if err := app.Run(os.Args); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

