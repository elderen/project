import React from "react";
import ReactDOM from "react-dom";
import PrivateChat from "./component/privateChat.jsx";
import LobbyChat from "./component/lobbyChat.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wifi: 'WiFi Not Connected'
    }
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    axios.get('/network')
      .then((result)=>{
        this.setState({
          wifi: result.data
        })
        console.log('Current Network: ', this.state.wifi)
      })
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
          <p>Your WiFi: {this.state.wifi}</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("wifichat"));