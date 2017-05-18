helpers do
	def session
		rand * rand * 1_000_000
	end

	def check_session(request)
		return true

		method = request.request_method
		path = request.path_info.to_sym

		unless $public_routes[path] == method
			p 'handle'

			#session check
		end
	end
end

post '/api/sign-in' do
	content_type :json

	check_session request

	model = User.find_by login: params['login'], pass: params['pass']

	if model
		key = session
		model.session = key
		model.save!

		cookies[:session] = key
		success
	else
		bad 'Не верный логин или пароль'
	end
end

post '/api/register' do
	content_type :json

	model = User.new login: params['login'], pass: params['pass'], mail: params['mail']

	if model.valid?
		model.save!
	else
		unless model.errors[:login].empty?
			bad 'Такой логин уже существует'
		end

		unless model.errors[:pass].empty?
			bad 'Что-то не так с паролем'
		end

		unless model.errors[:mail].empty?
			bad 'Эта почта уже зарегистрированна, либо с что-то не так с форматом почты'
		end

		bad 'Непредусмотренная ошибка'
	end

	success
end