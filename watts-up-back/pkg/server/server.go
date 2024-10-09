package server

import (
	"log"
	"os"
	"path"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"

	"gitlab.com/duolok/watts-up/watts-up-back/pkg/config"
	"gitlab.com/duolok/watts-up/watts-up-back/pkg/router"
)

func Serve(c *config.Config) error {
	if c.Debug {
		logrus.SetLevel(logrus.DebugLevel)
	} else {
		logrus.SetLevel(logrus.InfoLevel)
	}

	r := gin.Default()
	r.Use(gin.Recovery())
	r.UseRawPath = true

	router.RegisterRouter(r)

	if !c.DevMode {
		ex, _ := os.Executable()
		dir := path.Dir(ex)
		r.LoadHTMLFiles(dir + "/dist/index.html")
		r.Use(static.Serve("/", static.LocalFile(dir+"/dist/", false)))
	}

	if err := r.Run(c.ServerAddr); err != nil {
		log.Fatal("Couldn't start the server.")
	}

	return nil
}
