window.addEventListener("load", function(){
        document.getElementById('note-textarea').value = file_get_contents('/note.txt');

});


function file_get_contents(filename) {
       var request = new XMLHttpRequest();
       request.open("GET", filename, false);
       request.send(null);
       return request.responseText;
}

var socket = io();
var textarea = document.getElementById('note-textarea');

textarea.addEventListener('keyup', function(){
	socket.emit('note', this.value);
}, false);

socket.on('note', function(msg){
	textarea.value = msg;
});
document.getElementById('note-form').addEventListener('submit', function(){
    	
}, false);