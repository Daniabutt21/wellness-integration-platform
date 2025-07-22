class SyncExternalDataJob < ApplicationJob
  queue_as :default

  def perform
    service = ExternalApiService.new
    begin
      # Sync clients
      clients = service.fetch_clients
      if clients.present?
        clients.each { |client_data| Client.from_api(client_data) }
      else
        Rails.logger.warn("No clients fetched from external API.")
      end
    rescue => e
      Rails.logger.error("Error syncing clients: #{e.message}")
    end

    begin
      # Sync appointments
      appointments = service.fetch_appointments
      if appointments.present?
        appointments.each { |appointment_data| Appointment.from_api(appointment_data) }
      else
        Rails.logger.warn("No appointments fetched from external API.")
      end
    rescue => e
      Rails.logger.error("Error syncing appointments: #{e.message}")
    end
  end
end 