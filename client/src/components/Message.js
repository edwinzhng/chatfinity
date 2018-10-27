import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from 'components/styles/Message.scss';

class Message extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }

  render() {
    const { text, username } = this.props;
    return (
      <div className={styles.message}>
        <span className={styles.username}>
          {`${username}: `}
        </span>
        <span className={styles.text}>
          {text}
        </span>
      </div>
    );
  }
}

export default Message;
