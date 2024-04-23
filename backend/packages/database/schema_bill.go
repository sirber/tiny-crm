package database

import (
	uuid "github.com/satori/go.uuid"
	"github.com/shopspring/decimal"
)

type Bill struct {
	PrimaryKey
	UserId     uuid.UUID
	User       User
	CustomerId uuid.UUID
	Customer   Customer
	Payments   []Payment
	Timestamps
}

type BillProduct struct {
	PrimaryKey
	BillId    uuid.UUID       `json:"billId"`
	Bill      Bill            `json:"bill"`
	ProductId uuid.UUID       `json:"productId"`
	Product   Product         `json:"product"`
	Price     decimal.Decimal `json:"price" gorm:"type:decimal(10,2)"`
	Timestamps
}
