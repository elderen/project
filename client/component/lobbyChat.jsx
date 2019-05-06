import React from "react";

class LobbyChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: null
    };
  }

  render() {
    return (
      <div>
        <p>Lobby Chat</p>
      </div>
    )
  }
}

export default LobbyChat;