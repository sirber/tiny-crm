package database

import (
	uuid "github.com/satori/go.uuid"
	"github.com/shopspring/decimal"
)

type Product struct {
	PrimaryKey
	UserId      uuid.UUID
	User        User
	Name        string          `json:"name"`
	Description string          `json:"description"`
	Code        string          `json:"code" gorm:"index"`
	Price       decimal.Decimal `json:"price" gorm:"type:decimal(10,2)"`
	Timestamps
}
