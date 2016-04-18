class Thought < ActiveRecord::Base
  belongs_to :user, counter_cache: true

  has_many :active_conversations, class_name:  "Conversation",
                                foreign_key: "responder_id"

  has_many :parent, through: :active_conversations, source: :initiator
  has_many :passive_conversations, class_name: "Conversation", foreign_key: "initiator_id"
  has_many :responses, through: :passive_conversations, source: :responder


  validates :body, presence: true

  validates :body, length: { in: 2..140 }

  def time
    "#{created_at.strftime('%r')} on #{created_at.strftime('%x')}"
  end

  def user_pic
    user.pic
  end

  def user_handle
    user.handle
  end

  def user_id
    user.id
  end

  def responses_count
    responses.count
  end

  def parent_id
    if parent.first
      parent.first.id
    else
      nil
    end
  end

  def as_json(_ = nil)
    super(methods: [:time, :user_handle, :user_id, :user_pic, :responses_count, :parent_id])
  end
end
