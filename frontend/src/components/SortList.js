import React, { Component } from 'react';
import SortMember from './SortMember';
import bubbleSort from './../sorts/bubbleSort';
//import key from "weak-key";

class SortList extends Component{

    /*state = {
        members : [],
        states : [],
        number : 10,
        sorted : false
    }*/

    render(){

        return(
            
            <React.Fragment>
                {this.props.members}
            </React.Fragment>
        )

    }
}

export default SortList;