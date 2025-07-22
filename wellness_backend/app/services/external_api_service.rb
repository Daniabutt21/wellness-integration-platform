# app/services/external_api_service.rb
class ExternalApiService
  include HTTParty

  BASE_URL = ENV['EXTERNAL_API_BASE_URL'] || Rails.application.credentials.dig(:external_api, :base_url)
  API_KEY = ENV['EXTERNAL_API_KEY'] || Rails.application.credentials.dig(:external_api, :api_key)
  CLIENTS_PATH = '/clients'
  APPOINTMENTS_PATH = '/appointments'

  base_uri BASE_URL if BASE_URL.present?

  def initialize
    @headers = { 'Content-Type' => 'application/json' }
    @headers['Authorization'] = "Bearer #{API_KEY}" if API_KEY.present?
  end

  def fetch_clients
    get(CLIENTS_PATH) || []
  end

  def fetch_appointments
    get(APPOINTMENTS_PATH) || []
  end

  def create_appointment(payload)
    post(APPOINTMENTS_PATH, payload)
  end

  private

  def get(path)
    response = self.class.get(path, headers: @headers)
    handle_response(response)
  rescue => e
    Rails.logger.error("External API GET #{path} failed: #{e.message}")
    nil
  end

  def post(path, payload)
    response = self.class.post(path, body: payload.to_json, headers: @headers)
    handle_response(response)
  rescue => e
    Rails.logger.error("External API POST #{path} failed: #{e.message}")
    nil
  end

  def handle_response(response)
    if response.success?
      JSON.parse(response.body)
    else
      Rails.logger.error("External API Error: #{response.code} - #{response.body}")
      nil
    end
  end
end
  