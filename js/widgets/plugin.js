(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function ( jQuery ) {

    "use strict";

    var $ = jQuery;

    $.widget( "metro.widget" , {

        version: "3.0.0",

        options: {
            someValue: null
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

            console.log('Hi');

            element.data('widget', this);

        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });

}));