package database

import (
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

func (r Repository) GetPayments(userId uuid.UUID) (payments []Payment, err error) {
	err = database.
		Where("user_id = ?", userId).
		Where("deleted_at IS NULL").
		Find(&payments).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return payments, err
}

func (r Repository) GetPayment(id uuid.UUID) (payment *Payment, err error) {
	err = database.
		Where("id = ?", id).
		First(&payment).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return payment, err
}

func (r Repository) CreatePayment(payment *Payment) (err error) {
	return database.Create(&payment).Error
}

func (r Repository) UpdatePayment(payment *Payment) (err error) {
	return database.Updates(&payment).Error
}

func (r Repository) DeletePayment(id uuid.UUID) (err error) {
	payment, err := r.GetPayment(id)

	if err != nil {
		return err
	}

	now := time.Now() // FIXME: convert to user timezone
	payment.DeletedAt = &now

	return r.UpdatePayment(payment)
}
