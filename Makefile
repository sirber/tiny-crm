.PHONY: build build-frontend build-backend

build-backend:
	@echo "Building backend..."
	@cd ./backend && go build -o ./dist/backend .

build-frontend:
	@echo "Building frontend..."
	@cd ./frontend && npm run build

build: build-backend build-frontend
	@echo "done!"
