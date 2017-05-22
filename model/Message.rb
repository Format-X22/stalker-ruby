class Message < ActiveRecord::Base
	belongs_to :user

	validates :id, presence: true
	validates :text, length: {in: 1..1000}, presence: true
end