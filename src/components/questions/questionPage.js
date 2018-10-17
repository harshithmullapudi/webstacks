import React, { Component } from 'react';
import store, {addQuestionDB, getQuestion, getQuestions} from "../../store";
import './questionsPage.css'
import RichTextEditor from 'react-rte';
import {Button, Input, Form, FormGroup, Card, CardHeader, CardFooter, CardTitle, CardText, CardBody, CardLink} from 'reactstrap';
import {notify} from "react-notify-toast";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import Questionview from './questionView'
class QuestionsView extends Component {

    constructor(props){
        super()
        this.state = {
            value: RichTextEditor.createEmptyValue(),
            addQuestion : false,
            title : '',
            selectedQuestion : null,
            search : '',
        }

        this.onChange = (value) => {
            this.setState({value : value});
            if (this.props.onChange) {
                this.props.onChange(
                    value.toString('html')
                );
            }
        };
        this.onChangeTitle = (value) => {
            this.setState({ title : value.target.value})
        }
        this.onChangeSearch = (value) => {
            this.setState({search: value.target.value})
        }
        this.addQuestion = (e) => {
            e.preventDefault();
            this.setState({ addQuestion : true});

        }
        this.deleteQuestion = (e) => {
            e.preventDefault();
            this.setState({ addQuestion : false});
        }
        this.addQuestionStart = (e) => {
            e.preventDefault();
            if(this.state.title && this.state.value.toString('html')) {
                addQuestionDB(this.state.title, this.state.value.toString('html')).then(response => {
                    notify.show("Successfully added question", "success")
                    this.setState({
                        value: RichTextEditor.createEmptyValue(),
                        title: '',
                        addQuestion: false
                    })
                })
            }
            else {
                notify.show("Fill the details correctly", "error");
            }
        }
        this.cancelSelectionQuestion = () => {
            this.setState({
                selectedQuestion : null
            })
        }


    }
    selectQuestion = (question) => {
        this.setState({
            selectedQuestion : question
        })
        getQuestion(question.id, store.dispatch)
    }
    render() {
        let questions = [];
        if(this.state.search !== '') {
            this.props.questions.Reducer.questions.forEach(question => {

                if ((question.title.includes(this.state.search)) || (question.description.includes(this.state.search))) {
                    let description = [];
                    description.push(question.description)
                    questions.push(  <Card className='cardCss' key={question.id}>
                        <CardBody>
                            <CardTitle><b>{question.title}</b>
                                <span className='date float-right'>{(new Date(question.added)).toDateString()}</span>
                            </CardTitle>
                            <CardText>  <div dangerouslySetInnerHTML={{__html: description}}/></CardText>
                            <Button color="info" className='float-right' onClick={() => {
                                this.selectQuestion(question)
                            }
                            }>View</Button>
                        </CardBody>
                        <CardFooter>
                            <small>by <b>{question.name}</b></small>
                            { Object.keys(question.comments).map(k => question.comments[k]).length ?  <p className='float-right'><b> {Object.keys(question.comments).map(k => question.comments[k]).length} Comments </b></p> : '' }
                        </CardFooter>
                    </Card>)
                }
            })
        }
        else
        {
            this.props.questions.Reducer.questions.forEach(question => {
                let description = [];
                description.push(question.description)
                questions.push(
                    <Card className='cardCss' key={question.id}>
                        <CardBody>
                            <CardTitle><b>{question.title}</b>
                            <span className='date float-right'>{(new Date(question.added)).toDateString()}</span>
                            </CardTitle>
                            <CardText>  <div dangerouslySetInnerHTML={{__html: description}}/></CardText>
                            <Button color="info" className='float-right' onClick={() => {
                                this.selectQuestion(question)
                            }
                            }>View</Button>
                        </CardBody>
                        <CardFooter>
                            <small>by <b>{question.name}</b></small>
                            { question.comments && Object.keys(question.comments).map(k => question.comments[k]).length ?  <p className='float-right'><b> {Object.keys(question.comments).map(k => question.comments[k]).length} Comments </b></p> : '' }
                        </CardFooter>
                    </Card>
                )
            })
        }
        if(questions.length === 0)
        {
            questions.push(
                <h5 className='noComments'> No questions posted </h5>
            )
        }
        return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                 <a className="navbar-brand" onClick={this.cancelSelectionQuestion}>Forum</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        {this.props.questions.Reducer.user ? <button className="btn btn-success my-2 my-sm-0" onClick={this.addQuestion}>Add question</button> : <Link class="nav-link" to='/login'>  <Button className="btn btn-success my-2 my-sm-0">Login / Add question</Button></Link> }
                    </form>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.search} onChange={this.onChangeSearch} />
                    </form>
                </div>
            </nav>
                {this.state.addQuestion ? <div className='containerType'>
                        <Form>
                            <FormGroup>
                            <label htmlFor="exampleInputEmail1">Title</label>
                            <Input type='text' id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter Title of your question" value={this.state.title} onChange={this.onChangeTitle}/>
                                <small id="emailHelp" className="form-text text-muted">Please keep it very short
                                </small>
                            </FormGroup>

                    <RichTextEditor
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                        <Button className='bitBottom' color="success" onClick={this.addQuestionStart}>Add question</Button>
                        <Button className='bitBottom' color="danger" onClick={this.deleteQuestion}>Cancel</Button>
                        </Form>
                </div> :''}
                {this.state.selectedQuestion && this.props.questions.Reducer.question ?  <Questionview user={this.props.questions.Reducer.user}/> : <div className='container'>
                    <div>
                        {questions}
                    </div>
                    <div className="list-group">

                    </div>
                </div>}
            </div>
        )
    }
}
const mapState = state => ({
    questions: state
})

const mapDispatch = dispatch => {
    dispatch(getQuestions())
    return {}
}
export default connect(mapState, mapDispatch)(QuestionsView);
