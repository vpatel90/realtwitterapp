class Conversation < ActiveRecord::Base
  belongs_to :responder, class_name: "Thought"
  belongs_to :initiator, class_name: "Thought"
end
