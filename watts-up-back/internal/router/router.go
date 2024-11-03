package router

import (
    "github.com/gin-gonic/gin"
    "gitlab.com/duolok/watts-up/watts-up-back/internal/middlewares"
)

var Router *gin.Engine

func Init() {
    Router = gin.Default()

    Router.Use(middlewares.Cors())
    
    LoadPublicRoutes(Router)
    //LoadUserRoutes(Router)
    //LoadHouseholdRoutes(Router)
}
