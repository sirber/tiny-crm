package database

import (
	"time"

	uuid "github.com/satori/go.uuid"
	"github.com/shopspring/decimal"
	"gorm.io/gorm"
)

type PrimaryKey struct {
	ID uuid.UUID `json:"id" gorm:"type:uuid;primary_key;"`
}

type Timestamps struct {
	CreatedAt time.Time  `json:"createdAt"`
	UpdatedAt time.Time  `json:"updatedAt"`
	DeletedAt *time.Time `json:"deletedAt" gorm:"index"`
}

func (base *PrimaryKey) BeforeCreate(tx *gorm.DB) (err error) {
	base.ID = uuid.NewV4()
	return
}

type User struct {
	PrimaryKey
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email" gorm:"index"`
	Password  string `json:"-"`
	Roles     string `json:"roles"`
	TimeZone  string `json:"timeZone"`
	Timestamps
}

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

type Bill struct {
	PrimaryKey
	UserId     uuid.UUID `json:"userId"`
	User       User      `json:"user"`
	CustomerId uuid.UUID `json:"customerId"`
	Customer   Customer  `json:"customer"`
	Payments   []Payment `json:"payments"`
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

type Payment struct {
	PrimaryKey
	BillId uuid.UUID       `json:"billId"`
	Bill   Bill            `json:"bill"`
	Amount decimal.Decimal `json:"amount" gorm:"type:decimal(10,2)"`
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
