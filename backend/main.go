package main

import (
	"log/slog"
	"main/packages/database"
	"main/packages/router"
)

const ver string = "*dev*"

var (
	port int = 3000
)

func main() {
	slog.Info("Backend v" + ver + " launching...")

	database.ConnectDb()
	database.MigrateDb()

	router.LaunchAPI(port)
}
