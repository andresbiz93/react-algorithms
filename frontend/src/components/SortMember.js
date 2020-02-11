import React, { Component } from "react";
import { motion } from 'framer-motion';

class SortMember extends Component{

    render(){
        /*const variants = {
            active: {
                backgroundColor: "red",
                transition: { duration: 5 }
            },
            inactive: {
              backgroundColor: "blue"
            }
        }*/

        return(
            <motion.div 
                className = {this.props.class}
                /*style = {
                    {height : this.props.height}
                }*/
                style = {this.props.style}
                animate = {this.props.animate}
            ></motion.div>
        );
    }
}

export default SortMember;

