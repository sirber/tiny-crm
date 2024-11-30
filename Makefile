BACKEND := ./backend
FRONTEND := ./frontend

## Help
.PHONY: help
help: 
	@awk '/^## / { if (c) {print c}; c=substr($$0, 4); next } c && /([[:alpha:]][[:alnum:]_-]+:)/ {print $$1, "\t", c; c=0} END { print c }' $(MAKEFILE_LIST)

## Install dependencies
.PHONY: deps
deps: 
	cd $(BACKEND) && go get
	cd $(FRONTEND) && npm i

## Run development
.PHONY: dev
dev:
	@docker compose up -d

## Run tests
.PHONY: test
test:
	@cd $(FRONTEND) && make test
	# @cd $(FRONTEND) && npm run test:unit

.PHONY: build-backend
build-backend:
	@mkdir -p ./dist/data
	@echo "Building backend..."
	@cd $(BACKEND) && make build

.PHONY: build-frontend
build-frontend:
	@mkdir -p ./dist/static
	@echo "Building frontend..."
	@cd $(FRONTEND) && npm i && npm run build
	@cd $(FRONTEND) && cp -r ./dist/* ../dist/static/

## Build for production
.PHONY: prod
prod: clean build-backend build-frontend 
	@docker build . -t tiny-crm
	@echo "done!"

## Clean solution
.PHONY: clean
clean:
	@echo "Cleaning..."
	@rm -fr ./dist
	@rm -fr $(FRONTEND)/dist