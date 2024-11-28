package database

import (
	"main/packages/common"
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

func (r Repository) GetProducts(userId uuid.UUID) (products []Product, err error) {
	err = database.
		Where("user_id = ?", userId).
		Where("deleted_at IS NULL").
		Find(&products).
		Error

	if err == gorm.ErrRecordNotFound {
		return products, common.ErrRecordNotFound
	}

	return products, err
}

func (r Repository) GetProduct(id uuid.UUID) (product Product, err error) {
	err = database.
		Where("id = ?", id).
		First(&product).
		Error

	if err == gorm.ErrRecordNotFound {
		return product, common.ErrRecordNotFound
	}

	return product, err
}

func (r Repository) CreateProduct(product Product) (err error) {
	return database.Create(&product).Error
}

func (r Repository) UpdateProduct(product Product) (err error) {
	return database.Updates(&product).Error
}

func (r Repository) DeleteProduct(id uuid.UUID) (err error) {
	product, err := r.GetProduct(id)

	if err != nil {
		return err
	}

	now := time.Now() // FIXME: convert to user timezone
	product.DeletedAt = &now

	return r.UpdateProduct(product)
}
