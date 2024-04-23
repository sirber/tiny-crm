package router

import (
	"log/slog"
	"main/packages/security"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	sloggin "github.com/samber/slog-gin"
)

type GinRouter struct {
	router *gin.Engine
}

func LaunchAPI(port int) {
	r := GinRouter{
		router: gin.New(),
	}

	// Middlewares
	r.router.Use(sloggin.New(slog.Default()))
	r.router.Use(gin.Recovery())
	r.router.Use(gzip.Gzip(gzip.BestCompression))

	// CORS
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	r.router.Use(cors.New(config))

	// Static Files
	r.router.Use(static.Serve("/", static.LocalFile("static", false)))

	// Auth
	auth := r.router.Group("/api/auth")
	r.getAuthRouter(auth)

	// API
	api := r.router.Group("/api", security.AuthGuard())

	users := api.Group("/users")
	r.getUserRouter(users)

	slog.Info("Listening on: http://localhost:" + strconv.Itoa(port))
	r.router.Run(":" + strconv.Itoa(port))
}
