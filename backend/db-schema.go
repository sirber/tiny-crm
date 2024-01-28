package main

import (
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type Base struct {
	ID uuid.UUID `gorm:"type:uuid;primary_key;"`
}

type Timestamps struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
}

func (base *Base) BeforeCreate(tx *gorm.DB) error {
	base.ID = uuid.NewV4()
	return nil
}

func (t *Timestamps) BeforeCreate(tx *gorm.DB) error {
	t.CreatedAt = time.Now()
	t.UpdatedAt = time.Now()
	return nil
}

func (t *Timestamps) BeforeUpdate(tx *gorm.DB) error {
	t.UpdatedAt = time.Now()
	return nil
}

type User struct {
	Base
	FirstName string
	LastName  string
	Email     string
	Password  string
	Roles     string
	Timestamps
}

type Customer struct {
	Base
	UserId    uuid.UUID
	User      User
	FirstName string
	LastName  string
	Email     string
	Timestamps
}

type Product struct {
	Base
	UserId      uuid.UUID
	User        User
	Name        string
	Description string
	Code        string
	Price       float32
	Timestamps
}

type Bill struct {
	Base
	UserId     uuid.UUID
	User       User
	CustomerId uuid.UUID
	Customer   Customer
	Timestamps
}

type BillProduct struct {
	Base
	BillId    uuid.UUID
	Bill      Bill
	ProductId uuid.UUID
	Product   Product
	Price     float32
	Timestamps
}

var Models = []interface{}{
	&User{},
	&Product{},
	&Customer{},
	&Bill{},
	&BillProduct{},
}
