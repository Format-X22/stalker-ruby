require 'opal'
require 'jquery'
require 'opal-jquery'

require 'js_auth.rb'
require 'js_chat.rb'
require 'js_profile.rb'
require 'js_game.rb'

Document.ready? do
	JS_Chat.new
	JS_Auth.new

	case Window.location.href
		when /profile-page/
			JS_Profile.new
		when /game-page/
			JS_Game.new
	end
end