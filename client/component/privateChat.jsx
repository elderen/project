import React from "react";

class PrivateChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: null
    };
  }

  render() {
    return (
      <div>
        <p>PrivateChat</p>
      </div>
    )
  }
}
export default PrivateChat;