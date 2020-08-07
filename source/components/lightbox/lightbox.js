/* global Metro */
/* eslint-disable */
(function(Metro, $) {
    'use strict';

    var LightboxDefaultConfig = {
        closeIcon: "<span class='default-icon-cross'>",
        prevIcon: "<span class='default-icon-chevron-left'>",
        nextIcon: "<span class='default-icon-chevron-right'>",
        loop: true,
        source: "img",
        onLightboxCreate: Metro.noop
    };

    Metro.lightboxSetup = function (options) {
        LightboxDefaultConfig = $.extend({}, LightboxDefaultConfig, options);
    };

    if (typeof window["metroLightboxSetup"] !== undefined) {
        Metro.lightboxSetup(window["metroLightboxSetup"]);
    }

    Metro.Component('lightbox', {
        init: function( options, elem ) {
            this._super(elem, options, LightboxDefaultConfig, {
                // define instance vars here
                overlay: null,
                lightbox: null,
                current: null,
                items: []
            });
            return this;
        },

        _create: function(){
            var that = this, element = this.element, o = this.options;

            if (!o.source) {
                o.source = "img";
            }

            this._createStructure();
            this._createEvents();

            this._fireEvent('lightbox-create');
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            var lightbox, overlay;

            overlay = $(".lightbox-overlay");

            if (overlay.length === 0) {
                overlay = $("<div>").addClass("lightbox-overlay").appendTo("body").hide();
            }

            lightbox = $("<div>").addClass("lightbox").appendTo("body").hide();

            $("<span>").addClass("lightbox__prev").html(o.prevIcon).appendTo(lightbox);
            $("<span>").addClass("lightbox__next").html(o.nextIcon).appendTo(lightbox);
            $("<span>").addClass("lightbox__closer").html(o.closeIcon).appendTo(lightbox);
            $("<div>").addClass("lightbox__image").appendTo(lightbox);

            this.component = lightbox[0];
            this.lightbox = lightbox;
            this.overlay = overlay;
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            var lightbox = $(this.component);

            element.on(Metro.events.click, o.source, function(){
                that.open(this);
            });

            lightbox.on(Metro.events.click, ".lightbox__closer", function(){
                that.close();
            });

            lightbox.on(Metro.events.click, ".lightbox__prev", function(){
                that.prev();
            });

            lightbox.on(Metro.events.click, ".lightbox__next", function(){
                that.next();
            });
        },

        _setupItems: function(){
            var that = this, element = this.element, o = this.options;
            var items = $(o.source);

            if (items.length === 0) {
                return ;
            }

            this.items = items;
        },

        _goto: function(el){
            var $el = $(el);
            var isImage = el.tagName === "IMG";
            var img = $("<img>"), src;
            var imageContainer = this.lightbox.find(".lightbox__image").html("");
            var imageWrapper = $("<div>").addClass("lightbox__image-wrapper").attr("data-title", $el.attr("alt")).appendTo(imageContainer);

            this.current = el;

            if (isImage) {
                src = $el.attr("data-original") || $el.attr("src");
                img.attr("src", src);
                img[0].onload = function(){
                    var port = this.height > this.width;
                    img.addClass(port ? "lightbox__image-portrait" : "lightbox__image-landscape");
                    img.attr("alt", $el.attr("alt"));
                    img.appendTo(imageWrapper);

                    // setTimeout(function(){
                    //     img.addClass("showing");
                    // }, 100);
                }
            }
        },

        _index: function(el){
            var index = -1;

            this.items.each(function(i){
                if (this === el) {
                    index = i;
                }
            });

            return index;
        },

        next: function(){
            var index, current = this.current;

            index = this._index(current);

            if (index + 1 >= this.items.length) {
                if (this.options.loop) {
                    index = -1;
                } else {
                    return;
                }
            }

            this._goto(this.items[index + 1]);
        },

        prev: function(){
            var index, current = this.current;

            index = this._index(current);

            if (index - 1 < 0) {
                if (this.options.loop) {
                    index = this.items.length;
                } else {
                    return;
                }
            }

            this._goto(this.items[index - 1]);
        },

        open: function(el){
            var lightbox = $(this.component), overlay = $(this.overlay);


            this._setupItems();

            this._goto(el);

            overlay.show();
            lightbox.show();

            return this;
        },

        close: function(){
            this.overlay.hide();
            this.lightbox.hide();
        },

        changeAttribute: function(attr, val){
        },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));