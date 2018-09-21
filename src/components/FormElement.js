import React, { Component } from 'react';


export default class FormElement extends Component {
	render() {
	  return (
		<div className="form-group">
		<label htmlFor={this.props.name}>{this.props.fullName}</label>
		<input 
			type={this.props.inputType} 
			name={this.props.name} 
			className="form-control" 
			defaultValue={this.props.value || ''} 
			onChange={typeof this.props.action !== "undefined" ? (e => this.props.action(this.props.id, this.props.name, e.target.value)) : undefined} />
		</div>
	  );
	}
}
