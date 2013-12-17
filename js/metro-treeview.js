(function( $ ) {
    $.widget("metro.treeview", {

        version: "1.0.0",

        options: {
            onNodeClick: function(node){},
            onNodeCollapsed: function(node){},
            onNodeExpanded: function(node){}
        },

        _create: function(){
            var that = this, element = this.element;

            element.find('.node.collapsed').find('ul').hide();

            element.find('.node-toggle').on('click', function(e){
                var $this = $(this), node = $this.parent().parent("li");

                if (node.hasClass("keep-open")) return;

                node.toggleClass('collapsed');

                if (node.hasClass('collapsed')) {
                    node.children('ul').fadeOut('fast');
                    that.options.onNodeCollapsed(node);
                } else {
                    node.children('ul').fadeIn('fast');
                    that.options.onNodeExpanded(node);
                }

                that.options.onNodeClick(node);
                e.preventDefault();
                e.stopPropagation();
            });

            element.find("a").each(function(){
                var $this = $(this);
                $this.css({
                    paddingLeft: ($this.parents("ul").length-1) * 10
                });
            });

            element.find('a').on('click', function(e){
                var $this = $(this), node = $this.parent('li');
                element.find('a').removeClass('active');
                $this.toggleClass('active');
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



