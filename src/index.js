//const declaration for all of express functionality
const express = require('express');
//Websocket
const socketio = require('socket.io');
//need http module from node to create server through create server method
const http = require('http');
//for path, now that app.use(express.statit('public')) doesnt work, it was
const path = require('path');

//js object with methods to create server, from express function
const app = express();

const mongoose = require('mongoose');


//db connections
//takes in database to access, in this case we will give it the local
//database (running local)
//local database = mongodb://localhost/chat-database
mongoose.connect('mongodb://elias:elias123@ds123822.mlab.com:23822/chat-db')
  .then(db => console.log('database connected!'))
    .catch(err => console.log(err));

//alternate not working
// mongoose.connect('mongodb://localhost/chat-database').then(function(db){
//   console.log("database connected").catch(function(err){
//     console.log(err);
//   });
// });

//real time functionality using Websocket
//avoid stayless, user goes in and asks server for something, server responds
//npm install socket.io
//to work in real time we need for there to be a server already (http.createServer) and pass through the application(app)
//get a server back
//need server to give it to socketio
const server = http.createServer(app);
 // real time connection thanks to my server, return a websocket connection
 // receiev and send now available from client and server
const io = socketio.listen(server);

//setting for when depoloying on real life port
// for use port of operating system, en su variable de entorno, if nothing use local 3030
app.set('port', process.env.PORT || 3030);


//begin socket connection
//listen when there is connection
//socket means new client
//after this go connect server to client to index.html
//http://localhost:3030/socket.io/socket.io.js js code used from client to connect to server, link to html
// io.on('connection', socket => {
//   console.log('new user connected');
//
//   //inside here is where we listen when users send mssg or server sending events
//   //this would keep growing in here, and we dont want that (code)
//   //so lets create a folder inside src called sockets, copy code on top to that folder!
// });

//to replace what we just removed on top, we will have to require some things
//./sockets really brings a function back
require('./sockets')(io);



//send this to my port, send public folder
//app.use(express.static(__dirname + '/public'));
//OR if using path to avoid windows and apple, better multiplatform
app.use(express.static(path.join(__dirname, 'public')));

//method from express, listen on port
//when ready to execute
//no app.listen anymore, now server.listen after const server = http.createServer(app);
//instead of diplaying 3030, put app.get('port', since we ar elooking for that
server.listen(app.get('port'), () => {
  console.log(`server is on! port:: ${app.get('port')}`);
});
