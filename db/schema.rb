# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160418122433) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "conversations", force: :cascade do |t|
    t.integer  "initiator_id"
    t.integer  "responder_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "conversations", ["initiator_id", "responder_id"], name: "index_conversations_on_initiator_id_and_responder_id", unique: true, using: :btree
  add_index "conversations", ["initiator_id"], name: "index_conversations_on_initiator_id", using: :btree
  add_index "conversations", ["responder_id"], name: "index_conversations_on_responder_id", using: :btree

  create_table "relationships", force: :cascade do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "relationships", ["followed_id"], name: "index_relationships_on_followed_id", using: :btree
  add_index "relationships", ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true, using: :btree
  add_index "relationships", ["follower_id"], name: "index_relationships_on_follower_id", using: :btree

  create_table "thoughts", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "thoughts", ["user_id"], name: "index_thoughts_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "handle",                                                                                                    null: false
    t.string   "email",                                                                                                     null: false
    t.string   "password_digest",                                                                                           null: false
    t.datetime "created_at",                                                                                                null: false
    t.datetime "updated_at",                                                                                                null: false
    t.string   "bio"
    t.integer  "thoughts_count",  default: 0
    t.boolean  "admin",           default: false
    t.string   "pic",             default: "http://asthmaallergyclinic.in/wp-content/uploads/2014/05/no-profile-image.png"
  end

  add_foreign_key "thoughts", "users"
end
