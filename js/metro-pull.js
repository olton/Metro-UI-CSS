(function( $ ) {
    $.widget("metro.pullmenu", {

        version: "1.0.0",

        options: {
        },

        _create: function(){
            var that = this,
                element = this.element;

            var menu = (element.data("relation") != undefined) ? element.data("relation") : element.parent().children(".element-menu, .horizontal-menu");

            addTouchEvents(element[0]);

            element.on("click", function(e){
                menu.slideToggle();
                e.preventDefault();
                e.stopPropagation();
            });

        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

$(window).resize(function(){
    var device_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (device_width > 800) {$(".element-menu").show();} else {$(".element-menu").hide();}
});
