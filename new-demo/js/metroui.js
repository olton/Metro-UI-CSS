(function($) {

    $.metroUI = function(element, options) {

        var defaults = {
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
            element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            // code goes here
            setScrollable();
            setCommands();
            setDropdown();
            setSelectable();
            setSwitchers();
        }
        /*
        plugin.foo_public_method = function() {
            // code goes here
        }
        */

        var setSelectable = function(){
            $(".selectable").each(function(){
                var el = $(this);
                var items = el.children(".metro-image, .metro-image-overlay, .metro-icon-text, .metro-image-text");
                items.bind("click", function(){
                    if ($(this).hasClass("disabled")) return;
                    $(this).toggleClass("selected");
                })
            })
        }

        var setSwitchers = function(){
            // Metro-Switchers
            var switchers = $(".metro-switch");
            switchers.bind("click", function(){
                var el = $(this);
                if (el.hasClass('disabled') || el.hasClass('static')) return false;
                el.toggleClass("state-on");
            })
        }

        var setDropdown = function(){
            $(".dropdown-menu").each(function(){
                var el = $(this);
                var par = el.parent(".dropdown-container");
                var toggler = par.children(".dropdown-toggle");

                //console.log(par.height());

                var left = par.offset().left + 40;
                var top = par.height() + 10;
                el.css({
                    'left': left,
                    'top': top
                });
                toggler.bind("click", function(){
                    $(el).toggleClass("open");
                })

            })
        }

        var setCommands = function(){
            // Back buttons
            $(".command-back-wrapper a").each(function(){
                $(this).bind("click", function(){
                    history.back();
                    return false;
                })
            })
        }

        // Private method
        var setScrollable = function(){
            $('.metro-scroll').mousedown(function (event) {
                $(this)
                    .data('down', true)
                    .data('x', event.clientX)
                    .data('scrollLeft', this.scrollLeft);
                return $(this).hasClass("mouse-normal");
            }).mouseup(function (event) {
                $(this).data('down', false);
            }).mousemove(function (event) {
                if ($(this).data('down') == true) {
                    this.scrollLeft = $(this).data('scrollLeft') + $(this).data('x') - event.clientX;
                }
            }).mousewheel(function (event, delta) {
                this.scrollLeft -= (delta * 30);
                //console.log(this.scrollLeft);
            }).css({
                'overflow' : 'hidden'
            });

            $('.metro-scroll-vertical').mousedown(function (event) {
                $(this)
                    .data('down', true)
                    .data('y', event.clientY)
                    .data('scrollTop', this.scrollTop);
                return false;
            }).mouseup(function (event) {
                $(this).data('down', false);
            }).mousemove(function (event) {
                if ($(this).data('down') == true) {
                    this.scrollTop = $(this).data('scrollTop') + $(this).data('y') - event.clientY;
                }
            }).mousewheel(function (event, delta) {
                this.scrollTop -= (delta * 30);
                //console.log(this.scrollLeft);
            }).css({
                'overflow' : 'hidden'
            });
        }

        plugin.init();

    }

    $.fn.metroUI = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('metroUI')) {
                var plugin = new $.metroUI(this, options);
                $(this).data('metroUI', plugin);
            }
        });

    }

})(jQuery);