class StaticController < ApplicationController
layout 'sessions'
def welcome
  if logged_in
    redirect_to projects_path
    flash[:notice] = "You are already logged in."
  end
  #render layout: false
end
end
