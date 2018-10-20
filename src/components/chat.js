import React, { Component } from 'react';
import {Progress} from 'reactstrap';
import './chat.css';
import * as firebase from '../firebase';
import FileUploader from "react-firebase-file-uploader";
import { MentionsInput, Mention } from 'react-mentions'
import {database, storage} from '../firebase';
import attach from '../assets/paperclip.png';
import emoticon from '../assets/smile.png';
import send from '../assets/send.png';

//My own assumed list of user. The 'id' and 'display' attributes are compulsory for the Mention component to work.
//Whatever is in the display attribute is what will be displayed as suggestion when typing '@' in the chat box
// So if you are importing users list from elsewhere, make sure to create an array that has 'id' and 'display' attributes
// by extracting info from the users list
const users = [
  {
    id: 'walter',
    display: 'Walter White',
  },
  {
    id: 'jesse',
    display: 'Jesse Pinkman',
  },
  {
    id: 'gus',
    display: 'Gustavo "Gus" Fring',
  },
  {
    id: 'saul',
    display: 'Saul Goodman',
  },
  {
    id: 'hank',
    display: 'Hank Schrader',
  },
  {
    id: 'skyler',
    display: 'Skyler White',
  },
  {
    id: 'mike',
    display: 'Mike Ehrmantraut',
  },
]

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
        file: snap.val().file_name,
        file_url: snap.val().file_url
      })
      this.setState({
        messages: previousMessages,
      })
    })
    console.log("willmount");
  }

  //As the user types in the text-box, the text should be stored in "newMessage"
  handleUserInput(e) {
    this.setState({
      newMessage: e.target.value,
    })
  }
  sendMessage(event) {
    event.preventDefault();
    //Send the message typed to the db
    this.database.push().set({senderId: "Temp", text: this.state.newMessage, file_name: this.state.uploadedFile, file_url: this.state.fileURL});
    this.setState({
      newMessage: "",
      uploadedFile: "",
      isUploading: false,
      uploadProgress: 0,
      fileURL: "",
      wantToUpload: false,

    })
  }

  //This function is fired to toggle whether the user wants to upload a file or not.
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

    //Scroll to the latest chats once the messages have been rendered
    if (this.state.messages!='') {
        document.querySelector("#send").scrollIntoView({behavior:'smooth'});
    }

    return(
      <div className="chat-component">
        <div className="chat-room">
          <div className="sidebar">
            {/* Information like users online can be displayed here... */}
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
                        <span className="message-text">{message.text}</span> {/*To show attachements if any*/}
                        {
                          message.file_url != '' ?
                            <span class="attachment-wrapper">
                              <br /><br />
                              <a href={message.file_url} target="_blank" className="attachment">
                                <img src={attach} alt="Attachment" className="attachment-in-chat" />
                                <span>{message.file}</span>
                              </a>
                            </span>
                            : ''  //This is a ternery operator's else part
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
                        <div class="d-flex flex-row">
                          <div class="p-2">
                            <img src={attach} alt="Attachment" className="clickable-icon hover-style" onClick={this.showUpload} />
                            <img src={emoticon} alt="Emoticons" className="clickable-icon hover-style" />
                        </div>
                          <div class="input-area p-2">
                            <MentionsInput
                              singleLine
                              value={this.state.newMessage}
                              onChange={this.handleUserInput}
                              className="mention-box"
                              placeholder="Send message"
                            >
                              <Mention
                                trigger="@"
                                data={users}
                                className="mentioned-user"
                              />
                            </MentionsInput>
                        </div>
                          <div class="p-2">
                            <img src={send} alt="Send Message" className="send-icon" onClick={this.sendMessage}/>
                        </div>
                      </div>
                          {
                            // If user wants to upload files, then show the file upload input
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
              <div id="send"><hr /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
