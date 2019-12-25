import React, {Component} from 'react';
import logo2 from './logo2.png';
import {Card, CardBody, CardText, CardTitle} from "reactstrap";
import './Updates.css';

 class UpdateView extends Component{
	render(){
		return(
      <div className='container'>
      <div className="text-center">

                       <img src={logo2} className="img-fluid rounded-circle toppers" />
                       <br/><br/>
                   </div>
          <Card className='card'>
                   <CardBody>
                          <CardText className='cardTitle'>
                          <p>Task 1 Completed and closed ,great respose.
                          </p>
                          </CardText>
                   </CardBody>
               </Card>
           
          <Card className='card'>
                   <CardBody>
                          <CardText className='cardTitle'>
                          <p>Task 2 Completed and closed ,Almost all submissions !!
                          </p>
                          </CardText>
                   </CardBody>
               </Card>
            
           
          <Card className='card'>
                   <CardBody>
                          <CardText className='cardTitle'>
                          <p>Task 3 ,Running Now<br/>
                          </p>
                          </CardText>
                   </CardBody>
               </Card>
           </div>       
			)
	}
}
 export default UpdateView

                             