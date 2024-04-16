package dto

import "time"

type PrimaryKey struct {
	ID string `json:"id"`
}

type Timestamps struct {
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
