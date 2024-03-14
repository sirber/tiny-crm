package security

import (
	"main/packages/common"
	"strings"

	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

type SecurityContext struct {
	UserId    uuid.UUID
	UserRoles []string
}

func GetSecurityContext(c *gin.Context) (securityContext *SecurityContext, err error) {
	userId, err := uuid.FromString(c.GetString("userId"))
	if err != nil {
		return securityContext, err
	}

	userRoles := strings.Split(c.GetString("userRoles"), ",")

	securityContext = &SecurityContext{
		UserId:    userId,
		UserRoles: userRoles,
	}

	return securityContext, nil
}

func (sc *SecurityContext) HasRole(roles []string) error {
	for _, role := range roles {
		for _, userRole := range sc.UserRoles {
			if strings.TrimSpace(userRole) == role {
				return nil
			}
		}
	}

	return common.ErrUserRoleNotFound
}
