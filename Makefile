.PHONY: backend frontend build-backend build-frontend build clean docker

BACKEND := ./backend
FRONTEND := ./frontend

help:
	@echo "make [build, backend, frontend, clean]"

backend:
	@cd backend/ && go run .

frontend:
	@cd frontend && nom run dev

build-backend:
	@mkdir -p ./dist/data
	@echo "Building backend..."
	@cd $(BACKEND) && GOOS=linux GOARCH=amd64 go build -ldflags '-s -w' -o ../dist/tiny-crm .

build-frontend:
	@mkdir -p ./dist/static
	@echo "Building frontend..."
	@cd $(FRONTEND) && npm i && npm run build
	@cd $(FRONTEND) && cp -r ./dist/* ../dist/static/
	@rm -fr $(FRONTEND)/dist

build: clean build-backend build-frontend 
	@echo "done!"

docker: build
	@docker build . -t tiny-crm

clean:
	@echo "Cleaning..."
	@rm -fr ./dist