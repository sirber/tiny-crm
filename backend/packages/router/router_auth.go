package router

import (
	"errors"
	"main/packages/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (r *GinRouter) getAuthRouter(rg *gin.RouterGroup) {
	rg.POST("/login", getLoginRoute)
	rg.POST("/logout", getLogoutRoute)
}

func getLoginRoute(c *gin.Context) {
	var login LoginDTO
	err := c.BindJSON(&login)
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	user, err := service.GetUserByEmail(login.Email)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	if user == nil {
		c.Status(http.StatusUnauthorized)
		return
	}

	passwordCheck := checkPasswordHash(login.Password, user.Password)
	if !passwordCheck {
		c.Status(http.StatusUnauthorized)
		return
	}

	token, _ := randomHex(40)
	user.Token = &token

	err = service.UpdateUser(user)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		token: token,
	})
}

func getLogoutRoute(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")
	if token == "" {
		c.AbortWithError(http.StatusBadRequest, errors.New("request has no token"))
		return
	}

	user, err := service.GetUserByToken(token)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	if user == nil {
		c.Status(http.StatusNotFound)
		return
	}

	user.Token = nil
	err = service.UpdateUser(user)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	c.Status(http.StatusOK)
}
