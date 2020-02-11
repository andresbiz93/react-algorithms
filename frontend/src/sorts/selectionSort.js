import React from 'react';

export default function selectionSort(list){
    //Creating list of frames and adding original state as the first frame
    var members = [...list];
    var frames = [];
    frames.push([...members]);
    var unsorted_start = 0;

    //By the time unsorted_start == members.length - 1, the entire list is sorted
    while(unsorted_start != members.length - 1){

        //Taking a guess at minimum value by setting it equal to the first element in the unsorted area
        var minimum = members[unsorted_start].props.style.height;
        var min_index = unsorted_start;

        //The current minimum value is colored green
        var green = React.cloneElement(
            members[min_index],
            {
                style : {backgroundColor : "green", height : members[min_index].props.style.height}
            }
        )
        members[min_index] = green;
        frames.push([...members]);

        for(var i = unsorted_start + 1; i < members.length; i++){
            
            //Values we are comparing against our current minimum are colored red
            var red = React.cloneElement(
                members[i],
                {
                    style : {backgroundColor : "red", height : members[i].props.style.height}
                }
            )

            members[i] = red;
            frames.push([...members]);

            var red_index = i;

            //If compared value is lower than our current minimum, we color the previous minimum blue and the new minimum green
            if(members[i].props.style.height < minimum){
                var blue = React.cloneElement(
                    members[min_index],
                    {
                        style : {backgroundColor : "blue", height : members[min_index].props.style.height}
                    }
                )
                members[min_index] = blue;

                var green2 = React.cloneElement(
                    members[i],
                    {
                        style : {backgroundColor : "green", height : members[i].props.style.height}
                    }
                )
                members[i] = green2;
                frames.push([...members]);

                minimum = members[i].props.style.height;
                min_index = i;
            }
            //If compared value is not lower than our current minimum, we re-color the compared value to blue
            else{
                var red_to_blue = React.cloneElement(
                    members[red_index],
                    {
                        style : {backgroundColor : "blue", height : members[red_index].props.style.height}
                    }
                )
                members[red_index] = red_to_blue;
            }
        }

        //If min_index = unsorted_start, the minimum value was the initial guess
        if(min_index != unsorted_start){
            //We get the number of indexes in between so that we know how many pixels to animate the swap with in the x-axis
            var index_gap = min_index - unsorted_start;
            //Width of a bar = 10px, margin between bars = 5px
            var x_gap = 15 * index_gap;

            //This is the minimum member found, to be swapped to the start of the unsorted area
            var yellow_new_min = React.cloneElement(
                members[min_index],
                {
                    style : {backgroundColor : "yellow", height : members[min_index].props.style.height},
                    animate : {x : [x_gap, -5, 0]}
                }
            )

            //This is the member at the start of the unsorted area, to be swapped to the current minimum's location
            var yellow_start = React.cloneElement(
                members[unsorted_start],
                {
                    style : {backgroundColor : "yellow", height : members[unsorted_start].props.style.height},
                    animate : {x : [-1 * x_gap, 5, 0]}
                }
            )

            members[unsorted_start] = yellow_new_min;
            members[min_index] = yellow_start;

            frames.push([...members]);

            //After animating the swap, need to re-color the yellow members to blue. Also resetting the animate prop to 0
            var blue_new_min = React.cloneElement(
                members[unsorted_start],
                {
                    style : {backgroundColor : "blue", height : members[unsorted_start].props.style.height},
                    animate : {x : 0}
                }
            );

            var blue_start = React.cloneElement(
                members[min_index],
                {
                    style : {backgroundColor : "blue", height : members[min_index].props.style.height},
                    animate : {x : 0}
                }
            );

            members[unsorted_start] = blue_new_min;
            members[min_index] = blue_start;

            frames.push([...members]);

        }
        //If the minimum value was the initial guess, need to un-green it for next frame
        else{
            var green_to_blue = React.cloneElement(
                members[unsorted_start],
                {
                    style : {backgroundColor : "blue", height : members[unsorted_start].props.style.height}
                }
            );
            members[unsorted_start] = green_to_blue;
            frames.push([...members]);
        }
        //Regardless of what happens, need to move the divider between the sorted and unsorted area one index to the right
        unsorted_start++;
    }
    return frames;
}