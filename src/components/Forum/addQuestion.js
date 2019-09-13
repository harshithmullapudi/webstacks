import React, { Component } from 'react';
import {Card, Button, Input, Form } from 'reactstrap';
import {notify} from 'react-notify-toast';
import {connect} from 'react-redux';
import {addQuestion} from '../../redux/store';
import uuid from 'uuid-random';

class AddQuestion extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: ""
        }
        this.handleChange = (e) => {
            this.setState({
                [e.target.name]:e.target.value
            })
        }
        this.submitQuestion = () => {
            if(this.state.title === "" || this.state.description === "") {
                notify.show("Question cannot be empty!", "error");
                return;
            }
            let data = {
                id: uuid(),
                title: this.state.title,
                description: this.state.description,
                cluster: this.props.cluster,
                timestamp: new Date().toISOString(),
                userID: this.props.user.key,
                userName: this.props.user.name.first,
                replies: []
            }
            this.props.addQuestion(data);
            this.setState({
                title: "",
                description: ""
            })
        }
    }
    
    render() {
        return (
            <div >
                <p>Add a new question</p>
                    <Form>
                        <Input type="text" placeholder="Title" className="mb-2" name="title" onChange = {this.handleChange}/>
                        <Input type="textarea" rows="4" placeholder="Description" name="description" onChange = {this.handleChange}/>
                        <Button className = "btn-success mt-1" onClick={this.submitQuestion}>Add Question</Button>
                    </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {addQuestion})(AddQuestion);