class Api::V1::AppointmentsController < ApplicationController
  require 'securerandom'

  def index
    @appointments = Appointment.includes(:client).all
    render :index, format: :json
  rescue => e
    Rails.logger.error("Appointments#index error: #{e.message}")
    render json: { error: 'Failed to fetch appointments.' }, status: :internal_server_error
  end

  def create
    @appointment = Appointment.new(appointment_params)
    @appointment.external_id ||= SecureRandom.uuid
    if @appointment.save
      # Sync with external API (optional, but not required for frontend)
      service = ExternalApiService.new
      service.create_appointment({ client_id: @appointment.client.external_id, time: @appointment.scheduled_at.iso8601 })
      render :show, status: :created, format: :json
    else
      render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity
    end
  rescue => e
    Rails.logger.error("Appointments#create error: #{e.message}")
    render json: { error: 'Failed to create appointment.' }, status: :internal_server_error
  end

  def update
    @appointment = Appointment.find(params[:id])
    if @appointment.update(appointment_params)
      render :show, format: :json
    else
      render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity
    end
  rescue => e
    Rails.logger.error("Appointments#update error: #{e.message}")
    render json: { error: 'Failed to update appointment.' }, status: :internal_server_error
  end

  def destroy
    @appointment = Appointment.find(params[:id])
    @appointment.destroy
    head :no_content
  rescue => e
    Rails.logger.error("Appointments#destroy error: #{e.message}")
    render json: { error: 'Failed to delete appointment.' }, status: :internal_server_error
  end

  private

  def appointment_params
    params.require(:appointment).permit(:client_id, :scheduled_at, :notes, :external_id)
  end
end
