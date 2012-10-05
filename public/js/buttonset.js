(function($){
    $.fn.ButtonSet = function( options ){
        var defaults = {
        };

        var $this = $(this)
            , $buttons = $this.find("button")
            ;

        var initButtons = function(buttons){
            buttons.on('click', function(e){
                e.preventDefault();
                var $a = $(this);
                if ( $a.hasClass('active') ) return false;
                $buttons.removeClass("active");
                $(this).addClass("active");
            });
        }

        return this.each(function(){
            if ( options ) {
                $.extend(defaults, options)
            }

            initButtons($buttons);
        });
    }

    $(function () {
        $('[data-role="button-set"]').each(function () {
            $(this).ButtonSet();
        })
    })
})(window.jQuery);