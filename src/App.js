import React, { Component } from 'react';
import logo from './assets/logo.png';
import './App.css';
import { Router } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';
import * as firebase from './firebase';
import {Link} from 'react-router-dom'
import  {Provider, connect} from "react-redux";
import store, {checkUser, history, watchTaskChangedEvent} from "./redux/store";
import Notifications from 'react-notify-toast';
import {signOut} from './redux/store'
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
        this.props.checkUser();
    }
  render() {
    return (
        <div>
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
        </div>
    );
  }
}

export default connect(null, {checkUser})(App);
