json.array! @clients do |client|
  json.id client.id
  json.name client.name
  json.email client.email
  json.phone_number client.phone_number
end 