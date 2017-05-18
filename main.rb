require 'slim'
require 'sinatra'
require 'sinatra/contrib'
require 'active_record'

require_relative 'model/User'
require_relative 'controller/Auth'
require_relative 'controller/Chat'
require_relative 'controller/Game'
require_relative 'controller/Io'
require_relative 'controller/Pages'
require_relative 'controller/Map'
require_relative 'controller/Shop'

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || 'postgres://localhost/stalker-ruby')

$public_routes = {
	'/': 'GET',
	'/api/chat': 'GET',
	'/api/sing-in': 'POST',
	'/api/pass': 'POST'
}