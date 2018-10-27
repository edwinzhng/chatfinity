import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Message from './Message';
import './styles/Chat.css';

class Chat extends PureComponent {
  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
    peerName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      messages: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // handle input message changes
  handleChange(event) {
    this.setState({ messageText: event.target.value });
  }

  // send message to other user
  sendMessage(e) {
    const { username } = this.props;
    const { messageText } = this.state;
    e.preventDefault();
    if (messageText === '') {
      return;
    }
    this.socket.emit('SEND_MESSAGE', {
      user: username,
      messageText,
      id: this.messageID
    });
  }

  renderMessages() {
    const { messages } = this.state;
    return messages.map(
      message => <Message key={message.id} text={message.text} username={message.username} />
    );
  }

  render() {
    const { isConnected, peerName } = this.props;
    const { messageText } = this.state;
    return (
      <div id="chat">
        <div className="status">
          {isConnected ? `Connected to ${peerName}` : 'Not Connected'}
          <button onClick={this.connectNewUser} type="button">
            Connect to New User
          </button>
        </div>
        <div className="messages">
          { renderMessages() }
        </div>
        <form className="message-form" onSubmit={this.sendMessage}>
          <input
            type="text"
            placeholder="Type a message ..."
            className="message-input"
            value={messageText}
            onChange={this.handleChange}
          />
          <button className="send-btn" type="submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default Chat;
