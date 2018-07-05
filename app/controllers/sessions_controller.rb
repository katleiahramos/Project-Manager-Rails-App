class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create

    if auth
      #user signed in with omniauth
      @user = User.find_or_create_by(email: auth['email']) do |u|
         #u.name = auth['info']['name']
         u.email = auth['info']['email']
         #u.image = auth['info']['image']
       end


    else
    #regular sign in

      @user = User.find_by(email: params[:user][:email])
      
      #authenticate pw
      if @user && @user.authenticate(params[:user][:password])
        session[:user_id] = @user.id
        #when user signs in they will see just their tasks and projects
        redirect_to user_tasks_path(@user)
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

  def auth
    request.env['omniauth.auth']
  end
end
