import React, { Component } from 'react';
import './tasks.css'
import task from '../assets/menu.svg'
import {Button, Form, Alert} from 'reactstrap'
import FormElement from "./FormElement";
import connect from "react-redux/es/connect/connect";
import  {notify} from 'react-notify-toast'
import store,{submitTestUrl} from "../store";
var isGithubUrl = require('is-github-url');
class Tasks extends Component {
    constructor(props){
        super();
        this.state = {
            "github" : '',
            'task' :[],
            btnState: false
        }
        this.onChange = (id, field, val) => {
                this.state[field] = val;

        }
        this.changeStateTrue = () => {
            this.setState({'btnState' : true})
        }
        this.changeStateFalse = () => {
            this.setState({'btnState' : false})
        }
        this.submitTask = () =>{
            if(isGithubUrl(this.state.github))
            {
                store.dispatch(submitTestUrl(this.state.github));
            }
            else {
                notify.show('Kindly check the github url', 'error');
            }
        }

    }

    render() {
        if(this.props.user.Reducer.user && this.props.user.Reducer.user.answer)
        {
            console.log("entered");
            this.state.task.push(this.props.user.Reducer.user.answer.length);
            console.log(this.state.task.indexOf(1));
        }
        else
        {
            this.state.task = [];
        }
        return (

            <body className='body'>
            <h1> Start where you are Use what you have Do what you can </h1>
            <section id="cd-timeline" className="cd-container">
                <div className="cd-timeline-block">
                    <div className="cd-timeline-img cd-picture">
                        <img src={task}
                             alt="Picture"/>
                    </div>
                    <div className="cd-timeline-content">
                        <h2 className='heading'>Facebook Login Page Replication</h2>
                        <p>
                            There are 3 stages in this task.<br />
                            1. Create facebook login page with basic html. (Note : Don't use any CSS, JS and any frameworks)<br />
                            2. Extend your work by adding CSS and making it exactly similar to the facebook page.<br />
                            3. Then add JS and check if it prints <b>"logged in" </b> in the console. <br /><br />

                            Refer : w3schools for to practice html, css, js<br /><br />

                           <b>** The upload button would show up at 4pm on September 13th. All the best **</b><br />
                         </p>
                        {/*{this.state.task.indexOf(1) > -1 ?   <Alert color="success">*/}
                          {/*Submitted !! :) will get back soon*/}
                        {/*</Alert> : ''}*/}
                      <Alert color="success">
                       Results are out :)
                        </Alert>

                        <span className="cd-date">Sep 13</span>
                    </div>
                </div>
                <div className="cd-timeline-block">
                    <div className="cd-timeline-img cd-picture">
                        <img src={task}
                             alt="Picture"/>
                    </div>
                    <div className="cd-timeline-content">
                        <h2 className='heading'>Creating a Leaderboard.</h2>
                        <p>
                            There are 4 stages in this task.<br />
                            1. Make a design of leaderboard. (can make it same as the current website)<br />
                            2. Connect to database using PHP/NODE JS<br />
                            3. Get all the data from database and show in leader board.<br />
                            4. Make login compulsory to view leader board.<br /><br />

                            References :<br /><br />

                            <b> Designs for Leaderboard </b> : <a className={'aLink'} target="_blank" href='https://dribbble.com/tags/leaderboard'> click here</a><br /><br />

                            <b> PHP references</b>  : <br />
                            1. PHP Intro : <a className={'aLink'} target="_blank" href='https://www.w3schools.com/php/php_intro.asp'> click here </a><br />
                            2. PHP Mysql db : <a className={'aLink'} target="_blank" href='https://www.w3schools.com/php/php_mysql_intro.asp'> click here </a><br />
                            3. PHP CRM example : <a className={'aLink'} target="_blank" href='https://medium.freecodecamp.org/building-a-simple-crm-from-scratch-in-php-58fef061b075'>click here</a><br /><br />


                            <b> NODE JS references</b><br />
                            1. NODE JS intro (deep): <a className={'aLink'} target='_blank' href='https://medium.freecodecamp.org/getting-off-the-ground-with-expressjs-89ada7ef4e59'>click here</a><br />
                            2. NODE JS intro (short): <a className={'aLink'} target='_blank' href='https://medium.com/javascript-scene/introduction-to-node-express-90c431f9e6fd'>click here</a><br />
                            3. NODE JS with mysql: <a className={'aLink'} target='_blank' href='https://medium.com/@avanthikameenakshi/building-restful-api-with-nodejs-and-mysql-in-10-min-ff740043d4be'>click here</a><br />



                            <Alert color="success">
                                Results are out :)
                            </Alert>

                           {/*<br /><br /><b>** The upload button would show up at 4pm on September 20th. All the best **</b>*/}
                            {/*{this.state.task.indexOf(2) > -1 ?   <Alert color="success">*/}
                            {/*Submitted !! :) will get back soon*/}
                            {/*</Alert> : ''}*/}
                            {/*{this.props.user.Reducer.user === null || this.state.task.indexOf(2) > -1 || this.state.btnState ? '' : <Button color="success" className='float-right' size='sm' onClick={this.changeStateTrue}> Submit </Button>}*/}
                            {/*{this.props.user.Reducer.user !== null && this.state.task.indexOf(2) < 0 && this.state.btnState ? <Form> <FormElement name="github" inputType="text"  fullName="Give the github url" action={this.onChange} /> </Form> : ''}*/}
                            {/*{this.props.user.Reducer.user !== null && this.state.task.indexOf(2) < 0 && this.state.btnState ? <Button color="success" className='float-right' onClick={this.submitTask}> Submit </Button>: ''}*/}
                            {/*{this.props.user.Reducer.user !== null && this.state.task.indexOf(2) < 0 && this.state.btnState ? <Button color="error" className='float-right margin' onClick={this.changeStateFalse}> Cancel </Button>: ''}*/}

                        </p>
                        <span className="cd-date">Sep 20</span>
                    </div>
                </div>
                <div className="cd-timeline-block">
                    <div className="cd-timeline-img cd-picture">
                        <img src={task}
                             alt="Picture"/>
                    </div>
                    <div className="cd-timeline-content">
                        <h2 className='heading'> React Start </h2>
                        <p>
                            There are 5 stages in this task.<br />
                            1. Create a hello world react app.<br />
                            2. Create a same UI of leaderboard in react app and tell similarities and dissimilarities keeping both side by side.<br />
                            3. Add anyone feature you feel to the existing webstacks react app.<br />
                            4. Make a pull request to the webstacks repository with the added feature.<br />
                            5. Create a unique qr for every person and show it in both profile and view details.<br /><br />

                            Refer : <br />
                            1. <a className={'aLink'} href='https://medium.com/@prmeister89/getting-started-with-react-8d67e2adc4df'>Getting started with react</a><br />
                            2. <a className={'aLink'} href='https://hackernoon.com/getting-started-with-react-redux-1baae4dcb99b'>Getting started with react and redux</a><br />
                            3. <a className={'aLink'} href='https://www.codementor.io/vijayst/using-firebase-with-redux-for-building-a-react-app-du1086puw'>Getting started with react, redux and firebase</a><br />

                            <b>** The upload button would show up at 4pm on October 8th. All the best **</b><br />
                        </p>
                        {/*{this.state.task.indexOf(1) > -1 ?   <Alert color="success">*/}
                        {/*Submitted !! :) will get back soon*/}
                        {/*</Alert> : ''}*/}


                        {/*<br /><br /><b>** The upload button would show up at 4pm on September 20th. All the best **</b>*/}
                        {this.state.task.indexOf(3) > -1 ?   <Alert color="success">
                        Submitted !! :) will get back soon
                        </Alert> : ''}
                        {this.props.user.Reducer.user === null || this.state.task.indexOf(3) > -1 || this.state.btnState ? '' : <Button color="success" className='float-right' size='sm' onClick={this.changeStateTrue}> Submit </Button>}
                        {this.props.user.Reducer.user !== null && this.state.task.indexOf(3) < 0 && this.state.btnState ? <Form> <FormElement name="github" inputType="text"  fullName="Give the github url" action={this.onChange} /> </Form> : ''}
                        {this.props.user.Reducer.user !== null && this.state.task.indexOf(3) < 0 && this.state.btnState ? <Button color="success" className='float-right' onClick={this.submitTask}> Submit </Button>: ''}
                        {this.props.user.Reducer.user !== null && this.state.task.indexOf(3) < 0 && this.state.btnState ? <Button color="error" className='float-right margin' onClick={this.changeStateFalse}> Cancel </Button>: ''}


                        <span className="cd-date">Oct 5</span>
                    </div>
                </div>
                <div className="cd-timeline-block">
                    <div className="cd-timeline-img cd-picture">
                        <img src={task}
                             alt="Picture"/>
                    </div>
                    <div className="cd-timeline-content">
                        <h2 className='heading'> Final </h2>
                        <p>
                            There are 6 stages in this task.<br />
                            1. Creating a new Component called CHAT Component.<br />
                            2. Creating a UI for chat.<br />
                            3. Adding common chat functionality i.e anybody can message here.<br />
                            4. Adding feature -  Images/files in chat.<br />
                            5. Adding feature - letting people tag by name i.e when he/she types @.<br />
                            6. Adding feature - emojis in chat.<br /><br />

                            Every stage should be a pull request to the module.<br /><br />

                            Refer : <br />
                            1. <a className={'aLink'} href='https://github.com/harshithmullapudi/emoji-picker'>Here you have example task to make emoji picker can try using the code.</a><br />


                        </p>

                        <span className="cd-date">Oct 13</span>
                    </div>
                </div>
            </section>
            </body>
        )
    }
}

const mapState = state => ({
    user : state
})
export default connect(mapState)(Tasks);
