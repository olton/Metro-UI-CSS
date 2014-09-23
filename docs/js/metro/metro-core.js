
(function($){
    $.Metro = function(params){
        params = $.extend({
        }, params);
    };

    $.Metro.getDeviceSize = function(){
        var device_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var device_height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
        return {
            width: device_width,
            height: device_height
        }
    }

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
            var top = ($(window).height() - $(this).outerHeight()) / 2;
            var left = ($(window).width() - $(this).outerWidth()) / 2;
            $(this).css({
                top: top, left: left
            });
        }
    });
});
