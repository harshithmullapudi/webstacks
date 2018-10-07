import React, { Component } from 'react';
import {Card, CardBody, CardText, CardTitle, Col, Row, Form} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import './profile.css'
import Select from 'react-select';
import FormElement from '../FormElement';
import store, {checkUser, updateUser} from "../../store";
var QRCode = require('qrcode.react'); //For QR Code component taken from https://github.com/zpao/qrcode.react
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const options = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female'}
]

const boys = importAll(require.context('../../assets/boys', false, /\.(png|jpe?g|svg)$/));
const girls = importAll(require.context('../../assets/girls', false, /\.(png|jpe?g|svg)$/));

class Profile extends Component {
    constructor(props){
        super();
        this.state = {
            fields: {
                gender :  { value: 'male', label: 'male' }
            },
            btnState : true
        }
        this.onSubmit = (e) => {
            e.preventDefault();
            let photo = {};
            if(this.state.fields.gender.value === 'male')
            {
                photo["type"] = "boys";

            }
            else
            {
                photo["type"] = "girls"
            }
            photo["number"] = Math.floor((Math.random() * 7) + 1);
            store.dispatch(updateUser(this.props.user.Reducer.user, photo));
        }
        this.onChange = (id, field, val) => {
            if(field === 'github' || field === 'linkedin')
            {
                this.props.user.Reducer.user.social[field] = val;
            }
            else if(field === 'first' || field === 'last')
            {
                this.props.user.Reducer.user.name[field] = val;
            }
            else {
                this.props.user.Reducer.user[field] = val;
            }
        }
        this.handleChange = (selectedOption) => {
            this.state.fields["gender"] = selectedOption
        }

    }


    render() {
        let details;
        if(this.props.user.Reducer.user)
        {
          details =   (
               <Card className='h-100'>
                 {/* Implementing QR Code here. It will show Name, TeamID, Year of Study, Points, Github Link, LinedIn Link and Email of the user */}
                 <QRCode className="qr" value={"Name: " + this.props.user.Reducer.user["name"]["first"] + this.props.user.Reducer.user["name"]["last"] + "\n\nTeam Id: " + this.props.user.Reducer.user["teamId"] + "\n\nYear of Study: " + this.props.user.Reducer.user["year"] + "\n\nPoints: " + this.props.user.Reducer.user["points"] + "\n\nGitHub Link: " + this.props.user.Reducer.user["social"].github + "\n\nLinkedIn Link: " + this.props.user.Reducer.user["social"].linkedin + "\n\nEmail: " + this.props.user.Reducer.user["email"] } />
                   <div className="text-center">
                       <img src={this.props.user.Reducer.user["photo"]["type"] === 'boys' ? boys[this.props.user.Reducer.user["photo"]["number"] + '.svg'] : girls[this.props.user.Reducer.user["photo"]["number"] + '.svg']}
                            className="img-fluid rounded-circle toppers" alt="..."/>
                   </div>
                   <CardBody>
                       <CardTitle
                           className='cardTitle'>{this.props.user.Reducer.user["name"]["first"]} <span className='teamId'> ( Team ID : {this.props.user.Reducer.user["teamId"]} ) </span></CardTitle>
                       <CardText
                           className='cardTitle cardPoint'>{this.props.user.Reducer.user["points"]}</CardText>
                       <Form>
                           <FormElement name="first" inputType="text" value={this.props.user.Reducer.user ? this.props.user.Reducer.user.name.first : '' } fullName="Enter your First Name" action={this.onChange} />
                           <FormElement name="last" inputType="text" value={this.props.user.Reducer.user ? this.props.user.Reducer.user.name.last : '' } fullName="Enter your Last Name" action={this.onChange} />
                           <FormElement name="phone" inputType="number" value={this.props.user.Reducer.user ? this.props.user.Reducer.user.phone : '' } fullName="Enter your Phone Number" action={this.onChange} />
                           <FormElement name="github" inputType="text" value={this.props.user.Reducer.user ? this.props.user.Reducer.user.social.github : '' } fullName="Enter your Github URL" action={this.onChange} />
                           <FormElement name="linkedin" inputType="text" value={this.props.user.Reducer.user ? this.props.user.Reducer.user.social.linkedin : '' } fullName="Enter your Linkedin URL" action={this.onChange} />
                           <FormElement name="about" inputType="text" value={this.props.user.Reducer.user ? this.props.user.Reducer.user.about : '' } fullName="About you" action={this.onChange} />
                           <div className="form-group">
                               <label htmlFor='select'>Gender</label>
                               {this.props.user.Reducer.user.photo ? <Select defaultValue={this.props.user.Reducer.user.photo.type === 'boys' ? options[0]: options[1]} onChange={this.handleChange}  options={options} /> : <Select  onChange={this.handleChange}  options={options} /> }
                                   </div>
                           {this.state.btnState ? <button className="btn btn-outline-success" onClick={this.onSubmit}>Save</button> : ''}
                       </Form>
                   </CardBody>
               </Card>
           )
        }
        return (

            <Row className='rowclass'>
                <Col sm='12' md='12' className='column'>
                    {details}
                </Col>
            </Row>

        )
    }
}
const mapState = state => ({
    user : state
})
// const mapDispatch = dispatch => {
//     dispatch(checkUser())
//     return {}
// }
export default connect(mapState)(Profile);
