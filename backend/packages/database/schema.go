package database

import (
	"time"

	uuid "github.com/satori/go.uuid"
	"github.com/shopspring/decimal"
	"gorm.io/gorm"
)

type PrimaryKey struct {
	ID uuid.UUID `gorm:"type:uuid;primary_key;"`
}

type Timestamps struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
}

func (base *PrimaryKey) BeforeCreate(tx *gorm.DB) (err error) {
	base.ID = uuid.NewV4()
	return
}

type User struct {
	PrimaryKey
	FirstName string
	LastName  string
	Email     string
	Password  string
	Roles     string
	TimeZone  string
	Timestamps
}

type Customer struct {
	PrimaryKey
	UserId    uuid.UUID
	User      User
	FirstName string
	LastName  string
	Email     string
	Timestamps
}

type Product struct {
	PrimaryKey
	UserId      uuid.UUID
	User        User
	Name        string
	Description string
	Code        string
	Price       float32
	Timestamps
}

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
	BillId    uuid.UUID
	Bill      Bill
	ProductId uuid.UUID
	Product   Product
	Price     decimal.Decimal `gorm:"type:decimal(10,2)"`
	Timestamps
}

type Payment struct {
	PrimaryKey
	BillId uuid.UUID
	Bill   Bill
	Amount decimal.Decimal `gorm:"type:decimal(10,2)"`
	Timestamps
}

var Models = []interface{}{
	&User{},
	&Product{},
	&Customer{},
	&Bill{},
	&BillProduct{},
	&Payment{},
}
