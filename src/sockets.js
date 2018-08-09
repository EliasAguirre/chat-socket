//in charge of accepting socket connection
//send events, receive them etc.
//just like that it doesnt work because the connections exists in index.js so make it a function

// io.on('connection', socket => {
//   console.log('new user connected');
//
// });, thus

//SOCKET CONNECTION FROM SERVER

//send connection of server as parameter
module.exports = function (io) {

   io.on('connection', socket => {
     console.log('new user connected');

     //listen to event from client, exactly same NAME
     //event waiting for here is send message
     //on that event we will receive data ($messageBox.val())
     socket.on('send message', function (data){
       console.log(data);
       //NOW, RETRANSMIT TO ALL USERS IN APPLICATION FROM SERVER
       //socket is just the connection from one client to the SERVER
       //to send to everyone I need to use io
            // real time connection thanks to my server, return a websocket connection
            // receiev and send now available from client and server
            //const io = socketio.listen(server);
       //io has all clients connected

       //new event to send to everyone
       //just make sure all clients are ready to receive 'new message', goto main.js again
       io.sockets.emit('new message', data);
     });

   });
}
