# Tiny CRM

A small CRM for small businesses.

## Features

- TODO

## Technicalities

- Database is in SQLite
- The backend hosts the frontend

### Security

- the session token is stored in a http-only cookie
- a user can only have one session at a time, stored in the database
- the /api/ route goes through an AuthGuard, that:
  - validates that the request has a valid token, bound to an active user
  - add to the request the user id and roles
