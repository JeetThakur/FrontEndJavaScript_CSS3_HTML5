/**
 Author : Jeet Bhavesh Thakur
 File: script.js
 Description: This script file assits HW_05.html
 */
        /*
        The Event listners are added on the DOM elements we wish to mainpulate as required
        */
        document.getElementById("square").addEventListener("mousemove",slideIt);
        document.getElementById("square").addEventListener("click",growIt);
        
        /*
        This function as the name suggests grows the box 2wice its size at a rate of 5px/40ms using the setTimeout() functionality
        */
        
        function growIt(){
            let ele = document.getElementById("square"), currH = parseInt(ele.style.height), newH = 2 * currH,
            currW = parseInt(ele.style.width), newW = 2 * currW; 
            
            // Logic to find out the time required to grow the square at a rate of 5px/40ms
            let toGrow = newH-currH;
            let TimeTakenPer5pxPer40ms = toGrow/5 * 40;
            
            console.log("The time it should take to grow the sqaure at 5px/40ms is: "+TimeTakenPer5pxPer40ms)
            
            setTimeout(function(){    
            console.log(TimeTakenPer5pxPer40ms)

            ele.style.height=newH+"px";
            ele.style.width=newW+"px";

            },TimeTakenPer5pxPer40ms);
    }
        
        
        /*
        This function as the name suggests slides the box 2wice its size at a rate of 5px/40ms using the setTimeout() functionality
        */
        function slideIt(){
            
            let ele = document.getElementById("square"), curPos = parseInt(ele.style.left), newPos = curPos+5 +"px";
            
            ele.style.left = newPos;
            
            // to check if the mouse is on the object we want to move or no
            if (ele.onmousemove)
                setTimeout(slideIt, 40);
        }