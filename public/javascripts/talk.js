var speech = new Speech({
	debugging: true,
	continuous: true,
	interimResults: true,
	autoRestart: true
});



speech
    .on('start', function () {
        console.log('started')
    })
    .on('end', function () {
        console.log('ended')
    })
    .on('error', function (event) {
        console.log(event.error)
    })
    .on('interimResult', function (msg) {
        //document.body.innerHTML = msg
    })
    .on('finalResult', function (msg) {
        //document.body.innerHTML = msg;
        query = msg;
        socket.emit('query', {command: msg});
        speak(msg);
    })
    .start()

