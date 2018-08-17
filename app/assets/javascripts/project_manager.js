$(document).ready(function() {
  attachListeners();
});


const attachListeners = function() {
  $('#testButton').on('click', () => testFunction())
}

const testFunction = function () {
  debugger
}
