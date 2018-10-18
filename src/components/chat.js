import React, { Component } from 'react';
import {Progress} from 'reactstrap';
import './chat.css';
import * as firebase from '../firebase';
import FileUploader from "react-firebase-file-uploader";
import {database, storage} from '../firebase';
import attach from '../assets/paperclip.png';
import emoticon from '../assets/smile.png';
import send from '../assets/send.png';
export default class Chat extends Component {
  constructor() {
    super();
    this.database = database.ref().child('chats');
    this.handleUserInput = this.handleUserInput.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
       messages: [],
       newMessage: "",
       uploadedFile: "",
       isUploading: false,
       uploadProgress: 0,
       fileURL: "",
       wantToUpload: false,
    }
  }

  componentWillMount() {
    const previousMessages = this.state.messages;
    //Database snapshot
    this.database.on('child_added', snap => {
      previousMessages.push({
        id: snap.key,
        senderId: snap.val().senderId,
        text: snap.val().text,
        file: snap.val().file,
        file_url: snap.val().file_url
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
    this.database.push().set({senderId: "Temp", text: this.state.newMessage, file_name: this.state.uploadedFile, file_url: this.state.fileURL});
    // this.database.put(this.state.newFiles);
    this.setState({
      newMessage: "",
      uploadedFile: "",
      isUploading: false,
      uploadProgress: 0,
      fileURL: "",
      wantToUpload: false,

    })
  }
  showUpload = () => {
    this.state.wantToUpload ? this.setState({wantToUpload: false}) : this.setState({wantToUpload: true})
  }
  handleUploadStart = () => {
    console.log("Upload started");
    this.setState({ isUploading: true })
  }
  handleUploadError() {
    console.log("Upload error");
  }
  handleUploadSuccess = filename => {
    console.log("Upload success");
    this.setState({ uploadedFile: filename, isUploading: false, uploadProgress: 0 });
    storage
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ fileURL: url }));
  }
  handleUploadProgress = progress => {
    this.setState({ uploadProgress: progress })
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
                        {
                          message.file_url != '' ?
                            <span class="attachment">
                              <br /><br />
                              <a href={message.file_url} target="_blank" className="white-text">
                                <img src={attach} alt="Attachment" className="attachment-in-chat" />
                                Click to open the attachement
                              </a>
                            </span>
                            : ''
                        }

                      </div>
                    </div>
                  )
                }
                )}
              </div>
              <div className="send-message-box">
                  <div className="send-message-box-input">
                      <form id="send-message-form" onSubmit={this.sendMessage}>
                          <img src={attach} alt="Attachment" className="clickable-icon hover-style" onClick={this.showUpload} />
                          <img src={emoticon} alt="Emoticons" className="clickable-icon hover-style" />
                          <input
                              className="send-box hover-style"
                              id="send-message-box-input"
                              type="text"
                              placeholder="Send message"
                              value={this.state.newMessage}
                              onChange={this.handleUserInput}
                              onSubmit={this.sendMessage}
                          />
                          <img src={send} alt="Send Message" className="send-icon" onClick={this.sendMessage}/>
                          {
                            this.state.wantToUpload ?
                            <div>
                              <div id="upload" className="upload">
                                <FileUploader
                                  name="file"
                                  storageRef={storage.ref("images")}
                                  onUploadStart={this.handleUploadStart}
                                  onUploadError={this.handleUploadError}
                                  onUploadSuccess={this.handleUploadSuccess}
                                  onProgress={this.handleUploadProgress}
                                />
                                <a onClick={this.showUpload}>Close</a>
                                {
                                  this.state.isUploading ?
                                    <div className="file-upload-progress">
                                      <Progress value={this.state.uploadProgress} max="100" />
                                    </div>
                                  : ''
                                }

                              </div>
                            </div>
                            : ''
                          }
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
