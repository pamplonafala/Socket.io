var express = require('express');
var path = require('path');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

//defines route and sincronizes with directory
app.use('/public', express.static(path.join(__dirname, 'public')));

//defines a port
http.listen(port, function() {
	console.log('http://localhost:' + port + '/');
});

//route handler refactor, sends file to the homepage
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

//handles client connection
io.on('connection', function(socket) {
	console.log('User connected.');
	socket.broadcast.emit('info', 'User connected.');
	
	//handles cliend disconnection
	socket.on('disconnect', function () {
		console.log('User disconnected.');
		socket.broadcast.emit('info', 'User disconnected.');
	});
	
	//handles message event
	socket.on('message', function(msg) {
		io.emit('message', msg);
		console.log('msg: ' + msg);
	});
});