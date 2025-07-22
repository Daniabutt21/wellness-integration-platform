require 'rails_helper'

RSpec.describe 'Clients API', type: :request do
  let!(:client1) { Client.create!(name: 'Alice', email: 'alice@example.com', phone_number: '111', external_id: 'ext-client-1') }
  let!(:client2) { Client.create!(name: 'Bob', email: 'bob@example.com', phone_number: '222', external_id: 'ext-client-2') }
  let(:json_headers) { { 'ACCEPT' => 'application/json' } }

  describe 'GET /api/v1/clients' do
    it 'returns all clients' do
      get '/api/v1/clients', headers: json_headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end

  describe 'GET /api/v1/clients/search' do
    it 'returns filtered clients' do
      get '/api/v1/clients/search', params: { search: 'Alice' }, headers: json_headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).first['name']).to eq('Alice')
    end
  end
end 