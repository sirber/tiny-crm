package security

import (
	"strings"

	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

type SecurityContext struct {
	UserId    uuid.UUID
	UserRoles string
}

func GetSecurityContext(c *gin.Context) (securityContext *SecurityContext, err error) {
	userId, err := uuid.FromString(c.GetString("userId"))
	if err != nil {
		return securityContext, err
	}

	userRoles := c.GetString("userRoles")

	securityContext = &SecurityContext{
		UserId:    userId,
		UserRoles: userRoles,
	}

	return securityContext, nil
}

func (sc *SecurityContext) HasRole(roles []string) bool {
	userRoles := strings.Split(sc.UserRoles, ",")

	for _, role := range roles {
		for _, userRole := range userRoles {
			if strings.TrimSpace(userRole) == role {
				return true
			}
		}
	}

	return false
}
