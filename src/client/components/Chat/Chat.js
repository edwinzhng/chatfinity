import React, { Component } from 'react';
import './Chat.css'



class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.getId = this.getId.bind(this);
    this.makeUser = this.makeUser.bind(this);
    this.register = this.register.bind(this);
  }
  getId(id) {
    return document.getElementById(id);
  }
  register(){
    console.log('register user');
    var passport = require('passport')
    , LocalStrategy =require('passport-local').Strategy;

    //passport.js
    passport.use(new LocalStrategy(
      function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
          if(err) {return done(err);}
          if(!user){
            return done(null, false, {message: 'Incorrect username.'});
          }
          if(!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user);
        });
      }
    ));
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.value === ''){
      alert('Please enter a username!');
    }
    else {
      alert('Username Created!');
      this.makeUser();
    }
    event.preventDefault();

  }

  makeUser(){
    //if username exists
    var username = this.state.value;

    console.log(username);
    console.log('Making user');

    //if username exists

    //else create new user


    //connect socket.io
    //var socket = io.connect('');
    //if(socket !== undefined){
      //console.log('Connected to socket');
      //socket.emit('username', {
        //name: username
      //});
      //event.preventDefault();
    //}

  }
  render() {
    return (
      <div id='chat'>
        <div id='registerButton'>
          <button onClick={this.register}>Click me</button>
        </div>
        <div id='loginButton'>
          <button onClick={this.login}>Login</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type ="text" value={this.state.value} onChange={this.handleChange} id='username' />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className='messages'></div>
      </div>
    );
  }
}

export default Chat;
