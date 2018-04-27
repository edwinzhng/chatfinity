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

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('SEND_MESSAGE', (message) => {
    io.emit('RECEIVE_MESSAGE', message);
  });
});