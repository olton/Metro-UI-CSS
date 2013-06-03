(function($){
    $.fn.Dropdown = function( options ){
        var defaults = {
        };

        var $this = $(this)
            ;

        var clearDropdown = function(){
            $(".dropdown-menu").each(function(){
                if ( $(this).css('position') == 'static' ) return;
                $(this).slideUp('fast', function(){});
                $(this).parent().removeClass("active");
            });
        };

        var initSelectors = function(selectors){
        	selectors.off("click.dropdown");
            selectors.on('click.dropdown', function(e){
                //e.stopPropagation();
                //$("[data-role=dropdown]").removeClass("active");
            	if($(e.originalEvent.target).parent().is("[data-role]")) e.stopPropagation();

                clearDropdown();
                $(this).parents("ul").css("overflow", "visible");

                var $m = $(this).children(".dropdown-menu, .sidebar-dropdown-menu");
                $(this).parents("ul").children(".dropdown").children(".dropdown-menu, .sidebar-dropdown-menu").each(function(){
                    if(!$(this).hasClass("keep-opened") && !$m.hasClass("keep-opened")) {
                        $(this).slideUp('fast');
                        $(this).parents("li").removeClass("active");
                    }
                });
                
                if ($m.css('display') == "block") {
                    $m.slideUp('fast');
                    $(this).removeClass("active");
                } else {
                    $m.slideDown('fast');
                    $(this).addClass("active");
                }
            }).on("mouseleave", function(){
                //$(this).children(".dropdown-menu").hide();
            });
            $('html').on("click", function(e){
            	if(e.originalEvent && $(e.originalEvent.target).parents('[data-role="dropdown"]').length == 0)
            		clearDropdown();
            });
        };

        return this.each(function(){
            if ( options ) {
                $.extend(defaults, options);
            }

            initSelectors($this);
        });
    };

    $(function () {
        $('[data-role="dropdown"]').each(function () {
            $(this).Dropdown();
        });
    });
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
                //console.log($m);
                if ($m.css('display') == "block") {
                    $m.slideUp('fast');
                } else {
                    $m.slideDown('fast');
                }
                //$(this).toggleClass("active");
            });
        };

        return this.each(function(){
            if ( options ) {
                $.extend(defaults, options);
            }

            initSelectors($this);
        });
    };

    $(function () {
        $('.pull-menu, .menu-pull').each(function () {
            $(this).PullDown();
        });
    });
})(window.jQuery);
