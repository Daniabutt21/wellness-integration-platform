# Wellness Platform – Fullstack Take-Home Assignment

## Project Overview
This project is a fullstack solution for a virtual wellness clinic, allowing admins to manage clients and appointments via a modern React frontend and a robust Rails backend. It integrates with a mock external API (Postman) and demonstrates best practices in API integration, background jobs, and UI/UX.

---

## Stack Used
- **Backend:** Ruby on Rails 7.1 (API mode), PostgreSQL, Sidekiq, sidekiq-scheduler, HTTParty, Jbuilder
- **Frontend:** React (Create React App), Material-UI (MUI), Axios

---

## Assignment Summary
- **Backend:**
  - API wrapper for external API (fetch clients, appointments, create appointment)
  - Store data in PostgreSQL
  - Periodic syncing with Sidekiq
  - REST API for frontend (CRUD, search)
- **Frontend:**
  - List/search clients
  - List, create, edit, delete appointments
  - Modern, responsive UI with dark mode
  - Error handling and feedback

---

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <repo-url>
cd <repo-root>
```
- You should see two main folders: `wellness_backend` and `wellness-frontend`.

### 2. Backend Setup (wellness_backend)
```sh
cd wellness_backend
bundle install
rails db:create db:migrate
cp .env.example .env # and fill in your mock server URL and API key
# Or set Rails credentials as described in backend/README.md
bundle exec sidekiq -C config/sidekiq.yml
rails server
```
- **Note:** The backend runs on port **3000** by default.
- **You must set up the Postman mock server and use its URL in your `.env` or credentials.**

### 3. Frontend Setup (wellness-frontend)
```sh
cd ../wellness-frontend
npm install
cp .env.example .env # optional, to set API base URL
npm start
```
- **The frontend expects the backend API at `http://localhost:3000/api/v1` by default.**
- If you change the backend port or URL, update `REACT_APP_API_BASE` in the frontend `.env` file.

---

## Important Notes
- **Backend URL in Frontend:**
  - The frontend uses the backend API URL via the `REACT_APP_API_BASE` environment variable. Make sure this matches your backend server.
- **Mock Server:**
  - You must set up the Postman mock server and use its URL for the backend to fetch data.
- **Sidekiq:**
  - Sidekiq must be running for periodic syncing to work.

---

## Why Not Deployed?
- **Mock Server:** The project relies on a Postman mock server, which is not suitable for public deployment.
- **Sidekiq:** Background jobs require a persistent process (Sidekiq) and Redis, which complicates deployment for a demo/mock environment.
- **Local Demo:** The project is designed for local setup and demo as per assignment instructions.

---

## Time Spent
- **Backend:** 3.5 hours
- **Frontend:** 3 hours
- **Total:** 6.5 hours

---

## Points for Future Improvement
- Add pagination for large lists
- Add user authentication/authorization
- Add more comprehensive tests (frontend and backend)
- Add deployment scripts (Docker Compose, Heroku, etc.)
- Add mobile version (React Native or Swift/Java)
- Add more advanced error handling and loading states
- Add user profile and settings

---

## Assignment Details (for reference)

> You're joining a team building an internal tool for a wellness clinic. Your task is to build a small system that allows clinic admins to manage clients and their appointments using an external API (mocked via Postman). This exercise is inspired by the kind of work you'll do at Ruh: integrating with APIs, building robust and secure infrastructure, and creating great user experiences in a healthcare environment.

- **Backend:**
  - API wrapper for external API
  - Store data in PostgreSQL
  - Simulate periodic syncing
- **Frontend:**
  - List/search clients
  - Show appointments
  - Add/edit/cancel appointments
- **Bonus:**
  - Mobile version, more features, deployment

---

## Contact
- For any issues, contact omar@ruhcare.com or see the backend/frontend READMEs for more details. 