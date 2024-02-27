package database

type User struct {
	PrimaryKey
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email" gorm:"index"`
	Password  string `json:"-"`
	Roles     string `json:"roles"`
	TimeZone  string `json:"timeZone"`
	Timestamps
}
