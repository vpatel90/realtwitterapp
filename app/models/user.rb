class User < ActiveRecord::Base
  has_many :thoughts

  has_secure_password

  validates :handle, :email, :password, presence: true
  validates :handle, :email, uniqueness: { case_sensitive: false }

end
