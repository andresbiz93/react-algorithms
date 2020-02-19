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
        
        // Initial state has no members, 10 members to be rendered in ComponentDidMount()

        this.state = {
            members : [],
            frames : [],
            number : 10,
            animate : false,
            speed : "medium",
            options_disabled : false,
            //Button classes will later be modified to change its appearance when selected
            button_classes : ["sort_button", "sort_button", "sort_button", "sort_button", "sort_button"]
        }

    }

    componentDidMount(){
        this.setState((state) => {

            //Initializing the element bars

            let className = "blue bar";
            let animation = "";
            let out_members = [];
            let out_frames = [];
    
            //Will initialize enough members to match the default value
            for(var i = state.members.length; i < state.number; i++){

                //Want to generate a random height
                let height = Math.floor(Math.random() * 190 + 10);

                //Width is constant - important factor for animations
                let width = 10;

                let style = {height : height, width : width}
                let new_member = this.renderMember(className, style, i, animation);
    
                out_members.push(new_member);
            }
            //Initial frame will be the initial state of the members
            out_frames.push(out_members);
    
            return {members : out_members, frames : out_frames};

        });
    }

    
    renderMember(className, style, keyNum, animations){
        //Passing props down to each member
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
        //Using the Fisher-Yates shuffling algorithm
        //First disable options, passing the button id to render it as selected
        this.disableOptions(0);
        this.setState(
            (state) => {
                let members = [...state.members];
                let frames = [];
                frames.push([...members]);

                //Shuffle occurs in place
                //shuffle returns an array of arrays, where each inner array contains all members and represents a step in the sort
                shuffle(members, frames);

                return {frames : frames, animate : true};
            },
            () => this.animate()
        );
    }


    bSort(){
        //First we disable options and pass the selected button's id to render it as selected
        this.disableOptions(1);
        this.setState(
            state => {
                let current_members = [...state.members];
                //sort returns an array of arrays, where each inner array contains all members and represents a step in the sort
                let updated_frames = bubbleSort(current_members);
                return {frames: updated_frames, animate : true};
            },
            () => this.animate()
        );
    }

    sSort(){
        //First we disable options and pass the selected button's id to render it as selected
        this.disableOptions(2);
        this.setState(
            state => {
                let current_members = [...state.members];
                //sort returns an array of arrays, where each inner array contains all members and represents a step in the sort
                let updated_frames  = selectionSort(current_members);
                return {frames : updated_frames, animate : true};
            },
            () => this.animate()
        );
    }

    iSort(){
        //First we disable options and pass the selected button's id to render it as selected
        this.disableOptions(3);
        this.setState(
            state => {
                let current_members = [...state.members];
                //sort returns an array of arrays, where each inner array contains all members and represents a step in the sort
                let updated_frames = insertionSort(current_members);
                return {frames : updated_frames, animate : true};
            },
            () => this.animate()
        );
    }

    mSort(){
        //First we disable options and pass the selected button's id to render it as selected
        this.disableOptions(4);
        this.setState(
            state => {
                let current_members = [...state.members];
                let current_frames = [];
                current_frames.push([...current_members]);

                //sort returns an array of arrays, where each inner array contains all members and represents a step in the sort
                //want to pass frames as an independent variable so that we can keep track of frames as recursion plays out
                mergeSort(current_members, current_frames);


                return {frames : current_frames, animate : true};
            },
            () => this.animate()
        );
    }



    animate(){
        if (this.state.animate){
            this.setState((state) => {


                //We render the first snapshot in the frames list
                let frames = [...state.frames];
                return {members : frames[0]}; 
    
            }, 
            () => this.setNextFrame());
        }
    }

    stop(){
        this.setState(
            state => {
                //If stopping, want to set current members to whatever the state was at the moment in the animation
                let new_members = state.members;
                for(var i = 0; i < new_members.length; i++){
                    //Want to change all of their colors to blue if they aren't already
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
        //If there's only one frame, the sort will be done animating
        if(this.state.frames.length == 1){
            this.enableOptions();
        }
        let speed = null;
        
        //Setting speed based on state variable
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
                //If there's more than 1 frame left, we want to shave off the first frame in the list. This will continue the loop until the animation is done.
                else{
                    let new_frames = state.frames.splice(1);
                    return {frames : new_frames}
                }

            }, () => this.animate());
        }, speed);
    }

    handleChangeNumber = e =>{
        //Want to render new members or remove previous ones depending on how the value changed
        let members = this.state.members;
        let limit = e.target.value;

        if(limit < 1){
            limit = 1;
        }
        if(limit > 50){
            limit = 50;
        }

        //If rendering new members, want to ensure that we're creating keys that are not duplicates - so we start from the max key value
        let max_key = 0;
        for(var x = 0; x < members.length; x++){
            if(members[x].key > max_key){
                max_key = members[x].key;
            }
        }

        //No change was made - shouldn't be possible?
        if(members.length == limit){
            this.setState({number : limit});
        }
        //Number decreased, need to shave members off the list
        else if(members.length > limit){
            members = members.slice(0, limit);
            this.setState({number : limit, members: members});
        }
        //Number increased, adding members in the same fashion as DidComponentMount()
        else if(members.length < limit){
            let className = "blue bar";
            let animation = "";

            for(var i = members.length; i < limit; i++){
    
                let height = Math.floor(Math.random() * 190 + 10);
                let width = 10;
                let style = {height : height, width : width}

                //Adding the max_key to i so as to avoid duplicate keys
                let new_member = this.renderMember(className, style, i + max_key, animation);
    
                members.push(new_member);
            }

            this.setState({number : limit, members: members});
        }
    }

    handleChangeSpeed = e => {
        //Store the new selected value in state
        this.setState({speed : e.target.value});
    }

    disableOptions(num){
        //Want to disable sort buttons and slider from being selected and render the selected sort as green
        this.setState(state => {
            let buttons = state.button_classes;
            buttons[num] = "sort_button selected";
            return {options_disabled : true, button_classes : buttons};
        });
    }

    enableOptions(){
        //Want to enable all options and render all buttons normally
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