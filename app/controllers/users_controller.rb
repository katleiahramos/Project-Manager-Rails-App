class UsersController < ApplicationController


  def new

    @user = User.new
    render layout: false
  end

  def create

    @user = User.new(user_params)

    if @user.save

      session[:user_id] = @user.id
      redirect_to user_tasks_path(@user)
    else
      render :new, layout: false
    end

  end

  def show
    @user = User.find_by(params[:id])

    @tasks = @user.tasks
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end
