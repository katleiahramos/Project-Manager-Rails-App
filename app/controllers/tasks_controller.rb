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


  private

  def task_params
    params.require(:task).permit(:due_date, :description, :user_id, :project_id)
  end



end
