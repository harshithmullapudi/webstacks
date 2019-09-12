import React, {Fragment} from 'react'
import {Route} from 'react-router-dom';
import questionView from '../Forum/questionView';
import AddView from '../Auth/Register/addPeople';
import task from '../task';
import LoginView from '../Auth/Login/login';
import ProfileView from '../Profile/profileView';
import ListView from '../ListView';

export default function Routes() {
    return (
        <Fragment>
            <Route exact path="/" component={questionView} />
            <Route exact path="/add" component={AddView} />
            <Route exact path="/tasks" component={task} />
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/profile" component={ProfileView} />
            <Route exact path="/leaderboard" component={ListView} />
        </Fragment>
    )
}
