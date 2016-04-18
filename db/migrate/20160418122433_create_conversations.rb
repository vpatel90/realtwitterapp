class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.integer :initiator_id
      t.integer :responder_id

      t.timestamps null: false
    end
    add_index :conversations, :initiator_id
    add_index :conversations, :responder_id
    add_index :conversations, [:initiator_id, :responder_id], unique: true
  end
end
