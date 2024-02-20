package api

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func getUserRouter(r chi.Router) *chi.Mux {
	apiRouter := chi.NewRouter()
	apiRouter.Get("/", getUsersRoute)
	apiRouter.Get("/{id}", getUserRoute)

	return apiRouter
}

func getUsersRoute(w http.ResponseWriter, r *http.Request) {
	// TODO

}

func getUserRoute(w http.ResponseWriter, r *http.Request) {
	// TODO

}
