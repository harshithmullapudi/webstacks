import React, { Component } from 'react';

import './chat.css'; 
class Chatview extends Component {

  render() {
  	
      return (
        <div className="head1"><h1>CHAT ROOM</h1>

        <div className="right">
        <div class="temp"><span className="chat1"><p>Vashanth:Hi!</p></span></div>
        <div class="temp"><span className="chat1"><p>Ram:Hi!</p></span></div>
        <div class="temp"><span className="chat1"><p>Vashanth:How are you?</p></span></div>
        <div class="temp"> <span className="chat1"><p>Ram:I'm fine</p></span></div>

        <div class="temp"><span className="chat1"><p>Vashanth:How's college?</p></span></div>
        <div class="temp"><span className="chat1"><p>Ram:Good!</p></span></div>
        <div class="temp"><span className="chat1"><p>Vashanth:Okay</p></span></div>
        <div class="temp"><span className="chat1"><p>Ram:There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...</p></span></div>
        
        <div class="chatContainers">
      <input type="text" class="chatContainers" id="chats" placeholder="send msg:" name="chats" />
</div>
        </div>

        <div className="left">
        <ul class="list-group">
    <li class="list-group-item active">Members in chat</li>
    <li class="list-group-item">Vashanth</li>
    <li class="list-group-item">Ram</li>
  </ul>
        </div>


        </div>
    );
  }
}

export default Chatview;
