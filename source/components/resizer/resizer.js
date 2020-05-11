/* global Metro, Utils, Component */
var ResizerDefaultConfig = {
    resizerDeferred: 0,
    onMediaPoint: Metro.noop,
    onMediaPointEnter: Metro.noop,
    onMediaPointLeave: Metro.noop,
    onWindowResize: Metro.noop,
    onElementResize: Metro.noop,
    onResizerCreate: Metro.noop
};

Metro.resizerSetup = function (options) {
    ResizerDefaultConfig = $.extend({}, ResizerDefaultConfig, options);
};

if (typeof window["metroResizerSetup"] !== undefined) {
    Metro.resizerSetup(window["metroResizerSetup"]);
}

Component('resizer', {
    init: function( options, elem ) {
        this._super(elem, options, ResizerDefaultConfig);

        this.id = null;
        this.size = {width: 0, height: 0};
        this.media = window.METRO_MEDIA;
        this.id = Utils.elementId("resizer");

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, this.name);

        this.size = {
            width: element.width(),
            height: element.height()
        };

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onMyObjectCreate, [element]);
    },

    _createStructure: function(){
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var win = $.window();

        win.on("resize", function(){
            var windowWidth = win.width(), windowHeight = win.height();
            var elementWidth = element.width(), elementHeight = element.height();
            var oldSize = that.size;
            var point;

            Utils.exec(o.onWindowResize, [windowWidth, windowHeight, window.METRO_MEDIA], element[0]);
            element.fire("windowresize", {
                width: windowWidth,
                height: windowHeight,
                media: window.METRO_MEDIA
            });

            if (that.size.width !== elementWidth || that.size.height !== elementHeight) {
                that.size = {
                    width: elementWidth,
                    height: elementHeight
                };
                Utils.exec(o.onElementResize, [elementWidth, elementHeight, oldSize, window.METRO_MEDIA], element[0]);
                element.fire("windowresize", {
                    width: elementWidth,
                    height: elementHeight,
                    oldSize: oldSize,
                    media: window.METRO_MEDIA
                });
            }

            if (that.media.length !== window.METRO_MEDIA.length) {
                if (that.media.length > window.METRO_MEDIA.length) {
                    point = that.media.filter(function(x){
                        return !window.METRO_MEDIA.contains(x);
                    });
                    Utils.exec(o.onMediaPointLeave, [point, window.METRO_MEDIA], element[0]);
                    element.fire("mediapointleave", {
                        point: point,
                        media: window.METRO_MEDIA
                    });
                } else {
                    point = window.METRO_MEDIA.filter(function(x){
                        return !that.media.contains(x);
                    });
                    Utils.exec(o.onMediaPointEnter, [point, window.METRO_MEDIA], element[0]);
                    element.fire("mediapointenter", {
                        point: point,
                        media: window.METRO_MEDIA
                    });
                }
                that.media = window.METRO_MEDIA;
                Utils.exec(o.onMediaPoint, [point, window.METRO_MEDIA], element[0]);
                element.fire("mediapoint", {
                    point: point,
                    media: window.METRO_MEDIA
                });
            }
        }, {ns: this.id});
    },

    changeAttribute: function(){
    },

    destroy: function(){
        $(window).off("resize", {ns: this.id});
    }
});
