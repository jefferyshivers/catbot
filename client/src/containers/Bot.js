import React, { Component } from "react";

import "../styles/Bot.scss";

class Bot extends Component {
  state = {
    sessionkey: null,
    input: "",
    messages: [],
    messagesDiv: null
  };

  componentDidMount = () => {
    fetch('/api/utterances/firstOpen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(body => {
        this.recordMessage('BOT', body.Response.message)
        this.setState({ sessionkey: body.SessionKey })
      })
  }

  recordMessage = (sender, message) => {
    this.setState({
      messages: this.state.messages.concat({
        SENDER: sender,
        MESSAGE: message
      })
    })
  }

  changeInput = e => {
    let input = e.target.value;
    this.setState({ input: input });
  };

  handleKeyPress = e => {
    (e.key === 'Enter') &&
      (this.state.input !== "") &&
      this.submitMessage();
  }

  scrollBottom = () => {
    let top = this.state.messagesDiv.scrollHeight - this.state.messagesDiv.parentNode.scrollHeight;
    this.state.messagesDiv.scrollTo(0, (top + 60));
  }

  submitMessage = () => {
    let message = this.state.input;
    this.setState({ input: "" })
    this.recordMessage('USER', message)

    fetch('/api/utterances/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Message: message,
        SessionKey: this.state.sessionkey
      })
    }).then(res => res.json())
      .then(body => {
        this.recordMessage('BOT', body.Response.message)
        this.scrollBottom();
      })
  }

  render() {
    const messages = (
      <div
        className="messages"
        ref={div => {
          (!this.state.messagesDiv) &&
            this.setState({ messagesDiv: div })
        }}>
        <div className="messages-inner">
          {
            this.state.messages.map((message, index) => {
              return (
                <div
                  key={message.SENDER + index}
                  className={`message ${message.SENDER}`}>
                  {message.MESSAGE}
                </div>
              )
            })
          }
        </div>
      </div>
    )

    const input = (
      <div className="input-container">
        <input
          value={this.state.input}
          onChange={this.changeInput}
          onKeyPress={this.handleKeyPress} />
      </div>
    );

    return (
      <div className="Bot">
        {messages}
        {input}
      </div>
    );
  }
}

export default Bot;