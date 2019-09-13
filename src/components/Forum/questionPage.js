import React, { Component, Fragment } from 'react'
import {Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';
import './questionsPage.css';
import AddQuestion from './addQuestion';
import {connect} from 'react-redux';
import {getQuestions} from '../../redux/store';
import Details from './details';

const cluster =  ["Machine Learning", "Web Development","App Development" ];

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: 0,
            viewMode: 0,
            questions: null,
            selectedQuestion: null
        }

        this.handleChannel = (e) => {
            this.setState({
                channel: e.target.value,
                viewMode: 0
            });
        }
        this.setViewMode = (data) => {
            this.setState({
                viewMode: 1,
                selectedQuestion: data
            });
        }
        this.backButton = () => {
            this.setState({
                viewMode: 0,
                selectedQuestion: null
            })
        }
    }
    componentDidMount() {
        this.props.getQuestions();
    }    

    render() {
        const {questions} = this.props;
        let jsx = "No questions posted.."
        if(questions.length === 0) {
            console.log("Wait for data....");
        } else {
            console.log("Recieved data", questions);
            let data = questions[this.state.channel];
            if(questions[this.state.channel]) {
                jsx = Object.keys(data).map(key => {
                    let date = new Date(data[key].timestamp);
                    let name = data[key].userName
                    return (
                    <div className="card container question-card">
                     <h5 className="mt-2">{data[key].title}</h5>        
                     <p>{data[key].description}</p>
                     <div className="mb-2 question-footer">
                         <small className="text-muted">{`Asked by ${name} at ${date}`}</small>
                         <Button className="btn btn-danger" onClick = {() => (
                             this.setViewMode(data[key])
                            )}>View</Button>
                     </div>
                 </div>
                )});
            } 
        }   
        return (
            <div className="container">
                <h3 className="heading">Forum</h3>
                <Row className="forum">
                    <Col md={4}>
                        <h4>Channels</h4>
                        <ListGroup onClick = {this.handleChannel}>
                            <ListGroupItem value={0} className="cluster-group">
                                Machine Learning
                            </ListGroupItem>
                            <ListGroupItem value={1} className="cluster-group">
                                Web Development
                            </ListGroupItem>
                            <ListGroupItem value={2} className="cluster-group">
                                App Development
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={8}>
                        {this.state.viewMode === 0 && <Fragment>
                        <h4>Questions ({cluster[this.state.channel]})</h4>
                        {jsx}
                        <hr />
                        <AddQuestion onAdd={this.addQuestions} cluster = {this.state.channel}/>
                        </Fragment>}
                        {
                            this.state.viewMode === 1 && 
                            <Fragment>
                                <Button onClick = {this.backButton}>Back</Button>
                                <Details id = {this.state.selectedQuestion.id} channel = {this.state.channel}/>
                            </Fragment>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    questions: state.questions
});


export default connect(mapStateToProps,{getQuestions})(QuestionPage);