class TasksController < ApplicationController
  before_action :require_login
  before_action :set_task, only: [:edit, :update, :destroy, :complete]



  def index
    if params[:user_id]
      if User.find(params[:user_id]) == current_user
        @user = User.find(params[:user_id])
        @tasks = @user.tasks
      else
        redirect_to projects_path
        flash[:notice] = "Unauthorized Access."
      end
    else
      @tasks = Task.all
    end
  end

  def indexCompleted
    @tasks = Task.completed_tasks
    render json: @tasks
  end

  def new
    if params[:user_id]
      @user = User.find(params[:user_id])
      @task = Task.new(user_id: @user.id)

    else
      @user = nil
      @task = Task.new
    end


  end

  # def create
  #   @task = Task.new(task_params)
  #
  #   if @task.save
  #      redirect_to projects_path
  #   else
  #     render :new
  #   end
  # end

  def create
    @project = Project.find(params[:project_id])
    @task = @project.tasks.build(task_params)
    @task.save
    render json: @task
  end

  def edit
    render layout: false
  end

  def show
    task = Task.find(params[:id])
    render json: task
  end

  def update
    if @task.update(task_params)
      render json: @task, status: 201
    else
      render :edit, layout: false, status: 400
    end

  end

  def complete
    @task.update(completed: true)
    render json: @task
  end

  def destroy
    @task.destroy
    redirect_to projects_path
  end


  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name,:due_date, :description, :user_id, :project_id)
  end

  def require_login
    return head(:forbidden) unless session.include? :user_id
  end


end
