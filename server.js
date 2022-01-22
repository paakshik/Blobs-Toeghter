var serverPlayers = [];
var serverPlayerRadius = [];
var serverSnake = '';

var uuidv4 = require('uuid')
var express =require('express')
var socket =require('socket.io')
var app = express();
var server = app.listen('3000');
app.use(express.static('Public'));
var io = socket(server);

setInterval(heartbeat, 33);



function heartbeat() {
  io.sockets.emit('heartbeat', serverPlayers);
  io.sockets.emit('heartbeat2',serverPlayerRadius);
}

function serverSnakes(name,x,y,r,id){
this.x = x;
this.y = y;
this.r = r;
this.id = id;
this.name = name;
};

io.sockets.on('connection', newConnect);

function newConnect(socket){
console.log('We get a new connection');

socket.on('start', function(data) {
console.log(socket.id + ' ' + data.x + ' ' + data.y + ' ' + data.r);
    
var serverSnake = new serverSnakes(data.name,data.x, data.y, data.r,socket.id,data.dead);
serverPlayers.push(serverSnake);
serverPlayerRadius.push({id:serverSnake.id,r:serverSnake.r});
    });
    
socket.on('update', function(data) {
   var serverSnake;
for (var i = 0; i < serverPlayers.length; i++) {
if (socket.id == serverPlayers[i].id) {
serverSnake = serverPlayers[i];
}}
    
    serverSnake.x = data.x;
    serverSnake.y = data.y;
    serverSnake.r = data.r;
    serverSnake.name = data.name;
});
    
socket.on('update2', function(data) {
   var serverSnake;
      for (var i = 0; i < serverPlayerRadius.length; i++) {
           if (socket.id == serverPlayerRadius[i].id) {
           serverSnake = serverPlayerRadius[i];
}}
serverSnake.r = data.r;
});
    
socket.on('disconnect',function(){
console.log('Client has disconnected');
})
    
socket.on('Forcedisconnect', function(data) {
serverPlayers = serverPlayers.splice(data,1);
serverPlayerRadius = serverPlayerRadius.splice(data,1);
console.log(serverPlayers[data])
socket.disconnect();
});
}


  

