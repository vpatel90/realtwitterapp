class AddColToUsers < ActiveRecord::Migration
  def change
    add_column :users, :thoughts_count, :integer, default: 0
  end
end
