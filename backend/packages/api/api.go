package api

import (
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func LaunchAPI(port string) {
	r := chi.NewRouter()
	r.Use(middleware.Recoverer)
	r.Use(middleware.Logger)
	r.Use(middleware.Compress(5, "text/html", "text/css", "application/json"))
	r.Use(middleware.StripSlashes)
	r.Use(middleware.CleanPath)

	// API
	r.Mount("/api/users", getUserRouter(r))

	// Static Files
	fs := http.FileServer(http.Dir("static"))
	r.Handle("/*", http.StripPrefix("/", fs))

	slog.Info("Listening on: http://localhost:" + port)
	http.ListenAndServe(":"+port, r)
}
