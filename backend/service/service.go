package service

import "main/database"

var (
	repository = database.GetRepository()
)
