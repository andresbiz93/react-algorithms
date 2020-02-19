import React, { Component } from "react";
import { motion } from 'framer-motion';

class SortMember extends Component{

    render(){
        //Accessing props
        //Div uses framer-motion
        return(
            <motion.div 
                className = {this.props.class}
                style = {this.props.style}
                animate = {this.props.animate}
            ></motion.div>
        );
    }
}

export default SortMember;

