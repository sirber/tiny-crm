.PHONY: backend frontend build clean docker

BACKEND := ./backend
FRONTEND := ./frontend

help:
	@echo "make [build, backend, frontend, clean]"

backend:
	@mkdir -p ./dist/data
	@echo "Building backend..."
	@cd $(BACKEND) && GOOS=linux GOARCH=amd64 go build -o ../dist/tiny-crm .

frontend:
	@mkdir -p ./dist/static
	@echo "Building frontend..."
	@cd $(FRONTEND) && npm run build
	@cd $(FRONTEND) && cp -r ./dist/* ../dist/static/
	@rm -fr ./frontend/dist

build: clean backend frontend 
	@echo "done!"

docker: build
	@docker build .

clean:
	@rm -fr ./dist