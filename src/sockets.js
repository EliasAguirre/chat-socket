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
  let users = {

  };

   io.on('connection', socket => {
     console.log('new user connected');

     //recieving data plus a callback function which takes the data
     socket.on('new user', (data, cb) => {
       console.log(data);
       if(data in users){
         cb(false);
       } else{
         cb(true);
         socket.nickname = data;
         users[socket.nickname] = socket; //socket value is every username contains all info in sockets
         updateNames();       }
     });

     //listen to event from client, exactly same NAME
     //event waiting for here is send message
     //on that event we will receive data ($messageBox.val())
     socket.on('send message', function (data, cb){
       console.log(data);
       //NOW, RETRANSMIT TO ALL USERS IN APPLICATION FROM SERVER
       //socket is just the connection from one client to the SERVER
       //to send to everyone I need to use io
            // real time connection thanks to my server, return a websocket connection
            // receiev and send now available from client and server
            //const io = socketio.listen(server);
       //io has all clients connected

       //Private messages
       var mssg = data.trim();

       if (mssg.substr(0,3) === "/p "){
         mssg = mssg.substr(3);
         const index = mssg.indexOf(" ");
         if (index != -1){
           var name = mssg.substring(0, index);
           var message = mssg.substring(index + 1);
           if(name in users){
             users[name].emit('private', {
               message,
               nick: socket.nickname
             });
           } else{
             //if user doesnt exist, send this to call back
             //which will be received in main.js 'send message'
             cb('Error! Please Enter a Valid Username');
           }
          } else{
             cb('Error! Please Write a Message');
           }
          } else{
             //new event to send to everyone
             //just make sure all clients are ready to receive 'new message', goto main.js again
             io.sockets.emit('new message', {
               msg: data,
               name: socket.nickname
             });
           }
     });

     //event for removing name when user disconnects
     socket.on('disconnect', function(data){
       if(!socket.nickname){
         return;
       }else{
         delete users[socket.nickname];
         updateNames();
       }
     });

     function updateNames(){
       //not sending nicknames anymore, now sending object users
       io.sockets.emit('usernames', Object.keys(users));
     }

   });
}
