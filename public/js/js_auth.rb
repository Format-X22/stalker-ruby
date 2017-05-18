class JS_Auth

	def initialize
		@login_top      = Element['#login-top']
		@pass_top       = Element['#pass-top']
		@login_register = Element['#login-register']
		@pass_register  = Element['#pass-register']
		@mail_register  = Element['#mail-register']
		@login_modal    = Element['#login-modal']
		@pass_modal     = Element['#pass-modal']
		@sign_top       = Element['#sign-top']
		@sign_modal     = Element['#sign-modal']
		@register       = Element['#register']
		@preloader      = Element['#preloader']
		@error_modal    = Element['#error_modal']
		@error_body     = Element['#error_body']

		click @sign_top,   :sign_from_top
		click @sign_modal, :sign_from_modal
		click @register,   :register

		enter_key @login_top,      :sign_from_top
		enter_key @pass_top,       :sign_from_top
		enter_key @login_modal,    :sign_from_modal
		enter_key @pass_modal,     :sign_from_modal
		enter_key @login_register, :register
		enter_key @pass_register,  :register
		enter_key @mail_register,  :register

		change @login_top,      :validate_login
		change @pass_top,       :validate_pass
		change @login_modal,    :validate_login
		change @pass_modal,     :validate_pass
		change @login_register, :validate_login
		change @pass_register,  :validate_pass
		change @mail_register,  :validate_mail
	end

	def sign_from_top
		return unless validate_login(@login_top) or validate_pass(@pass_top)

		sign(@login_top, @pass_top) do
			to_profile
		end
	end

	def sign_from_modal
		return unless validate_login(@login_modal) or validate_pass(@pass_modal)

		sign(@login_modal, @pass_modal) do
			Element['#sign-modal'].modal('hide')
			to_profile
		end
	end

	def register_from_modal
		return unless validate_login(@login_register) or validate_pass(@pass_register) or validate_mail(@mail_register)

		register(@login_register, @pass_register, @mail_register) do
			Element['#register-modal'].modal('hide')
			to_profile
		end
	end

	def sign(login, pass, &callback)
		request = HTTP.post('/api/sign-in', payload: {
			login: login.value,
			pass:  pass.value
		})

		request.callback do |response|
			hide_preloader

			result = response.json

			if result.success
				callback.call
			else
				show_error_modal(result.message)
			end
		end

		handle_request_error(request)
	end

	def register(login, pass, mail)
		show_preloader

		HTTP.post('/api/register', payload: {
			login: login.value,
			pass:  pass.value,
			mail:  mail.value
		})

		request.callback do |response|
			hide_preloader

			result = response.json

			if result.success
				callback.call
			else
				show_error_modal(result.message)
			end
		end

		handle_request_error(request)
	end

	def handle_request_error(request)
		request.errback do |response|
			hide_preloader
			show_error_modal(response.message)
		end
	end

	def to_profile
		Window.location.href = '/profile'
	end

	def click(field, method_sym)
		field.on :click do
			self.send(method_sym, field)
		end
	end

	def enter_key(field, method_sym)
		field.on :keypress do |event|
			if event.which == 13
				self.send(method_sym, field)
			end
		end
	end

	def change(field, method_sym)
		field.on :change do
			self.send(method_sym, field)
		end
	end

	def validate_login(field)
		validate_field(field) do |value|
			value.length > 2 and value.length < 100
		end
	end

	def validate_pass(field)
		validate_field(field) do |value|
			value.length >= 8 && value.length < 100
		end
	end

	def validate_mail(field)
		validate_field(field) do |value|
			value.length >= 6 && value.length < 100
		end
	end

	def validate_field(field, &cond)
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
		@preloader.remove_class('hidden')
	end

	def hide_preloader
		@preloader.add_class('hidden')
	end

	def show_error_modal(text)
		if text == '' or text == nil
			text = 'Неизвестная ошибка...'
		end

		@error_body.html(text)
		@error_modal.modal('show')
	end

end