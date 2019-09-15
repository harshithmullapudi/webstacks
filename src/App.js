import React, { Component, Fragment } from 'react';
import logo from './assets/logo.png';
import './App.css';
import { Router } from 'react-router-dom';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink
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
            isOpen: false
        };
        this.toggle = () => {
            this.setState({
              isOpen: !this.state.isOpen
            });
        }
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
                <Link className='navbar-brand' href="/" to="/" > <img src={logo}  width="200" height="auto" alt=""/></Link>
                    <NavbarToggler onClick={this.toggle} className="toggle-btn"/>
                    <Collapse isOpen={this.state.isOpen} navbar className="text-center">
                        <Nav className="ml-auto" navbar>
                        {this.state.authUser && <Fragment>
                            <NavItem >
                                <Link className="nav-link" to='/leaderboard'>Leaderboard</Link>
                            </NavItem>
                            <NavItem >
                                <Link className="nav-link" to='/tasks'>Tasks</Link>
                            </NavItem>
                            <NavItem> <Link className="nav-link" to='/profile'>Profile</Link></NavItem> 
                            <NavItem> <Link to='/forum' className="nav-link">Forum</Link></NavItem>
                            <NavItem> <Link to='/' className="nav-link" onClick={signOut}> Log out</Link></NavItem>
                        </Fragment>
                        }
                        { !this.state.authUser ?  <NavItem> <Link className="nav-link" to='/login'>Login</Link> </NavItem>  : ''}
                        { !this.state.authUser ?  <NavItem> <Link className="nav-link" to='/add'>Register</Link></NavItem> : ''}
                        </Nav>
                    </Collapse>
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
