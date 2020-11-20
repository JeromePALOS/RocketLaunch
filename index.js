var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8200;

var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');

app.use(express.static(__dirname));
app.use(express.urlencoded({
  extended: true
}))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/vue/rocket.html');
});
app.get('/tchat', function(req, res){
  res.sendFile(__dirname + '/vue/tchat.html');
});
app.get('/rocket', function(req, res){
  res.sendFile(__dirname + '/vue/rocket.html');
});
app.post('/rocket/note/save/', function(req, res){

	var fs = require('fs');
	fs.writeFile('note.txt', req.body.noteTextarea, function (err) {
	  if (err) return console.log('/rocket/note/save/ : ' + err);
	  console.log('/rocket/note/save/ : ' + req.body.noteTextarea +' > modif note.txt');
	});

  res.sendFile(__dirname + '/vue/rocket.html');
});

io.on('connection', function(socket){
  	socket.on('chat message', function(msg){
    		io.emit('chat message', msg);
  	});
	socket.on('note', function(msg){
    		io.emit('note', msg);
  	});
});

app.post('/rocket/launch/', function(req, res){
	if(req.body.launchCode == "1607"){
		if (LED.readSync() === 0) { 
			io.emit('launch', 'Lancement !!!');
    			LED.writeSync(1); 
			
			console.log('/rocket/launch/ : feu');
  		} 
		LED.unexport();
	}
	res.sendFile(__dirname + '/vue/rocket.html');
	
});



http.listen(port, function(){
  console.log('listening on *:' + port);
});
