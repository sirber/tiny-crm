.PHONY: help build clean

help:
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Start a development server
	@cp -f docker-compose.dev.yml docker-compose.yml
	@docker compose up -d

migrate: dev ## Migrate the database
	@docker compose exec app npm run migrate:dev

build: ## Build a production image 
	@cp -f docker-compose.prod.yml docker-compose.yml
	@docker compose build

prod: build ## Start a production server
	@cp -f docker-compose.prod.yml docker-compose.yml
	@docker compose run -d

migrate-prod: ## Migrate the database for production
	@docker compose exec app npm run migrate:prod

stop: ## Stop running server
	@docker compose down

clean: stop-dev stop-prod ## Clean the project
	@docker compose exec app npm run clean
