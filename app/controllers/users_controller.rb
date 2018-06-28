class UsersController < ApplicationController

  def show
    @user = User.find_by(params[:id])
    @tasks = @user.tasks
  end
end
