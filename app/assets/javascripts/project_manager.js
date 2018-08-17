$(document).ready(function() {
  attachListeners();
});


const attachListeners = function() {
  $('#testButton').on('click', () => testFunction())
}


const testFunction = function () {
  $.get('/projects/test', function(){
    debugger
  })
}
