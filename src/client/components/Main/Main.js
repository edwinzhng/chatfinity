import React, { Component } from 'react';
import Chat from '../Chat/Chat.js';
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <header className="header">
          <h1>InfinityChat</h1>
        </header>
        <Chat/>

      </div>
    );
  }
}

export default Main;
