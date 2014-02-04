(function( $ ) {
    $.widget("metro.panel", {

        version: "1.0.0",

        options: {
            onCollapse: function(){},
            onExpand: function(){}
        },

        _create: function(){
            var element = this.element, o = this.options,
                header = element.children('.panel-header'),
                content = element.children('.panel-content');

            header.on('click', function(){
                content.slideToggle(
                    'fast',
                    function(){
                        element.toggleClass('collapsed');
                        if (element.hasClass('collapsed')) {
                            o.onCollapse();
                        } else {
                            o.onExpand();
                        }
                    }
                );
            });
        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );


