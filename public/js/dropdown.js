(function($){
    $.fn.Dropdown = function( options ){
        var defaults = {
        };

        var $this = $(this)
            ;

        var initSelectors = function(selectors){
            selectors.on('click', function(e){
                $("[data-role=dropdown]").removeClass("active");
                $(".dropdown-menu").slideUp();
                var $m = $(this).children(".dropdown-menu");
                if ($m.css('display') == "block") {
                    $m.slideUp();
                } else {
                    $m.slideDown();
                }
                $(this).toggleClass("active");
            }).on("mouseleave", function(){
                //$(this).children(".dropdown-menu").hide();
            });
        }

        return this.each(function(){
            if ( options ) {
                $.extend(defaults, options)
            }

            initSelectors($this);
        });
    }

    $(function () {
        $('[data-role="dropdown"]').each(function () {
            $(this).Dropdown();
        })
    })
})(window.jQuery);


(function($){
    $.fn.PullDown = function( options ){
        var defaults = {
        };

        var $this = $(this)
            ;

        var initSelectors = function(selectors){

            selectors.on('click', function(e){
                e.preventDefault();
                var $m = $this.parent().children("ul");
                console.log($m);
                if ($m.css('display') == "block") {
                    $m.slideUp();
                } else {
                    $m.slideDown();
                }
                //$(this).toggleClass("active");
            });
        }

        return this.each(function(){
            if ( options ) {
                $.extend(defaults, options)
            }

            initSelectors($this);
        });
    }

    $(function () {
        $('.menu-pull').each(function () {
            $(this).PullDown();
        })
    })
})(window.jQuery);