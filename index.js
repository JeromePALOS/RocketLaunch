var express = require('express');
var app = express();
var http = require('http').Server(app);
const PORT = process.env.PORT || 8200;

var server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});



const io = require('socket.io')(server);




var rpio = require('rpio');



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

  res.redirect('/');
});

io.on('connection', function(socket){
  	socket.on('chat message', function(msg){
    		io.emit('chat message', msg);
  	});
	socket.on('note', function(msg){
    		io.emit('note', msg);
  	});
	
	socket.on('launch', function(code){
    		console.log(code);
		if(code == "1607"){
			rpio.init({mapping: 'gpio'});
			rpio.open(4, 1);
			io.emit('launch', 'Launch');
			//rpio.sleep(10);
			//rpio.open(4, 0);
			
			
			setTimeout(function(){rpio.open(4, 0)}, 5000);
		}else{
			rpio.init({mapping: 'gpio'});
			rpio.open(4, 0);	
		}
  	});
	
	
});




