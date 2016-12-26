const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',function(socket){

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
    console.log('New user connected');
    socket.on('createMessage',(message,callback)=>{
        //send messages to everyone
        io.emit('newMessage',generateMessage(message.from,message.text));   
        callback();    
    });

    socket.on('createLocationMessage',(location)=>{
        io.emit('newLocationMessage',generateLocationMessage('admin',location.latitude,location.longitude));
    });

    socket.on('disconnect',function(){
        console.log('User left');
    });
});



server.listen(port,()=>{
    console.log(`The server is running on ${port}`);
});

