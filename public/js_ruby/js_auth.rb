class JS_Auth

	def initialize
		_ = Element

		@login_top      = _['#login-top']
		@pass_top       = _['#pass-top']
		@sign_top       = _['#sign-top']

		@login_modal    = _['#login-modal']
		@pass_modal     = _['#pass-modal']
		@sign_modal     = _['#sign-modal']
		@sign_window    = _['#sign-window']

		@login_register  = _['#login-register']
		@pass_register   = _['#pass-register']
		@mail_register   = _['#mail-register']
		@register        = _['#register']
		@register_window = _['#register-window']

		@loader         = _['#loader']
		@error_modal    = _['#error_modal']
		@error_body     = _['#error_body']

		click     @sign_top,   :sign_from_top
		actions   @login_top,  :validate_login, :sign_from_top
		actions   @pass_top,   :validate_pass,  :sign_from_top

		click   @sign_modal,  :sign_from_modal
		actions @login_modal, :validate_login, :sign_from_modal
		actions @pass_modal,  :validate_pass,  :sign_from_modal

		click   @register,       :register
		actions @login_register, :validate_login, :register
		actions @pass_register,  :validate_pass,  :register
		actions @mail_register,  :validate_mail,  :register
	end

	def sign_from_top
		if validate_sign
			sign(@login_top, @pass_top) do
				to_profile
			end
		end
	end

	def sign_from_modal
		if validate_sign_modal
			sign(@login_modal, @pass_modal) do
				@sign_window.modal('hide')
				to_profile
			end
		end
	end

	def register_from_modal
		if validate_register
			register(@login_register, @pass_register, @mail_register) do
				@register_window.modal('hide')
				to_profile
			end
		end
	end

	def sign(login, pass, &callback)
		auth_action({
			login: login.value,
			pass:  pass.value
		}, callback)
	end

	def register(login, pass, mail)
		auth_action({
			login: login.value,
			pass:  pass.value,
			mail:  mail.value
		}, callback)
	end

	def auth_action(data, callback)
		show_preloader

		request = HTTP.post('/api/register', payload: data)

		request.callback do |response|
			hide_preloader

			result = response.json

			if result.success
				callback.call
			else
				show_error_modal(result.message)
			end
		end

		request.errback do |response|
			hide_preloader
			show_error_modal(response.message)
		end
	end

	def to_profile
		Window.location.href = '/profile'
	end

	def actions(field, on_change, on_enter)
		field.on :change do
			self.send(on_change, field)
		end

		field.on :keypress do |event|
			if event.which == 13
				self.send(on_enter, field)
			end
		end
	end

	def click(field, method_sym)
		field.on :click do
			self.send(method_sym, field)
		end
	end

	def validate_sign
		validate_login(@login_top) and validate_pass(@pass_top)
	end

	def validate_sign_modal
		validate_login(@login_modal) and validate_pass(@pass_modal)
	end

	def validate_register
		validate_login(@login_register) and validate_pass(@pass_register) and validate_mail(@mail_register)
	end

	def validate_login(field)
		validate(field) do |value|
			(2..100) === value.length
		end
	end

	def validate_pass(field)
		validate(field) do |value|
			(8..100) === value.length
		end
	end

	def validate_mail(field)
		validate(field) do |value|
			(6..100) === value.length
		end
	end

	def validate(field, &cond)
		value = field.value
		wrap = field.parent('.form-group')
		feedback = wrap.children('.form-control-feedback')

		if cond.call(value)
			feedback.add_class('hidden')
			wrap.remove_class('has-error')
			wrap.remove_class('has-feedback')
			true
		else
			wrap.add_class('has-error')
			wrap.add_class('has-feedback')
			feedback.remove_class('hidden')
			false
		end
	end

	def show_preloader
		@loader.remove_class('hidden')
	end

	def hide_preloader
		@loader.add_class('hidden')
	end

	def show_error_modal(text)
		if text == '' or text == nil
			text = 'Неизвестная ошибка...'
		end

		@error_body.html(text)
		@error_modal.modal('show')
	end

end