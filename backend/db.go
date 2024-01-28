package main

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var database *gorm.DB

func init() {
	// Connect to database
	db, err := gorm.Open(sqlite.Open("data/test.sqlite"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("Database ready.")

	// Migrate the schema
	for _, model := range Models {
		db.AutoMigrate(model)
	}
	fmt.Println("Schema migrated.")

	database = db
}

func getDatabase() *gorm.DB {
	return database
}
