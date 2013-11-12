(function( $ ) {
    $.widget("metro.stepper", {

        version: "1.0.0",

        options: {
            diameter: 32
        },

        _create: function(){
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

$(function () {
    $('[data-role=stepper]').stepper();
});