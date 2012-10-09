(function($){
    $.fn.Dropdown = function( options ){
        var defaults = {
        };

        var $this = $(this)
            ;

        var initSelectors = function(selectors){
            selectors.on('click, mouseenter', function(e){
                $(this).children(".dropdown-menu").slideToggle('fast');
            }).on("mouseleave", function(){
                $(this).children(".dropdown-menu").hide();
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