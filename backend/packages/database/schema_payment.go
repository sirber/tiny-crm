package database

import (
	uuid "github.com/satori/go.uuid"
	"github.com/shopspring/decimal"
)

type Payment struct {
	PrimaryKey
	BillId uuid.UUID       `json:"billId"`
	Bill   Bill            `json:"bill"`
	Amount decimal.Decimal `json:"amount" gorm:"type:decimal(10,2)"`
	Timestamps
}
