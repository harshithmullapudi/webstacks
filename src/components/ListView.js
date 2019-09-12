import React, { Component } from 'react';
import './listView.css'
import RecordItems from './Leaderboard/RecordItems';
class ListView extends Component {
    constructor(props){
        super();


    }
	render() {
        return (
            <RecordItems />
		)
	}
}
export default ListView;