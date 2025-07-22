require 'sidekiq'
require 'sidekiq-scheduler'

Sidekiq.configure_server do |config|
  Sidekiq::Scheduler.dynamic = true
  config.on(:startup) do
    schedule_file = File.expand_path('../../sidekiq.yml', __FILE__)
    if File.exist?(schedule_file)
      Sidekiq.schedule = YAML.load_file(schedule_file)[:schedule]
      Sidekiq::Scheduler.reload_schedule!
    end
  end
end

Sidekiq.configure_client do |config|
  # Client configuration if needed
end 
