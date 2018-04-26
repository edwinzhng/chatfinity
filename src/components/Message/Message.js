import React, { Component } from 'react';
import './Message.css';

class Message extends Component {
  render() {
    return (
      <div className="message">
        <div className="user">
            { this.props.user }
        </div>
        <div className="text">
            { this.props.text }
        </div>
      </div>
    );
  }
}

export default Message;
