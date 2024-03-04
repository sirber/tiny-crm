package service

import (
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

func UpdateUser(user *database.User) error {
	if user.Password != "" { // FIXME: use a DTO, convert to User
		hashedPassword, err := security.HashPassword(user.Password)
		if err != nil {
			return err
		}

		user.Password = hashedPassword
	}

	return repository.UpdateUser(user)
}
