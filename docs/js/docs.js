function reinit()
{
    //$('.dropdown-menu').dropdown({effect: 'slide'});
    $.Metro.initDropdowns();
}

$(function(){
    $("[data-load]").each(function(){
        $(this).load($(this).data("load"), function(){
            reinit();
        });
    });

    window.prettyPrint && prettyPrint();

    $(".history-back").on("click", function(e){
        e.preventDefault();
        history.back();
        return false;
    })
})


$(function() {
    if ($('nav > .side-menu').length > 0) {
        var side_menu = $('nav > .side-menu');
        var fixblock_pos = side_menu.position().top;
        $(window).scroll(function(){
            if ($(window).scrollTop() > fixblock_pos){
                side_menu.css({'position': 'fixed', 'top':'65px', 'z-index':'1000'});
            } else {
                side_menu.css({'position': 'static'});
            }
        })
    }

    $(window).scroll(function(){
        if ($(window).scrollTop() > $('header').height()) {
            $("header > .navigation-bar")
                .addClass("fixed-top")
                .addClass(" shadow")
            ;
        } else {
            $("header > .navigation-bar")
                .removeClass("fixed-top")
                .removeClass(" shadow")
            ;
        }
    });
});