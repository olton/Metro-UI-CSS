(function ( $ ) {

    "use strict";

    $.widget( "metro.appbar" , {

        version: "3.0.0",

        options: {
        },

        _create: function () {
            var that = this, element = this.element, o = this.options;

            $.each(element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = $.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            this._initBar();

            element.data('appbar', this);

        },

        _initBar: function(){
            var that = this, element = this.element, o = this.options;
            var pull = $(element).find('.app-bar-pull');
            var menu = $(element).find('.app-bar-menu');

            if (menu.length === 0) {
                pull.hide();
            }

            if (pull.length > 0) {
                pull.on('click', function(e){
                    menu.slideToggle('fast');
                    e.preventDefault();
                    e.stopPropagation();
                });
            }

            if (menu.length > 0) {
                $(window).resize(function(){
                    var device_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                    if (device_width > 800) {
                        $(".app-bar:not(.no-responsive-future) .app-bar-menu").show();
                    } else {
                        $(".app-bar:not(.no-responsive-future) .app-bar-menu").hide();
                    }
                });
            }
        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });

})( jQuery );