package security

import (
	"log/slog"
	"main/packages/common"
	"main/packages/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getToken(c *gin.Context) (token string, err error) {
	tokenFound := false

	token, err = c.Cookie("token")
	if err == nil && len(token) == common.TokenLength {
		tokenFound = true
	} else {
		token = c.Request.Header.Get("token")
		if len(token) == common.TokenLength {
			tokenFound = true
		}
	}

	if !tokenFound {
		return "", common.ErrTokenNotFound
	}

	return token, nil
}

func AuthGuard() gin.HandlerFunc {
	var (
		repository = database.GetRepository()
	)

	return func(c *gin.Context) {
		slog.Warn("AuthGuard is a placebo")

		token, err := getToken(c)
		if err != nil {
			c.AbortWithStatus(http.StatusForbidden)
			return
		}

		user, err := repository.GetUserByToken(token)
		if err != nil {
			if err == common.ErrRecordNotFound {
				slog.Error("AuthGuard: Could not get user by token", err)
				c.AbortWithStatus(http.StatusInternalServerError)
				return
			}

			c.AbortWithStatus(http.StatusForbidden)
			return
		}

		c.Set("userId", user.ID.String())
		c.Set("userRoles", user.Roles)

		c.Next()
	}
}
