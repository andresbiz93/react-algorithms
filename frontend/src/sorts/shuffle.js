import React from "react";

export default function shuffle(list, frames){
    let m = list.length;
    let i, t;

    //While elements remain to be shuffled
    while(m){

        //Get a remaining element's index
        i = Math.floor(Math.random() * m--);

        if(i == m){

            //If i = m, there's no shift. Make element red to highlight it and then green to say it's been 'randomized'
            var red = React.cloneElement(
                list[i],
                {
                    style : {backgroundColor : "red", height : list[i].props.style.height}
                }
            );
            list[i] = red;

            frames.push([...list]);

            var green = React.cloneElement(
                red,
                {
                    style : {backgroundColor : "green", height : red.props.style.height}
                }
            );
            list[i] = green;

            frames.push([...list]);

        }
        else{
            //The two elements to be swapped are first colored red
            var red1 = React.cloneElement(
                list[i],
                {
                    style : {backgroundColor : "red", height : list[i].props.style.height}
                }
            );

            var red2 = React.cloneElement(
                list[m],
                {
                    style : {backgroundColor : "red", height : list[m].props.style.height}
                }
            );

            list[i] = red1;
            list[m] = red2;

            frames.push([...list]);

            //Then the two elements are colored yellow and swapped
            
            //Finding index gap so that we know by how many pixels we need to animate the transition. 15px per index, from 10px per object width and 5px per margin
            var index_gap = m - i;
            if(i == 0){
                index_gap++;
            }
            var pixel_gap = index_gap * 15;

            var yellow1 = React.cloneElement(
                red1,
                {
                    style : {backgroundColor : "yellow", height : red1.props.style.height},
                    animate : {x : [(-1) * pixel_gap, 5, 0]}
                }
            );

            var yellow2 = React.cloneElement(
                red2,
                {
                    style : {backgroundColor : "yellow", height : red2.props.style.height},
                    animate : {x : [pixel_gap, -5, 0]}
                }
            );

            list[i] = yellow2;
            list[m] = yellow1;

            frames.push([...list]);

            //The randomized element will now be green, and the other blue

            var green = React.cloneElement(
                yellow1,
                {
                    style : {backgroundColor : "green", height : yellow1.props.style.height},
                    animate : {x : 0}
                }
            )

            var blue = React.cloneElement(
                yellow2,
                {
                    style : {backgroundColor : "blue", height : yellow2.props.style.height},
                    animate : {x : 0}
                }
            );

            list[i] = blue;
            list[m] = green;

            frames.push([...list]);
        }
    }

    //Re-blueing every element
    for(var f = 0; f < list.length; f++){
        var final_blue = React.cloneElement(
            list[f],
            {
                style : {backgroundColor : "blue", height : list[f].props.style.height},
                animate : {x : 0}
            }
        );
        list[f] = final_blue;
    }
    frames.push([...list]);
}