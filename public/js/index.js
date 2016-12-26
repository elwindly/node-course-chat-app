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

socket.on('newLocationMessage',function(message){
    var li =jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage',{
        from:'User',
        text:messageTextbox.val()
    },function(){
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }
    locationButton.attr('disabled','disabled').text('Sending location');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send locationn');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send locationn');
        alert('Unable to fetch the location');
    });
});
