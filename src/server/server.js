const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

// connect to MongoDB
mongo.connect('mongodb://localhost/infinitychat', function(err, db) {
  if(err) {
    throw err;
  }
  console.log('MongoDB connected.');

  // connect to socket.io
  client.on('connection', function(socket) {
    let chat = db.collection('chats');

    sendStatus = function(s) {
      socket.emit('status', s);
    }

    // get chats
    chat.find().sort({ _id:1 }).toArray( function(err, res) {
      if(err) {
        throw err;
      }

      socket.emit('output', res);
    });

    // handle input events
    socket.on('input', function(data) {
      let name = data.name;
      let message = data.message;

      if(name == '' || message == '') {
        // send error status
        sendStatus('Please enter a name and a message');
      }
      else {
        // insert messages
        chat.insert({name: name, message: message}, function() {
          client.emit('output', [data]);

          // send status success
          sendStatus({
            message: 'Sent',
            clear: true
          });
        });
      }
    });

    // clear messages
    socket.on('clear', function(data) {
      chat.remove({}, function() {
        socket.emit('cleared');
      });
    });

  });
});
