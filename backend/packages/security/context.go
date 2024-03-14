package security

import (
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

type SecurityContext struct {
	UserId uuid.UUID
	Roles  string
}

func GetSecurityContext(c *gin.Context) (securityContext *SecurityContext, err error) {
	userId, err := uuid.FromString(c.GetString("userId"))
	if err != nil {
		return securityContext, err
	}

	userRoles := c.GetString("userRoles")

	securityContext = &SecurityContext{
		UserId: userId,
		Roles:  userRoles,
	}

	return securityContext, nil
}
