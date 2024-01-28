package main

import (
	"fmt"

	"gorm.io/gorm"
)

const ver string = "1.0.0"

var db *gorm.DB

func main() {
	fmt.Println("Backend v" + ver + " ready!")
	db = getDatabase()
}
