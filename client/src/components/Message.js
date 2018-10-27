import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './styles/Message.css';

class Message extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }

  render() {
    const { text, username } = this.props;
    return (
      <div className="message">
        <span className="user">
          {`${username}: `}
        </span>
        <span className="text">
          {text}
        </span>
      </div>
    );
  }
}

export default Message;
