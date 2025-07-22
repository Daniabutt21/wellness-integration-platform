# Wellness Backend

## Stack Used
- Ruby on Rails 7.1 (API mode)
- PostgreSQL
- Sidekiq + sidekiq-scheduler (background jobs)
- HTTParty (external API integration)
- Jbuilder (JSON serialization)

## Setup Instructions
1. Clone the repo and install dependencies:
   ```
   bundle install
   ```
2. Set up the database:
   ```
   rails db:create db:migrate
   ```
3. Set environment variables (recommended: use a `.env` file):
   - Copy `.env.example` to `.env` and fill in your values:
     ```
     cp .env.example .env
     # Edit .env and set:
     # EXTERNAL_API_BASE_URL=https://your-mock-server-url
     # EXTERNAL_API_KEY=your_api_key
     ```
   - Or set Rails credentials (alternative):
     ```
     EDITOR="vim" bin/rails credentials:edit
     # Add:
     external_api:
       base_url: YOUR_MOCK_SERVER_URL
       api_key: YOUR_API_KEY
     ```
4. Start Sidekiq (for background jobs):
   ```
   bundle exec sidekiq -C config/sidekiq.yml
   ```
5. Start the Rails server:
   ```
   rails server
   ```

## Environment Variables
- `EXTERNAL_API_BASE_URL` - The base URL of the external (mock) API
- `EXTERNAL_API_KEY` - The API key for authenticating with the external API

See `.env.example` for details.

## API Endpoints

### Clients
- `GET /api/v1/clients` — List all clients (paginated)
- `GET /api/v1/clients/search?search=term` — Search clients by name, email, or phone (paginated)

### Appointments
- `GET /api/v1/appointments` — List all appointments (paginated)
- `POST /api/v1/appointments` — Create a new appointment
- `PATCH /api/v1/appointments/:id` — Update an appointment
- `DELETE /api/v1/appointments/:id` — Cancel/delete an appointment

## Testing
- Run all tests:
  ```
  bundle exec rspec
  ```
- Add more tests in `spec/models` and `spec/requests` as needed.

## Assumptions
- The external API is available and the mock server URL/API key are correct.
- Data is periodically synced from the external API every 30 minutes (see Sidekiq schedule).
- Phone number is stored as `phone_number` in the DB, mapped from `phone` in the API.

## Incomplete Items & Approach
- Add more RSpec tests for models and requests.
- Add endpoints for editing/cancelling appointments if time allows.
- Add search/filter for clients if time allows.

## Time Spent
**3.5 hours**

## Contact
- For any issues, contact omar@ruhcare.com
