package main

import (
	"backend/packages/api"
	"backend/packages/database"
	"fmt"
)

const ver string = "1.0.0"
const port string = "3000"

func init() {
	database.ConnectDb()
	database.MigrateDb()
}

func main() {
	fmt.Println("Backend v" + ver + " ready!")

	api.LaunchAPI(port)
}
