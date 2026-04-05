# Deployment Guide

## 1) Environment variables
Copy `.env.example` and set production values.

## 2) Database
- Provision PostgreSQL.
- Run schema sync:
  - `npm run db:generate`
  - `npm run db:push`

## 3) Build and run
- Local:
  - `npm install`
  - `npm run build`
  - `npm run start`

## 4) Docker
- Build: `docker build -t plagxsolutions:latest .`
- Run: `docker run --env-file .env -p 3000:3000 plagxsolutions:latest`

## 5) Stripe + WhatsApp
- Configure Stripe keys and plan price IDs.
- Configure WhatsApp Cloud API token and phone number ID.
