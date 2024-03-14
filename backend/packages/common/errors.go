package common

import "errors"

var (
	ErrRecordNotFound = errors.New("record not found")
	ErrTokenNotFound  = errors.New("token not found")
)
