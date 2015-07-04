(function ( jQuery ) {

    "use strict";

    jQuery.widget( "metro.window" , {

        version: "3.0.0",

        options: {
            parent: 'default',
            captionStyle: false,
            contentStyle: false,
            buttons: {
                btnMin: false,
                btnMax: false,
                btnClose: false
            },
            title: false,
            content: false,
            icon: false,
            type: 'default', // 'modal'
            size: false, // {width: x, height: y}

            onBtnMinClick: function(e){e.preventDefault();},
            onBtnMaxClick: function(e){e.preventDefault();},
            onBtnCloseClick: function(e){e.preventDefault();},
            onShow: function(e){e.preventDefault();},
            onHide: function(e){e.preventDefault();}
        },

        _create: function () {
            var element = this.element, o = this.options;

            jQuery.each(element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = jQuery.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            this._createWindow();

            element.data('window', this);

        },

        _createWindow: function(){
            var that = this, element = this.element, o = this.options;
            var wind = element, capt, cont;

            wind.addClass("window");
            capt = jQuery("<div/>").addClass("window-caption");
            cont = jQuery("<div/>").addClass("window-content");

            if (o.icon || o.title) {capt.appendTo(wind);}
            cont.appendTo(wind);

            if (typeof o.size === 'object') {
                jQuery.each(o.size, function(key, value){
                    cont.css(key, value);
                });
            }

            if (o.captionStyle && typeof o.captionStyle === 'object') {
                jQuery.each(o.captionStyle, function(key, value){
                    if (value.isColor()) {
                        capt.css(key, value + " !important");
                    } else {
                        capt.addClass(value);
                    }
                });
            }

            if (o.contentStyle && typeof o.contentStyle === 'object') {
                jQuery.each(o.contentStyle, function(key, value){
                    if (value.isColor()) {
                        cont.css(key, value + " !important");
                    } else {
                        cont.addClass(value);
                    }
                });
            }

            wind.appendTo(o.parent !== 'default' ? o.parent : element.parent());

            this.icon();
            this.title();
            this.buttons();
            this.content();
        },

        icon: function(){
            var o = this.options;
            var capt = this.element.children('.window-caption');
            var icon = capt.find(".window-caption-icon");

            if (o.icon) {
                if (icon.length === 0) {
                    jQuery("<span/>").addClass('window-caption-icon').html(o.icon).appendTo(capt);
                } else {
                    icon.html(o.icon);
                }

            }
        },

        title: function(){
            var o = this.options;
            var capt = this.element.children('.window-caption');
            var title = capt.find(".window-caption-title");

            if (o.title) {
                if (title.length === 0) {
                    jQuery("<span/>").addClass('window-caption-title').html(o.title).appendTo(capt);
                } else {
                    title.html(o.title);
                }
            }
        },

        buttons: function(){
            var o = this.options;
            var bMin, bMax, bClose;
            var capt = this.element.children('.window-caption');

            if (capt.length === 0) {return;}

            if (o.buttons) {
                var btnMin = o.buttons.btnMin;
                var btnMax = o.buttons.btnMax;
                var btnClose = o.buttons.btnClose;

                if (btnMin && btnMin !== false) {
                    bMin = jQuery("<span/>").addClass('btn-min').appendTo(capt);
                    if (typeof btnMin === 'object') {
                        bMin.css(btnMin);
                    }
                    if (typeof o.onBtnMinClick === 'string') {
                        var bMinFn = window[o.onBtnMinClick];
                        bMin.on('click', bMinFn);
                    } else {
                        bMin.on('click', o.onBtnMinClick(e));
                    }
                }

                if (btnMax && btnMax !== false) {
                    bMax = jQuery("<span/>").addClass('btn-max').appendTo(capt);
                    if (typeof btnMax === 'object') {
                        bMax.css(btnMax);
                    }
                    if (typeof o.onBtnMaxClick === 'string') {
                        var bMaxFn = window[o.onBtnMaxClick];
                        bMax.on('click', bMaxFn);
                    } else {
                        bMax.on('click', o.onBtnMaxClick(e));
                    }
                }

                if (btnClose && btnClose !== false) {
                    bClose = jQuery("<span/>").addClass('btn-close').appendTo(capt);
                    if (typeof btnClose === 'object') {
                        bClose.css(btnClose);
                    }
                    if (typeof o.onBtnCloseClick === 'string') {
                        var bCloseFn = window[o.onBtnCloseClick];
                        bClose.on('click', bCloseFn);
                    } else {
                        bClose.on('click', o.onBtnCloseClick(e));
                    }
                }
            }
        },

        content: function(){
            var o = this.options;
            var c = o.content;
            var content = this.element.children('.window-content');

            if (!c) {return;}

            if (c.isUrl()) {
                if (c.indexOf('youtube') > -1) {
                    var iframe = jQuery("<iframe>");
                    var video_container = jQuery("<div/>").addClass('video-container').appendTo(content);

                    iframe
                        .attr('src', c)
                        .attr('frameborder', '0');

                    iframe.appendTo(video_container);
                }
            } else {
                content.html(c);
            }
        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });
})( jQuery );