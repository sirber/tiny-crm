package database

import (
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

func (r Repository) GetCustomers() (customers []Customer, err error) {
	err = database.
		Where("deleted_at IS NULL").
		Find(&customers).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return customers, err
}

func (r Repository) GetCustomer(id uuid.UUID) (customer *Customer, err error) {
	err = database.
		Where("id = ?", id).
		First(&customer).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return customer, err
}

func (r Repository) CreateCustomer(customer *Customer) (err error) {
	return database.Create(&customer).Error
}

func (r Repository) UpdateCustomer(customer *Customer) (err error) {
	return database.Updates(&customer).Error
}

func (r Repository) DeleteCustomer(id uuid.UUID) (err error) {
	customer, err := r.GetCustomer(id)

	if err != nil {
		return err
	}

	now := time.Now() // FIXME: convert to user timezone
	customer.DeletedAt = &now

	return r.UpdateCustomer(customer)
}
