import React from 'react';

export default function insertionSort(list){
    var members = [...list];
    var frames = [];

    //Want to green-up the first element in the list
    var initial_green = React.cloneElement(
        members[0],
        {
            style : {backgroundColor : "green", height : members[0].props.style.height}
        }
    )
    members[0] = initial_green;

    frames.push([...members]);

    //Going through the rest of the list
    for(var i = 1; i < members.length; i++){

        //Whichever element we are looking to insert, we color red
        var new_red = React.cloneElement(
            members[i],
            {
                style : {backgroundColor : "red", height : members[i].props.style.height}
            }
        );

        members[i] = new_red;

        frames.push([...members]);

        //j will be the index immediately before i and will count down to 0 if necessary
        var j = i - 1;

        //want to know if we did make a shift in the sorted region
        var did_shift = false;

        while(j >= 0 && members[j].props.style.height > new_red.props.style.height){      
            //If there is a swap to be made, we shift each element in the sorted region one index to the right   
            var sorted_yellow = React.cloneElement(
                members[j],
                {
                    style : {backgroundColor : "yellow", height : members[j].props.style.height},
                    animate : {x : [-15, 5, 0]}
                }
            );

            members[j + 1] = sorted_yellow;
            j = j - 1;
            did_shift = true;
        }

        //The element we are inserting into the sorted region needs to be yellow as well. We shift a number of pixels based on the index gap
        //If we did not shift anything in the sorted region, no need for a swap
        if(did_shift){
            var index_gap = i - j + 1;
            var pixel_gap = index_gap * 15;
    
            var new_yellow = React.cloneElement(
                new_red,
                {
                    style : {backgroundColor : "yellow", height : new_red.props.style.height},
                    animate : {x : [pixel_gap, -5, 0]}
                }
            );
    
            members[j+1] = new_yellow;
    
            frames.push([...members]);
        }

        //after doing all of the shifting and inserting, everything within the sorted area should be green
        for(var t = j + 1; t <= i; t++){
            var sorted_green = React.cloneElement(
                members[t],
                {
                    style : {backgroundColor : "green", height : members[t].props.style.height},
                    animate : {x : 0}
                }
            );
            members[t] = sorted_green
        }

        frames.push([...members]);
    }

    //Sorting is done, but want to reset everything to blue
    for(var f = 0; f < members.length; f++){
        var final_blue = React.cloneElement(
            members[f],
            {
                style : {backgroundColor : "blue", height : members[f].props.style.height}
            }
        )
        members[f] = final_blue;
    }

    frames.push([...members]);

    return frames;
}