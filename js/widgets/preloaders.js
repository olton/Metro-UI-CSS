(function ( jQuery ) {

    "use strict";

    jQuery.widget( "metro.preloader" , {

        version: "3.0.0",

        options: {
            type: 'ring',
            style: 'light'
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

            this._createStructure();

            element.data('preloader', this);

        },

        _createRing: function(){
            var that = this, element = this.element, o = this.options;
            var i, wrap, circle;

            for(i = 0; i < 5 ; i++) {
                wrap = jQuery("<div/>").addClass('wrap').appendTo(element);
                circle = jQuery("<div/>").addClass('circle').appendTo(wrap);
            }
        },

        _createMetro: function(){
            var that = this, element = this.element, o = this.options;
            var i, circle;

            for(i = 0; i < 5 ; i++) {
                circle = jQuery("<div/>").addClass('circle').appendTo(element);
            }
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;

            element.addClass("preloader-"+o.type);
            if (o.style !== 'light') {
                element.addClass(o.style + '-style');
            }

            element.html('');

            switch (o.type) {
                case 'ring': this._createRing(); break;
                case 'metro': this._createMetro(); break;
            }
        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });

})( jQuery );