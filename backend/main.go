package main

import (
	"backend/packages/api"
	"backend/packages/database"
	"log/slog"
)

const ver string = "1.0.0"
const port string = "3000"

func init() {
	slog.Info("Backend v" + ver + " launching...")
	database.ConnectDb()
	database.MigrateDb()
}

func main() {
	api.LaunchAPI(port)
}
