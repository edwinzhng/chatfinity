import React, { Component } from 'react';

import Chat from '../components/Chat';
import SignIn from '../components/SignIn';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.setUsername = this.setUsername.bind(this);
  }

  // handle input message changes
  setUsername(name, event) {
    const { username } = this.state;
    event.preventDefault();
    if (username === '') {
      this.setState({ username: name });
    }
  }

  render() {
    const { username } = this.state;
    return (
      <div className="App">
        <header className="header">
          <h1>
            Chatfinity
          </h1>
        </header>
        {
          username === ''
            ? <SignIn setUsername={this.setUsername} />
            : <Chat username={username} />
        }
      </div>
    );
  }
}

export default App;
