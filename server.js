// set up all tools
var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// config files
var configDB = require('./config/database.js');
//require('./config/passport')(passport);

// connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url, { useMongoClient: true }, function(err, db) {
  if(err) {
    throw err;
  }
  console.log('MongoDB connected.');
});

// express setup
app.use(morgan('dev')); // log all requests for development
app.use(cookieParser()); // read cookies for auth
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow Cross-Origin Resource Sharing
app.use(function(req, res, next) {
 res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
 res.setHeader(‘Access-Control-Allow-Credentials’, ‘true’);
 res.setHeader(‘Access-Control-Allow-Methods’, ‘GET,HEAD,OPTIONS,POST,PUT,DELETE’);
 res.setHeader(‘Access-Control-Allow-Headers’, ‘Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers’);
 res.setHeader(‘Cache-Control’, ‘no-cache’);
 next();
});

// passport setup
app.use(session({ secret: 'thankmrgoose' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login session
app.use(flash());

// load routes
//require('./app/routes.js')(app, passport);

// launch
app.listen(port, function() {
  console.log('Starting server on port: ' + port);
});
