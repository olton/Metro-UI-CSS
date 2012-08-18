function toggleCommands(){
    $(".commands").toggle();
}

function toggleTheme(){
    $(".metro").toggleClass("metro-theme-light");
}

$(function(){
    var new_width = 0;

    $(".metro-section").each(function(){
        var w = $(this).width() + 80;
        new_width += w;
    });

    $(".metro-sections").css("width", new_width);

    $("#content").height($(window).height() - 130);
    $("#content").width($(".metro-sections").width());

})

/*
$(window).mouseout(function (event) {
    if ($('.scrollable').data('down')) {
        try {
            if (event.originalTarget.nodeName == 'BODY' || event.originalTarget.nodeName == 'HTML') {
                $('#scroll').data('down', false);
            }
        } catch (e) {}
    }
});
*/

