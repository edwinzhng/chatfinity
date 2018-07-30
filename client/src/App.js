import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from '../Chat/Chat';
import UserPrompt from '../UserPrompt/UserPrompt';
import './App.css';

class App extends Component {
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
      <div className="App">
        <header className="header">
          <h1>Chatfinity</h1>
        </header>
        { 
          this.state.username === '' ? 
          <UserPrompt setUsername={this.setUsername}/> : 
          <Chat username={this.props.username}/>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    username: state.login.username
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);