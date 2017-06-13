require 'slim'
require 'sinatra'
require 'sinatra/contrib'
require 'active_record'
require 'active_support/all'

require_relative 'model/User'
require_relative 'model/Message'
require_relative 'controller/Auth'
require_relative 'controller/Chat'
require_relative 'controller/Profile'
require_relative 'controller/Game'

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || 'postgres://localhost/stalker-ruby')

helpers do
	def page(path)
		File.read "views/#{path}-page.html"
	end

	def success(data = {})
		halt 200, {success: true, data: data}.to_json
	end

	def failure(message='Неизвестная ошибка')
		halt 200, {success: false, message: message}.to_json
	end
end


get '/' do
	page 'main'
end

get '/news' do
	page 'news'
end

get '/respect' do
	page 'respect'
end

get '/profile' do
	page 'profile'
end

get '/game' do
	page 'game'
end