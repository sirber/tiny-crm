package database

import (
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type PrimaryKey struct {
	ID uuid.UUID `json:"id" gorm:"type:uuid;primary_key;"`
}

func (base *PrimaryKey) BeforeCreate(tx *gorm.DB) (err error) {
	base.ID = uuid.NewV4()
	return
}

type Timestamps struct {
	CreatedAt time.Time  `json:"createdAt"`
	UpdatedAt time.Time  `json:"updatedAt"`
	DeletedAt *time.Time `json:"deletedAt" gorm:"index"`
}

var Models = []interface{}{
	&User{},
	&Product{},
	&Customer{},
	&Bill{},
	&BillProduct{},
	&Payment{},
}
