package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type PublicHandler struct{}

func (PublicHandler *PublicHandler) StatusHandler(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H {
        "status": "ok",
    })
}
