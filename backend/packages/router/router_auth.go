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

func (r *GinRouter) getAuthRouter(rg *gin.RouterGroup) {
	rg.POST("/login", getLoginRoute)
	rg.POST("/logout", getLogoutRoute)
}

func getLoginRoute(c *gin.Context) {
	var (
		login dto.LoginDTO
		err   error
	)

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

	passwordCheck := security.CheckPasswordHash(login.Password, user.Password)
	if !passwordCheck {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	token, _ := security.RandomHex(common.TokenLength)
	user.Token = &token

	err = service.UpdateUser(user)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	config := common.GetConfig()
	c.SetCookie(common.TokenName, token, 0, "/", config.Domain, config.SecureCookie, true)

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

	config := common.GetConfig()
	c.SetCookie(common.TokenName, "", -1, "/", config.Domain, config.SecureCookie, true)

	c.Status(http.StatusOK)
}
