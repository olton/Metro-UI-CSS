
(function($){
    $.Metro = function(params){
        params = $.extend({
        }, params);
    };
})(jQuery);

$(function(){
    $('html').on('click', function(e){
        $('.dropdown-menu').each(function(i, el){
            if (!$(el).hasClass('keep-open') && $(el).css('display')=='block') {
                $(el).hide();
            }
        });
    });
});

$(function(){
    $(window).on('resize', function(){
        if (METRO_DIALOG) {
            var top = ($(window).height() - METRO_DIALOG.outerHeight()) / 2;
            var left = ($(window).width() - METRO_DIALOG.outerWidth()) / 2;
            METRO_DIALOG.css({
                top: top, left: left
            });
        }
    });
});