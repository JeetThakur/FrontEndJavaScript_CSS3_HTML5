//Simple start to builing a plugin

//Didn't want to waste time writing this one
//function approach - can call with jQuery.sumContents(arg) or $.sumContents(arg)
//NOT chainable...  Couldn't do someting like $("#id").addClass('blah').sumContents(arg)
//do NOT have access to current html elements...
//BAD IDEA - namespace collisions...
jQuery.sumContents=function(arrayOfNodes){
	var tot=0;
	jQuery.each(arrayOfNodes,function(i,node){
		tot+=parseInt($(node).html());
	});
	return tot;
}


//Method Approach - gives you access to current set of HTML elements
//chainable!  can do something like $("#id").addClass('blah').slideFadeOut(arg,arg2)
//this inside is actually a reference to the jQuery object!  jQuery.fn - general plugin space of jQuery

$.fn.slideFadeOut = function( speed, callback){
	// the keyword this becomes THE JQUERY COLLECTION which is being used to perform the animation slideFadeOut
	return this.animate({
		height:"hide",
		opacity: "hide"
	},speed,callback
	)
};





//IIFE (Immediately Invoked Function Expression) closure -- prevents collisions of $ in other libraries
(function($) { 
	// jQuery plugin definition

	// Traverse all nodes in the collection
	// (<p>) in this case 
	$.fn.reverseText = function(){
		this.each(function(){
			let orgText = $(this).text(), newText = "";

			// reverseText
			for (let i=orgText.length-1; i>=0;i--){
				newText+=orgText.substr(i,1);
			}
			// this refers the particular element we select inside this function 
			// this - the element we are iterating on
			$(this).text(newText);
		});

		// allow Jquery Chaining by returning  // this
		return this;
	};
	
})(jQuery); //end closure