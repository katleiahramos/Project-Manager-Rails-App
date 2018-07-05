class ProjectsController < ApplicationController

  def index
      @projects = Project.all
  end

  def show
    @project = Project.find_by(params[:id])
    @tasks = @project.tasks
  end

  def new 
    @project = Project.new
  end 

  def create 
    
    @project = Project.new(name: params[:project][:name])
    if @project.save 
      redirect_to projects_path 
    else 
      render :new 
    end 
  end 
end
