(function ( jQuery ) {
    "use strict";

    jQuery.widget( "metro.group" , {

        version: "3.0.0",

        options: {
            groupType: 'one-state', // 'multi-state'
            buttonStyle: false,
            onChange: function(index, btn){return true;},
            onChanged: function(index, btn){}
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

            if (!element.hasClass('group-of-buttons')) {element.addClass('group-of-buttons');}

            var buttons = element.find('.button, .toolbar-button');

            for(var i = 0; i < buttons.length; i++) {
                jQuery(buttons[i]).data('index', i);
            }

            if (o.buttonStyle !== false) {
                buttons.addClass(o.buttonStyle);
            }

            element.on('click', '.button, .toolbar-button', function(){

                if (typeof o.onChange === 'string') {
                    if (!window[o.onChange](jQuery(this).data('index'), this)) {return false;}
                } else {
                    if (!o.onChange(jQuery(this).data('index'), this)) {return false;}
                }

                if (o.groupType === 'one-state') {
                    buttons.removeClass('active');
                    jQuery(this).addClass('active');
                } else  {
                    jQuery(this).toggleClass('active');
                }

                if (typeof o.onChanged === 'string') {
                    window[o.onChanged](jQuery(this).data('index'), this);
                } else {
                    o.onChanged(jQuery(this).data('index'), this);
                }
            });

            element.data('group', this);

        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });

})( jQuery );