(function($){
    $.fn.Accordion = function( options ){
        var defaults = {
        };

        var $this = $(this)
            , $li = $this.children("li")
            , $triggers = $li.children("a")
            , $frames = $li.children("div")
            ;

        var initTriggers = function(triggers){
            triggers.on('click', function(e){
                e.preventDefault();
                var $a = $(this)
                  , target = $a.parent('li').children("div");

                if ( $a.parent('li').hasClass('active') ) {
                    target.slideUp();
                    $(this).parent("li").removeClass("active");
                } else {
                    $frames.slideUp();
                    $li.removeClass("active");
                    target.slideDown();
                    $(this).parent("li").addClass("active");
                }
            });
        }

        return this.each(function(){
            if ( options ) {
                $.extend(defaults, options)
            }

            initTriggers($triggers);
        });
    }

    $(function () {
        $('[data-role="accordion"]').each(function () {
            $(this).Accordion();
        })
    })
})(window.jQuery);