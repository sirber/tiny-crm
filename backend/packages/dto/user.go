package dto

type UserDTO struct {
	PrimaryKey
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	TimeZone  string `json:"timeZone"`
	Roles     string `json:"roles"`
	Timestamps
}

type UserCreateDTO struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	TimeZone  string `json:"timeZone"`
	Password  string `json:"password"`
	Roles     string `json:"roles"`
}

type UserUpdateDTO struct {
	PrimaryKey
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	TimeZone  string `json:"timeZone"`
	Password  string `json:"password"`
	Roles     string `json:"roles"`
}
