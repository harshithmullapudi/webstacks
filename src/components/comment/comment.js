import React from 'react';
import CommentForm from './commentform.js';
import CommentData from './commentdata.js';
import {secondary} from './config.js';
import firebase from 'firebase';
import {auth}  from './firebase';
import './comment.css';

class Comment extends React.Component {
	



	constructor(props)
	{	
		
		super(props);
		this.state = {
			comment : [],
			childName : this.props.childName,
			currentUser : auth.currentUser ? auth.currentUser.displayName : null 
		}
		//Binding stuff happening here
		this.addComment = this.addComment.bind(this);
		

		//Connecting to database and retreiving data for the first time		
		this.secondaryDatabase = secondary.database().ref().child('comment');
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
		this.secondaryDatabase.orderByChild("uname").equalTo(this.state.childName).on('value', snapshot => {
            //to check if any data is available in the db according to the above condtion
            if(!snapshot.exists())
               { 
               	this.setState({comment : []});
                
 				}         
          	  else
                {
                	this.getData(snapshot);
                }
        });
    	

	}
	



	//This function pushes the newly added comment into the array
	addComment(newComment,childName) {
		//newComment is the string typed in the input form and 
		//childName is the name of person whose view has been opened
		let oldComments = this.state.comment;
		oldComments.push({content : newComment});
		this.setState({comment : oldComments });
		const comment = {
			uname : this.state.childName,
			content : newComment,
			author : this.state.currentUser};
		this.secondaryDatabase.push(comment);
	}
	
	




	//To re-render the childName
	componentWillReceiveProps(nextProps){
 	 if(nextProps.childName!==this.props.childName){
 	 	//retreiving data from database again after updating childName value
    	this.setState({childName: nextProps.childName });
    	this.secondaryDatabase.orderByChild("uname").equalTo(nextProps.childName).on('value', snapshot => {
            if(!snapshot.exists())
              { 

              
          		this.setState({comment : []});

          		}
            else
                {
                	this.setState({comment : []});

                	this.getData(snapshot);
                }	
        });
    	
		   
  }
  
}
	
	



	//stores the values obtained from the db in the comment array
	getData(values) {
		 			
		  this.setState({ comment : []}); 
		  this.setState({ comment : Object.keys(values.val()).map(k => values.val()[k])});

		 	
	}
	




	//to reset the currentUser value whenever logged out
	componentWillUnmount() {
			
	 var authCheck = auth.onAuthStateChanged(function(user) {
	  if (!user) {
	    this.setState({currentUser : null})
	  } else {
	    this.setState({currentUser : user.displayName	})
	 
	  }
	}.bind(this));
	 authCheck();
	}
		

	

	render()
	{

		console.log(this.state.currentUser);
		let comments = [];
        this.state.comment.forEach(comment => {
                comments.push(<CommentData content={comment.content} author={comment.author} />)
        })

		return (
				

			<div>
				<div className ="bodycomment">
					{comments}
				</div>
				<div className = "footer">
				{this.state.currentUser ? <CommentForm addComment={this.addComment}/> : ""}
				</div>
			</div>

			);
	}
}
export default Comment;