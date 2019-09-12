import React, { Component } from 'react';
import logo from './assets/logo.png';
import './App.css';
import { Router, Route} from 'react-router-dom';
import ListView from './components/ListView';
import {
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';
import * as firebase from './firebase';
import {Link} from 'react-router-dom'
import Provider from "react-redux/es/components/Provider";
import store, {checkUser, history, watchTaskChangedEvent} from "./redux/store";
import AddView from "./components/Auth/Register/addPeople";
import Tasks from "./components/task";
import LoginView from "./components/Auth/Login/login";
import Notifications from 'react-notify-toast';
import {signOut} from './redux/store'
import ProfileView from "./components/Profile/profileView";
import QuestionsView from "./components/Forum/questionPage";
import Routes from './components/Router/router';
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
        });
        // store.dispatch(checkUser())
        // watchTaskChangedEvent(store.dispatch);

    }
  render() {
    return (
        <Provider store={store}>
        <Router history={history}>
            <main>
                <Notifications/>
                <Navbar color="light" light expand="md">
                        <Link class='navbar-brand' href="/" to="/" > <img src={logo}  width="200" height="auto" alt=""/></Link>
                    <Nav className="ml-auto" navbar>
                        <NavItem >
                            <Link class="nav-link" to='/leaderboard'>Leaderboard</Link>
                        </NavItem>
                        <NavItem >
                            <Link class="nav-link" to='/tasks'>Tasks</Link>
                        </NavItem>
                        { !this.state.authUser ?  <NavItem> <Link class="nav-link" to='/login'>Login</Link> </NavItem>  : ''}
                        { !this.state.authUser ?  <NavItem> <Link class="nav-link" to='/add'>Register</Link></NavItem> : ''}
                        { this.state.authUser ?  <NavItem> <Link class="nav-link" to='/profile'>Profile</Link></NavItem> : ''}
                        { this.state.authUser ?  <NavItem> <Link to='/' class="nav-link" onClick={signOut}> Log out</Link></NavItem> : ''}
                    </Nav>
                </Navbar>
                    <div className="card main">
                        <Routes />
                    </div>
            </main>
        </Router>
        </Provider>
    );
  }
}

export default App;
