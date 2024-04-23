package database

type User struct {
	PrimaryKey
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Email     string  `json:"email" gorm:"index"`
	TimeZone  string  `json:"timeZone"`
	Password  string  `json:"-" gorm:"not null"`
	Roles     string  `json:"roles"`
	Token     *string `json:"-" gorm:"index"`
	Timestamps
}
