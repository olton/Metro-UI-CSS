(function( $ ) {
    $.widget("metro.buttonset", {

        version: "1.0.0",

        options: {
            click: function(btn, on){}
        },

        _buttons: {},

        _create: function(){
            var element = this.element;

            this._buttons = element.find("button, .button");

            this.init();
        },

        init: function(){
            var that = this;

            this._buttons.each(function(){
                var btn = $(this);

                btn.on('click', function(e){
                    e.preventDefault();
                    btn.toggleClass("active");

                    that.options.click(btn, btn.hasClass("active"));
                    that._trigger("click", event, {button: btn, on: (btn.hasClass("active"))});
                });
            });
        },

        _destroy: function(){},

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

(function( $ ) {
    $.widget("metro.buttongroup", {

        version: "1.0.0",

        options: {
            click: function(btn, on){}
        },

        _buttons: {},

        _create: function(){
            var element = this.element;

            this._buttons = element.find("button, .button");

            this.init();
        },

        init: function(){
            var that = this;

            this._buttons.each(function(){
                var btn = $(this);

                btn.on('click', function(e){
                    e.preventDefault();
                    that._buttons.removeClass("active");
                    btn.addClass("active");

                    that.options.click(btn, btn.hasClass("active"));
                    that._trigger("click", event, {button: btn, on: (btn.hasClass("active"))});
                });
            });
        },

        _destroy: function(){},

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

$(function(){
    $('[data-role=button-set]').buttonset();
    $('[data-role=button-group]').buttongroup();
});

function reinitButtonSets(){
    $('[data-role=button-set]').buttonset();
    $('[data-role=button-group]').buttongroup();
}