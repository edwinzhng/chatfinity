import React, { Component } from 'react';
import './UserPrompt.css';

class UserPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
    };

    this.handleChange = this.handleChange.bind(this);    
  }

  // handle input message changes
  handleChange(event) {
    this.setState({ inputName: event.target.value });
  }

  render() {
    return (
      <div className="userprompt">
        <div className="prompt-text">Enter your name to start chatting!</div>
        <form className="message-form" onSubmit={ (event) => this.props.setUsername(this.state.inputName, event) }>
          <input type="text" placeholder="Enter a username ..." className="username-input" value={this.state.text} onChange={this.handleChange} />
          <button className="start-btn" type="submit">Join a room!</button>
        </form>
      </div>
    );
  }
}

export default UserPrompt;
