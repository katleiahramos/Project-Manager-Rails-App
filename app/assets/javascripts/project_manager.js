$(document).ready(function() {
  attachListeners();


});


const attachListeners = function() {
  $(function () {
    $(".task-more").on("click", function(){

      const id = $(this).data("id");
      showTask(id);
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
  // debugger
  // const taskID = id

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
      // add task listener here
      $(".task-more").on("click", function(){
        const id = $(this).data("id");
        showTask(id);
      })
      $(`#project-${projectId}`).find("form").get(0).reset()
      $(`#project-${projectId}`).find("form").find("input[type=submit]").removeAttr('disabled');
    })
  })

}



const buttonizeTask = function(name, taskId) {
  return  `<button type="button" class="task-more btn btn-light my-2" data-id="${taskId}" name="button" data-toggle="modal" data-target=".modal" >${name}</button>`
}
