class ThoughtsController < ApplicationController
  def index
    @thoughts = Thought.all

  end

  def show
  end

  def new
  end

  def edit
  end
end
