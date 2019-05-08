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
      user: 'Anonymous',
      response: false
    }
    this.getInfo = this.getInfo.bind(this);
  }
  componentWillMount() {
    let name = prompt("Enter your username")
    console.log('NAME: ', name);
    this.setState({
      user: name
    })
  }

  // componentDidMount() {
  //   this.getInfo();
  //   const socket = io();
  //   var user = this.state.name;
  //   socket.emit("FromAPI", user)
  //   // socket.on("FromAPI", (data) => {
  //   //   console.log("FROM API DATA: ", data);
  //   //   this.setState({ response: data })
  //   // });
  //   socket.on('chat message', function(userMsg){
  //     console.log('user and message: ', userMsg)
  //     $('#messages').append($('<li>').text(userMsg));
  //   });

  // }

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
          <p>{this.state.wifi === 'WiFi Not Connected' ? this.state.wifi : 'Connected to '+this.state.wifi}</p>
          <p>Response: {this.state.response ? 'True' : 'False'}</p>
        </div>

        <div>
          <LobbyChat user={this.state.user}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("wifichat"));