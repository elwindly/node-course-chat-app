const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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
        callback('This is from the srever');    
    });
    // socket.on('createMessage',(message)=>{
        //send messages to everyone but one specific user
    //     socket.broadcast.emit('newMessage',{
    //         from:message.from,
    //         text:message.text,
    //         createdAt: new Date().getTime()
    //     }); 
    // });
    socket.on('disconnect',function(){
        console.log('User left');
    });
});



server.listen(port,()=>{
    console.log(`The server is running on ${port}`);
});

