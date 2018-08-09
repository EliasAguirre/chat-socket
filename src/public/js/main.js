//executing sockets from code snippet (check index.html)
//new user connected to server, can send messages real time now
//obtain chat elements here

//SOCKET CONNECTION FROM CLIENT

$(function(){
  //keep bidirectional connection with server, being able to send and receive mssgs
  const socket = io();

  //obtaining DOM. elements from interface (ids)
  //DOM being message-form, chat etc
  //jQuery to obtain form from HTML (index.html)
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');

  //capture events

  //since submit made page refresh, and we dont want that
  //e = event
  $messageForm.submit(e => {
    e.preventDefault();
    //capture in box what actually was written
    //console.log($messageBox.val());

    //to actually send it, we need the socket, to send the mssg to the server, 'send message' being the event
    //event send message, and send $messageBox.val()
    socket.emit('send message', $messageBox.val());
    //to clean messageForm input ... nothing will be sent here until we make the server listen, after connected
    //stay listening in sockets.js COMMENT NAME: listen
    $messageBox.val('');
  });

  //listen to new event, whatever event we want, in this case
  //we want to listen to 'send message' from server side
  socket.on('new message', function(data){
    $chat.append(data + '<br/>')
  });
})
