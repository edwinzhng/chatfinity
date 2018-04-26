import React, { Component } from 'react';
import io from "socket.io-client";
import Message from '../Message/Message';
import './Chat.css'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      text: '',
      messageID: 0,
      messages: [],
    };

    this.handleChange = this.handleChange.bind(this);    
    this.sendMessage = this.sendMessage.bind(this);

    this.socket = io('localhost:3001');
  }

  // handle input message changes
  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  // send message to other user
  sendMessage() {
    let messages = this.state.messages;
    messages.push({
      'user': this.state.username,
      'text': this.state.text,
      'id': this.state.messageID,
    })
    this.setState({ 
      messages: messages,
      messageID: this.state.messageID + 1,
    });
  }

  render() {
    let messages = this.state.messages.map(message => {
      return (
        <Message key={message.id} text={message.text} user={message.user}/>
      );
    });

    return (
      <div id='chat'>
        <div className='messages'>
          { messages }
        </div>
        <input type="text" placeholder="Type a message ..." className="message-input" value={this.state.message} onChange={this.handleChange}/>
        <button className="send-btn" onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

export default Chat;
