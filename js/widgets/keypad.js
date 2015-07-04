(function ( jQuery ) {

    "use strict";

    jQuery.widget( "metro.keypad" , {

        version: "3.0.0",

        options: {
            target: false,
            shuffle: false,
            length: false,
            keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        },

        //_keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],

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

            if (typeof o.keys === 'string') {
                o.keys = o.keys.split(",");
            }

            this._createKeypad();

            element.data('keypad', this);

        },

        _shuffleKeys: function(keypad){
            var that = this, element = this.element, o = this.options;
            var keys = o.keys.slice(0);
            var keypad = this._keypad;
            var keys_length = keys.length + 2;

            if (o.shuffle) {
                keys = keys.shuffle();
            }

            keypad.html('').css({
                width: keys_length / 4 * 32 + (keys_length / 4 + 1) * 2 + 2
            });

            keys.map(function(i){
                jQuery("<div/>").addClass('key').html(i).data('key', i).appendTo(keypad);
            });

            jQuery("<div/>").addClass('key').html('&larr;').data('key', '&larr;').appendTo(keypad);
            jQuery("<div/>").addClass('key').html('&times;').data('key', '&times;').appendTo(keypad);
        },

        _createKeypad: function(){
            var that = this, element = this.element, o = this.options;
            var keypad;

            if (element.hasClass('input-control')) {

                keypad = jQuery("<div/>").addClass('keypad keypad-dropdown').css({
                    position: 'absolute',
                    'z-index': 1000,
                    display: 'none'
                }).appendTo(element);

                o.target = element.find('input');

                element.on('click', function(e){
                    if (keypad.css('display') === 'none') {
                        keypad.show();
                    } else {
                        keypad.hide();
                    }

                    var opened_pads = jQuery(".keypad.keypad-dropdown");
                    jQuery.each(opened_pads, function(){
                        if (!jQuery(this).is(keypad)) {
                            jQuery(this).hide();
                        }
                    });

                    e.stopPropagation();
                });

                jQuery('html').on('click', function(){
                    jQuery(".keypad.keypad-dropdown").hide();
                });
            } else {
                keypad = element;
                keypad.addClass('keypad');
            }

            if (o.target !== false) {
                jQuery(o.target).attr('readonly', true);
            }

            if (keypad.parent().data('role') === 'dropdown') {
                keypad.parent().css({
                    top: '100%'
                });
            }

            this._keypad = keypad;

            this._shuffleKeys();

            keypad.on('click', '.key', function(e){
                var key = jQuery(this);

                if (o.target) {

                    if (key.data('key') !== '&larr;' && key.data('key') !== '&times;') {
                        if (o.length && jQuery(o.target).val().length === o.length) {
                            return false;
                        }
                        jQuery(o.target).val(jQuery(o.target).val() + '' + key.data('key'));
                    } else {
                        if (key.data('key') === '&times;') {
                            jQuery(o.target).val('');
                        }
                        if (key.data('key') === '&larr;') {
                            var val = jQuery(o.target).val();
                            jQuery(o.target).val(val.substring(0, val.length - 1))
                        }
                    }
                }

                if (o.shuffle) {
                    that._shuffleKeys();
                }

                e.preventDefault();
                e.stopPropagation();
            });
        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });

})( jQuery );