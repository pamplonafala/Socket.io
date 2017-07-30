var express = require('express');
var path = require('path');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.use('/public', express.static(path.join(__dirname, 'public')));

http.listen(port, function() {
	console.log('http://localhost:' + port + '/');
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('User connected.');
	socket.broadcast.emit('info', 'User connected.');
	socket.on('disconnect', function () {
		console.log('User disconnected.');
		socket.broadcast.emit('info', 'User disconnected.');
	});
	
	socket.on('message', function(msg) {
		io.emit('message', msg);
		console.log('msg: ' + msg);
	});
});