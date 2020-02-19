import React, { Component } from 'react';

//Could've done this without a SortList component

class SortList extends Component{

    render(){

        return(
            
            <React.Fragment>
                {this.props.members}
            </React.Fragment>
        )

    }
}

export default SortList;