$(document).ready(function() {
  attachListeners();
  renderCompletedTasks();
});

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

  $(function () {
    $('#add-project').on('click', function(){
      createProject();
    })
  })

  $(function() {
    $('.projectDelete').on('click', function(event){
      const projectId = $(this).data("project-id");
      $.ajax({
        url: `projects/${projectId}`,
        type: 'DELETE'
      }).success(function(){
        location.reload();
      })
    })
  })


}

/////////////// JS Model Object //////////////

function Task(name, description, dueDate, user) {
  this.name = name;
  this.description = description;
  this.dueDate = dueDate;
  this.user = user;
}

Task.prototype.format = function(){
  return `
   <p>Description: ${this.description}</p>
   <p>Due Date: ${this.dueDate}
   <p>Assigned To: ${this.user}</p>
  `
}

/////////////////// PROJECT JS //////////////////////////



const createProject = function() {
  // show project form
  $.get('/projects/new',function(projectForm){
    $('#newProjectForm').html('<br>' + projectForm)

    $('#new_project').submit(function(event){
      event.preventDefault()
      const url = this.action;
      const values = $(this).serialize();
          // save project
      $.post(url, values).success(function(projectData){
        const projectId = projectData.id
        const projectName = projectData.name

        // refresh form
        $(`#newProjectForm`).find("form").get(0).reset()
        $(`#newProjectForm`).find("form").find("input[type=submit]").removeAttr('disabled');

        const projectHTML = projectTemplate(projectId, projectName)

            // render project
        $('#project-tiles').append(projectHTML)

          $(".new-task").on("click", function(){
            const projectId = $(this).data("project-id");
            showTaskForm(projectId)
          })

          $('.projectDelete').on('click', function(event){
            const projectId = $(this).data("project-id");
            $.ajax({
              url: `projects/${projectId}`,
              type: 'DELETE'
            }).success(function(){
              location.reload();
            })
          })

      })




    })
  })



}

const projectTemplate = (projectId, projectName) => {
  return `
  <div class="col-sm-3 mb-3 ">
    <div id="project-${projectId}" class="col-md-12 bg-secondary pb-3 rounded">

      <br><div class="btn-group">
        <button type="button" data-project-id="<%= project.id %>" class="project-more btn btn-secondary text-center py-3 rounded btn" data-toggle="collapse" data-target="#project-${projectId}-tasks">${projectName}</button>

        <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuReference">
          <a class="dropdown-item" href="#">Edit Project</a>
          <a class="projectDelete dropdown-item" data-project-id="${projectId}" href="#">Delete Project</a>
        </div>
      </div>

      <div id="project-${projectId}-tasks" class="tasks">
      </div>

      <div id="newTaskForm-${projectId}" class="collapse">
      </div>

    <br><button type="button" class="new-task btn btn-outline-light m-1" data-project-id="${projectId}" data-toggle="collapse" data-target="#newTaskForm-${projectId}" aria-expanded="false" aria-controls="" >+ Add Task</button>

    <!-- <button type="button" class="projectDelete btn btn-warning" data-project-id="${projectId}">Delete Project</button> -->
    </div>
  </div>
  `
}


// const renderProjects = () => {
//   $.get('/projects.json', function(projects){
//     for(const i of projects){
//
//       const projectHTML = projectTemplate(i.id, i.name)
//
//       $('#projects').append(projectHTML)
//       $(function() {
//         $(".project-more").on("click", function(){
//
//           const projectId = $(this).data("projectId");
//           renderTasks(projectId);
//         })
//       })
//       // append HTML to projects div
//     }
//   })
// }

/////////////////////////// TASK JS ////////////////////////////////




const renderCompletedTasks = () => {
  // get all completed tasks
  $.get('/tasks/indexCompleted', function(tasks){

    let tasksHTML = ""
    for(const task of tasks){
      tasksHTML += buttonizeTask(task.name, task.id)
    }

    // append them to completed-tasks div
    $('#completed-tasks').html(`<h4 class="text-light"> Completed Tasks</h4>` + tasksHTML)
    // attachListeners
    $(".task-more").on("click", function(){
      const id = $(this).data("id");
      showTask(id);
    })

  })

}

