import React, { Component } from 'react';
import './tasks.css'
import menuImg from '../assets/menu.svg'
import {Button, Input} from 'reactstrap'
import  {notify} from 'react-notify-toast'
import { Nav, NavItem, NavLink } from 'reactstrap';
import {connect} from 'react-redux';
import {getTask, submitTask} from '../redux/store';
import uuid from 'uuid';
import bg from '../assets/bg15.png';
var isGithubUrl = require('is-github-url');


class Tasks extends Component {
    constructor(props){
        super(props);
        this.state = {
            "github" : '',
            'task' :[],
            btnState: false,
            activeTab: 0
        }
        this.handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            });
        } 
        this.changeStateTrue = () => {
            this.setState({'btnState' : true})
        }
        this.changeStateFalse = () => {
            this.setState({'btnState' : false})
        }
        this.setTab = (tab) => {
            this.setState({
                activeTab: tab
            });
        }
        this.submitTask = (data) =>{
            if(isGithubUrl(this.state.github))
            {
                this.props.submitTask({
                    taskId: data.id,
                    id: uuid(),
                    link: this.state.github,
                    userid: this.props.user.user.key
                });
                this.setState({
                    github: '',
                    btnState: false
                })
            }
            else {
                notify.show('Kindly check the github URL', 'error');
            }
        }
        this.toggleBtn = () => {
            this.setState({
                btnState: !this.state.btnState
            });
        }

    }

    componentDidMount() {
        this.props.getTask();
    }
    

    render() {
        if(this.props.user && this.props.user.answer)
        {
            this.state.task.push(this.props.user.answer.length);
            console.log(this.state.task.indexOf(1));
        }
        else
        {
            this.state.task = [];
        }
        let displayContent = "No Tasks Posted yet...";
        if(this.props.task) {
            const {task} = this.props;
            if(task[this.state.activeTab]) {
                let data = task[this.state.activeTab];
                displayContent = [];
                displayContent.push();
                displayContent = Object.keys(data).map((key) => {
                    let desc = data[key].description.map((d,id) => {
                        return (<li key={id}>
                            {d}
                        </li>)
                    });
                    return (
                        <div className="cd-timeline-block" key = {key}>
                            <div className="cd-timeline-img cd-picture">
                                <img src={menuImg}
                                    alt="Picture"/>
                            </div>
                            <div className="cd-timeline-content">
                                <h2 className='heading'>{data[key].title}</h2>
                                <p>Rubrics:</p>
                                <ol>{desc}</ol>
                                <p>Resources</p>
                                Refer: {data[key].resources}<br/>
                                {!this.state.btnState && <Button color="success" onClick = {this.toggleBtn} className="mt-3">Submit</Button>}
                                {this.state.btnState && <div>
                                    <Input type="text" name="github" value={this.state.github} onChange ={this.handleChange}></Input>
                                    <Button color="success" onClick = {() => this.submitTask(data[key])}
                                    className="mt-3">Submit</Button>
                                    </div>}
                                <span className="cd-date">{data[key].lastDate}</span>
                            </div>
                        </div>
                    )
                })

            }
        }
        let noTask = (
            <div className="no_task_wrapper">
                <img src={bg} />
                <h3>No Tasks posted yet</h3>
            </div>
        );
        const {activeTab} = this.state;
        return (    
            <div className='body'>
            <h1> Start where you are Use what you have Do what you can </h1>
            <Nav tabs className="justify-content-center">
                <NavItem>
                    <NavLink href="#" active={activeTab === 0} onClick = {() => this.setTab(0)}>Machine Learning</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" active={activeTab === 1} onClick = {() => this.setTab(1)}>Web Development</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" active={activeTab === 2} onClick = {() => this.setTab(2)}>App Development</NavLink>
                </NavItem>
                </Nav>
                {this.props.task !== undefined ? this.props.task[this.state.activeTab] !== undefined ? <section id="cd-timeline" className="cd-container">
                {displayContent}    
                </section>: noTask : noTask}
            </div>
        )
    }
}

const mapState = state => ({
    user : state,
    task : state.tasks
})
export default connect(mapState, {getTask,submitTask})(Tasks);
