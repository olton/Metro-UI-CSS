(function( $ ) {
    $.widget("metro.listview", {

        version: "1.0.0",

        options: {
            onGroupExpand: function(g){},
            onGroupCollapse: function(g){},
            onListClick: function(l){}
        },

        _create: function(){
            var that = this, element = this.element;

            element.children('.collapsed').children('.group-content').hide();

            element.find('.group-title').on('click', function(e){
                var $this = $(this),
                    group = $this.parent('.list-group'),
                    group_content = group.children('.group-content');

                group.toggleClass('collapsed');

                if (group.hasClass('collapsed')) {
                    group_content.slideUp();
                    that.options.onGroupCollapse(group);
                } else {
                    group_content.slideDown();
                    that.options.onGroupExpand(group);
                }

                e.preventDefault();
            });

            element.find('.list').on('click', function(e){
                element.find('.list').removeClass('active');
                $(this).toggleClass('active');
                that.options.onListClick($(this));
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


