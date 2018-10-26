/*
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
*/