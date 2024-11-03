package router

import (
	"github.com/gin-gonic/gin"
    "gitlab.com/duolok/watts-up/watts-up-back/internal/controllers"
)

var publicController = new(controllers.PublicController)


func LoadPublicRoutes(r *gin.Engine) *gin.RouterGroup {

    public := r.Group("/public")
    {
        public.GET("/ping", publicController.Ping)
    }

    return public
}
