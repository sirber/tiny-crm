FROM golang:1.21-alpine

EXPOSE 3000
WORKDIR /app
VOLUME /app/data

COPY ./dist/* ./
RUN chmod +x ./tiny-crm

CMD ["./tiny-crm"]