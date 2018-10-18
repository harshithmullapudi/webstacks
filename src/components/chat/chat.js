import React from 'react';
import connect from "react-redux/es/connect/connect";
import store, {checkUser, updateUser, addChatDB, getChats} from "../../store";
import {Button,Form, FormGroup, Card, CardHeader, CardFooter, CardTitle, CardText, CardBody, CardLink,Container, Row, Col, Table,InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import {database,storage} from '../../firebase';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import emojiButton from '../../assets/emoji.png';
import successImg from '../../assets/success.png';
import firebase from 'firebase';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const boys = importAll(require.context('../../assets/boys', false, /\.(png|jpe?g|svg)$/));
const girls = importAll(require.context('../../assets/girls', false, /\.(png|jpe?g|svg)$/));


class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.messagesEnd = React.createRef();
		this.fileUploader = React.createRef();
		this.state = {
			comment : "",
			listState : false,
			search : '',
			imgUrl : '',
			uploadState : false,
			progress : 0,
			addButtonState : false

		}
		this.handleChange = (e) => {
			if(e.target.value.includes('@'))
			{
				let i = e.target.value.indexOf('@');
				let s = e.target.value.substring(i+1);
				this.setState({search : s});
			}
			this.setState({
				comment : e.target.value
			})
		}
		this.handleClick = (e) => {
			e.preventDefault();
			if(this.state.comment !== "" )
			{
				if(this.state.uploadState && this.state.progress === 100)
					addChatDB(this.state.comment,this.state.imgUrl);
				else
					addChatDB(this.state.comment,"");
			}
			this.setState({
				comment : "",
				imgUrl : "",
				uploadState : false,
				progress : 0,
				addButtonState : false
			});
		}
		this.scrollToBottom = () => {
  			this.messagesEnd.scrollIntoView({ behavior: "smooth" });
		}
		this.handleTag = (e) => {
			if(e.key === "@")
			{
				this.setState({listState : true})
			}
			if(this.state.listState)
			{
				if(e.key === "Escape")
					this.setState({	listState : false});
			}
		}
		this.uploadSuccess = (filename) => {
			this.setState({ progress: 100 });
			storage.ref('images').child(filename).getDownloadURL().then(url => this.setState({imgUrl : url ,uploadState : true}));
			this.handleClick;
		}
		this.handleProgress = (progress) => {
			this.setState({progress})
		}
		this.addButtonHandler = () => {
			this.setState({ addButtonState : true})
		}
		
	}
	handleTagname(name)  {
			let newComment = this.state.comment;
			newComment = newComment.substring(0,newComment.length-this.state.search.length-1);
			this.setState({
				comment : newComment+" "+name,
				listState : false
			})
			
		}
	componentDidMount() {
 		 this.scrollToBottom();
	}

	componentDidUpdate() {
  		this.scrollToBottom();
	}

	render() { 
		let suggestion = [];
		if(this.props.chats.Reducer.records)
		{
			let i =0;
			for(var j=0;j<this.props.chats.Reducer.records.length;j++)
			{
				if(this.state.search === ''  || (this.props.chats.Reducer.records[j]["name"]["first"].toLowerCase().includes(this.state.search.toLowerCase())) ||  (this.props.chats.Reducer.records[j]["name"]["last"].toLowerCase().includes(this.state.search.toLowerCase()))) {			
					suggestion.push(
					<Row id = {j} className = "chat-2 hover" onClick = {this.handleTagname.bind(this,this.props.chats.Reducer.records[j]["name"]["first"]+" "+this.props.chats.Reducer.records[j]["name"]["last"])}>
						<Col className="image" sm = "4">
			            	<img src={this.props.chats.Reducer.records[j]["photo"]["type"] === 'boys' ? boys[this.props.chats.Reducer.records[j]["photo"]["number"] + '.svg'] : girls[this.props.chats.Reducer.records[j]["photo"]["number"] + '.svg']} className="rounded-circle align-self-end mr-3 profilepic"   />
			            </Col>
			            <Col className = "list-text" sm ="8">
							{this.props.chats.Reducer.records[j]["name"]["first"]+" "+this.props.chats.Reducer.records[j]["name"]["last"]}
			            </Col>
					</Row>);
				}		
			}
			
		}
		let content = [];
		if(this.props.chats.Reducer.chats ) {
			if(this.props.chats.Reducer.user)
			{
				for(var i=0; i<this.props.chats.Reducer.chats.length; i++)
						{
							if(this.props.chats.Reducer.chats[i]["name"] == (this.props.chats.Reducer.user.name.first + " " + this.props.chats.Reducer.user.name.last)) {
								content.push(
									<Row key={i} className = "chat">
			                        	<Col sm = "8"> </Col>
			                        	<Col className="image" sm = "1">
			                          		<img src={this.props.chats.Reducer.chats[i]["pic"] === 'boys' ? boys[this.props.chats.Reducer.chats[i]["picid"] + '.svg'] : girls[this.props.chats.Reducer.chats[i]["picid"] + '.svg']} className="rounded-circle align-self-end mr-3 profilepic"   />
			                        	</Col>
			                        	<Col className="list-text" sm = "3">
			                          		<b>{this.props.chats.Reducer.chats[i]["name"]}</b><br/>
			                          		{this.props.chats.Reducer.chats[i]["description"]}
											{this.props.chats.Reducer.chats[i]["imgUrl"] !== "" ? <div><br/><img src = {this.props.chats.Reducer.chats[i]["imgUrl"]} height ="200px" width ="200px" /></div> : ""}
			                        	</Col>
			                		</Row>
									);
							}
							else
							{
								content.push(
								<Row key={i} className = "chat">
			                       <Col className="image" sm = "1">
			                          <img src={this.props.chats.Reducer.chats[i]["pic"] === 'boys' ? boys[this.props.chats.Reducer.chats[i]["picid"] + '.svg'] : girls[this.props.chats.Reducer.chats[i]["picid"] + '.svg']} className="rounded-circle align-self-end mr-3 profilepic"   />
			                        </Col>
			                        <Col className="list-text" sm = "3">
			                          <h6><b>{this.props.chats.Reducer.chats[i]["name"]}</b></h6>
			                          {this.props.chats.Reducer.chats[i]["description"]}
			                        	{this.props.chats.Reducer.chats[i]["imgUrl"] !== "" ? <div><br/><img src = {this.props.chats.Reducer.chats[i]["imgUrl"]} height ="200px" width ="200px" /></div> : ""}
			                        </Col>
			                        <Col sm ="8"></Col>
			                </Row>
			
								);
							}
						}
			}
		}	
		return (
			<div>
				<Row className = "chat">
				<Card className = "maincard scroll">
					<CardBody>
						{content}
						<div style={{ float:"left", clear: "both" }}
             				ref={(el) => { this.messagesEnd = el; }}>
        				</div>
					</CardBody>
				</Card>
				</Row>
				<Row className = "chat">
				<Col sm = "2" style ={{top :"30px", paddingLeft:"165px", paddingRigth:"0px", height:"40px"}}>
				{this.state.listState ? <div className="suggestion scroll-2">{suggestion}<div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div></div> : ""}
				{this.state.addButtonState && !this.state.imgUrl ? this.state.progress + "%" : ""}
				{this.state.imgUrl ? <img src = {successImg} width="20px" height="20px" /> : ""}
				</Col>
				<Col sm =  "10" >
				<InputGroup style = {{height:"40px"}}>
					<InputGroupAddon addonType = "prepend" >
					<InputGroupText className="button-add" >
					<CustomUploadButton
	    				accept="image/*"
	    				randomizeFilename
	    				storageRef={storage.ref('images')}
	    				onUploadSuccess={this.uploadSuccess}
	    				onProgress={this.handleProgress}
	 					onClick = {this.addButtonHandler}
	 					style = {{ marginBottom : "0px"}}
	 					>
	    				+
	  				</CustomUploadButton>
	  				</InputGroupText>
	  				</InputGroupAddon>
	  				<InputGroupAddon addonType = "prepend" >	
					<InputGroupText className="button-add">
	  				<img src = {emojiButton} width="20px" height ="20px" />
					</InputGroupText>
					</InputGroupAddon>
					<form onSubmit = {this.handleClick}>
					<Input type ="text" placeholder = "Enter the text here" value = {this.state.comment} onChange = {this.handleChange} onKeyUp = {this.handleTag} style={{width:"430%"}}/>
					</form>
				</InputGroup>	
				</Col>
				</Row>
				
				
			</div>
			
		);
		
	}
}
const mapStateToProps = state => ({
    chats : state
})
const mapDispatch = dispatch => {
    dispatch(getChats())
    return {}
}
export default connect(mapStateToProps,mapDispatch)(Chat);
