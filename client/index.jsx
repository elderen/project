import React from "react";
import ReactDOM from "react-dom";
import PrivateChat from "./component/privateChat.jsx";
import LobbyChat from "./component/lobbyChat.jsx";
import axios from "axios";
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wifi: 'WiFi Not Connected',
      name: 'Anonymous',
      response: false
    }
    this.getInfo = this.getInfo.bind(this);
  }
  componentWillMount() {
    let name = prompt("Enter your username", "spicypepper")
    console.log('NAME: ', name);
    this.setState({
      name: name
    })
  }

  componentDidMount() {
    this.getInfo();

    const socket = io();
    socket.emit("FromAPI", this.state.name)
    socket.on("FromAPI", (data) => {
      console.log("FROM API DATA: ", data);
      this.setState({ response: data })
      socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(data + ": " + msg));
      });
    });

  }

  getInfo() {
    axios.get('/network')
      .then(({data})=>{
        this.setState({
          wifi: data
        })
        console.log('Current Network: ', this.state.wifi)
      })
    // WifiManager.getCurrentWifiSSID()
    // .then((ssid) => {
    //   console.log("Your current connected wifi SSID is " + ssid)
    // }, () => {
    //   console.log('Cannot get current SSID!')
    // })
  }

  render() {
    return (
      <div>
        <div>
          <PrivateChat />
        </div>
        <div>
          <LobbyChat />
        </div>
        <div>
          <p>{this.state.wifi === 'WiFi Not Connected' ? this.state.wifi : 'Connected to '+this.state.wifi}</p>
          <p>Say Something {this.state.name}!</p>
          <p>Response: {this.state.response ? 'True' : 'False'}</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("wifichat"));