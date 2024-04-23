package database

import (
	uuid "github.com/satori/go.uuid"
	"github.com/shopspring/decimal"
)

type Product struct {
	PrimaryKey
	UserId      uuid.UUID
	User        User
	Name        string
	Description string
	Code        string          `gorm:"index"`
	Price       decimal.Decimal `gorm:"type:decimal(10,2)"`
	Timestamps
}
