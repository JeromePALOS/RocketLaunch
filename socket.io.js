var webSocketServer = require('ws').Server;
var wss = new webSocketServer({ port: 8082 });

wss.on('connection', function(socket) {
  console.log('Opened connection');

  var json = JSON.stringify({ message: 'Gotcha' });
  socket.send(json);

  socket.on('message', function(message) {
    wss.clients.forEach(function each(client) {
      client.send(message);
      console.log(message);
    });
    
  });

  socket.on('close', function() {
    console.log('Closed Connection');
  });


});


