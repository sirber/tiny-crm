.PHONY: test build upgrade

help:
	@echo make [test, upgrade, build]

test:
	go test ./...

upgrade:
	go get -u ./...
	go mod tidy

build:
	GOOS=linux GOARCH=amd64 go build -ldflags '-s -w' -o ../dist/tiny-crm .