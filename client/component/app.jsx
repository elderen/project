import React from "react";
import axios from "axios";
import PrivateChat from "./privateChat.jsx";
import LobbyChat from "./lobbyChat.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null
    }
    this.getInfo = this.getInfo.bind(this);
  }

  getInfo() {
    console.log('GET INFO')
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
      </div>
    )
  }
}
export default App;