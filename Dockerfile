FROM golang:1.21-alpine

COPY ./dist/tiny-crm /app/
COPY ./dist/static/* /app/static/

VOLUME /app/data/
EXPOSE 3000

WORKDIR /app/
CMD ["./tiny-crm"]
