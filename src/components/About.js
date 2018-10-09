import React, {Component} from 'react';
import './About.css';

class About extends Component{
	render(){
		return(
          <div>
            <div className="about-text">
             <p className="p2">We are community of students who learn together and come up with revolutionary ideas<p>
             <p className="p1">We are the leaders of tommorrow!</p>
            </div>  
            <div className="about">
              <div>
                <img src="grpimg.jpg" className="aboutimg"  alt={title} /> 
              </div>
               <div>
                <img src="grpimg1.jpg" className="aboutimg1"  alt={title} /> 
               </div>            
             </div>
          </div>
			);
	}
}

export default About;