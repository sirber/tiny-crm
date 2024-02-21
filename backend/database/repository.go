package database

import (
	"time"

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
		First(&user).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return user, err
}

func CreateUser(user *User) (err error) {
	return database.Create(user).Error
}

func UpdateUser(user *User) (err error) {
	return database.Save(user).Error
}

func DeleteUser(id uuid.UUID) (err error) {
	user, err := GetUser(id)

	if err != nil {
		return err
	}

	now := time.Now() // FIXME: convert to user timezone
	user.DeletedAt = &now

	return UpdateUser(user)
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
		First(&customer).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return customer, err
}

func CreateCustomer(customer *Customer) (err error) {
	return database.Create(customer).Error
}

func UpdateCustomer(customer *Customer) (err error) {
	return database.Save(customer).Error
}

func DeleteCustomer(id uuid.UUID) (err error) {
	customer, err := GetCustomer(id)

	if err != nil {
		return err
	}

	now := time.Now() // FIXME: convert to user timezone
	customer.DeletedAt = &now

	return UpdateCustomer(customer)
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
		First(&product).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return product, err
}

func CreateProduct(product *Customer) (err error) {
	return database.Create(product).Error
}

func UpdateProduct(product *Product) (err error) {
	return database.Save(product).Error
}

func DeleteProduct(id uuid.UUID) (err error) {
	product, err := GetProduct(id)

	if err != nil {
		return err
	}

	now := time.Now() // FIXME: convert to user timezone
	product.DeletedAt = &now

	return UpdateProduct(product)
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
		First(&bill).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return bill, err
}

func CreateBill(bill *Bill) (err error) {
	return database.Create(bill).Error
}

func UpdateBill(bill *Bill) (err error) {
	return database.Save(bill).Error
}

func DeleteBill(id uuid.UUID) (err error) {
	bill, err := GetBill(id)

	if err != nil {
		return err
	}

	now := time.Now() // FIXME: convert to user timezone
	bill.DeletedAt = &now

	return UpdateBill(bill)
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
		First(&payment).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}

	return payment, err
}

func CreatePayment(payment *Payment) (err error) {
	return database.Create(payment).Error
}

func UpdatePayment(payment *Payment) (err error) {
	return database.Save(payment).Error
}

func DeletePayment(id uuid.UUID) (err error) {
	payment, err := GetPayment(id)

	if err != nil {
		return err
	}

	now := time.Now() // FIXME: convert to user timezone
	payment.DeletedAt = &now

	return UpdatePayment(payment)
}
