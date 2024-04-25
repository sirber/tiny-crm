package router

import (
	"errors"
	"main/packages/common"
	"main/packages/dto"
	"main/packages/security"
	"main/packages/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SessionCheck struct {
	Active bool `json:"active"`
}

func (r *GinRouter) getAuthRouter(rg *gin.RouterGroup) {
	rg.POST("/login", getLoginRoute)
	rg.POST("/logout", getLogoutRoute)
	rg.GET("/session", getSessionRoute)
}

func getSessionRoute(c *gin.Context) {
	sessionCheck := SessionCheck{}

	// Get token from cookie
	token, err := c.Cookie("token")
	if err != nil {
		c.JSON(http.StatusOK, sessionCheck)
		return
	}

	// Get associated user
	user, err := service.GetUserByToken(token)
	if err != nil || user == nil {
		c.JSON(http.StatusOK, sessionCheck)
		return
	}

	// Session is active!
	sessionCheck.Active = true
	c.JSON(http.StatusOK, sessionCheck)
}

func getLoginRoute(c *gin.Context) {
	var (
		login dto.LoginDTO
		err   error
	)

	// Decode body
	err = c.BindJSON(&login)
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	err = common.GetValidator().Struct(&login)
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// Find user by email
	user, err := service.GetUserByEmail(login.Email)
	if err != nil {
		if err == common.ErrRecordNotFound {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	if user == nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Check user password
	passwordCheck := security.CheckPasswordHash(login.Password, user.Password)
	if !passwordCheck {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Generate token
	token, _ := security.RandomHex(common.TokenLength)
	err = service.UpdateUserToken(user.ID, token)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	// Set session cookie (8h)
	config := common.GetConfig()
	c.SetCookie(common.TokenName, token, 28800, "/", config.Domain, config.SecureCookie, false) // TODO: use httpOnly, for security

	c.Status(http.StatusOK)
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

	config := common.GetConfig()
	c.SetCookie(common.TokenName, "", -1, "/", config.Domain, config.SecureCookie, true)

	c.Status(http.StatusOK)
}
