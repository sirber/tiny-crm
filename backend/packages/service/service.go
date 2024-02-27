package service

import "main/packages/database"

var (
	repository database.RepositoryInterface = database.GetRepository()
)
