import React, { Component } from 'react';
import './Chat.css'

class Chat extends Component {
  render() {
    return (
      <div id='chat'>
        <input type='text' id='username' className='name-input' placeholder='Enter your name...' />
        <div className='messages'></div>
      </div>
    );
  }
}

export default Chat;
