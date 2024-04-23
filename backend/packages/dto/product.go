package dto

import "github.com/shopspring/decimal"

type ProductDTO struct {
	PrimaryKey
	UserId      string          `json:"userId"`
	Name        string          `json:"name"`
	Description string          `json:"description"`
	Code        string          `json:"code"`
	Price       decimal.Decimal `json:"price"`
	Timestamps
}

type ProductCreateDTO struct {
	UserId      string          `json:"userId"`
	Name        string          `json:"name"`
	Description string          `json:"description"`
	Code        string          `json:"code"`
	Price       decimal.Decimal `json:"price"`
}

type ProductUpdateDTO struct {
	PrimaryKey
	UserId      string          `json:"userId"`
	Name        string          `json:"name"`
	Description string          `json:"description"`
	Code        string          `json:"code"`
	Price       decimal.Decimal `json:"price"`
}
