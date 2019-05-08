import React from "react";
import io from 'socket.io-client';

class LobbyChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // componentDidMount() {
  //   const socket = io();
  //   socket.on('chat message', function(userMsg){
  //     console.log('user and message: ', userMsg)
  //     $('#messages').append($('<li>').text(userMsg));
  //   });
  // }

  onClick(e) {
    e.preventDefault();
    document.getElementById("m").value="";
    // console.log('userMsg: ', this.props.user + ': ' + this.state.message);
    let userMsg = this.props.user + ': ' + this.state.message;
    const socket = io();
    socket.emit('chat message', userMsg);
  }

  onChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form action="">
          <input id="m" placeholder={'Say something ' + this.props.user} autoComplete="off" onChange={this.onChange}/><button onClick={this.onClick}>Send</button>
        </form>
      </div>
    )
  }
}

export default LobbyChat;