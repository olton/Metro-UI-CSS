(function ( $ ) {

    "use strict";

    $.widget( "metro.keypad" , {

        version: "3.0.0",

        options: {
            target: false,
            shuffle: false,
            length: false
        },

        _keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],

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

            this._createKeypad();

            element.data('keypad', this);

        },

        _shuffleKeys: function(keypad){
            var that = this, element = this.element, o = this.options;
            var keys = this._keys.slice(0);
            var keypad = this._keypad;

            if (o.shuffle) {
                keys = keys.shuffle();
            }

            keypad.html('');

            keys.map(function(i){
                $("<div/>").addClass('key').html(i).data('key', i).appendTo(keypad);
            });

            $("<div/>").addClass('key').html('<').data('key', '<').appendTo(keypad);
            $("<div/>").addClass('key').html('C').data('key', 'C').appendTo(keypad);
        },

        _createKeypad: function(){
            var that = this, element = this.element, o = this.options;
            var keypad;

            if (element.hasClass('input-control')) {

                keypad = $("<div/>").addClass('keypad keypad-dropdown').css({
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

                    var opened_pads = $(".keypad.keypad-dropdown");
                    $.each(opened_pads, function(){
                        if (!$(this).is(keypad)) {
                            $(this).hide();
                        }
                    });

                    e.stopPropagation();
                });

                $('html').on('click', function(){
                    $(".keypad.keypad-dropdown").hide();
                });
            } else {
                keypad = element;
                keypad.addClass('keypad');
            }

            if (o.target !== false) {
                $(o.target).attr('readonly', true);
            }

            if (keypad.parent().data('role') === 'dropdown') {
                keypad.parent().css({
                    top: '100%'
                });
            }

            this._keypad = keypad;

            this._shuffleKeys();

            keypad.on('click', '.key', function(e){
                var key = $(this);

                if (o.target) {

                    if (parseInt(key.data('key')) >= 0) {
                        if (o.length && $(o.target).val().length === o.length) {
                            return false;
                        }
                        $(o.target).val($(o.target).val() + '' + key.data('key'));
                    } else {
                        if (key.data('key') === 'C') {
                            $(o.target).val('');
                        }
                        if (key.data('key') === '<') {
                            var val = $(o.target).val();
                            $(o.target).val(val.substring(0, val.length - 1))
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