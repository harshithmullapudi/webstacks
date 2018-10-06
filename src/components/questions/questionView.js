import React, { Component } from 'react';
import './questionView.css'
import RichTextEditor from 'react-rte';
import {Form,FormGroup, Button, ListGroup, ListGroupItem, ListGroupItemHeading} from "reactstrap";
import {Link} from "react-router-dom";
import {addComentDB} from '../../store'
import connect from "react-redux/es/connect/connect";
class QuestionView extends Component {
    constructor(props){
        super();
        this.state = {
            value: RichTextEditor.createEmptyValue(),
        }
        this.onChange = (value) => {
            this.setState({value : value});
            if (this.props.onChange) {
                this.props.onChange(
                    value.toString('html')
                );
            }
        };
        this.addComent = () => {
            addComentDB(this.props.state.Reducer.question, this.state.value.toString('html')).then(result => {
                this.setState({
                    value: RichTextEditor.createEmptyValue()
                })
            })
        }
    }
    render() {
        let comments = [];
        if(this.props.state.Reducer.question.comments) {
            let arrayComments = Object.keys(this.props.state.Reducer.question.comments).map(k => this.props.state.Reducer.question.comments[k]);
            arrayComments.forEach(comment => {
                comments.push(
                    <ListGroupItem  key={comment.id}>
                        <div dangerouslySetInnerHTML={{ __html: comment.comment }} >
                        </div>
                        <p className='pName'>
                        <small >by <b>{comment.name}</b></small>
                        </p>
                    </ListGroupItem>

                )
            })

        }
        else
        {

                comments.push(
                    <h5 className='noComments'> No comments </h5>
                )

        }
        return (
            <div className='container Question'>
                <h3> {this.props.state.Reducer.question.title }</h3>
                <div dangerouslySetInnerHTML={{ __html: this.props.state.Reducer.question.description }} >
            </div>
                <br />
                <br />
                <br />
                <p><b> Add Comment </b> </p>
                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <Form>
                    <FormGroup>
                {this.props.user ? <Button color='success' onClick={this.addComent}> Comment </Button> : <Link class="nav-link" to='/login'>  <Button className="btn btn-success my-2 my-sm-0">Login</Button></Link>}
                    </FormGroup>
                </Form>
                <br />
                <br />
                <br />
                <ListGroup>
                    <ListGroupItem>
                        <ListGroupItemHeading>Comments</ListGroupItemHeading>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroup>
                            {comments}
                        </ListGroup>
                    </ListGroupItem>
                </ListGroup>

            </div>
        )
    }
}
const mapState = state => ({
    state: state
})

export default connect(mapState)(QuestionView);
