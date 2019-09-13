import React, {Fragment} from 'react'
import {Route} from 'react-router-dom';
import AddView from '../Auth/Register/addPeople';
import task from '../task';
import LoginView from '../Auth/Login/login';
import ProfileView from '../Profile/profileView';
import ListView from '../ListView';
import QuestionPage from '../Forum/questionPage';

export default function Routes() {
    return (
        <Fragment>
            <Route exact path="/" component={QuestionPage} />
            <Route exact path="/add" component={AddView} />
            <Route exact path="/tasks" component={task} />
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/profile" component={ProfileView} />
            <Route exact path="/leaderboard" component={ListView} />
        </Fragment>
    )
}
