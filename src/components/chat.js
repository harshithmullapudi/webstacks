import React, { Component } from 'react';
import './chat.css';
const DUMMY_DATA = [
  {
    senderId: "Lincoln",
    text: "Hi everyone!"
  },
  {
    senderId: "Abraham",
    text: "Hi Lincoln!"
  },
  {
    senderId: "Obama",
    text: "Hi everyone!"
  },
  {
    senderId: "Ram",
    text:"This is some long long text. Lorem ipsum door set amet dolor wolf harry potter lady lestrange. This is some long long text. Lorem ipsum door set amet dolor wolf harry potter lady lestrange. This is some long long text. Lorem ipsum door set amet dolor wolf harry potter lady lestrange"
  },
  {
    senderId: "Lincoln",
    text: "Hi everyone!"
  },
  {
    senderId: "Abraham",
    text: "Hi Lincoln!"
  },
  {
    senderId: "Obama",
    text: "Hi everyone!"
  }
]
export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
       messages: DUMMY_DATA
    }
  }
  render() {
    return(
      <div className="chat-component">
      <div className="chat-room">
        <div className="sidebar">
          Information like users online can be displayed here...
        </div>
        <div className="chat-block">
          <div className="chat-block-header">
              <b>Common Chat Room </b>
              <br />
              Webstacks
          </div>
          <div className="chat-block-body">
            <div className="message-block">
              {this.state.messages.map( message => {
                return(
                  <div key={message.id}>
                    <div className="message-sender">
                      {message.senderId}
                    </div>
                    <div className="message-text-container">
                      <span className="message-text">{message.text}</span>
                    </div>
                  </div>
                )
              }
              )}
            </div>
            <div className="send-message-box">
                <div className="send-message-box-input">
                    <form id="send-message-form">
                        <input
                            className="send-message-box-input"
                            id="send-message-box-input"
                            type="text"
                            placeholder="Send message"
                        />
                    </form>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
