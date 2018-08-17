class UsersController < ApplicationController


  def most_projects
    @user = User.most_projects
  end


  def new
    if logged_in
      redirect_to projects_path
      flash[:notice] = "You are already logged in."
    else
      @user = User.new
      render layout: 'sessions'
    end
  end

  def create

    @user = User.new(user_params)

    if @user.save

      session[:user_id] = @user.id
      redirect_to projects_path
    else
      render :new, layout: 'sessions'
    end

  end

  def show
    @user = User.find(params[:id])
    render json: @user
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
