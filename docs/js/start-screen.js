(function($) {
    $.StartScreen = function(){
        var plugin = this;

        plugin.init = function(){
            setTilesAreaSize();
            addMouseWheel();
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

        plugin.init();
    }
})(jQuery);

$(function(){
    $.StartScreen();
});
