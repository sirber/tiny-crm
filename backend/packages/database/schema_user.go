package database

type User struct {
	PrimaryKey
	FirstName string  `json:"firstName" binding:"required"`
	LastName  string  `json:"lastName" binding:"required"`
	Email     string  `json:"email" gorm:"index" binding:"required"`
	TimeZone  string  `json:"timeZone" binding:"required"`
	Password  string  `json:"-" gorm:"not null" binding:"required"`
	Roles     string  `json:"roles" binding:"required"`
	Token     *string `json:"-" gorm:"index"`
	Timestamps
}
