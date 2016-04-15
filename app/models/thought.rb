class Thought < ActiveRecord::Base
  belongs_to :user, counter_cache: true

  validates :body, presence: true

  validates :body, length: { in: 2..140 }

  def time
    "#{updated_at.strftime('%x')} on #{updated_at.strftime('%r')}"
  end

  def user_handle
    user.handle
  end

  def user_id
    user.id
  end

  def as_json(_ = nil)
    super(methods: [:time, :user_handle, :user_id])
  end
end
