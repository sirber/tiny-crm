package security

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestHashPassword(t *testing.T) {

	t.Run("Should generate a password", func(t *testing.T) {
		// Arrange
		var (
			password = "testPassword"
		)

		// Act
		hash, err := HashPassword(password)

		// Assert
		assert.Nil(t, err)
		assert.NotEqual(t, password, hash)
	})
}
