class UsersController < ApplicationController

  def new
    if logged_in
      redirect_to projects_path
      flash[:notice] = "You are already logged in."
    else
      @user = User.new
      render layout: false
    end
  end

  def create

    @user = User.new(user_params)

    if @user.save

      session[:user_id] = @user.id
      redirect_to projects_path
    else
      render :new, layout: false
    end

  end

  # def show
  #   @user = User.find_by(params[:id])
  #
  #   @tasks = @user.tasks
  # end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
