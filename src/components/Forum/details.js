import React, { Component, Fragment } from 'react';
import {Form, Input, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {addReply} from '../../redux/store';
import './detail.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reply: ""
        }
        this.handleChange = (e) => {
            this.setState({
                reply: e.target.value
            });
        }
        this.handleSubmit = () => {
            let data = {
                channel: this.props.channel,
                key: this.props.id,
                reply: this.state.reply,
                author: this.props.user.name.first
            }
            console.log(data);
            this.props.addReply(data);
        }
    }
    
    render() {
        const {question} = this.props;
        let replies = [];
        if(question.replies) {
            console.log(question.replies);
            let temp = question.replies;
            replies = Object.keys(question.replies).map((k,id) => {
                return (
                    <div className="replycard" key = {id}>
                        <p className="text-muted mt-3">{temp[k].reply}</p>
                        <p className="text-muted"><small> - By {`${temp[k].author} at ${new Date(temp[k].timestamp)}`}</small></p>
                    </div>
                );
            })
        }
        return (
            <Fragment>
                <div className="card container question-card ">
                    <h3 className="mt-2 text-left">{question.title}</h3>
                    <p>{question.description}</p>
                    <div className="mb-3">
                        <small className="text-muted">{`Posted by ${question.userName} at ${new Date(question.timestamp)}`}</small>
                    </div>
                </div>
                <div className="reply-container">
                {replies} 
                </div>
            <hr/>
            <h4>Your Answer</h4>
            <div className ="container question-card">
                <Form>
                    <Input type="textarea" name ="reply" placeholder="Type you answer here." value = {this.state.reply} onChange = {this.handleChange} rows="5" />
                    <Button className="btn-success mt-2 mb-2" onClick = {this.handleSubmit}>Submit</Button>
                </Form>
            </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state,props) => {
    return {
    user: state.user,
    question: state.questions[props.channel][props.id]
}}

export default connect(mapStateToProps, {addReply})(Details);