class ProjectsController < ApplicationController

  def index
      @projects = Project.all
  end

  def show
    @project = Project.find_by(params[:id])
    @tasks = @project.tasks
  end
end
