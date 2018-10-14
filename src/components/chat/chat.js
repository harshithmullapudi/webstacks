import React from 'react';
import connect from "react-redux/es/connect/connect";
import store, {checkUser, updateUser, addChatDB, getChats} from "../../store";
import {Button, Input, Form, FormGroup, Card, CardHeader, CardFooter, CardTitle, CardText, CardBody, CardLink} from 'reactstrap';
import {database} from '../../firebase';
class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment : "",
			messages : null
		}
		this.handleChange = (e) => {
			this.setState({
				comment : e.target.value
			})
		}
		this.handleClick = () => {
			if(this.state.comment !== "")
			addChatDB(this.state.comment);
		
			this.setState({
				comment : ""
			});
		}
	}
	
	render() {
		let content = [];
		let msg;
		if(this.props.chats.Reducer.chats)
		{
			msg = Object.keys(this.props.chats.Reducer.chats).map(k => this.props.chats.Reducer.chats[k]);
			console.log(msg);
			msg.forEach(d => {content.push(<li key={d.id}>{d.description}</li>)});
		}	
		return (
			<div>
			<CardBody>
			{content}
			<input type ="text" placeholder = "Enter the text here" value = {this.state.comment} onChange = {this.handleChange} />
			<button onClick = {this.handleClick} >Submit</button>
			</CardBody>

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
