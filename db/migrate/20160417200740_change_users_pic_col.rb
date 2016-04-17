class ChangeUsersPicCol < ActiveRecord::Migration
  def change
    change_column :users, :pic, :string, default: "http://asthmaallergyclinic.in/wp-content/uploads/2014/05/no-profile-image.png"
  end
end
