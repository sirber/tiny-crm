.PHONY: help
help:
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

.PHONY: dev
dev: ## Start a development server
	@docker compose up -d

.PHONY: migrate
migrate: dev ## Migrate the database
	@docker compose exec app npm run migrate:dev

.PHONY: stop
stop: ## Stop running server
	@docker compose down

.PHONY: clean
clean: stop-dev stop-prod ## Clean the project
	@docker compose exec app npm run clean
