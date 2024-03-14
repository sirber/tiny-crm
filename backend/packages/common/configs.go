package common

import "os"

type Config struct {
	Domain       string
	SecureCookie bool
}

func GetConfig() *Config {
	env := os.Getenv("ENV")
	if env == "" {
		env = "local"
	}

	switch env {
	case "local":
		return &Config{
			Domain: "localhost",
		}
	}

	return nil
}
