package dto

import "github.com/shopspring/decimal"

type PaymentDTO struct {
	PrimaryKey
	BillId string          `json:"billId"`
	Amount decimal.Decimal `json:"amount"`
	Timestamps
}

type PaymentCreateDTO struct {
	BillId string          `json:"billId"`
	Amount decimal.Decimal `json:"amount"`
}

type PaymentUpdateDTO struct {
	PrimaryKey
	BillId string          `json:"billId"`
	Amount decimal.Decimal `json:"amount"`
}
