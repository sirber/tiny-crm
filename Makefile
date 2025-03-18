# Tiny CRM

.PHONY: help
help:
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

.PHONY: dev
dev: stop ## Start a development server
	@yarn install
	@docker compose up -d
	@docker compose exec app npm run migrate:dev
	@echo Open http://localhost:3000

.PHONY: migrate
migrate: ## Migrate the database
	@docker compose exec app npm run migrate:dev

.PHONY: stop
stop: ## Stop running server
	@docker compose down

.PHONY: build
build: ## Make a production docker image
	@docker build --target runner -t tiny-crm .

.PHONY: quality
quality: ## Run quality checks
	@docker compose exec app yarn format
	@docker compose exec app yarn lint