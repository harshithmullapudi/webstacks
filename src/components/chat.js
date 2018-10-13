import React, { Component } from 'react';
import './chat.css';
import {Row,Col,Button,InputGroup, Input} from 'reactstrap';
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
      <div class="container">
        <h3>Webstacks Chat Room</h3>
        {/* Message List */}
        <div>
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
        {/* Chat message submit form*/}
        <div className="send-message">
          <InputGroup>
            <Input placeholder="Enter message to send" />
              <Button>Send</Button>
          </InputGroup>
      </div>
    </div>
    );
  }
}
