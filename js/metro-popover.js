(function( $ ) {
    $.widget("metro.popover", {

        version: "1.0.0",

        options: {
            popoverText: '',
            popoverTimeout: 3000,
            popoverPosition: 'top', //top, bottom, left, right
            popoverBackground: 'bg-cyan',
            popoverColor: 'fg-white',
            popoverMode: 'none', //click, hover,
            popoverShadow: true
        },

        popover: {},

        _create: function(){
            this.createPopover();
        },

        createPopover: function(){
            var that = this, element,
                o = this.options;

            element = this.element;

            $.each(element.data(), function(key, value){
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            });

            var popover, content_container, marker_class;

            popover = $("<div/>").addClass("notice").appendTo('body').hide();
            $("<div/>").appendTo(popover);

            if (o.popoverShadow) {
                popover.addClass("shadow");
            }

            if (o.popoverBackground) {
                if (o.popoverBackground[0] == '#') popover.css('background-color', o.popoverBackground); else popover.addClass(o.popoverBackground);
            }
            if (o.popoverColor) {
                if (o.popoverColor[0] == '#') popover.css('color', o.popoverColor); else popover.addClass(o.popoverColor);
            }

            switch (o.popoverPosition) {
                case 'left': marker_class = 'marker-on-right'; break;
                case 'right': marker_class = 'marker-on-left'; break;
                case 'bottom': marker_class = 'marker-on-top'; break;
                default: marker_class = 'marker-on-bottom';
            }

            popover.css({
                position: 'fixed'
            });

            popover.addClass(marker_class);

            this.popover = popover;

            this.setText(o.popoverText);

            element.on(o.popoverMode, function(e){
                if (!popover.data('visible')) that.show();
            });

            $(window).scroll(function(){
                //that.popover.hide();
                if (that.popover.data('visible')) {
                    that.setPosition();
                }
            });

        },

        setPosition: function(){
            var o = this.options, popover = this.popover, element = this.element;

            if (o.popoverPosition == 'top') {
                popover.css({
                    top: element.offset().top - $(window).scrollTop() - popover.outerHeight() - 10,
                    left: element.offset().left + element.outerWidth()/2 - popover.outerWidth()/2  - $(window).scrollLeft()
                });
            } else if (o.popoverPosition == 'bottom') {
                popover.css({
                    top: element.offset().top - $(window).scrollTop() + element.outerHeight() + 10,
                    left: element.offset().left + element.outerWidth()/2 - popover.outerWidth()/2  - $(window).scrollLeft()
                });
            } else if (o.popoverPosition == 'right') {
                popover.css({
                    top: element.offset().top + element.outerHeight()/2 - popover.outerHeight()/2 - $(window).scrollTop(),
                    left: element.offset().left + element.outerWidth() - $(window).scrollLeft() + 10
                });
            } else if (o.popoverPosition == 'left') {
                popover.css({
                    top: element.offset().top + element.outerHeight()/2 - popover.outerHeight()/2 - $(window).scrollTop(),
                    left: element.offset().left - popover.outerWidth() - $(window).scrollLeft() - 10
                });
            }
            return this;
        },

        setText: function(text){
            this.popover.children('div').html(text);
        },

        show: function(){
            var o = this.options, popover = this.popover;

            this.setPosition();

            popover.fadeIn(function(){
                popover.data('visible', true);
                setTimeout(function(){
                    popover.fadeOut(
                        function(){popover.data('visible', false);}
                    );
                }, o.popoverTimeout)
            });
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );