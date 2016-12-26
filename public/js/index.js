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
    var li =jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
    console.log('New message',message);
});

// socket.emit('createMessage',{
//     from:'Frank',
//     text:'hi'
// },function(data){
//     console.log(data);
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function(){

    });
});