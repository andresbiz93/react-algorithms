import React from 'react'; 

export default function bubbleSort(list){

    //Initialize frames, with first frame being initial state
    let frames = [];
    frames[0] = [...list];
    let early_exit = false;

    //Right side limit of the area to be sorted, starts as the final element in the array
    let lidx = frames.length - 1;
    let wall = frames[lidx].length;

    while(!early_exit){
        //Last change index will remain null unless a change is made
        let last_change_idx = null;

        for(var i = 0; i < wall; i++){
            lidx = frames.length - 1;

            if(frames[lidx][i+1] != null){

                //New frame starts where the last one left off
                var new_frame = [...frames[lidx]];

                //Here we color red the two elements that will be compared
                var new_1 = React.cloneElement(
                    frames[lidx][i],
                    {
                        style : {backgroundColor : "red", height : frames[lidx][i].props.style.height}
                    }
                );
                var new_2 = React.cloneElement(
                    frames[lidx][i+1],
                    {
                        style : {backgroundColor : "red", height : frames[lidx][i+1].props.style.height}
                    }
                );
                new_frame[i] = new_1;
                new_frame[i+1] = new_2;

                //Adding the comparison frame to the frames list
                frames[lidx+1] = [...new_frame];

                //now we decide if we need to swap the elements

                //If the earlier element's height is greater than the later element's, we swap
                if(frames[lidx+1][i].props.style.height > frames[lidx+1][i+1].props.style.height){

                    let new_frame2 = [...frames[lidx+1]];

                    //If should swap, the two elements are colored yellow and shifted on the x axis
                    let new_1_yellow = React.cloneElement(
                        new_1,
                        {
                            //margin+barwidth, margin. Shifting from left to right
                            animate : {x : [-15, 5, 0]},
                            style : {backgroundColor : "yellow", height : new_1.props.style.height}
                        }
                    );
                    let new_2_yellow = React.cloneElement(
                        new_2,
                        {
                            //margin+barwidth, margin. Shifting from right to left
                            animate : {x : [15, -5, 0]},
                            style : {backgroundColor : "yellow", height : new_2.props.style.height}
                        }
                    );

                    new_frame2[i+1] = new_1_yellow;
                    new_frame2[i] = new_2_yellow;

                    //Adding the animation swap as the next frame
                    frames[lidx+2] = [...new_frame2];

                    //Since swap was made, set last change index to that index
                    last_change_idx = i;

                    //Next frame starts where previous left off
                    let new_frame3 = [...frames[lidx+2]];

                    //We change the yellow swapped members back to blue
                    let new_1_blue = React.cloneElement(
                        new_1_yellow,
                        {
                            animate : {x : 0},
                            style : {backgroundColor : "blue", height : new_1_yellow.props.style.height}
                        }
                    );

                    let new_2_blue = React.cloneElement(
                        new_2_yellow,
                        {
                            animate : {x : 0},
                            style : {backgroundColor : "blue", height : new_2_yellow.props.style.height}
                        }
                    );
                    
                    new_frame3[i+1] = new_1_blue;
                    new_frame3[i] = new_2_blue;

                    //add the re-blue state to the frames list

                    frames[lidx+3] = [...new_frame3];

                }
                else{
                //Here we re-color blue the two elements that were compared
                    let new_frame2 = [...frames[lidx+1]];
                    
                    let new_1_blue = React.cloneElement(
                        new_1,
                        {
                            style : {backgroundColor : "blue", height : new_1.props.style.height}
                        }
                    );
                    let new_2_blue = React.cloneElement(
                        new_2,
                        {
                            style : {backgroundColor : "blue", height : new_2.props.style.height}
                        }
                    );
                    new_frame2[i] = new_1_blue;
                    new_frame2[i+1] = new_2_blue;

                    //Add the re-blue state to the frames list

                    frames[lidx+2] = [...new_frame2];
                }
                
            }
        }
        //If no change was made, we exit out of the sort
        if(last_change_idx == null){
            early_exit = true;
        }
        //If change was made, we set the wall bound to the last change index
        else{
            wall = last_change_idx;
        }
    }
    
    return frames;

}