helpers do
	def success
		halt 200, {success: true}.to_json
	end

	def bad(message='')
		halt 200, {success: false, message: message}.to_json
	end
end