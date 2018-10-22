import React from 'react';
import connect from "react-redux/es/connect/connect";
import store, {checkUser, updateUser, addChatDB, getChats} from "../../store";
import {Button,Form, FormGroup, Card, CardHeader, CardFooter, CardTitle, CardText, CardBody, CardLink,Container, Row, Col, Table,InputGroup, InputGroupAddon, InputGroupText, Input, Media} from 'reactstrap';
import {database,storage} from '../../firebase';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker,Emoji } from 'emoji-mart';
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
			addButtonState : false,
			emojiState : false

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
		this.handleEmojiSelect = () => {
			this.setState({ emojiState : !this.state.emojiState })
		}
		this.handleEmoji = (e) => {
			console.log(e);
			let emoji="";
			if("0x"+e.unified !== NaN){
					emoji = String.fromCodePoint("0x"+e.unified);
					}
			let newComment = this.state.comment + emoji ;
			this.setState({
				comment : newComment
			});
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
		var imgStyle = {
			midWidth : "128px",
		};
		let content = [];
		if(this.props.chats.Reducer.chats ) {
			if(this.props.chats.Reducer.user)
			{
				for(var i=0; i<this.props.chats.Reducer.chats.length; i++)
						{
							if(this.props.chats.Reducer.chats[i]["name"] == (this.props.chats.Reducer.user.name.first + " " + this.props.chats.Reducer.user.name.last)) {
								content.push(
									<div>
									<Row key={i} className = "chat">
			                        	<Col md = "8" sm = "6"> </Col>
			                        	<Media>
			                        		<Media left href = "#">
			                        			<Media width = "40px" object src = {this.props.chats.Reducer.chats[i]["pic"] === 'boys' ? boys[this.props.chats.Reducer.chats[i]["picid"] + '.svg'] : girls[this.props.chats.Reducer.chats[i]["picid"] + '.svg']} />
			                        		</Media>
			                        		<Media body>
			                        			<Media heading style = {{fontSize : "1rem"}}>
			                        				<b>{this.props.chats.Reducer.chats[i]["name"]}</b>
			                        			</Media>
			                        			{this.props.chats.Reducer.chats[i]["description"]}
												{this.props.chats.Reducer.chats[i]["imgUrl"] !== "" ? <div><br/><img src = {this.props.chats.Reducer.chats[i]["imgUrl"]} height ="200px" width ="200px" /></div> : ""}	
			                        		</Media>
			                        	</Media>
			                		</Row>
			                		<br />
			                		</div>
									);
							}
							else
							{
								content.push(
								<div>
								<Row key={i} className = "chat">
			                       <Media>
			                        	<Media left middle href = "#">
			                        		<Media width = "40px" object src = {this.props.chats.Reducer.chats[i]["pic"] === 'boys' ? boys[this.props.chats.Reducer.chats[i]["picid"] + '.svg'] : girls[this.props.chats.Reducer.chats[i]["picid"] + '.svg']} />
			                        	</Media>
			                        	<Media body>
			                        		<Media heading style = {{fontSize : "1rem"}}>
			                        			<b>{this.props.chats.Reducer.chats[i]["name"]}</b>
			                        		</Media>
			                        			{this.props.chats.Reducer.chats[i]["description"]}
												{this.props.chats.Reducer.chats[i]["imgUrl"] !== "" ? <div><br/><img src = {this.props.chats.Reducer.chats[i]["imgUrl"]} height ="200px" width ="200px" /></div> : ""}	
			                        	</Media>
			                        </Media>
								</Row>
								<br />
								</div>
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
				<Col>
				{this.state.listState ? <div className="suggestion scroll-2">{suggestion}<div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div></div> : ""}
				{this.state.addButtonState && !this.state.imgUrl ? this.state.progress + "%" : ""}
				{this.state.imgUrl ? <img src = {successImg} width="20px" height="20px" /> : ""}
				<InputGroup className = "inputgroup">
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
	    				<b>+</b>
	  				</CustomUploadButton>
	  				</InputGroupText>
	  				</InputGroupAddon>
	  				<InputGroupAddon addonType = "prepend" >	
					<InputGroupText className="button-add">
	  				<img src = {emojiButton} width="20px" height ="20px" onClick = {this.handleEmojiSelect}/>
					</InputGroupText>
					</InputGroupAddon>
					<form className = "form" onSubmit = {this.handleClick}>
					<Input type ="text" placeholder = "Enter the text here" value = {this.state.comment} onChange = {this.handleChange} onKeyUp = {this.handleTag} />
					</form>
				</InputGroup>	
				</Col>
				</Row>
				<Row>
				<Col sm = "12" className = "chat">
				{this.state.emojiState ? <div className = "emojipicker">
						<Picker native = {true} tooltip = {true} onSelect={this.handleEmoji} sheetSize = "16" showSkinTones = {false} defaultSkin = {1} title = "" showPreview = {false}/>

					</div> : ""}
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
