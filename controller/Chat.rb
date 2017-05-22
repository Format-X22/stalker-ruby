require 'date'

post '/api/chat/message' do
	content_type :json
	check_session request

	user = User.find_by session: cookies[:session]
	bat_to = user.chat_ban_to

	if bat_to > Time.now.to_time.to_i
		failure "Вы не можете писать сообщения до #{Time.at(bat_to)}"
	end

	message = Message.new user: user.id, text: params['text']

	if message.valid?
		message.save!
		success
	else
		failure
	end
end

post '/api/chat/list' do
	content_type :json
	check_session request

	last = (params['last'] or 0).to_i
	ids = Message.arel_table[:id]

	if last == 0
		Message.last(30)
	end

	if last < Message.count - 300
		failure 'Запрошено слишком много сообщений'
	else
		cond = ids.gt(last + 1)

		success Message.where(cond).joins(:users).map do |message|
			#TODO
		end
	end
end

post '/api/chat/remove' do
	content_type :json
	check_session request

	user = User.find_by session: cookies[:session]

	if %w[mod admin].include? user.role
		Message.delete(params['id'].to_i)

		success
	else
		failure 'Недостаточно прав для удаления сообщения'
	end
end

post '/api/chat/ban' do
	content_type :json
	check_session request

	user = User.find_by session: cookies[:session]

	if %w[mod admin].include? user.role
		target = User.find_by id: params['id']

		Message.delete Message.where(id: target.id).map(:id)

		target.chat_ban_to = Time.now.to_time.to_i + 3.days
		target.save!

		success
	else
		failure 'Недостаточно прав для удаления сообщения'
	end
end