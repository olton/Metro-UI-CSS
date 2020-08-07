/* global Metro */
/* eslint-disable */
(function(Metro, $) {
    'use strict';

    var ImageGridDefaultConfig = {
        clsImageGrid: "",
        clsImageGridItem: "",
        clsImageGridImage: "",

        onDrawItem: Metro.noop,
        onImageGridCreate: Metro.noop
    };

    Metro.imageGridSetup = function (options) {
        ImageGridDefaultConfig = $.extend({}, ImageGridDefaultConfig, options);
    };

    if (typeof window["metroImageGridSetup"] !== undefined) {
        Metro.imageGridSetup(window["metroImageGridSetup"]);
    }

    Metro.Component('image-grid', {
        init: function( options, elem ) {
            this._super(elem, options, ImageGridDefaultConfig, {
                // define instance vars here
                items: []
            });
            return this;
        },

        _create: function(){
            this._createStructure();
            this._createEvents();

            this._fireEvent('image-grid-create');
        },

        _createStructure: function(){
            var element = this.element, o = this.options;

            element.addClass("image-grid").addClass(o.clsImageGrid);

            this._createItems();
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;

        },

        _createItems: function(){
            var that = this, element = this.element, o = this.options;
            var items = element.children("img");

            items.each(function(){
                var el = $(this);
                var wrapper = $("<div>").addClass("image-grid__item").addClass(o.clsImageGridItem).appendTo(element);
                var img = new Image();

                img.src = this.src;
                img.onload = function(){
                    var port = this.height >= this.width;
                    wrapper.addClass(port ? "image-grid__item-portrait" : "image-grid__item-landscape");
                    el.addClass(o.clsImageGridImage).appendTo(wrapper);
                    that._fireEvent("draw-item", {
                        item: wrapper[0],
                        image: el[0]
                    });
                }
            });
        },

        changeAttribute: function(){
        },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));