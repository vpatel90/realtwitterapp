class Thought < ActiveRecord::Base
  belongs_to :user

  def time
    "#{updated_at.strftime('%x')} on #{updated_at.strftime('%r')}"
  end
end
