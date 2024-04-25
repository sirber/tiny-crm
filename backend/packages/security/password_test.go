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

func TestCheckPasswordHash(t *testing.T) {
	t.Run("Should validate a correct password", func(t *testing.T) {
		// Assert
		var (
			password = "test"
			hash     = "$2y$12$34CP4q/kwMWpPR7qGC6kcu9vMRw9IUpEQpbkmgwz.sgAj6tQ8Sy.e"
		)

		// Act
		result := CheckPasswordHash(password, hash)

		// Assert
		assert.True(t, result)
	})

	t.Run("Should validate a bad password", func(t *testing.T) {
		// Assert
		var (
			password = "test"
			hash     = "oh I'm bad"
		)

		// Act
		result := CheckPasswordHash(password, hash)

		// Assert
		assert.False(t, result)
	})
}
