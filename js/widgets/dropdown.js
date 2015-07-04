(function( jQuery ) {

    "use strict";

    jQuery.widget("metro.dropdown", {

        version: "3.0.0",

        options: {
            effect: window.METRO_SHOW_TYPE,
			toggleElement: false,
            noClose: false
        },

        _create: function(){
            var  that = this, element = this.element, o = this.options,
                 menu = this.element,
                 name = this.name,
                 parent = this.element.parent();

            var toggle;

            jQuery.each(element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = jQuery.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            toggle = o.toggleElement ? jQuery(o.toggleElement) : parent.children('.dropdown-toggle').length > 0 ? parent.children('.dropdown-toggle') : parent.children('a:nth-child(1)');

            if (METRO_SHOW_TYPE !== undefined) {
                this.options.effect = METRO_SHOW_TYPE;
            }

            toggle.on('click.'+name, function(e){
                parent.siblings(parent[0].tagName).removeClass("active-container");
                jQuery(".active-container").removeClass("active-container");

                if (menu.css('display') === 'block' && !menu.hasClass('keep-open')) {
                    that._close(menu);
                } else {
                    jQuery('[data-role=dropdown]').each(function(i, el){
                        if (!menu.parents('[data-role=dropdown]').is(el) && !jQuery(el).hasClass('keep-open') && jQuery(el).css('display') === 'block') {
                            that._close(el);
                        }
                    });
                    if (menu.hasClass('horizontal')) {
                        menu.css({
                            'visibility': 'hidden',
                            'display': 'block'
                        });
                        var item_length = jQuery(menu.children('li')[0]).outerWidth();
                        //var item_length2 = jQuery(menu.children('li')[0]).width();
                        menu.css({
                            'visibility': 'visible',
                            'display': 'none'
                        });
                        var menu_width = menu.children('li').length * item_length + (menu.children('li').length - 1);
                        menu.css('width', menu_width);
                    }
                    that._open(menu);
                    parent.addClass("active-container");
                }
                e.preventDefault();
                e.stopPropagation();
            });

            if (o.noClose === true) {
                element.on('click', function (e) {
                   // e.preventDefault();
                    e.stopPropagation();
                });
            }

            jQuery(menu).find('li.disabled a').on('click', function(e){
                e.preventDefault();
            });

            jQuery(document).on('click', function(e){
                jQuery('[data-role=dropdown]').each(function(i, el){
                    if (!jQuery(el).hasClass('keep-open') && jQuery(el).css('display')==='block') {
                        jQuery(el).hide();
                    }
                });
            });

            element.data('dropdown', this);
        },

        _open: function(el){
            switch (this.options.effect) {
                case 'fade': jQuery(el).fadeIn('fast'); break;
                case 'slide': jQuery(el).slideDown('fast'); break;
                default: jQuery(el).show();
            }
            this._trigger("onOpen", null, el);
        },

        _close: function(el){
            switch (this.options.effect) {
                case 'fade': jQuery(el).fadeOut('fast'); break;
                case 'slide': jQuery(el).slideUp('fast'); break;
                default: jQuery(el).hide();
            }
            this._trigger("onClose", null, el);
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    });
})( jQuery );
