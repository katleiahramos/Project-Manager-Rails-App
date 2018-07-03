class TasksController < ApplicationController

  def index
    if params[:user_id]
      @user = User.find(params[:user_id])
      @tasks = @user.tasks
    else
      @tasks = Task.all
    end
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      redirect_to tasks_path
    else
      render :new
    end
  end

  def edit
    @task = Task.find(params[:id])
  end

  def update
    @task = Task.find(params[:id])

    if @task.update(task_params)

      redirect_to tasks_path
    else
      render :edit
    end

  end

  def complete
    @task = Task.find(params[:id])
    @task.update(completed: true)
    redirect_to user_tasks_path(current_user)
  end


  private

  def task_params
    params.require(:task).permit(:due_date, :description, :user_id, :project_id)
  end



end
