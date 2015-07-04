(function ( jQuery ) {

    "use strict";

    jQuery.widget( "metro.grid" , {

        version: "3.0.0",

        options: {
            equalHeight: true
        },

        _create: function () {
            var that = this, element = this.element, o = this.options;

            jQuery.each(element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = jQuery.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            if (o.equalHeight) {
                setTimeout(function(){
                    that._setEqualHeight();
                }, 50);

                jQuery(window).on('resize', function(){
                    that._setEqualHeight();
                });
            }

            element.data('grid', this);

        },

        _setEqualHeight: function(){
            var that = this, element = this.element, o = this.options;
            var rows = element.find('.row');

            jQuery.each(rows, function(){
                var row = jQuery(this);
                var cells = row.children('.cell');
                var maxHeight = 0;

                cells.css('min-height', '0');

                jQuery.each(cells, function(){
                    //console.log(this.tagName, jQuery(this).outerHeight());
                    if (jQuery(this).outerHeight() > maxHeight) {
                        maxHeight = jQuery(this).outerHeight();
                    }
                });

                cells.css('min-height', maxHeight);
            });
        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });

})( jQuery );