helpers do
	def session
		rand * rand * 1_000_000
	end

	def check_session(request)
		# TODO
	end
end

post '/api/auth/sign' do
	content_type :json

	model = User.find_by login: params['login'], pass: params['pass']

	if model
		key = session
		model.session = key
		model.save!

		cookies[:session] = key
		success
	else
		failure 'Не верный логин или пароль'
	end
end

post '/api/auth/out' do
	content_type :json

	key = cookies[:session]

	if key == nil or key.length == 0
		failure 'Не верный ключ сессии'
	end

	model = User.find_by session: cookies[:session]

	if model
		key = ''
		model.session = key
		model.save!

		cookies[:session] = key
		success
	else
		failure 'Ваша сессия была завершена ранее'
	end
end

post '/api/auth/register' do
	content_type :json

	model = User.new login: params['login'], pass: params['pass'], mail: params['mail']

	if model.valid?
		model.save!
	else
		unless model.errors[:login].empty?
			failure 'Такой логин уже существует'
		end

		unless model.errors[:pass].empty?
			failure 'Что-то не так с паролем'
		end

		unless model.errors[:mail].empty?
			failure 'Эта почта уже зарегистрированна, либо с что-то не так с форматом почты'
		end

		failure
	end

	success
end