(function ( $ ) {

    "use strict";

    $.widget( "metro.grid" , {

        version: "3.0.0",

        options: {
            equalHeight: false
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

            if (o.equalHeight) {
                this._setEqualHeight();

                $(window).on('resize', function(){
                    that._setEqualHeight();
                });
            }

            element.data('grid', this);

        },

        _setEqualHeight: function(){
            var that = this, element = this.element, o = this.options;
            var rows = element.find('.row');

            $.each(rows, function(){
                var row = $(this);
                var cells = row.children('.cell');
                var maxHeight = 0;

                cells.css('min-height', '0');

                $.each(cells, function(){
                    if ($(this).height() > maxHeight) {
                        maxHeight = $(this).outerHeight();
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