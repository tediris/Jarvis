var socket = io.connect('http://jarvis-tediris.rhcloud.com/');
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