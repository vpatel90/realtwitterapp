class ThoughtsController < ApplicationController
  def index
    @thoughts = Thought.all.order(created_at: :desc)
    respond_to do |format|
      format.html do
        @thoughts
      end
      format.json do
        render json: @thoughts.to_json(methods: [:time, :user_handle, :user_id])
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
