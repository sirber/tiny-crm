.PHONY: backend frontend build-backend build-frontend build clean docker test

BACKEND := ./backend
FRONTEND := ./frontend

help:
	@echo "make [build, backend, frontend, clean, docker, test]"

test:
	@cd backend && make test
	# @cd frontend && npm run test:unit

backend:
	@cd backend && go run .

frontend:
	@cd frontend && npm run dev

build-backend:
	@mkdir -p ./dist/data
	@echo "Building backend..."
	@cd $(BACKEND) && make build

build-frontend:
	@mkdir -p ./dist/static
	@echo "Building frontend..."
	@cd $(FRONTEND) && npm i && npm run build
	@cd $(FRONTEND) && cp -r ./dist/* ../dist/static/

build: clean build-backend build-frontend 
	@echo "done!"

docker: build
	@docker build . -t tiny-crm

clean:
	@echo "Cleaning..."
	@rm -fr ./dist
	@rm -fr $(FRONTEND)/dist