(function( $ ) {

    "use strict";

    $.widget("metro.panel", {

        version: "3.0.0",

        options: {
        },

        _create: function(){
            var element = this.element, o = this.options;

            $.each(element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = $.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            if (!element.hasClass('collapsible')) {element.addClass('collapsible');}

            if (element.hasClass("collapsible")) {
                var toggle = element.children(".heading");
                var content = element.children(".content");

                toggle.on("click", function(){
                    if (element.hasClass("collapsed")) {
                        content.slideDown('fast', function(){
                            element.removeClass('collapsed');
                        });
                    } else {
                        content.slideUp('fast', function(){
                            element.addClass('collapsed');
                        });
                    }

                });
            }

            element.data('panel', this);

        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    });
})( jQuery );