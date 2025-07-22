require 'rails_helper'

RSpec.describe Client, type: :model do
  it 'is valid with valid attributes' do
    client = Client.new(name: 'Test', email: 'test@example.com', phone_number: '1234567890', external_id: 'ext-1')
    expect(client).to be_valid
  end

  it 'is invalid without a name' do
    client = Client.new(email: 'test@example.com', phone_number: '1234567890', external_id: 'ext-2')
    expect(client).not_to be_valid
  end

  it 'is invalid without an email' do
    client = Client.new(name: 'Test', phone_number: '1234567890', external_id: 'ext-3')
    expect(client).not_to be_valid
  end

  it 'is invalid with an invalid email' do
    client = Client.new(name: 'Test', email: 'bad', phone_number: '1234567890', external_id: 'ext-4')
    expect(client).not_to be_valid
  end

  it 'is invalid without a phone_number' do
    client = Client.new(name: 'Test', email: 'test@example.com', external_id: 'ext-5')
    expect(client).not_to be_valid
  end
end 