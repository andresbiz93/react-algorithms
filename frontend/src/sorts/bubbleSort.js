import React from 'react'; 

export default function bubbleSort(list){

    //console.log("INIT LIST", list);

    let frames = [];
    frames[0] = [...list];
    let early_exit = false;
    let lidx = frames.length - 1;
    let wall = frames[lidx].length;

    while(!early_exit){
        let last_change_idx = null;

        for(var i = 0; i < wall; i++){
            lidx = frames.length - 1;
            //console.log("LIDX", lidx);

            if(frames[lidx][i+1] != null){

                //console.log("COMPARING", frames[lidx][i].props.style.height, "AND", frames[lidx][i+1].props.style.height);

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

                //console.log("ACCESSING IDX", lidx+1 , frames[lidx+1])

                frames[lidx+1] = [...new_frame];

                //console.log("AFTER", frames[lidx+1])

                //console.log("FRAMES POST COMPARE", frames);

                //now we decide if we need to swap the elements

                //console.log("DO SWAP?", frames[lidx+1][i].props.style.height > frames[lidx+1][i+1].props.style.height);
                if(frames[lidx+1][i].props.style.height > frames[lidx+1][i+1].props.style.height){

                    let new_frame2 = [...frames[lidx+1]];

                    //console.log("SWAPPING", i, i+1);
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

                    //console.log("ACCESSING IDX", lidx+2, frames[lidx+2])

                    frames[lidx+2] = [...new_frame2];

                    //console.log("AFTER", frames[lidx+2])

                    last_change_idx = i;

                    //console.log("STATES POST SWAP PUSH", frames);

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

                    //console.log("ACCESSING IDX", lidx+3, frames[lidx+3])

                    frames[lidx+3] = [...new_frame3];

                    //console.log("AFTER", frames[lidx+3])

                    //console.log("FRAMES POST BLUE PUSH", frames);

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

                    //console.log("ACCESSING IDX", lidx+2, frames[lidx+2])

                    frames[lidx+2] = [...new_frame2];

                    //console.log("AFTER", frames[lidx+2])

                    //console.log("STATES PRE BLUE PUSH", frames);
                }
                
            }
        }

        if(last_change_idx == null){
            early_exit = true;
        }
        else{
            wall = last_change_idx;
        }
    }
    
    return frames;

}