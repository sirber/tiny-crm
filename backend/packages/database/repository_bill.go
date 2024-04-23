package database

import (
	"main/packages/common"
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

func (r Repository) GetBills(userId uuid.UUID) (bills []Bill, err error) {
	err = database.
		Where("user_id = ?", userId).
		Where("deleted_at IS NULL").
		Find(&bills).
		Error

	if err == gorm.ErrRecordNotFound {
		return bills, common.ErrRecordNotFound
	}

	return bills, err
}

func (r Repository) GetBill(id uuid.UUID) (bill *Bill, err error) {
	err = database.
		Joins("Payment").
		Where("id = ?", id).
		First(&bill).
		Error

	if err == gorm.ErrRecordNotFound {
		return bill, common.ErrRecordNotFound
	}

	return bill, err
}

func (r Repository) CreateBill(bill *Bill) (err error) {
	return database.Create(&bill).Error
}

func (r Repository) UpdateBill(bill *Bill) (err error) {
	return database.Updates(&bill).Error
}

func (r Repository) DeleteBill(id uuid.UUID) (err error) {
	bill, err := r.GetBill(id)

	if err != nil {
		return err
	}

	now := time.Now() // FIXME: convert to user timezone
	bill.DeletedAt = &now

	return r.UpdateBill(bill)
}
