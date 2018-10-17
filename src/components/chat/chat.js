import React from 'react';
import connect from "react-redux/es/connect/connect";
import store, {checkUser, updateUser, addChatDB, getChats} from "../../store";
import {Button, Input, Form, FormGroup, Card, CardHeader, CardFooter, CardTitle, CardText, CardBody, CardLink,Container, Row, Col, Table} from 'reactstrap';
import {database} from '../../firebase';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import emojiButton from '../../assets/emoji.png';
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
		this.state = {
			comment : "",
			emojiButton : false,
			listState : false,
			search : ''
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
			if(this.state.comment !== "")
			addChatDB(this.state.comment);
		
			this.setState({
				comment : ""
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
		this.myCallback = () => {
			this.setState ({emojiButton : !this.state.emojiButton});
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
					<Row id = {j} className = "hover" onClick = {this.handleTagname.bind(this,this.props.chats.Reducer.records[j]["name"]["first"]+" "+this.props.chats.Reducer.records[j]["name"]["last"])}>
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
				
				<Card className = "maincard scroll">
					<CardBody>
						{content}
						<div style={{ float:"left", clear: "both" }}
             				ref={(el) => { this.messagesEnd = el; }}>
        				</div>
					</CardBody>
				</Card>
				<div className="buttonWrapper">
					<form onSubmit = {this.handleClick} >
					<input className = "search-bottom" type ="text" placeholder = "Enter the text here" value = {this.state.comment} onChange = {this.handleChange} onKeyUp = {this.handleTag}/>
					</form>
				</div>
				{this.state.listState ? <div className="suggestion">{suggestion}</div> : ""}
				
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
