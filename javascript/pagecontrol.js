(function($){
    $.fn.PageControl = function( options ){
        var defaults = {
        };

        var $this = $(this)
            , $ul = $this.children("ul")
            , $selectors = $ul.find("li a")
            , $selector = $ul.find(".active a")
            , $frames = $this.find(".frames .frame")
            , $frame = $frames.children(".frame.active")
            ;

        var initSelectors = function(selectors){
            selectors.on('click', function(e){
                e.preventDefault();
                var $a = $(this);
                if ( $a.parent('li').hasClass('active') ) return false;
                $frames.hide();
                $ul.find("li").removeClass("active");
                var target = $($a.attr("href"));
                target.show();
                $(this).parent("li").addClass("active");
            });
        }

        return this.each(function(){
            if ( options ) {
                $.extend(defaults, options)
            }

            initSelectors($selectors);
        });
    }

    $(function () {
        $('[data-role="page-control"]').each(function () {
            $(this).PageControl();
        })
    })
})(window.jQuery);