import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Message from 'components/Message';
import styles from 'components/styles/Chat.scss';

class Chat extends PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      messages: [],
      isConnected: false,
      peerName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.connectNewUser = this.handleChange.bind(this);
    this.sendMessage = this.handleChange.bind(this);
  }

  // handle input message changes
  handleChange(event) {
    this.setState({ messageText: event.target.value });
  }

  connectNewUser() {
    const { username } = this.props;
    console.log(username);
  }

  // send message to other user
  sendMessage(e) {
    const { messageText } = this.state;
    e.preventDefault();
    if (messageText === '') {
      return;
    }
    console.log(messageText);
  }

  renderMessages() {
    const { messages } = this.state;
    return messages.map(
      message => <Message key={message.id} text={message.text} username={message.username} />
    );
  }

  render() {
    const { messageText, isConnected, peerName } = this.state;
    return (
      <div className={styles.chat}>
        <div className="status">
          {isConnected ? `Connected to ${peerName}` : 'Not Connected'}
          <button onClick={this.connectNewUser} type="button" className={styles.connectBtn}>
            Connect to New User
          </button>
        </div>
        <div className={styles.messages}>
          { this.renderMessages() }
        </div>
        <form className={styles.messageForm} onSubmit={(e) => { e.preventDefault(); this.sendMessage(e); }}>
          <input
            type="text"
            placeholder="Type a message ..."
            className={styles.messageInput}
            value={messageText}
            onChange={this.handleChange}
          />
          <button className={styles.sendBtn} type="submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default Chat;
