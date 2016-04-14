class ChangeUsersBio < ActiveRecord::Migration
  def change
    remove_column :users, :bio
    add_column :users, :bio, :string
  end
end
