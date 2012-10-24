(function($){
    $.fn.Rating = function( options ){
        var defaults = {
        };

        var $this = $(this)
            ;

        var init = function(el){
            var a = el.find("a");
            var r = Math.round(el.data("rating")) || 0;

            a.each(function(index){
                console.log(index);
                if (index < r) {
                    $(this).addClass("rated");
                }

                $(this).hover(
                    function(){
                        $(this).prevAll().andSelf().addClass("hover");
                        $(this).nextAll().removeClass("hover");
                    },
                    function(){
                        $(this).prevAll().andSelf().removeClass("hover");
                    }
                )
            })

        }

        return this.each(function(){
            if ( options ) {
                $.extend(defaults, options)
            }

            init($this);
        });
    }

    $(function () {
        $('[data-role="rating"]').each(function () {
            $(this).Rating();
        })
    })
})(window.jQuery);