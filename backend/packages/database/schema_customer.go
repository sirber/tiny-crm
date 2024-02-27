package database

import uuid "github.com/satori/go.uuid"

type Customer struct {
	PrimaryKey
	UserId    uuid.UUID `json:"userId"`
	User      User      `json:"user"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Email     string    `json:"email" gorm:"index"`
	PhoneHome string    `json:"phoneHome"`
	PhoneCell string    `json:"phoneCell"`
	Timestamps
}
