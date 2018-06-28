class ProjectsController < ApplicationController

  def index
    if params[:user_id]
      @projects = User.find(params[:user_id]).projects
    else
      @projects = Project.all
    end

  end

  def show
    @project = Project.find_by(params[:id])
    @tasks = @project.tasks
  end
end
