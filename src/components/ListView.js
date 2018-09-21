import React, { Component } from 'react';
import './listView.css'
import RecordItems from './RecordItems'
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