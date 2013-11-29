(function( $ ) {
    $.widget("metro.treeview", {

        version: "1.0.0",

        options: {
            onNodeClick: function(node){}
        },

        _create: function(){
            var that = this, element = this.element;

            element.find('.node.collapsed').find('ul').hide();

            element.find('.node > a').on('click', function(e){
                var $this = $(this), node = $this.parent('li');

                node.toggleClass('collapsed');

                if (node.hasClass('collapsed')) {
                    node.children('ul').fadeOut('fast');
                } else {
                    node.children('ul').fadeIn('fast');
                }

                that.options.onNodeClick(node);
                e.preventDefault();
            });

            element.find('a').on('click', function(e){
                var $this = $(this), node = $this.parent('li');

                element.find('a').parent('li').removeClass('active');
                if (node.hasClass('node')) return;
                node.toggleClass('active');

                that.options.onNodeClick(node);
                e.preventDefault();
            });
        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

$(function () {
    $('[data-role=treeview]').treeview();
});

function reinitTrees(){
    $('[data-role=treeview]').treeview();
}