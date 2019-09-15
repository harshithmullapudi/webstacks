import React, {Fragment, Component} from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import AddView from '../Auth/Register/addPeople';
import Tasks from '../task';
import LoginView from '../Auth/Login/login';
import ProfileView from '../Profile/profileView';
import ListView from '../ListView';
import QuestionPage from '../Forum/questionPage';
import Landing from '../Landing/landing';
import {connect} from 'react-redux';

class Routes extends Component {
    render() {
        const {user} = this.props;
        return (
            <Switch>
                <Route exact path="/" component = {Landing}/>
                <Route exact path="/add" component={AddView} />
                <Route exact path="/login" component={LoginView} />
                <Route exact path="/forum" render = {(props) => (
                    user === null ? <Redirect to='/'/> : <QuestionPage {...props}/>
                )} />
                <Route exact path="/tasks" render = {(props) => (
                    user === null ? <Redirect to='/'/> : <Tasks {...props}/>
                )} />
                <Route exact path="/profile" render = {(props) => (
                    user === null ? <Redirect to='/'/> : <ProfileView {...props}/>
                )}/>
                <Route exact path="/leaderboard"render = {(props) => (
                    user === null ? <Redirect to='/'/> : <ListView {...props}/>
                )} />
            </Switch>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default withRouter(connect(mapStateToProps)(Routes));