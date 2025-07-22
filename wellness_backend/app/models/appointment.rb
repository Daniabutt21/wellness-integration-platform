class Appointment < ApplicationRecord
  belongs_to :client

  validates :client, presence: true
  validates :scheduled_at, presence: true
  validates :external_id, presence: true, uniqueness: true

  # Map API data to model attributes and upsert
  def self.from_api(api_data)
    client = Client.find_by(external_id: api_data["client_id"])
    return unless client
    appointment = find_or_initialize_by(external_id: api_data["id"])
    appointment.client_id = client.id
    appointment.scheduled_at = api_data["time"]
    unless appointment.save
      Rails.logger.error("Failed to save appointment from API: #{appointment.errors.full_messages.join(", ")}")
    end
    appointment
  rescue => e
    Rails.logger.error("Exception in Appointment.from_api: #{e.message}")
    nil
  end
end
