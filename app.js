const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {}; 

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index')
})

io.on("connection", function (client) {  
    client.on("join", function(name){
    	console.log("Joined: " + name);
        clients[client.id] = name;
        client.emit("update", "Você se conectou ao servidor!");
        client.broadcast.emit("Informativo:", name + " entrou na sala.")
    });

    client.on("send", function(msg){
    	console.log("Message: " + msg);
        client.broadcast.emit("chat", clients[client.id], msg);
    });

    client.on("disconnect", function(){
    	console.log("Disconnect");
        io.emit("Informativo:", clients[client.id] + " saiu da sala.");
        delete clients[client.id];
    });
});


http.listen(3000, function(){
  console.log('Ouvindo na porta 3000');
});
