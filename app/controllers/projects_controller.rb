class ProjectsController < ApplicationController
  before_action :require_login
  before_action :set_project, only: [:show, :edit, :update, :destroy]

  def test
    projects = Project.all
    render json: projects
  end

  def index
    @projects = Project.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @projects}
    end
  end

  def show
    @tasks = @project.tasks
  end

  def new
    @project = Project.new
  end

  def create

    @project = Project.new(project_params)
    if @project.save
      redirect_to projects_path
    else
      render :new
    end
  end

  def edit

  end

  def update

    if @project.update(project_params)
      redirect_to projects_path
    else
      render :edit
    end
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    redirect_to projects_path
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require('project').permit(:name)
  end

  def require_login
    return head(:forbidden) unless session.include? :user_id
  end
end
