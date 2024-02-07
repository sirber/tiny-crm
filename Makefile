.PHONY: backend frontend buid

BACKEND := ./backend
FRONTEND := ./frontend

backend: $(BUILD_DIR)
	@mkdir -p ./dist/data
	@echo "Building backend..."
	@cd $(BACKEND) && go build -o ../dist/tinycrm .

frontend: $(BUILD_DIR)
	@mkdir -p ./dist/static
	@echo "Building frontend..."
	@cd $(FRONTEND) && npm run build
	@cd $(FRONTEND) && cp -r ./dist/* ../dist/static/

build: backend frontend 
	@echo "done!"