import React, { Component } from 'react';
import {signup} from '../../../redux/store';
import FormElement from '../FormElement';
import './addPeople.css'
import Select from 'react-select';
import * as firebase from "../../../firebase";
import {connect} from 'react-redux';

const options1 = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female'}
        ]
const options2 = [
    { value: 'Web Development', label: 'Web'},
    { value: 'Machine Learning', label: 'ML'},
    { value: 'App Development', label: 'App'}
]

class AddView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                firstName: "",
                lastName: "",
                about: "",
                email: "",
                phone : 0,
                tags : [],
                socialGithub: '',
                socialLinkedin : '',
                password: '',
                gender :   { value: 'male', label: 'male' },
                cluster: { value: 'Web Development', label: 'Web'}
            },
            btnState: false
        }
        this.onSubmit = (e) => {
            let photo = {};
            if(this.state.fields.gender.value === 'Male')
            {
                photo["type"] = "boys";

            }
            else
            {
                photo["type"] = "girls"
            }
            photo["number"] = Math.floor((Math.random() * 7) + 1);
            let data = {
                name: {
                    first : this.state.fields.firstName,
                    last : this.state.fields.lastName,
                },
                social: {
                    github: this.state.fields.socialGithub,
                    linkedin: this.state.fields.socialLinkedin
                },
                about: this.state.fields.about,
                email: this.state.fields.email,
                phone: this.state.fields.phone,
                password: this.state.fields.password,
                cluster: this.state.fields.cluster.value,
                points: 0,  
                photo
            }
            this.props.signup(data);
        }
        this.onChange = (id, field, val) => {
            this.state.fields[field] = val;
           let state  = (this.state.fields.firstName !== '' && this.state.fields.lastName !== '' && this.state.fields.about !== '' && this.state.fields.email !== '' && this.state.fields.phone !== 0 && this.state.fields.socialGithub !== '' && this.state.fields.socialLinkedin !== ''  && this.state.fields.gender !== '')
        this.setState({"btnState" : state});
        }
        this.handleGenderChange = (selectedOption) => {
            this.state.fields["gender"] = selectedOption
        }
        this.handleChange = (selectedOption) => {
            this.state.fields["cluster"] = selectedOption;
        }
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            if(authUser)
            {
                this.props.history.push('/')
            }
        });
    }
    render() {
        return (
            <div className='container'>
                <h3 className='heading'> Register </h3>
            <div className="card-body">
                <FormElement name="firstName" inputType="text" fullName="First Name" action={this.onChange} />
                <FormElement name="lastName" inputType="text" fullName="Last Name" action={this.onChange} />
                <FormElement name="about" inputType="text" fullName="About" action={this.onChange} />
                <FormElement name="email" inputType="email" fullName="Email" action={this.onChange} />
                <FormElement name="phone" inputType="number" fullName="Phone" action={this.onChange} />
                <FormElement name="socialGithub" inputType="text" fullName="Github Link" action={this.onChange} />
                <FormElement name="socialLinkedin" inputType="text" fullName="Linkedin Profile Link" action={this.onChange} />
                <label> Gender </label>
                <Select
                    onChange={this.handleGenderChange}
                    options={options1}
                />
                <label>Cluster</label>
                <Select
                    onChange={this.handleChange}
                    options={options2}
                />
                <FormElement name="password" inputType="password" fullName="Password" action={this.onChange} />
                {this.state.btnState ? <button className="btn btn-outline-success" onClick={this.onSubmit}>Add Record</button> : ''}
            </div>
            </div>
        )
    }
}
export default connect(null, {signup})(AddView);
