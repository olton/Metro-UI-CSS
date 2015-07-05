(function ( $ ) {

    "use strict";

    $.widget( "metro.listview" , {

        version: "3.0.0",

        options: {
            onExpand: function(group){},
            onCollapse: function(group){},
            onActivate: function(list){}
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

            this._initList();
            this._createEvents();

            element.data('listview', this);

        },

        _initList: function(){
            var that = this, element = this.element, o = this.options;
            var groups = element.find('.list-group');

            $.each(groups, function(){
                var group = $(this);
                if (group.hasClass('collapsed')) {
                    group.find('.list-group-content').hide();
                }
            });

        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;

            element.on('click', '.list-group-toggle', function(e){
                var toggle = $(this), parent = toggle.parent();

                if (toggle.parent().hasClass('keep-open')) {
                    return;
                }

                parent.toggleClass('collapsed');

                if (!parent.hasClass('collapsed')) {
                    toggle.siblings('.list-group-content').slideDown('fast');
                    if (typeof o.onExpand === 'string') {
                        window[o.onExpand](parent);
                    } else {
                        o.onExpand(parent);
                    }
                } else {
                    toggle.siblings('.list-group-content').slideUp('fast');
                    if (typeof o.onCollapse === 'string') {
                        window[o.onCollapse](parent);
                    } else {
                        o.onCollapse(parent);
                    }
                }
                e.preventDefault();
                e.stopPropagation();
            });

            element.on('click', '.list', function(e){
                var list = $(this);

                element.find('.list').removeClass('active');
                list.addClass('active');
                if (typeof o.onActivate === 'string') {
                    window[o.onActivate](list);
                } else {
                    o.onActivate(list);
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