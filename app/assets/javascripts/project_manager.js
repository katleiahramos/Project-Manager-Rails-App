$(document).ready(function() {
  attachListeners();
  renderProjects();
});

const projectTemplate = (projectId, projectName) => {
  return `
    <div class="col-sm-4 mb-3 ">
      <div id="project-${projectId}" class="col-md-12 bg-secondary pb-3 rounded">


      <button type="button" data-project-id="${projectId}" class="project-more btn btn-primary">${projectName}</button>

        <div class="tasks">

        </div>

        <div id="newTaskForm-${projectId}" class="collapse">

        </div>

      <button type="button" class="new-task btn btn-primary" data-project-id="${projectId}" data-toggle="collapse" data-target="#newTaskForm-${projectId}" aria-expanded="false" aria-controls="" >Add Task</button>
      </div>
    </div>
  `
}


const renderProjects = () => {
  $.get('/projects.json', function(projects){
    for(const i of projects){

      const projectHTML = projectTemplate(i.id, i.name)

      $('#projects').append(projectHTML)
      $(function() {
        $(".project-more").on("click", function(){

          const projectId = $(this).data("projectId");
          renderTasks(projectId);
        })
      })
      // append HTML to projects div
    }
  })
}

const renderTasks = (projectId) => {
  $.get(`/projects/${projectId}`, function(projectData){
    // should this be a for each?
    for(const i of projectData){
      const name = i.name;
      const taskId = i.id;

      const button = buttonizeTask(name, taskId);

      $(`#project-${projectId}`).find(".tasks").append(button);

      $(".task-more").on("click", function(){
        const id = $(this).data("id");
        showTask(id);
      })

    }
  })
}
const attachListeners = function() {
  $(function () {
    $(".task-more").on("click", function(){
      const id = $(this).data("id");
      showTask(id);
    })
  })

  $(function() {
    $(".project-more").on("click", function(){

      const projectId = $(this).data("projectId");
      renderTasks(projectId);
    })
  })

  $(function () {
    $(".new-task").on("click", function(){
      const projectId = $(this).data("project-id");
      showTaskForm(projectId)
    })
  })
}


const showTask = function (id) {

  $.get(`/tasks/${id}` ,function(taskData){
    // {id: 2, due_date: "2018-07-12T00:00:00.000Z", description: "Create command line design", user_id: 3, project_id: 3, …}
    let user = ""
    let formattedDueDate = ""

    if (taskData.due_date){
      const dueDate = new Date(taskData.due_date)
      formattedDueDate = dueDate.toDateString()
    }
    const name = taskData.name

    if (taskData.user) { user = taskData.user.username}

    // const modal = $(`#task-${taskData.id}`)
    $('.modal-title').html(name)
    $('.modal-body').html('Due Date: ' + formattedDueDate + "<br> Assign to: " + user)

  })
}


const showTaskForm = function(projectId) {
  const formTemplate =   `
    <form class="taskForm" action="/projects/${projectId}/tasks" method="POST" data-project-id="<%= project.id %>">
        <input type"text" name="task[name]" value="">
        <input type="submit">
    </form>`

  $(`#newTaskForm-${projectId}`).html(formTemplate);

  $('.taskForm').on('submit', function(event){
    event.preventDefault();
    const url = this.action
    const values = $(this).serialize();


    $.post(url, values).success(function(response){

      const name = response.name;
      const projectId = response.project.id
      const taskId = response.id
      const button = buttonizeTask(name, taskId);

      $(`#project-${projectId}`).find(".tasks").append(button);

      // add new event listener for new task
      $(".task-more").on("click", function(){
        const id = $(this).data("id");
        showTask(id);
      })

      // refresh form
      $(`#project-${projectId}`).find("form").get(0).reset()
      $(`#project-${projectId}`).find("form").find("input[type=submit]").removeAttr('disabled');
    })
  })
}

const buttonizeTask = function(name, taskId) {
  return  `<button type="button" class="task-more btn btn-light my-2" data-id="${taskId}" name="button" data-toggle="modal" data-target=".modal" >${name}</button>`
}
