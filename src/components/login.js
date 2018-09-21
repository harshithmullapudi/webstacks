import React, { Component } from 'react';
import FormElement from './FormElement';
import './login.css'

import {login} from '../store'
import * as firebase from "../firebase";

class LoginView extends Component {
    constructor(props) {
        super();
        this.state = {
            fields: {
               email : '',
                password : ''
            },
            btnState: false
        }

        this.onSubmit = (e) => {
            login(this.state.fields.email, this.state.fields.password)
        }
        this.onChange = (id, field, val) => {
            this.state.fields[field] = val;
            let state  = (this.state.fields.email !== '' && this.state.fields.password !== '')
            this.setState({"btnState" : state});
        }

    }
    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.props.history.push('/')
                : '';
        });
    }
    render() {
        return (
            <div className='container'>
                <h3 className='heading'> Login </h3>
                <div className="card-body">
                    <FormElement name="email" inputType="email" fullName="Enter your email Id" action={this.onChange} />
                    <FormElement name="password" inputType="password" fullName="Enter your password" action={this.onChange} />
                    {this.state.btnState ? <button className="btn btn-outline-success" onClick={this.onSubmit}>Login</button> : ''}
                </div>
            </div>
        )
    }
}
export default LoginView;
