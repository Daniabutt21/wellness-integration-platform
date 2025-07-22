json.array! @appointments do |appointment|
  json.id appointment.id
  json.client_id appointment.client_id
  json.scheduled_at appointment.scheduled_at
  json.notes appointment.notes
  json.client do
    client = appointment.client
    if client
      json.id client.id
      json.name client.name
      json.email client.email
      json.phone_number client.phone_number
    end
  end
end 