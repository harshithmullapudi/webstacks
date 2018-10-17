import React, { Component } from 'react';
import './chat.css';
import * as firebase from '../firebase';
import {database, auth} from '../firebase';
import attach from '../assets/paperclip.png';
import emoticon from '../assets/smile.png';
export default class Chat extends Component {
  constructor() {
    super();
    this.database = database.ref().child('chats');
    this.handleUserInput = this.handleUserInput.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
       messages: [],
       newMessage: "",
    }
  }

  componentWillMount() {
    const previousMessages = this.state.messages;
    //Database snapshot
    this.database.on('child_added', snap => {
      previousMessages.push({
        id: snap.key,
        senderId: snap.val().senderId,
        text: snap.val().text
      })
      this.setState({
        messages: previousMessages,
      })
    })
  }
  //As the user types in the text-box, the text will be stored in "newMessage"
  handleUserInput(e) {
    this.setState({
      newMessage: e.target.value,
    })
  }
  sendMessage(event) {
    event.preventDefault();
    //Sends the message typed to the db
    this.database.push().set({senderId: "Temp", text: this.state.newMessage});
    this.setState({
      newMessage: ''
    })
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
                      <form id="send-message-form" onSubmit={this.sendMessage}>
                          <input
                              className="send-message-box-input"
                              id="send-message-box-input"
                              type="text"
                              placeholder="Send message"
                              value={this.state.newMessage}
                              onChange={this.handleUserInput}
                              onSubmit={this.sendMessage}
                          />
                          <img src={attach} alt="Attachment" className="clickable-icon" />
                          <img src={emoticon} alt="Emoticons" className="clickable-icon" />
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
