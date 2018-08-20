$(document).ready(function() {
  attachListeners();
});


const attachListeners = function() {
  $('#testButton').on('click', () => testFunction(2))
}


const showTask = function (id) {
  // debugger
  // const taskID = id
  $.get(`/tasks/${id}` ,function(taskData){
    // {id: 2, due_date: "2018-07-12T00:00:00.000Z", description: "Create command line design", user_id: 3, project_id: 3, …}
    const dueDate = new Date(taskData.due_date)
    const formattedDueDate = dueDate.toDateString()
    const description = taskData.description
    const user = taskData.user.username

    const modal = $(`#task-${taskData.id}`)
    //
    modal.find('.modal-title').html(description)
    modal.find('.modal-body').html(formattedDueDate + "<br>" + user)

    //
    // $(`#task-${taskData.id}`).html( formattedDueDate + "<br>" + user )
    // // $(`#task-${taskData.id}`).html("TESTING")


  })
}

const showTaskForm = function(projectId) {
  const formTemplate =   "<form class="+'"taskForm"'+ "><input id=" + '"description"' + " type=" + '"text" '+ " name=" + '"description"' + " value=" + '"description" '+ "><input type=" + '"submit"' + "><button type=" + '"button "'+ " name=" + '"cancel"' + ">Cancel</button></form>"



  // const formTemplate =  "<form class=" + "'taskForm-<%= project.id %>'" + " onsubmit=" + "'postTask(); return false;'" + "><input id=" + "'description'" + " type=" + "'text'" + " name=" + "'description'" + " value=" + "'description'" + "><input type=" + "'submit'" + "></form>"

  $(`#newTaskForm-${projectId}`).html(formTemplate);
}

// $(`#taskForm-${projectId}`).submit(function(event) {
//   event.preventDefault();
//   debugger
//   const values = $(this).serialize()
// })

const postTask = function() {
  const values = $(this).serialize()
  debugger
}

const newTask = function(projectId) {
  // render new task form
  $(`#project-${projectId}`).find('#newTaskForm').html("testing")

  $.post('/tasks', function(taskData){

  })
}

$(function() {
  $("#new_task").on("submit", function(event){
    event.preventDefault();
    const url = this.action

    const values = $(this).serialize()

    $.post(url, values).success(function(response){
      const description = response.description;
      const projectId = response.project.id
      $(`#project-${projectId}`).find(".tasks").append(description)
    })
  })
  // $("form").submit(function(event) {
  //   event.preventDefault();
  //   debugger
  //   const values = $(this).serialize()
  //
  // })
  // $("form").on('submit',function(event) {
  //   event.preventDefault();
  //
  //
  // })

})
