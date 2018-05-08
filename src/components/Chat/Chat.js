import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";
import Message from '../Message/Message';
import * as chatActions from '../actions/chatActions';
import './Chat.css'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      room: '',
      connectedName: '',
      text: '',
      messageID: 0,
      messages: [],
    };

    this.handleChange = this.handleChange.bind(this);  
    this.connectChat = this.connectChat.bind(this); 
    this.disconnectChat = this.disconnectChat.bind(this); 
    this.connectNewUser = this.connectNewUser.bind(this); 
    this.sendMessage = this.sendMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);

    this.socket = io('localhost:3001');
    this.socket.on('RECEIVE_MESSAGE', (message) => {
      this.addMessage(message);
    });
    this.socket.on('CONNECT_CHAT', (data) => {
      this.connectChat(data);
    });
    this.socket.on('DISCONNECT_CHAT', () => {
      this.disconnectChat();
    });
  }

  componentDidMount() {
    this.socket.emit('SET_NAME', {
      username: this.props.username,
    });
  }

  // handle input message changes
  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  connectChat(data) {
    this.setState({
      connected: true,
      room: data.room,
      connectedName: data.username,
    });
  }

  connectNewUser(data) {
    this.socket.emit('DISCONNECT_USER', {});
    this.socket.emit('CONNECT_NEW_USER', {});
  }

  disconnectChat() {
    this.setState({
      connected: false,
      room: '',
      connectedName: '',
    });
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
        <div className='status'>
          { this.state.connected ? 'Connected to ' + this.state.connectedName : 'Not Connected' }
          <button onClick={this.connectNewUser}>Connect to New User</button>
        </div>
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

function mapStateToProps(state, ownProps) {
  return { 
    messages: state.chat.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(chatActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);