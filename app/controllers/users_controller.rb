class UsersController < ApplicationController
  def index
  end

  def show
    @user = User.find(params[:id])
    @thoughts = @user.thoughts.order(created_at: :DESC)
    respond_to do |format|
      format.html do


      end
      format.json do
        render json: @thoughts.to_json(methods: [:time, :user_handle])
      end
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = "Welcome to Chattr!"
      session[:user_id] = @user.id
      redirect_to root_path
    else
      flash[:alert] = "Something went wrong! Try again"
      render :new
    end
  end

  def edit
  end

  private

  def user_params
    params.require(:user).permit(:handle, :bio, :email, :password, :password_confirmation)
  end
end
