import React from "react";


export default function mergeSort(list, frames, l = 0, r = list.length - 1) 
{ 
    //console.log("ARGS IN SORT", list, frames, l, r);
    if (l < r) 
    { 
        // Find the middle point 
        var m = Math.floor((l+r)/2); 

        // Sort first and second halves 
        mergeSort(list, frames, l, m); 
        mergeSort(list, frames, m+1, r); 


        // Color the region green for clarity

        var latest_frame = [...frames[frames.length - 1]];
        for(var i = l; i <= r; i++){
            var greened = React.cloneElement(
                latest_frame[i],
                {
                    style : {backgroundColor : "green", height : latest_frame[i].props.style.height}
                }
            ); 
            latest_frame[i] = greened;
        }

        frames.push([...latest_frame]);

        // Merge the sorted halves 
        merge(list, frames, l, m, r); 

        var latest_frame = [...frames[frames.length - 1]];

        for(var i = l; i <= r; i++){
            var blued = React.cloneElement(
                latest_frame[i],
                {
                    style : {backgroundColor : "blue", height : latest_frame[i].props.style.height}
                }
            ); 
            latest_frame[i] = blued;
        }

        frames.push([...latest_frame]);

    } 
} 


function merge(list, frames, l, m, r) 
{ 
    //console.log("ARGS IN MERGE", list, frames, l, m, r);

    // Find sizes of two subarrays to be merged 

    /* Create temp arrays */

    var left = list.slice(l, m + 1);
    var right = list.slice(m + 1, r + 1);

    //console.log("Left", left, "right", right);

    /* Merge the temp arrays */

    // Initial indexes of first and second subarrays 
    var i = 0, j = 0; 

    // Initial index of merged subarry array 
    var k = l; 
    while (i < left.length && j < right.length) 
    { 
        if (left[i].props.style.height <= right[j].props.style.height) 
        { 
            add_frames(list, frames, k, left, i);
            i++; 
        } 
        else
        { 
            add_frames(list, frames, k, right, j);
            j++; 
        } 
        k++; 
    } 

    /* Copy remaining elements of L[] if any */
    while (i < left.length) 
    { 
        add_frames(list, frames, k, left, i);
        i++; 
        k++; 
    } 

    /* Copy remaining elements of R[] if any */
    while (j < right.length) 
    { 
        add_frames(list, frames, k, right, j);
        j++; 
        k++; 
    } 
} 

function add_frames(list, frames, list_index, half, half_index){

    //Want to get the initial index within the full list of the element we are inserting 

    var initial_index = null;

    for(var q = 0; q < list.length; q++){
        if(list[q].key == half[half_index].key){
            initial_index = q;
        }
    }

    //The initial index and insertion index allow us to find a gap, this will be useful for animating the transition

    var index_gap = initial_index - list_index;

    //console.log("INDEX GAP", index_gap);

    //If index gap is <= 0 then no need to edit the frames - no swapping is being done

    if(index_gap != 0){


        //The x-axis transition will be animated based on the index gap - the number 15 comes from the width of the object (10px) and the margin between objects (5px)
        var pixel_gap = index_gap * 15;
        var animated = React.cloneElement(
            half[half_index],
            {
                style : {backgroundColor : "yellow", height : half[half_index].props.style.height},
                animate : {x : [pixel_gap, -5, 0]}
            }
        )

        //When inserting an element, we need to make room for it by shifting other elements to the right by one index. These are colored yellow like the inserted element

        var latest_frame = [...frames[frames.length - 1]];
        if(index_gap > 0){
            //console.log("GAP > 1");
            for(var x = initial_index; x > list_index; x--){
                var shift_by_one = React.cloneElement(
                    latest_frame[x - 1],
                    {
                        style : {backgroundColor : "yellow", height : latest_frame[x - 1].props.style.height},
                        animate : {x : [-15, 5, 0]}
                    }
                )
                latest_frame[x] = shift_by_one;
            }

            list[list_index] = animated;
            latest_frame[list_index] = animated;
    
            frames.push([...latest_frame]);
        

            //Now want to re-color all of the objects within this list section green

            latest_frame = [...frames[frames.length - 1]];
        
            var de_animated = React.cloneElement(
                animated,
                {
                    style : {backgroundColor : "green", height : half[half_index].props.style.height},
                    animate : {x : 0}
                }
            )

            
            
            for(var x = initial_index; x > list_index; x--){
                var re_green = React.cloneElement(
                    latest_frame[x],
                    {
                        style : {backgroundColor : "green", height : latest_frame[x].props.style.height},
                        animate : {x : 0}
                    }
                )
                latest_frame[x] = re_green;
            }

        
            list[list_index] = de_animated;
            latest_frame[list_index] = de_animated;
        
            frames.push([...latest_frame]);


        }

//////////////////////////////////INDEX GAP < 0
//No changes to the frames but want to update the member list anyway
        else if(index_gap < 0){
            list[list_index] = animated;
        }
    }
}