package database

import (
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

/* Users */
func GetUsers() (users []User, err error) {
	err = database.
		Where("deleted_at IS NULL").
		Find(&users).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return users, err
}

func GetUser(id uuid.UUID) (user *User, err error) {
	err = database.
		Where("id = ?", id).
		Find(&user).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return user, err
}

/* Customers */
func GetCustomers() (customers []Customer, err error) {
	err = database.
		Where("deleted_at IS NULL").
		Find(&customers).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return customers, err
}

func GetCustomer(id uuid.UUID) (customer *Customer, err error) {
	err = database.
		Where("id = ?", id).
		Find(&customer).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return customer, err
}

/* Product */
func GetProducts(userId uuid.UUID) (products []Product, err error) {
	err = database.
		Where("user_id = ?", userId).
		Where("deleted_at IS NULL").
		Find(&products).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return products, err
}

func GetProduct(id uuid.UUID) (product *Product, err error) {
	err = database.
		Where("id = ?", id).
		Find(&product).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return product, err
}

/* Bill */
func GetBills(userId uuid.UUID) (bills []Bill, err error) {
	err = database.
		Where("user_id = ?", userId).
		Where("deleted_at IS NULL").
		Find(&bills).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return bills, err
}

func GetBill(id uuid.UUID) (bill *Bill, err error) {
	err = database.
		Joins("Payment").
		Where("id = ?", id).
		Find(&bill).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return bill, err
}

/* Payment */
func GetPayments(userId uuid.UUID) (payments []Payment, err error) {
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

func GetPayment(id uuid.UUID) (payment *Payment, err error) {
	err = database.
		Where("id = ?", id).
		Find(&payment).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return payment, err
}
