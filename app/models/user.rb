class User < ActiveRecord::Base
  has_many :thoughts

  has_secure_password
end
