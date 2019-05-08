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
      user: 'Anonymous',
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

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    axios.get('/network')
      .then(({data})=>{
        this.setState({
          wifi: data
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
          <p>{this.state.wifi === 'WiFi Not Connected' ? this.state.wifi : 'Connected to '+this.state.wifi}</p>
        </div>

        <div>
          <LobbyChat user={this.state.user}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("wifichat"));