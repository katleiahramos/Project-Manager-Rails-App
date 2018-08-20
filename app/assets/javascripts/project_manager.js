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
    $(`#task-${taskData.id}`).html( formattedDueDate + "<br>" + user )
    // $(`#task-${taskData.id}`).html("TESTING")


  })
}
