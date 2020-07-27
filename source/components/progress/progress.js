/* global Metro */
(function(Metro, $) {
    'use strict';
    var ProgressDefaultConfig = {
        progressDeferred: 0,
        showValue: false,
        valuePosition: "free", // center, free
        showLabel: false,
        labelPosition: "before", // before, after
        labelTemplate: "",
        value: 0,
        buffer: 0,
        type: "bar",
        small: false,
        clsBack: "",
        clsBar: "",
        clsBuffer: "",
        clsValue: "",
        clsLabel: "",
        onValueChange: Metro.noop,
        onBufferChange: Metro.noop,
        onComplete: Metro.noop,
        onBuffered: Metro.noop,
        onProgressCreate: Metro.noop
    };

    Metro.progressSetup = function (options) {
        ProgressDefaultConfig = $.extend({}, ProgressDefaultConfig, options);
    };

    if (typeof window["metroProgressSetup"] !== undefined) {
        Metro.progressSetup(window["metroProgressSetup"]);
    }

    Metro.Component('progress', {
        init: function( options, elem ) {
            this._super(elem, options, ProgressDefaultConfig, {
                value: 0,
                buffer: 0
            });

            return this;
        },

        _create: function(){
            var element = this.element, o = this.options;
            var value;

            if (typeof o.type === "string") o.type = o.type.toLowerCase();

            element
                .html("")
                .addClass("progress");

            function _progress(){
                $("<div>").addClass("bar").appendTo(element);
            }

            function _buffer(){
                $("<div>").addClass("bar").appendTo(element);
                $("<div>").addClass("buffer").appendTo(element);
            }

            function _load(){
                element.addClass("with-load");
                $("<div>").addClass("bar").appendTo(element);
                $("<div>").addClass("buffer").appendTo(element);
                $("<div>").addClass("load").appendTo(element);
            }

            function _line(){
                element.addClass("line");
            }

            switch (o.type) {
                case "buffer": _buffer(); break;
                case "load": _load(); break;
                case "line": _line(); break;
                default: _progress();
            }

            if (o.type !== 'line') {
                value = $("<span>").addClass("value").addClass(o.clsValue).appendTo(element);
                if (o.valuePosition === "center") value.addClass("centered");
                if (o.showValue === false) value.hide();
            }

            if (o.small === true) element.addClass("small");

            element.addClass(o.clsBack);
            element.find(".bar").addClass(o.clsBar);
            element.find(".buffer").addClass(o.clsBuffer);

            if (o.showLabel === true) {
                var label = $("<span>").addClass("progress-label").addClass(o.clsLabel).html(o.labelTemplate === "" ? o.value+"%" : o.labelTemplate.replace("%VAL%", o.value));
                if (o.labelPosition === 'before') {
                    label.insertBefore(element);
                } else {
                    label.insertAfter(element);
                }
            }

            this.val(o.value);
            this.buff(o.buffer);

            this._fireEvent("progress-create", {
                element: element
            });
        },

        val: function(v){
            var that = this, element = this.element, o = this.options;
            var value = element.find(".value");

            if (v === undefined) {
                return that.value;
            }

            var bar  = element.find(".bar");

            if (bar.length === 0) {
                return false;
            }

            this.value = parseInt(v, 10);

            bar.css("width", this.value + "%");
            value.html(this.value+"%");

            var diff = element.width() - bar.width();
            var valuePosition = value.width() > diff ? {left: "auto", right: diff + 'px'} : {left: v + '%'};

            if (o.valuePosition === "free") value.css(valuePosition);

            if (o.showLabel === true) {
                var label = element[o.labelPosition === "before" ? "prev" : "next"](".progress-label");
                if (label.length) {
                    label.html(o.labelTemplate === "" ? o.value+"%" : o.labelTemplate.replace("%VAL%", o.value));
                }
            }

            this._fireEvent("value-change", {
                val: this.value
            });

            if (this.value === 100) {

                this._fireEvent("complete", {
                    val: this.value
                });

            }
        },

        buff: function(v){
            var that = this, element = this.element;

            if (v === undefined) {
                return that.buffer;
            }

            var bar  = element.find(".buffer");

            if (bar.length === 0) {
                return false;
            }

            this.buffer = parseInt(v, 10);

            bar.css("width", this.buffer + "%");

            this._fireEvent("buffer-change", {
                val: this.buffer
            });

            if (this.buffer === 100) {
                this._fireEvent("buffered", {
                    val: this.buffer
                });
            }
        },

        changeValue: function(){
            this.val(this.element.attr('data-value'));
        },

        changeBuffer: function(){
            this.buff(this.element.attr('data-buffer'));
        },

        changeAttribute: function(attributeName){
            switch (attributeName) {
                case 'data-value': this.changeValue(); break;
                case 'data-buffer': this.changeBuffer(); break;
            }
        },

        destroy: function(){
            return this.element;
        }
    });
}(Metro, m4q));