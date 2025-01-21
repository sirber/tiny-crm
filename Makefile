.PHONY: help dev migrate stop build

help:
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Start a development server
	@docker compose up -d
	@docker compose exec app npm run migrate:dev
	@echo Open http://localhost:3000

migrate: dev ## Migrate the database
	@docker compose exec app npm run migrate:dev

stop: ## Stop running server
	@docker compose down

build: ## Make a production docker image
	@docker build -t tiny-crm .