(function ( $ ) {

    "use strict";

    $.widget( "metro.dialog" , {

        version: "3.0.0",

        options: {
            modal: false,
            overlay: false,
            overlayColor: 'default',
            type: 'default', // success, alert, warning, info
            place: 'center', // center, top-left, top-center, top-right, center-left, center-right, bottom-left, bottom-center, bottom-right
            position: 'default',
            content: false,
            hide: false,
            width: 'auto',
            height: 'auto',
            background: 'default',
            color: 'default',
            closeButton: false,
            windowsStyle: false,

            _interval: undefined,
            _overlay: undefined,

            onDialogOpen: function(dialog){},
            onDialogClose: function(dialog){}
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

            if (o.overlay) {
                this._createOverlay();
            }
            this._createDialog();

            element.data('dialog', this);
        },

        _createOverlay: function(){
            var that = this, element = this.element, o = this.options;
            var overlay = $('body').find('.dialog-overlay');

            if (overlay.length === 0) {
                overlay = $("<div/>").addClass('dialog-overlay');
            }

            if (o.overlayColor) {
                if (o.overlayColor.isColor()) {
                    overlay.css({
                        background: o.overlayColor
                    });
                } else {
                    overlay.addClass(o.overlayColor);
                }
            }

            o._overlay = overlay;
        },

        _createDialog: function(){
            var that = this, element = this.element, o = this.options;

            element.addClass('dialog');

            if (o.type !== 'default') {
                element.addClass(o.type);
            }

            if (o.windowsStyle) {
                o.width = 'auto';

                element.css({
                    left: 0,
                    right: 0
                });
            }

            if (o.background !== 'default') {
                if (o.background.isColor()) {
                    element.css({
                        background: o.background
                    });
                } else {
                    element.addClass(o.background);
                }
            }

            if (o.color !== 'default') {
                if (o.color.isColor()) {
                    element.css({
                        color: o.color
                    });
                } else {
                    element.addClass(o.color);
                }
            }

            element.css({
                width: o.width,
                height: o.height
            });

            if (o.closeButton) {
                $("<span/>").addClass('dialog-close-button').appendTo(element).on('click', function(){
                    that.close();
                });
            }

            element.hide();
        },

        _setPosition: function(){
            var that = this, element = this.element, o = this.options;
            var width = element.width(),
                height = element.height();

            element.css({
                left: o.windowsStyle === false ? ( $(window).width() - width ) / 2 : 0,
                top: ( $(window).height() - height ) / 2
            });
        },

        open: function(){
            var that = this, element = this.element, o = this.options;
            var overlay;

            this._setPosition();

            element.data('opened', true);

            if (o.overlay) {
                overlay = o._overlay;
                overlay.appendTo('body').show();
            }

            element.fadeIn();

            if (typeof o.onDialogOpen === 'string') {
                window[o.onDialogOpen](element);
            } else {
                o.onDialogOpen(element);
            }

            if (o.hide && parseInt(o.hide) > 0) {
                o._interval = setTimeout(function(){
                    that.close();
                }, parseInt(o.hide));
            }
        },

        close: function(){
            var that = this, element = this.element, o = this.options;

            clearInterval(o._interval);

            if (o.overlay) {
                $('body').find('.dialog-overlay').remove();
            }

            element.data('opened', false);

            element.fadeOut();

            if (typeof o.onDialogClose === 'string') {
                window[o.onDialogClose](element);
            } else {
                o.onDialogClose(element);
            }
        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });
})( jQuery );