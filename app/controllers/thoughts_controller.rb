class ThoughtsController < ApplicationController
  def index
    @top_users = User.all.order(thoughts_count: :desc).limit(10)
    @thoughts = Thought.all.order(created_at: :desc)
    respond_to do |format|
      format.html do
        @thoughts
      end
      format.json do

        render json: { thoughts: @thoughts,
                        top_users: @top_users }
      end

    end
  end

  def show
  end

  def create
    @thought = current_user.thoughts.build(body: params[:body])
    if @thought.save
      flash[:notice] = "Welcome to Chattr!"
      redirect_to root_path
    else
      flash[:alert] = "Something went wrong! Try again"
      render :new
    end
  end

  def edit
  end

  private

end
