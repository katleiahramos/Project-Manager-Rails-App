$(document).ready(function() {
  attachListeners();
});


const attachListeners = function() {
  $('#testButton').on('click', () => testFunction(2))
}


const testFunction = function (id) {
  const taskID = id
  $.get('/tasks/test', {id: taskID} ,function(taskData){
    // {id: 2, due_date: "2018-07-12T00:00:00.000Z", description: "Create command line design", user_id: 3, project_id: 3, …}
  })
}
