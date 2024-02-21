package main

import (
	"log/slog"
	"main/api"
	"main/database"
)

const ver string = "1.0.0"

var (
	port int = 3000
)

func init() {
	slog.Info("Backend v" + ver + " launching...")
	database.ConnectDb()
	database.MigrateDb()
}

func main() {
	api.LaunchAPI(port)
}
