import React from 'react';

class CommentData extends React.Component {
	constructor(props)
	{
		super(props);
		this.content = this.props.content;
		this.author = this.props.author;
	}
	render() {
		return (

				<div>
					 <b>{this.author}</b>
					 <p>{this.content}</p>
				</div>

			);
	}
}
export default CommentData;	