package main

import (
	"fmt"
)

const ver string = "1.0.0"
const port string = "3000"

func main() {
	fmt.Println("Backend v" + ver + " ready!")

	LaunchAPI(port)
}
