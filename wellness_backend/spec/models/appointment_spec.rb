require 'rails_helper'

RSpec.describe Appointment, type: :model do
  let(:client) { Client.create!(name: 'Test', email: 'test@example.com', phone_number: '1234567890', external_id: 'ext-client') }

  it 'is valid with valid attributes' do
    appointment = Appointment.new(client: client, scheduled_at: Time.now, external_id: 'ext-appt-1')
    expect(appointment).to be_valid
  end

  it 'is invalid without a client' do
    appointment = Appointment.new(scheduled_at: Time.now, external_id: 'ext-appt-2')
    expect(appointment).not_to be_valid
  end

  it 'is invalid without scheduled_at' do
    appointment = Appointment.new(client: client, external_id: 'ext-appt-3')
    expect(appointment).not_to be_valid
  end
end 