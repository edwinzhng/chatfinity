import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './styles/SignIn.css';

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
      <div className="userprompt">
        <div className="prompt-text">
          Enter your name to start chatting!
        </div>
        <form
          className="message-form"
          onSubmit={event => setUsername(nameText, event)}
        >
          <input
            type="text"
            placeholder="Enter a username ..."
            className="username-input"
            value={nameText}
            onChange={this.handleChange}
          />
          <button className="start-btn" type="submit">
            Join a room!
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;
