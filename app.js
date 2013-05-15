
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);
var io = require('socket.io').listen(server);

//io.set('transports', ['xhr-polling']);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function(socket){

  socket.broadcast.emit("new connection", {data: "none"});

	socket.emit('success', {log: "You have connected"});

	socket.on('query', function (data){
		console.log(data.command);
    //socket.broadcast.emit('command', {command: data.command});
    if (data.command == "light") socket.broadcast.emit('strobe', {time: 10});
    if (data.command == "turn off") socket.broadcast.emit('turn off', null);

	});

});