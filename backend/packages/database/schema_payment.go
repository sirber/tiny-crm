package database

import (
	uuid "github.com/satori/go.uuid"
	"github.com/shopspring/decimal"
)

type Payment struct {
	PrimaryKey
	BillId uuid.UUID
	Bill   Bill
	Amount decimal.Decimal `gorm:"type:decimal(10,2)"`
	Timestamps
}
