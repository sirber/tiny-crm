.PHONY: backend frontend build clean docker

BACKEND := ./backend
FRONTEND := ./frontend

help:
	@echo "make [build, backend, frontend, clean]"

backend:
	@mkdir -p ./dist/data
	@echo "Building backend..."
	@cd $(BACKEND) && GOOS=linux GOARCH=amd64 go build -ldflags '-s -w' -o ../dist/tiny-crm .

frontend:
	@mkdir -p ./dist/static
	@echo "Building frontend..."
	@cd $(FRONTEND) && npm i && npm run build
	@cd $(FRONTEND) && cp -r ./dist/* ../dist/static/
	@rm -fr $(FRONTEND)/dist

build: clean backend frontend 
	@echo "done!"

docker: build
	@docker build . -t tiny-crm

clean:
	@echo "Cleaning..."
	@rm -fr ./dist