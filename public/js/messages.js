//connects with server
var socket = io();

//submits form and emits message event
$('form').submit(function() {
	socket.emit('message', $('#text').val());
	$('#text').val('');
	return false;
});

//handles message events
socket.on('message', function(msg){
	$('#messages').append($('<li>').text(msg));
});

//handles info events
socket.on('info', function(info){
	$('#messages').append($('<li>').text(info));
});