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

  //temporary use of server memory because no database is being used
  let nicknames = [];

   io.on('connection', socket => {
     console.log('new user connected');

     //recieving data plus a callback function which takes the data
     socket.on('new user', (data, cb) => {
       console.log(data);
       if(nicknames.indexOf(data) != -1){
         cb(false);
       } else{
         cb(true);
         socket.nickname = data;
         nicknames.push(socket.nickname);
         updateNames()       }
     });

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
       io.sockets.emit('new message', {
         msg: data,
         name: socket.nickname
       });
     });

     //event for removing name when user disconnects
     socket.on('disconnect', function(data){
       if(!socket.nickname){
         return;
       }else{
         nicknames.splice(nicknames.indexOf(socket.nickname), 1);
         updateNames();
       }
     });

     function updateNames(){
       io.sockets.emit('usernames', nicknames);
     }

   });
}
