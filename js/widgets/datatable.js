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

    $.widget( "metro.datatable" , {

        version: "3.0.0",

        options: {
        },

        _create: function () {
            var that = this, element = this.element, o = this.options;

            $.each(element.data(), function(key, value){
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            });

            if($().dataTable) {
                try {
                    element.dataTable(o);
                } catch (e) {

                }
            } else {
                alert('dataTable plugin required');
            }

            element.data('datatable', this);

        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });

}));