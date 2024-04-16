package database

import uuid "github.com/satori/go.uuid"

type Customer struct {
	PrimaryKey
	UserId    uuid.UUID
	User      User
	FirstName string
	LastName  string
	Email     string `gorm:"index"`
	PhoneHome string
	PhoneCell string
	Timestamps
}
