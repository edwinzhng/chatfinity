import React, { Component } from 'react';
import Chat from '../Chat/Chat';
import UserPrompt from '../UserPrompt/UserPrompt';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };

    this.setUsername = this.setUsername.bind(this);    
  }

  // handle input message changes
  setUsername(name, event) {
    event.preventDefault();
    if(this.state.username === '') {
      this.setState({ username: name });
    }
  }

  render() {
    return (
      <div className="main">
        <header className="header">
          <h1>Chatfinity</h1>
        </header>
        { 
          this.state.username === '' ? 
          <UserPrompt setUsername={this.setUsername}/> : 
          <Chat username={this.state.username}/>
        }
      </div>
    );
  }
}

export default Main;
