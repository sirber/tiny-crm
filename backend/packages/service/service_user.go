package service

import (
	"errors"
	"main/packages/database"
	"main/packages/security"

	uuid "github.com/satori/go.uuid"
)

func GetUsers() ([]database.User, error) {
	return repository.GetUsers()
}

func GetUser(id uuid.UUID) (*database.User, error) {
	return repository.GetUser(id)
}

func GetUserByEmail(email string) (*database.User, error) {
	return repository.GetUserByEmail(email)
}

func GetUserByToken(token string) (*database.User, error) {
	return repository.GetUserByToken(token)
}

func CreateUser(user *database.User) error {
	if user.ID != uuid.Nil {
		return errors.New("new user cannot have an ID set")
	}

	hashedPassword, err := security.HashPassword(user.Password)
	if err != nil {
		return err
	}

	user.Password = hashedPassword

	return repository.CreateUser(user)
}

func UpdateUser(user *database.User) error {
	if user.ID == uuid.Nil {
		return errors.New("updated user must have an ID set")
	}

	currentUser, err := GetUser(user.ID)
	if err != nil {
		return err
	}

	if user.Password != "" {
		hashedPassword, err := security.HashPassword(user.Password)
		if err != nil {
			return err
		}

		user.Password = hashedPassword
	} else {
		user.Password = currentUser.Password
	}

	user.Token = currentUser.Token
	user.CreatedAt = currentUser.CreatedAt
	user.UpdatedAt = currentUser.UpdatedAt

	return repository.UpdateUser(user)
}
