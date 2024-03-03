package database

import (
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

func (r Repository) GetUsers() (users []User, err error) {
	err = database.
		Where("deleted_at IS NULL").
		Find(&users).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return users, err
}

func (r Repository) GetUser(id uuid.UUID) (user *User, err error) {
	err = database.
		Where("id = ?", id).
		First(&user).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return user, err
}

func (r Repository) GetUserByEmail(email string) (user *User, err error) {
	err = database.
		Where("email = ?", email).
		First(&user).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return user, err
}

func (r Repository) GetUserByToken(token string) (user *User, err error) {
	err = database.
		Where("token = ?", token).
		First(&user).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return user, err
}

func (r Repository) CreateUser(user *User) (err error) {
	return database.Create(user).Error
}

func (r Repository) UpdateUser(user *User) (err error) {
	return database.Save(user).Error
}

func (r Repository) DeleteUser(id uuid.UUID) (err error) {
	user, err := r.GetUser(id)

	if err != nil {
		return err
	}

	now := time.Now() // FIXME: convert to user timezone
	user.DeletedAt = &now

	return r.UpdateUser(user)
}
