import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from 'components/styles/SignIn.scss';

class SignIn extends PureComponent {
  static propTypes = {
    setUsername: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      nameText: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // handle input message changes
  handleChange(event) {
    this.setState({ nameText: event.target.value });
  }

  render() {
    const { setUsername } = this.props;
    const { nameText } = this.state;
    return (
      <div className={styles.signIn}>
        <div className={styles.promptText}>
          Enter your name to start chatting!
        </div>
        <form className={styles.messageForm} onSubmit={e => setUsername(nameText, e)}>
          <input
            type="text"
            placeholder="Enter a username ..."
            className={styles.usernameInput}
            value={nameText}
            onChange={this.handleChange}
          />
          <button className={styles.joinBtn} type="submit">
            Join a room!
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;
