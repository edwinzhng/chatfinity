// set up all tools
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// config files
var configDB = require('./config/database.js');

// connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url, { useMongoClient: true } function(err, db) {
  if(err) {
    throw err;
  }
  console.log('MongoDB connected.');
  console.log(db);
});

// express setup
app.use(morgan('dev')); // log all requests for development
app.use(cookieParser()); // read cookies for auth
app.use(bodyParser()); // HTML form information

// passport setup
app.use(session({ secret: 'thankmrgoose' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login session
app.use(flash());

// load routes
require('./app/routes.js')(app, passport);

// launch
app.listen(port);
console.log('Starting server on port: ' + port);
