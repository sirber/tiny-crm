package main

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

const dbName string = "data/tiny-crm.sqlite"

var database *gorm.DB

func init() {
	connectDb()
	migrateDb()
}

func connectDb() {
	var err error
	database, err = gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	fmt.Println("Database ready.")
}

func migrateDb() {
	for _, model := range Models {
		database.AutoMigrate(model)
	}
	fmt.Println("Schema migrated.")
}
