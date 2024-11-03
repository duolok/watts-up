package router

import (
    "github.com/gin-gonic/gin"
)

var Router *gin.Engine

func Init() {
    Router = gin.Default()

    Router.Use(middle)
    
    LoadPublicRoutes(Router)
    LoadUserRoutes(Router)
    LoadHouseholdRoutes(Router)
}
