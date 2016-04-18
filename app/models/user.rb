class User < ActiveRecord::Base
  has_many :thoughts
  has_many :active_relationships, class_name:  "Relationship",
                                foreign_key: "follower_id",
                                dependent:   :destroy
  has_many :passive_relationships, class_name:  "Relationship",
                               foreign_key: "followed_id",
                               dependent:   :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower

  has_secure_password

  validates :handle, :email, presence: true
  validates :handle, :email, uniqueness: { case_sensitive: false }

  def following_count
    following.count
  end

  def followers_count
    followers.count
  end

  def following?(other_user)
    following.include?(other_user)
  end

  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  def as_json(_ = nil)
    super(methods: [:following_count, :followers_count])
  end
end
