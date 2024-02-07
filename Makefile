.PHONY: backend frontend build clean

BACKEND := ./backend
FRONTEND := ./frontend

help:
	@echo "make [build, backend, frontend, clean]"

backend:
	@mkdir -p ./dist/data
	@echo "Building backend..."
	@cd $(BACKEND) && go build -o ../dist/tinycrm .

frontend:
	@mkdir -p ./dist/static
	@echo "Building frontend..."
	@cd $(FRONTEND) && npm run build
	@cd $(FRONTEND) && cp -r ./dist/* ../dist/static/
	@rm -fr ./frontend/dist

build: backend frontend 
	@echo "done!"

clean:
	rm -fr ./dist