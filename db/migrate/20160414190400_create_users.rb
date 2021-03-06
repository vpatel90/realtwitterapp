class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :handle, null: false
      t.string :bio, null: false
      t.string :email, null: false
      t.string :password_digest, null: false

      t.timestamps null: false
    end
  end
end
