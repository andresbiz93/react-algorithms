import React, { Component, useRef } from "react";
import ReactDOM from "react-dom";
import SortList from "./SortList";
import SortMember from "./SortMember";
import bubbleSort from "./../sorts/bubbleSort";
import selectionSort from "./../sorts/selectionSort";
import insertionSort from "./../sorts/insertionSort";
import mergeSort from "./../sorts/mergeSort";
import shuffle from "./../sorts/shuffle";
import { motion } from "framer-motion";

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            members : [],
            frames : [],
            number : 10,
            animate : false,
            speed : "medium",
            options_disabled : false,
            button_classes : ["sort_button", "sort_button", "sort_button", "sort_button", "sort_button"]
        }

    }

    componentDidMount(){
        this.setState((state) => {

            //console.log("DID MOUNT STATE", state);

            let className = "blue bar";
            let animation = "";
            let out_members = [];
            let out_frames = [];
    
            for(var i = state.members.length; i < state.number; i++){
    
                let height = Math.floor(Math.random() * 190 + 10);
                let width = 10;
                let style = {height : height, width : width}
                let new_member = this.renderMember(className, style, i, animation);
    
                out_members.push(new_member);
                //console.log("OUT VARS", "MEMBERS", out_members, "FRAMES", out_frames);
            }
            out_frames.push(out_members);
    
            return {members : out_members, frames : out_frames};

        });
    }

    
    renderMember(className, style, keyNum, animations){
        return (
            <SortMember
                class = {className}
                style = {style}
                key = {keyNum}
                animate = {animations}
            />
        );
    }

    shuffle(){
        this.disableOptions(0);
        this.setState(
            (state) => {
                let members = [...state.members];
                let frames = [];
                frames.push([...members]);

                shuffle(members, frames);

                return {frames : frames, animate : true};
            },
            () => this.animate()
        );
    }


    bSort(){
        this.disableOptions(1);
        this.setState(
            state => {
                //console.log("PRE BSORT STATE", state)
                let current_members = [...state.members];
                //console.log("members pre BSORT", current_members);
                let updated_frames = bubbleSort(current_members);
                return {frames: updated_frames, animate : true};
            },
            () => this.animate()
        );
    }

    sSort(){
        this.disableOptions(2);
        this.setState(
            state => {
                let current_members = [...state.members];
                let updated_frames  = selectionSort(current_members);
                return {frames : updated_frames, animate : true};
            },
            () => this.animate()
        );
    }

    iSort(){
        this.disableOptions(3);
        this.setState(
            state => {
                let current_members = [...state.members];
                let updated_frames = insertionSort(current_members);
                return {frames : updated_frames, animate : true};
            },
            () => this.animate()
        );
    }

    mSort(){
        this.disableOptions(4);
        this.setState(
            state => {
                let current_members = [...state.members];
                let current_frames = [];
                current_frames.push([...current_members]);

                mergeSort(current_members, current_frames);

                //console.log("RESULT\n", "FRAMES", current_frames, "MEMBERS", current_members);

                return {frames : current_frames, animate : true};
            },
            () => this.animate()
        );
    }



    animate(){
        if (this.state.animate){
            this.setState((state) => {
                //console.log("STATE IN ANIMATE", state);

                let frames = [...state.frames];
    
                /*for(var i = 0 ; i < frames.length; i++){
                    console.log("FRAMES I", i, frames[i]);
                }*/
                return {members : frames[0]}; 
    
            }, 
            () => this.setNextFrame());
        }
    }

    stop(){
        this.setState(
            state => {
                let new_members = state.members;
                for(var i = 0; i < new_members.length; i++){
                    if(new_members[i].props.style.backgroundColor != "blue"){
                        let x = React.cloneElement(
                            new_members[i],
                            {
                                style : {backgroundColor : "blue", height : new_members[i].props.style.height}
                            }
                        );
                        new_members[i] = x;
                    }
                }
                return {animate : false, members : new_members}
            }, 
            () => this.enableOptions());
    }

    setNextFrame(){
        if(this.state.frames.length == 1){
            this.enableOptions();
        }
        let speed = null;
        if(this.state.speed == "slow"){
            speed = 500;
        }
        else if(this.state.speed == "medium"){
            speed = 250;
        }
        else{
            speed = 100;
        }
        setTimeout(() => {
            this.setState((state) => {

                if(state.frames.length == 1){
                    return{animate : false};
                }
                else{
                    let new_frames = state.frames.splice(1);
                    return {frames : new_frames}
                }

            }, () => this.animate());
        }, speed);
    }

    handleChangeNumber = e =>{
        let members = this.state.members;
        let limit = e.target.value;

        if(limit < 1){
            limit = 1;
        }
        if(limit > 50){
            limit = 50;
        }

        let max_key = 0;
        for(var x = 0; x < members.length; x++){
            if(members[x].key > max_key){
                max_key = members[x].key;
            }
        }

        if(members.length == limit){
            //console.log("MEMBERS", this.state.members);
            this.setState({number : limit});
        }
        else if(members.length > limit){
            members = members.slice(0, limit);
            //console.log("MEMBERS", members);
            this.setState({number : limit, members: members});
        }
        else if(members.length < limit){
            let className = "blue bar";
            let animation = "";

            for(var i = members.length; i < limit; i++){
    
                let height = Math.floor(Math.random() * 190 + 10);
                let width = 10;
                let style = {height : height, width : width}
                let new_member = this.renderMember(className, style, i + max_key, animation);
    
                members.push(new_member);
            }

            this.setState({number : limit, members: members});
            //console.log("MEMBERS", this.state.members);
        }
    }

    handleChangeSpeed = e => {
        //console.log("RADIO VALUE", e.target.value);
        this.setState({speed : e.target.value});
    }

    disableOptions(num){
        this.setState(state => {
            let buttons = state.button_classes;
            buttons[num] = "sort_button selected";
            return {options_disabled : true, button_classes : buttons};
        });
    }

    enableOptions(){
        this.setState(state => {
            let buttons = ["sort_button", "sort_button", "sort_button", "sort_button", "sort_button"];
            return {options_disabled : false, button_classes : buttons};
        });
    }

    render(){

        return(
            <React.Fragment>
                <motion.div id = "list_container">
                    <SortList id = "sort_list"
                        members = {this.state.members}
                    />
                </motion.div>

                <div id = "options">

                    <div id = "slider">
                        <h4>Number of Items</h4>
                        <h5>{this.state.number}</h5>
                        <motion.input
                            id = "range"
                            type = "range"
                            min = "1"
                            max = "50"
                            value = {this.state.number}
                            onChange = {this.handleChangeNumber}
                            disabled = {this.state.options_disabled}
                        />
                    </div>

                    <div id = "sorts">
                        <motion.button 
                            id = "shuffle"
                            className = {this.state.button_classes[0]}
                            name = "shuffle" 
                            whileHover = {{scale : 1.1, backgroundColor: "white"}}
                            whileTap = {{scale : .9}}
                            onClick = {() => this.shuffle()}
                            disabled = {this.state.options_disabled}
                        >
                            <h6>Shuffle</h6>
                        </motion.button>
                        <motion.button 
                            id = "bubble_sort"
                            className = {this.state.button_classes[1]}
                            name = "bubble_sort" 
                            whileHover = {{scale : 1.1, backgroundColor: "white"}}
                            whileTap = {{scale : .9}}
                            onClick = {() => this.bSort()}
                            disabled = {this.state.options_disabled}
                        >
                            <h6>Bubble Sort</h6>
                        </motion.button>
                        <motion.button 
                            id = "selection_sort"
                            className = {this.state.button_classes[2]}
                            name = "selection_sort" 
                            whileHover = {{scale : 1.1, backgroundColor: "white"}}
                            whileTap = {{scale : .9}}
                            onClick = {() => this.sSort()}
                            disabled = {this.state.options_disabled}
                        >
                            <h6>Selection Sort</h6>
                        </motion.button>
                        <motion.button 
                            id = "insertion_sort"
                            className = {this.state.button_classes[3]}
                            name = "insertion_sort" 
                            whileHover = {{scale : 1.1, backgroundColor: "white"}}
                            whileTap = {{scale : .9}}
                            onClick = {() => this.iSort()}
                            disabled = {this.state.options_disabled}
                        >
                            <h6>Insertion Sort</h6>
                        </motion.button>
                        <motion.button 
                            id = "merge_sort"
                            className = {this.state.button_classes[4]}
                            name = "merge_sort"
                            whileHover = {{scale : 1.1, backgroundColor: "white"}}
                            whileTap = {{scale : .9}} 
                            onClick = {() => this.mSort()}
                            disabled = {this.state.options_disabled}
                        >
                            <h6>Merge Sort</h6>
                        </motion.button>
                    </div>

                    <div id = "radio">
                        <h4>Animation Speed</h4>
                        <h6>
                            <motion.input 
                                id = "radio_fast" 
                                type = "radio" 
                                name = "animation_speed" 
                                value = "fast"
                                checked = {this.state.speed === "fast"}
                                onChange = {this.handleChangeSpeed}
                                whileTap = {{scale : 1.5}}
                            />
                            Fast
                        </h6>
                        <h6>
                            <motion.input 
                                id = "radio_medium" 
                                type = "radio" 
                                name = "animation_speed" 
                                value = "medium" 
                                checked = {this.state.speed === "medium"}
                                onChange = {this.handleChangeSpeed}
                                whileTap = {{scale : 1.5}}
                            />
                            Medium
                        </h6>
                        <h6>
                            <motion.input 
                                id = "radio_slow" 
                                type = "radio" 
                                name = "animation_speed" 
                                value = "slow"
                                checked = {this.state.speed == "slow"}
                                onChange = {this.handleChangeSpeed}
                                whileTap = {{scale : 1.5}}
                            />
                            Slow
                        </h6>
                        {this.state.animate &&
                        <h6>
                            <motion.button
                                id = "stop_button"
                                whileHover = {{scale : 1.1, backgroundColor: "white"}}
                                whileTap = {{scale : .9}} 
                                onClick = {() => this.stop()}
                            >
                                <h6>Cancel</h6>
                            </motion.button>
                        </h6>
                        }
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(<App />, wrapper) : null;