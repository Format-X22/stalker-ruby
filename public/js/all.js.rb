require 'opal'
require 'jquery'
require 'opal-jquery'

require 'js_auth.rb'

Document.ready? do
	JS_Auth.new
end