const renderTasks = (projectId) => {
  $.get(`/projects/${projectId}/tasks`, function(projectData){

    let tasksHTML = ""
    for(const i of projectData){
      if(i.completed == false){
      const name = i.name;
      const taskId = i.id;
      const button = buttonizeTask(name, taskId);

      tasksHTML += button
      }
    }
    $(`#project-${projectId}`).find(".tasks").html(tasksHTML);
    $(".task-more").on("click", function(){
      const id = $(this).data("id");
      showTask(id);
    })
  })
}

const showTask = function (id) {

  $.get(`/tasks/${id}` ,function(taskData){
    const name = taskData.name
    let user = ""
    let formattedDueDate = ""
    let description = ""
    let editButton = ""
    let completeButton = ""
    let formattedDateCompleted = ""

    if (taskData.due_date){
      const dueDate = new Date(taskData.due_date)
      formattedDueDate = dueDate.toDateString()
    }
    if (taskData.user) { user = taskData.user.username}
    if (taskData.description) {description = taskData.description}
    if (taskData.date_completed !== null ) {
      const dateCompleted = new Date(taskData.date_completed)

      formattedDateCompleted = '<p>Date Completed: ' + dateCompleted.toDateString() + "<br>"}
    if (!taskData.completed){
    editButton = `<button type="button" id="edit-task" class="btn btn-primary" data-task-id="${taskData.id}">Edit Task</button>`


    completeButton = `<button type="button" id="complete-task" class="btn btn-primary mx-2" data-task-id="${taskData.id}">Mark as Complete</button>`}

    const deleteButton = `<button type="button" id="delete-task" class="btn btn-primary" data-task-id="${taskData.id}">Delete Task</button>`

    const task = new Task(name, description, formattedDueDate, user)

    const taskHTML = task.format()


    $('.modal-title').html(name)
    $('.modal-body').html(taskHTML + formattedDateCompleted + editButton + completeButton + deleteButton)

    $('#edit-task').on("click", function(){
      editTask($(this).data("taskId"));
    })

    $('#complete-task').on('click', function(){
      completeTask($(this).data("taskId"))
    })

    $('#delete-task').on('click', function(){
      deleteTask($(this).data("taskId"))
    })
  })
}

const deleteTask = (taskId) => {
  if(confirm('Are you sure you want to delete this?')){
    $.ajax({
      url: `tasks/${taskId}`,
      type: 'DELETE'
    }).success(function(){
      location.reload();
    })
  }
}

const completeTask = (taskId) => {
  // go to route taks#complete route
    $.get(`/tasks/${taskId}/complete`).success(function(){
      location.reload();
    })
}



const editTask = (taskId) => {

  $.get(`/tasks/${taskId}/edit`, function(response){
    $('.modal-body').html(response)

    $('.edit_task').on('submit', function(event){
      event.preventDefault();
      const url = this.action;
      const values = $(this).serialize();
      updateTask(url, values);
    })
  })
}

const updateTask = (url, values) => {
  $.ajax({
    type: 'PATCH',
    url: url,
    data: values,
    success: function(response){
      showTask(response.id)},
    error: function(response){
      $('.modal-body').html(response.responseText)

      $('.edit_task').on('submit', function(event){
        event.preventDefault();
        const url = this.action;
        const values = $(this).serialize();
        updateTask(url, values);
      })
    }
  })
}


const showTaskForm = function(projectId) {
  const formTemplate =   `
  <br>
    <form class="taskForm" action="/projects/${projectId}/tasks" method="POST" data-project-id="<%= project.id %>">
      <div class="form-row">
        <div class="col-6 mb-2">
          <input class="form-control" type"text" name="task[name]" placeholder="Task Name">
        </div>
        <div class="col-2 ">
          <input class="btn btn-primary" type="submit">
        </div>
      </div>
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
  return  `<button type="button" id='task-${taskId}' class="task-more  btn btn-light btn-block m-1" data-id="${taskId}" name="button" data-toggle="modal" data-target=".modal" >${name}</button>`
}
