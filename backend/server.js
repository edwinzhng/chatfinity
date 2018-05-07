// set up
const express = require('express');
const mongoose = require('mongoose');
const configDB = require('./config/database.js');
const app = express();
const port = process.env.PORT || 3001;

// connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url, { useMongoClient: true }, (err, db) => {
  if(err) {
    throw err;
  }
  console.log('MongoDB connected.');
});

// allow Cross-Origin Resource Sharing
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

// launch
server = app.listen(port, () => {
  console.log('Starting server on port: ' + port);
});

// socket.io
const io = require('socket.io')(server);

let queue = [];
let rooms = {};
let names = {};
let users = {};

function connectUsers(socket) {
  if(queue.length !== 0) {
    let peer = queue.pop();
    let room = socket.id + '#' + peer.id;
    peer.join(room);
    socket.join(room);
    console.log(room);
    rooms[peer.id] = room;
    rooms[socket.id] = room;
    peer.emit('CONNECT_CHAT', {'username': names[socket.id], 'room': room});
    socket.emit('CONNECT_CHAT', {'username': names[peer.id], 'room': room});
  } 
  else {
    queue.push(socket);
  }
}

io.on('connection', (socket) => {
  console.log(socket.id + ' connected.');
  socket.on('SET_NAME', function (data) {
    names[socket.id] = data.username;
    users[socket.id] = socket;
    connectUsers(socket);
  });
  socket.on('CONNECT_NEW_USER', () => {
    connectUsers(socket);
  });
  socket.on('SEND_MESSAGE', (message) => {
    let room = rooms[socket.id];
    io.sockets.in(room).emit('RECEIVE_MESSAGE', message);
  });
  socket.on('DISCONNECT_USER', () => {
    let room = rooms[socket.id];
    let peerID = room.split('#')[1];
    peerSocket = users[peerID];
    socket.leave(room);
    peerSocket.leave(room);
    rooms[socket.id] = null;
    rooms[peerID] = null;
    socket.emit('DISCONNECT_CHAT', {});
    peerSocket.emit('DISCONNECT_CHAT', {});
  });
});