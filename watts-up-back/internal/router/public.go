package router

import (
	"github.com/gin-gonic/gin"
    "gitlab.com/duolok/watts-up/watts-up-back/internal/handlers"
)

var publicHandler = new(handler.PublicHandler)


func LoadPublicRoutes(r *gin.Engine) *gin.RouterGroup {

    public := r.Group("/public")
    {
        public.GET("/ping", publicHandler.StatusHandler)
    }

    return public
}
