package database

import uuid "github.com/satori/go.uuid"

type repositoryBillInterface interface {
	GetBills(userId uuid.UUID) (bills []Bill, err error)
	GetBill(id uuid.UUID) (bill Bill, err error)
	CreateBill(bill Bill) (err error)
	UpdateBill(bill Bill) (err error)
	DeleteBill(id uuid.UUID) (err error)
}

type repositoryCustomerInterface interface {
	GetCustomers() (customers []Customer, err error)
	GetCustomer(id uuid.UUID) (customer Customer, err error)
	CreateCustomer(customer Customer) (err error)
	UpdateCustomer(customer Customer) (err error)
	DeleteCustomer(id uuid.UUID) (err error)
}

type repositoryPaymentInterface interface {
	GetPayments(userId uuid.UUID) (payments []Payment, err error)
	GetPayment(id uuid.UUID) (payment Payment, err error)
	CreatePayment(payment Payment) (err error)
	UpdatePayment(payment Payment) (err error)
	DeletePayment(id uuid.UUID) (err error)
}

type repositoryProductInterface interface {
	GetProducts(userId uuid.UUID) (products []Product, err error)
	GetProduct(id uuid.UUID) (product Product, err error)
	CreateProduct(product Product) (err error)
	UpdateProduct(product Product) (err error)
	DeleteProduct(id uuid.UUID) (err error)
}

type repositoryUserInterface interface {
	GetUsers() (users []User, err error)
	GetUser(id uuid.UUID) (user User, err error)
	GetUserByEmail(email string) (user User, err error)
	GetUserByToken(token string) (user User, err error)
	CreateUser(user User) (err error)
	UpdateUser(user User) (err error)
	DeleteUser(id uuid.UUID) (err error)
}

type RepositoryInterface interface {
	repositoryBillInterface
	repositoryCustomerInterface
	repositoryPaymentInterface
	repositoryProductInterface
	repositoryUserInterface
}

type Repository struct{}

func GetRepository() RepositoryInterface {
	return Repository{}
}
