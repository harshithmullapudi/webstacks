import React, { Component } from 'react';

import './chat.css'; 
class Chatview extends Component {

  render() {
  	
      return (
        <div className="head1"><h1>CHAT ROOM</h1>
        <div className="chatContainer"><div className="chat1"><p>Vashanth:Hi!</p></div></div>
        <div className="chatContainer"><div className="chat2"><p>Ram:Hi!</p></div></div>
        <div className="chatContainer"><div className="chat1"><p>Vashanth:How are you?</p></div></div>
        <div className="chatContainer"><div className="chat2"><p>Ram:I'm fine</p></div></div>

        <div className="chatContainer"><div className="chat1"><p>Vashanth:How's college?</p></div></div>
        <div className="chatContainer"><div className="chat2"><p>Ram:Good!</p></div></div>
        <div className="chatContainer"><div className="chat1"><p>Vashanth:Okay</p></div></div>




        <div class="chatContainers">
        <div class="row">
   <div class="col-lg-12">
    <div class="input-group input-group-lg">
      <input type="text" class="form-control input" id="search-church" placeholder="Send message:" />
      <pre> </pre><span class="input-group-btn">
        <button class="btn btn-success btn-lg" type="submit">Send</button>
      </span>
    </div>
  </div>
</div>
        </div>
        </div>
    );
  }
}

export default Chatview;
