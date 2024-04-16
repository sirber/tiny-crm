package dto

type CustomerDTO struct {
	PrimaryKey
	UserId    string `json:"userId"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	PhoneHome string `json:"phoneHome"`
	PhoneCell string `json:"phoneCell"`
	Timestamps
}

type CustomerCreateDTO struct {
	UserId    string `json:"userId"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	PhoneHome string `json:"phoneHome"`
	PhoneCell string `json:"phoneCell"`
}

type CustomerUpdateDTO struct {
	PrimaryKey
	UserId    string `json:"userId"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	PhoneHome string `json:"phoneHome"`
	PhoneCell string `json:"phoneCell"`
}
