/* global Metro */
(function(Metro, $) {
    'use strict';

    var ImagePlaceholderDefaultConfig = {
        width: 100,
        height: 100,
        color: "#f8f8f8",
        textColor: "#292929",
        font: "12px sans-serif",
        text: "",
        showText: true,
        onImagePlaceholderCreate: Metro.noop
    };

    Metro.imagePlaceholderSetup = function (options) {
        ImagePlaceholderDefaultConfig = $.extend({}, ImagePlaceholderDefaultConfig, options);
    };

    if (typeof window["metroImagePlaceholderSetup"] !== undefined) {
        Metro.imagePlaceholderSetup(window["metroImagePlaceholderSetup"]);
    }

    Metro.Component('image-placeholder', {
        init: function( options, elem ) {
            this._super(elem, options, ImagePlaceholderDefaultConfig, {
                // define instance vars here
            });
            return this;
        },

        _create: function(){
            this._createStructure();
            this._createEvents();

            this._fireEvent('image-placeholder-create');
        },

        _createStructure: function(){
            var element = this.element;
            element.attr("src", this._createPlaceholder());
        },

        _createEvents: function(){
        },

        _createPlaceholder: function(){
            var o = this.options;
            var canvas = document.createElement("canvas"),
                context = canvas.getContext("2d");

            canvas.width = parseInt(o.width);
            canvas.height = parseInt(o.height);

            // background
            context.clearRect(0, 0, o.width, o.height);
            context.fillStyle = o.color;
            context.fillRect(0, 0, o.width, o.height);

            // text
            context.fillStyle = o.textColor;
            context.font = o.font;

            context.translate(o.width / 2, o.height / 2);
            context.textAlign = 'center';
            context.textBaseline = 'middle';

            if (o.showText)
                context.fillText(o.text ? o.text : o.width + " \u00d7 " + o.height, 0, 0);

            return canvas.toDataURL();
        },

        // changeAttribute: function(attr, newValue){
        // },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));