var socket = io.connect('http://testjarvis.jit.su/');
var query = "";

socket.on('success', function (data) {

	console.log(data.log);

});

socket.on('new connection', function (data){

	console.log("New connection detected");

});

socket.on('command', function (data) {

	console.log("Command: " + data.command);

});