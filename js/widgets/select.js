(function ( jQuery ) {

    "use strict";

    jQuery.widget( "metro.select" , {

        version: "3.0.0",

        options: {
        },

        _create: function () {
            var that = this, element = this.element, o = this.options;
            var func_options = [
                'templateResult',
                'templateSelection',
                'matcher',
                'initSelection',
                'query'
            ];

            jQuery.each(element.data(), function(key, value){
                try {
                    o[key] = jQuery.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            });

            func_options.map(function(func, index){
                if (o[func] !== undefined) {
                    o[func] = window[o[func]];
                }
            });

            if (o.dropdownParent !== undefined) {
                o.dropdownParent = jQuery(o.dropdownParent);
            }

            if(jQuery().select2) {
                try {
                    element.find("select").select2(o);
                } catch (e) {

                }
            } else {
                alert('Select2 plugin required');
            }

            element.data('select', this);

        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });

})( jQuery );