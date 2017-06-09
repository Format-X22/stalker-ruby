require 'date'

post '/api/chat/message' do
	content_type :json
	check_session

	user = User.find_by session: cookies[:session]
	ban_to = user.chat_ban_to

	if ban_to and ban_to > Time.now
		failure "Вы не можете писать сообщения до #{Time.at(ban_to).strftime('%d.%m.%Y %H:%M:%S')}"
	end

	message = Message.new user_id: user.id.to_i, text: params[:text]

	if message.valid?
		message.save!
	else
		failure 'Сообщение не верного формата'
	end

	text = message.text

	if text[/^\/ban /]

		unless %w[mod admin].include? user.role
			failure 'Недостаточно прав'
		end

		login = text.split(' ')[1]

		target = User.find_by login: login

		unless target
			failure 'Такого пользователя не существует'
		end

		target.chat_ban_to = 3.days.from_now
		target.save!

		Message.new(user_id: 1, text: ">>> Пользователь #{login} забанен на 3 дня").save!
	end

	success
end

post '/api/chat/list' do
	content_type :json
	check_session

	count = Message.count
	last = (params[:last] or 0).to_i

	if last < Message.count - 30
		last = count - 30
	end

	cond = Message.arel_table[:id].gt(last)

	success Message.joins(:user).select(:id, :text, :login, :date).where(cond)
end