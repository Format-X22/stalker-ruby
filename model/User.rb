class User < ActiveRecord::Base
	has_many :messages
	
	validates :login, length: {in: 2..100}, presence: true, uniqueness: true
	validates :pass,  length: {in: 8..100}, presence: true
	validates :mail,  length: {in: 6..100}, presence: true, uniqueness: true
	validates_format_of :mail, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end