class SessionsController < ApplicationController
  def new
    if logged_in
      redirect_to projects_path
      flash[:notice] = "You are already logged in."
    else
      @user = User.new
    end
  end

  def create
      if auth_hash
        #user signed in with omniauth
        @user = User.find_or_create_by_omniauth(auth_hash)

        session[:user_id] = @user.id
        #when user signs in they will see just their tasks and projects
        redirect_to projects_path

      else
      #regular sign in

        @user = User.find_by(email: params[:user][:email])

        #authenticate pw
        if @user && @user.authenticate(params[:user][:password])
          session[:user_id] = @user.id
          #when user signs in they will see just their tasks and projects
          redirect_to projects_path
        else
          #redirect to sign in page if authentificatin does not work

          redirect_to new_session_path
        end
      end

  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end

  private

  def auth_hash

    request.env['omniauth.auth']
  end

end
