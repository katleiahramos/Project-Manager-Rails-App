class SessionsController < ApplicationController
  def new
    @user = User.new

  end

  def create
    @user = User.find_by(username: params[:user][:username])
    #authenticate pw
    if @user && user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      #redirect to sign in page if authentificatin does not work
      
      redirect_to new_session_path
    end
  end

  def destroy
  end
end
