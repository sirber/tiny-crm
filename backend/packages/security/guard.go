package security

import (
	"log/slog"

	"github.com/gin-gonic/gin"
)

func AuthGuard() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO

		slog.Warn("AuthGuard is a placebo")

		c.Next()
	}
}
