package api

import (
	"github.com/gin-gonic/gin"
)

func (r *GinRouter) getUserRouter(rg *gin.RouterGroup) {
	rg.GET("/", getUsersRoute)
	rg.GET("/:id", getUserRoute)
}

func getUsersRoute(c *gin.Context) {
	// TODO

}

func getUserRoute(c *gin.Context) {
	// TODO

}
