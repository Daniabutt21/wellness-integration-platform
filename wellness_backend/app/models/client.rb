class Client < ApplicationRecord
  has_many :appointments, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone_number, presence: true
  validates :external_id, presence: true, uniqueness: true

  # Map API data to model attributes and upsert
  def self.from_api(api_data)
    client = find_or_initialize_by(external_id: api_data["id"])
    client.name = api_data["name"]
    client.email = api_data["email"]
    client.phone_number = api_data["phone"]
    unless client.save
      Rails.logger.error("Failed to save client from API: #{client.errors.full_messages.join(", ")}")
    end
    client
  rescue => e
    Rails.logger.error("Exception in Client.from_api: #{e.message}")
    nil
  end
end
