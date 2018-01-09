import React, { Component } from 'react';
import './Chat.css'



class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.makeUser = this.makeUser.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.value === ''){
      alert('Please enter a username!');
    }
    else {
      alert('Username Created!');
      this.makeUser();
    }
    event.preventDefault();

  }
  makeUser(){
    //if username exists
    var username = this.state.value;

    console.log(username);
    console.log('Making user');

    //if username exists


    //else create new user




  }
  render() {
    return (
      <div id='chat'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type ="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className='messages'></div>
      </div>
    );
  }
}

export default Chat;
