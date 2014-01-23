(function($) {
    $.StartScreen = function(){
        var plugin = this;

        plugin.init = function(){
            setTilesAreaSize();
            addMouseWheel();
            // start the new height function
            tileGroupHeight();
        };

        var setTilesAreaSize = function(){
            var groups = $(".tile-group");
            var tileAreaWidth = 160;
            $.each(groups, function(i, t){
                tileAreaWidth += $(t).outerWidth()+46;
            });
            $(".tile-area").css({
                width: tileAreaWidth
            });
        };

        var addMouseWheel = function (){
            $("body").mousewheel(function(event, delta){
                var scroll_value = delta * 50;
                $(document).scrollLeft($(document).scrollLeft() - scroll_value);
                return false;
            });
        };
        
        //function to set the overall page DIV height so the vertical scrollbar displays
        var tileGroupHeight = function(){
            // get all the DIV's with the class tile-group
        	var groupheight = $(".tile-group");
        	// create a var to have the max found height of a DIV
        	var theheight = 0;
        	// a foreach loop to go through each DIV class
        	$.each(groupheight, function(i, t){
        	    //if the current DIV height is more than the VAR then
        		if ($(t).outerHeight() > theheight)
        		{ 
        		    // set the VAR to the current DIV height
        			theheight = $(t).outerHeight();
        			// set the page's main DIV height to the new height + 135px to account for the header
        			$(".tile-area").css({
        				height: theheight + 135
					});
        		}
        		else
        		{
        			// otherwise
        		}
        	});
        };


        plugin.init();
    }
})(jQuery);

$(function(){
    $.StartScreen();
});
