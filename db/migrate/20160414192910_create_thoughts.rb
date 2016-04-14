class CreateThoughts < ActiveRecord::Migration
  def change
    create_table :thoughts do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.string :body, null: false

      t.timestamps null: false
    end
  end
end
