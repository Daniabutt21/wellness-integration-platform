require 'rails_helper'

RSpec.describe 'Appointments API', type: :request do
  let!(:client) { Client.create!(name: 'Alice', email: 'alice@example.com', phone_number: '111', external_id: 'ext-client') }
  let!(:appointment) { Appointment.create!(client: client, scheduled_at: 1.day.from_now, external_id: 'ext-appt') }
  let(:json_headers) { { 'ACCEPT' => 'application/json' } }

  describe 'GET /api/v1/appointments' do
    it 'returns all appointments' do
      get '/api/v1/appointments', headers: json_headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to be >= 1
    end
  end

  describe 'POST /api/v1/appointments' do
    it 'creates an appointment' do
      post '/api/v1/appointments', params: { appointment: { client_id: client.id, scheduled_at: 2.days.from_now, external_id: 'ext-appt-2' } }, headers: json_headers
      expect(response).to have_http_status(:created)
    end
  end

  describe 'PATCH /api/v1/appointments/:id' do
    it 'updates an appointment' do
      patch "/api/v1/appointments/#{appointment.id}", params: { appointment: { notes: 'Updated' } }, headers: json_headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['notes']).to eq('Updated')
    end
  end

  describe 'DELETE /api/v1/appointments/:id' do
    it 'deletes an appointment' do
      delete "/api/v1/appointments/#{appointment.id}", headers: json_headers
      expect(response).to have_http_status(:no_content)
    end
  end
end 