class Api::V1::ClientsController < ApplicationController
  before_action :force_json

  def index
    @clients = Client.all
    render :index, format: :json
  rescue => e
    Rails.logger.error("Clients#index error: #{e.message}")
    render json: { error: 'Failed to fetch clients.' }, status: :internal_server_error
  end

  def search
    q = params[:search].to_s.strip
    @clients = if q.present?
      Client.where('name ILIKE :q OR email ILIKE :q OR phone_number ILIKE :q', q: "%#{q}%")
    else
      Client.none
    end
    render :index, format: :json
  rescue => e
    Rails.logger.error("Clients#search error: #{e.message}")
    render json: { error: 'Failed to search clients.' }, status: :internal_server_error
  end

  private

  def force_json
    request.format = :json
  end
end
