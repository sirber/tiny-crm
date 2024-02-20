package database

import (
	"log/slog"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

const dbName string = "data/tiny-crm.sqlite"

var database *gorm.DB

func ConnectDb() {
	var err error
	database, err = gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	slog.Info("Database ready.")
}

func MigrateDb() {
	for _, model := range Models {
		database.AutoMigrate(model)
	}

	slog.Info("Schema migrated.")
}
