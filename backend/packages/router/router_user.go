package router

import (
	"log/slog"
	"main/packages/service"
	"net/http"

	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

func (r *GinRouter) getUserRouter(rg *gin.RouterGroup) {
	rg.GET("", getUsersRoute)
	rg.GET("/:id", getUserRoute)
}

func getUsersRoute(c *gin.Context) {
	users, err := service.GetUsers()

	if err != nil {
		slog.Error("Could not get users", err)
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, users)
}

func getUserRoute(c *gin.Context) {
	id, err := uuid.FromString(c.Param("id"))
	if err != nil {
		slog.Warn("Could not get user", err)
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	user, err := service.GetUser(id)

	if err != nil {
		slog.Error("Could not get user", err)
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}
