(function ( jQuery ) {

    "use strict";

    jQuery.widget( "metro.datatable" , {

        version: "3.0.0",

        options: {
        },

        _create: function () {
            var that = this, element = this.element, o = this.options;

            jQuery.each(element.data(), function(key, value){
                try {
                    o[key] = jQuery.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            });

            if(jQuery().dataTable) {
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

})( jQuery );