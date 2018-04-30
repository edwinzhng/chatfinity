import React, { Component } from 'react';
import io from "socket.io-client";
import Message from '../Message/Message';
import './Chat.css'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messageID: 0,
      messages: [],
    };

    this.handleChange = this.handleChange.bind(this);    
    this.sendMessage = this.sendMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);

    this.socket = io('localhost:3001');
    this.socket.on('RECEIVE_MESSAGE', (message) => {
      this.addMessage(message);
    });
  }

  // handle input message changes
  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  addMessage(message) {
    this.setState({ messages: [...this.state.messages, message] });
  }

  // send message to other user
  sendMessage(e) {
    e.preventDefault();
    if(this.state.text === '') {
      return;
    }
    this.socket.emit('SEND_MESSAGE', {
      user: this.props.username,
      text: this.state.text,
      id: this.messageID
    })
    this.setState({
      text: '',
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
        <form className="message-form" onSubmit={this.sendMessage}>
          <input type="text" placeholder="Type a message ..." className="message-input" value={this.state.text} onChange={this.handleChange}/>
          <button className="send-btn" type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Chat;
