package api

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func LaunchAPI(port string) {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// Static Files
	fs := http.FileServer(http.Dir("static"))
	r.Handle("/*", http.StripPrefix("/", fs))

	http.ListenAndServe(":"+port, r)
}
