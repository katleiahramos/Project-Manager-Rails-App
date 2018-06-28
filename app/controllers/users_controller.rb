class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    
  end

  def show
    @user = User.find_by(params[:id])
    @tasks = @user.tasks
  end
end
