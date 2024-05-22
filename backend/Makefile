.PHONY: test build upgrade

test:
	go test ./...

upgrade:
	go get -u ./...

build:
	GOOS=linux GOARCH=amd64 go build -ldflags '-s -w' -o ../dist/tiny-crm .