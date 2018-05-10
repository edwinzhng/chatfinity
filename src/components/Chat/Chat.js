import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from "socket.io-client";
import Message from '../Message/Message';
import * as chatActions from '../actions/chatActions';
import './Chat.css'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);  
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

  connectNewUser(data) {
    this.socket.emit('DISCONNECT_USER', {});
    this.socket.emit('CONNECT_NEW_USER', {});
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
          { this.props.isConnected ? 'Connected to ' + this.props.peerName : 'Not Connected' }
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
    isConnected: state.chat.isConnected,
    messages: state.chat.messages,
    peerName: state.chat.peerName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(chatActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);