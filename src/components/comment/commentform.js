import React from 'react';
import './commentform.css';

class CommentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentValue : '' 
		};
		this.handleChange = this.handleChange.bind(this);
		this.writeComment = this.writeComment.bind(this);
	}
	handleChange(e) {
	
			this.setState ({
			comValue: e.target.value
		})
	
	}
	writeComment() {
			this.props.addComment(this.state.comValue);
			this.setState({
			comValue: ''
		});	
	}
	render() {
		return(
		<div>
			<form>
				<input type="text" className = "combox" placeholder="Enter your comment" value={this.state.comValue} onChange ={this.handleChange}/>
				{ this.state.comValue ? <input className="comsubmit" type="button" value = "Submit" onClick = {this.writeComment}/> : ''}
			</form>
		</div>
		);
	}
}
export default CommentForm;