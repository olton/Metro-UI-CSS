$(function(){
$(".contextmenu").hide();
$(document).on("contextmenu", function(event) { 
    event.preventDefault();
    $(".contextmenu")
    .show()
    .css({top: event.pageY + "px", left: event.pageX + "px"});
}).on("click", function(event) {
    $(".contextmenu").hide();
});
});
