package dto

import (
	"github.com/shopspring/decimal"
)

/* Bill */
type BillDTO struct {
	PrimaryKey
	UserId     string `json:"userId"`
	CustomerId string `json:"customerId"`
	Timestamps
}

type BillCreateDTO struct {
	UserId     string `json:"userId"`
	CustomerId string `json:"customerId"`
}

type BillUpdateDTO struct {
	PrimaryKey
	UserId     string `json:"userId"`
	CustomerId string `json:"customerId"`
}

/* Bill / Product */
type BillProductDTO struct {
	PrimaryKey
	BillId    string          `json:"billId"`
	ProductId string          `json:"productId"`
	Price     decimal.Decimal `json:"price"`
	Timestamps
}

type BillProductCreateDTO struct {
	BillId    string          `json:"billId"`
	ProductId string          `json:"productId"`
	Price     decimal.Decimal `json:"price"`
}

type BillProductUpdateDTO struct {
	PrimaryKey
	BillId    string          `json:"billId"`
	ProductId string          `json:"productId"`
	Price     decimal.Decimal `json:"price"`
}
