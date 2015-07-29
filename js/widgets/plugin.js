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

    _executeEvent: function(event){
        var result, args = arguments.splice(0, 1);

        if (typeof event === 'function') {
            event.apply(args);
        } else {
            if (typeof window[event] === 'function') {
                window[event].apply(args);
            } else {
                result = eval("(function(){"+event+"})");
                result.apply(args);
            }
        }

    },

    _destroy: function () {
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});
