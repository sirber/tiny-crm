package service

import (
	"main/packages/database"

	uuid "github.com/satori/go.uuid"
)

func GetUsers() ([]database.User, error) {
	return repository.GetUsers()
}

func GetUser(id uuid.UUID) (*database.User, error) {
	return repository.GetUser(id)
}
