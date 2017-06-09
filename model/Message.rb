class Message < ActiveRecord::Base
	belongs_to :user

	validates :user, presence: true
	validates :text, length: {in: 1..1000}, presence: true

	before_save :strip_message_html

	def strip_message_html
		self.text = self.text.gsub(/<("[^"]*"|'[^']*'|[^'">])*>/, '')
	end
end