.PHONY: backend frontend build-backend build-frontend build clean docker test deps

BACKEND := ./backend
FRONTEND := ./frontend

help:
	@echo "make [deps, build, backend, frontend, clean, docker, test]"

deps:
	cd $(BACKEND) && go get
	cd $(FRONTEND) && npm i

test:
	@cd $(FRONTEND) && make test
	# @cd $(FRONTEND) && npm run test:unit

backend:
	@cd $(BACKEND) && go run .

frontend:
	@cd $(FRONTEND) && npm run dev

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