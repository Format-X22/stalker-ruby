get '/' do
	slim :main, layout: :root
end

get '/profile' do
	slim :profile, layout: :root
end