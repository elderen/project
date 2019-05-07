import React from "react";
import ReactDOM from "react-dom";
import PrivateChat from "./component/privateChat.jsx";
import LobbyChat from "./component/lobbyChat.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wifi: 'WiFi Not Connected',
      name: 'Anonymous'
    }
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    let name = prompt("Enter your username", "Anonymous")
    console.log('NAME: ', name);
    this.setState({
      name: name
    })
    this.getInfo();
  }

  getInfo() {
    axios.get('/network')
      .then(({data})=>{
        console.log('SSID: ', data)
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
          <p>Say something {this.state.name}!</p>
          <p>{this.state.wifi === 'WiFi Not Connected' ? this.state.wifi : 'Connected to '+this.state.wifi}</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("wifichat"));