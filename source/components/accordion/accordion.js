/*global Metro, METRO_ANIMATION_DURATION */
(function(Metro, $){
    'use strict';
    var Utils = Metro.utils;
    var AccordionDefaultConfig = {
        accordionDeferred: 0,
        showMarker: true,
        material: false,
        duration: METRO_ANIMATION_DURATION,
        oneFrame: true,
        showActive: true,
        activeFrameClass: "",
        activeHeadingClass: "",
        activeContentClass: "",
        onFrameOpen: Metro.noop,
        onFrameBeforeOpen: Metro.noop_true,
        onFrameClose: Metro.noop,
        onFrameBeforeClose: Metro.noop_true,
        onAccordionCreate: Metro.noop
    };

    Metro.accordionSetup = function(options){
        AccordionDefaultConfig = $.extend({}, AccordionDefaultConfig, options);
    };

    if (typeof window["metroAccordionSetup"] !== undefined) {
        Metro.accordionSetup(window["metroAccordionSetup"]);
    }

    Metro.Component('accordion', {
        init: function( options, elem ) {
            this._super(elem, options, AccordionDefaultConfig);
            return this;
        },

        _create: function(){
            var element = this.element;

            this._createStructure();
            this._createEvents();

            this._fireEvent('accordionCreate', {
                element: element
            });
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            var frames = element.children(".frame");
            var active = element.children(".frame.active");
            var frame_to_open;

            element.addClass("accordion");

            if (o.showMarker === true) {
                element.addClass("marker-on");
            }

            if (o.material === true) {
                element.addClass("material");
            }

            if (active.length === 0) {
                frame_to_open = frames[0];
            } else {
                frame_to_open = active[0];
            }

            this._hideAll();

            if (o.showActive === true) {
                if (o.oneFrame === true) {
                    this._openFrame(frame_to_open);
                } else {
                    $.each(active, function(){
                        that._openFrame(this);
                    });
                }
            }
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            var active = element.children(".frame.active");

            element.on(Metro.events.click, ".heading", function(){
                var heading = $(this);
                var frame = heading.parent();

                if (heading.closest(".accordion")[0] !== element[0]) {
                    return false;
                }

                if (frame.hasClass("active")) {
                    if (active.length === 1 && o.oneFrame) {
                        /* eslint-disable-next-line */

                    } else {
                        that._closeFrame(frame);
                    }
                } else {
                    that._openFrame(frame);
                }
            });
        },

        _openFrame: function(f){
            var element = this.element, o = this.options;
            var frame = $(f);

            if (Utils.exec(o.onFrameBeforeOpen, [frame[0]], element[0]) === false) {
                return false;
            }

            if (o.oneFrame === true) {
                this._closeAll(frame[0]);
            }

            frame.addClass("active " + o.activeFrameClass);
            frame.children(".heading").addClass(o.activeHeadingClass);
            frame.children(".content").addClass(o.activeContentClass).slideDown(o.duration);

            this._fireEvent("frameOpen", {
                frame: frame[0]
            });
        },

        _closeFrame: function(f){
            var element = this.element, o = this.options;
            var frame = $(f);

            if (!frame.hasClass("active")) {
                return ;
            }

            if (Utils.exec(o.onFrameBeforeClose, [frame[0]], element[0]) === false) {
                return ;
            }

            frame.removeClass("active " + o.activeFrameClass);
            frame.children(".heading").removeClass(o.activeHeadingClass);
            frame.children(".content").removeClass(o.activeContentClass).slideUp(o.duration);

            this._fireEvent("frameClose", {
                frame: frame[0]
            });
        },

        _closeAll: function(skip){
            var that = this, element = this.element;
            var frames = element.children(".frame");

            $.each(frames, function(){
                if (skip === this) return;
                that._closeFrame(this);
            });
        },

        _hideAll: function(){
            var element = this.element;
            var frames = element.children(".frame");

            $.each(frames, function(){
                $(this).children(".content").hide();
            });
        },

        _openAll: function(){
            var that = this, element = this.element;
            var frames = element.children(".frame");

            $.each(frames, function(){
                that._openFrame(this);
            });
        },

        /* eslint-disable-next-line */
        changeAttribute: function(attributeName){
        },

        destroy: function(){
            var element = this.element;
            element.off(Metro.events.click, ".heading");
            return element;
        }
    });
}(Metro, m4q));