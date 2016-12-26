var socket = io();
socket.on('connect',()=>{
    console.log('connected');
});
//     socket.emit('createMessage',{
//         from:'elwindly',
//         text:'hello!'
//     });
// 

socket.on('disconnect',()=>{
    console.log('Disconnected from server'); 
});

socket.on('newMessage',function(message){
    console.log('New message',message);
});