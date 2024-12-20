/* global Metro */
(function(Metro, $) {
    'use strict';

    const SPLIT_MODE = {
        VERTICAL: "vertical",
        HORIZONTAL: "horizontal",
    }

    var Utils = Metro.utils;
    var Storage = Metro.storage;
    var SplitterDefaultConfig = {
        splitterDeferred: 0,
        split: SPLIT_MODE.VERTICAL, // horizontal or vertical
        splitSizes: null,
        gutterSize: 5,
        minSizes: null,
        children: "*",
        gutterClick: "expand", // TODO expand or collapse
        saveState: false,
        noResize: false,
        onResizeStart: Metro.noop,
        onResizeStop: Metro.noop,
        onResizeSplit: Metro.noop,
        onResizeWindow: Metro.noop,
        onSplitterCreate: Metro.noop
    };

    Metro.splitterSetup = function (options) {
        SplitterDefaultConfig = $.extend({}, SplitterDefaultConfig, options);
    };

    if (typeof globalThis["metroSplitterSetup"] !== "undefined") {
        Metro.splitterSetup(globalThis["metroSplitterSetup"]);
    }

    Metro.Component('splitter', {
        init: function( options, elem ) {
            this._super(elem, options, SplitterDefaultConfig, {
                storage: Utils.isValue(Storage) ? Storage : null,
                storageKey: "SPLITTER:",
                id: Utils.elementId("splitter")
            });

            return this;
        },

        _create: function(){
            var element = this.element;

            this._createStructure();
            this._createEvents();

            this._fireEvent("splitter-create", {
                element: element
            });
        },

        _createStructure: function(){
            var element = this.element, o = this.options;
            var children = element.children(o.children).addClass("split-block");
            var i, children_sizes = [];
            var resizeProp = o.split === SPLIT_MODE.HORIZONTAL ? "height" : "width";

            element.addClass("splitter");
            element.addClass((o.split.toLowerCase() === SPLIT_MODE.VERTICAL) ? "vertical" : "horizontal");

            if (o.noResize === true) {
                element.addClass("static-size")
            }

            for (i = 0; i < children.length - 1; i++) {
                $("<div>").addClass("gutter").css(resizeProp, o.gutterSize).insertAfter($(children[i]));
            }

            this._setSize();

            if (Utils.isValue(o.minSizes)) {
                if ((""+o.minSizes).includes(",")) {
                    children_sizes = o.minSizes.toArray();
                    for (i = 0; i < children_sizes.length; i++) {
                        $(children[i]).data("min-size", children_sizes[i]);
                        children[i].style.setProperty('min-'+resizeProp, (""+children_sizes[i]).includes("%") ? children_sizes[i] : (""+children_sizes[i]).replace("px", "")+"px", 'important');
                    }
                } else {
                    $.each(children, function(){
                        this.style.setProperty('min-'+resizeProp, (""+o.minSizes).includes("%") ? o.minSizes : (""+o.minSizes).replace("px", "")+"px", 'important');
                    });
                }
            }

            if (o.saveState && this.storage !== null) {
                this._getSize();
            }
        },

        _setSize: function(){
            var element = this.element, o = this.options;
            var gutters, children_sizes, i;
            var children = element.children(".split-block");

            gutters = element.children(".gutter");

            if (!Utils.isValue(o.splitSizes)) {
                children.css({
                    flexBasis: "calc("+(100/children.length)+"% - "+(gutters.length * o.gutterSize)+"px)"
                })
            } else {
                children_sizes = o.splitSizes.toArray();
                for(i = 0; i < children_sizes.length; i++) {
                    var s = children_sizes[i]
                    if (!isNaN(s)) {
                        s += "%"
                    }
                    $(children[i]).css({
                        flexBasis: "calc("+s+" - "+(gutters.length * o.gutterSize)+"px)"
                    });
                }
            }
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            var gutters = element.children(".gutter");

            gutters.on(Metro.events.startAll, function(e){
                if (o.noResize === true) {
                    return false
                }

                var w = o.split === SPLIT_MODE.VERTICAL ? element.width() : element.height();
                var gutter = $(this);
                var prev_block = gutter.prev(".split-block");
                var next_block = gutter.next(".split-block");
                var prev_block_size = 100 * (o.split === SPLIT_MODE.VERTICAL ? prev_block.outerWidth(true) : prev_block.outerHeight(true)) / w;
                var next_block_size = 100 * (o.split === SPLIT_MODE.VERTICAL ? next_block.outerWidth(true) : next_block.outerHeight(true)) / w;
                var start_pos = Utils.getCursorPosition(element[0], e);

                gutter.addClass("active");

                prev_block.addClass("stop-pointer");
                next_block.addClass("stop-pointer");

                that._fireEvent("resize-start", {
                    pos: start_pos,
                    gutter: gutter[0],
                    prevBlock: prev_block[0],
                    nextBlock: next_block[0]
                });

                $(globalThis).on(Metro.events.moveAll, function(e){
                    var pos = Utils.getCursorPosition(element[0], e);
                    var new_pos;

                    if (o.split === SPLIT_MODE.VERTICAL) {
                        new_pos = (pos.x * 100 / w) - (start_pos.x * 100 / w);

                    } else {
                        new_pos = (pos.y * 100 / w) - (start_pos.y * 100 / w);
                    }

                    prev_block.css("flex-basis", "calc(" + (prev_block_size + new_pos) + "% - "+(gutters.length * o.gutterSize)+"px)");
                    next_block.css("flex-basis", "calc(" + (next_block_size - new_pos) + "% - "+(gutters.length * o.gutterSize)+"px)");

                    that._fireEvent("resize-split", {
                        pos: pos,
                        gutter: gutter[0],
                        prevBlock: prev_block[0],
                        nextBlock: next_block[0]
                    });

                }, {ns: that.id});

                $(globalThis).on(Metro.events.stopAll, function(e){
                    var cur_pos;

                    prev_block.removeClass("stop-pointer");
                    next_block.removeClass("stop-pointer");

                    that._saveSize();

                    gutter.removeClass("active");

                    $(globalThis).off(Metro.events.moveAll,{ns: that.id});
                    $(globalThis).off(Metro.events.stopAll,{ns: that.id});

                    cur_pos = Utils.getCursorPosition(element[0], e);

                    that._fireEvent("resize-stop", {
                        pos: cur_pos,
                        gutter: gutter[0],
                        prevBlock: prev_block[0],
                        nextBlock: next_block[0]
                    });

                }, {ns: that.id})
            }, {passive: true});

            $(globalThis).on(Metro.events.resize, function(){
                var gutter = element.children(".gutter");
                var prev_block = gutter.prev(".split-block");
                var next_block = gutter.next(".split-block");

                that._fireEvent("resize-window", {
                    prevBlock: prev_block[0],
                    nextBlock: next_block[0]
                });

            }, {ns: that.id});
        },

        _saveSize: function(){
            var element = this.element, o = this.options;
            var storage = this.storage, itemsSize = [];
            var id = element.attr("id") || this.id;

            if (o.saveState === true && storage !== null) {

                $.each(element.children(".split-block"), function(){
                    var item = $(this);
                    itemsSize.push(item.css("flex-basis"));
                });

                if (storage)
                    storage.setItem(this.storageKey + id, itemsSize);
            }
        },

        _getSize: function(){
            var element = this.element, o = this.options;
            var storage = this.storage, itemsSize = [];
            var id = element.attr("id") || this.id;

            if (o.saveState === true && storage !== null) {

                itemsSize = storage.getItem(this.storageKey + id);

                $.each(element.children(".split-block"), function(i, v){
                    var item = $(v);
                    if (Utils.isValue(itemsSize) && Utils.isValue(itemsSize[i])) item.css("flex-basis", itemsSize[i]);
                });
            }
        },

        size: function(size){
            var that = this, o = this.options;
            if (Utils.isValue(size)) {
                o.splitSizes = size;
                that._setSize();
            }
            return this;
        },

        changeAttribute: function(attributeName){
            var that = this, element = this.element;

            function changeSize(){
                var size = element.attr("data-split-sizes");
                that.size(size);
            }

            if (attributeName === 'data-split-sizes') {
                changeSize();
            }
        },

        destroy: function(){
            var element = this.element;
            var gutters = element.children(".gutter");
            gutters.off(Metro.events.start);
            return element;
        }
    });
}(Metro, m4q));