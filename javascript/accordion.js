/**
 * jQuery plugin for input elements for Metro UI CSS framework
 */
(function($) {
    var pluginName = 'Accordion',
        initAllSelector = '[data-role="accordion"]',
        paramKeys = [];

    $[pluginName] = function(element, options) {
        if (!element) {
            return $()[pluginName]({initAll: true});
        }

        var defaults = {
        };

        var plugin = this;
        plugin.settings = {};
        var $element = $(element);

        var $li, $triggers, $frames;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

            $li = $element.children("li");
            $triggers = $li.children("a");
            $frames = $li.children("div");

            $triggers.on('click', function(e){
                e.preventDefault();
                var $a = $(this),
                    $activeLi = $li.filter('.active'),
                    $parentLi = $a.parent("li"),
                    target = $a.parent('li').children("div");

                if ( $parentLi.hasClass('active') ) {
                    target.slideUp(undefined, function(){
                        $parentLi.removeClass("active");
                    });

                } else {
                    $frames.slideUp(undefined, function(){
                        $activeLi.removeClass("active");
                    });
                    target.slideDown();
                    $parentLi.addClass("active");
                }
            });
        };



        plugin.init();

    };

    $.fn[pluginName] = function(options) {
        var elements = options && options.initAll ? $(initAllSelector) : this;
        return elements.each(function() {
            var that = $(this),
                params = {},
                plugin;
            if (undefined == that.data(pluginName)) {
                $.each(paramKeys, function(index, key){
                    params[key[0].toLowerCase() + key.slice(1)] = that.data('param' + key);
                });
                plugin = new $[pluginName](this, params);
                that.data(pluginName, plugin);
            }
        });
    };
    // autoinit
    $(function(){
        $()[pluginName]({initAll: true});
    });

})(jQuery);