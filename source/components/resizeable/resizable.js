var ResizableDefaultConfig = {
    canResize: true,
    resizeElement: ".resize-element",
    minWidth: 0,
    minHeight: 0,
    maxWidth: 0,
    maxHeight: 0,
    preserveRatio: false,
    onResizeStart: Metro.noop,
    onResizeStop: Metro.noop,
    onResize: Metro.noop,
    onResizableCreate: Metro.noop
};

Metro.resizeableSetup = function (options) {
    ResizableDefaultConfig = $.extend({}, ResizableDefaultConfig, options);
};

if (typeof window["metroResizeableSetup"] !== undefined) {
    Metro.resizeableSetup(window["metroResizeableSetup"]);
}

var Resizable = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ResizableDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.resizer = null;

        this.id = Utils.elementId("resizeable");

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "resizeable");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onResizableCreate, null, element[0]);
        element.fire("resizeablecreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        element.data("canResize", true);
        element.addClass("resizeable-element");

        if (Utils.isValue(o.resizeElement) && element.find(o.resizeElement).length > 0) {
            this.resizer = element.find(o.resizeElement);
        } else {
            this.resizer = $("<span>").addClass("resize-element").appendTo(element);
        }

        element.data("canResize", o.canResize);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        this.resizer.on(Metro.events.start, function(e){

            if (element.data('canResize') === false) {
                return ;
            }

            var startXY = Utils.pageXY(e);
            var startWidth = parseInt(element.outerWidth());
            var startHeight = parseInt(element.outerHeight());
            var size = {width: startWidth, height: startHeight};

            element.addClass("stop-pointer");

            Utils.exec(o.onResizeStart, [size], element[0]);
            element.fire("resizestart", {
                size: size
            });

            $(document).on(Metro.events.move, function(e){
                var moveXY = Utils.pageXY(e);
                var size = {
                    width: startWidth + moveXY.x - startXY.x,
                    height: startHeight + moveXY.y - startXY.y
                };

                if (o.maxWidth > 0 && size.width > o.maxWidth) {return true;}
                if (o.minWidth > 0 && size.width < o.minWidth) {return true;}

                if (o.maxHeight > 0 && size.height > o.maxHeight) {return true;}
                if (o.minHeight > 0 && size.height < o.minHeight) {return true;}

                element.css(size);

                Utils.exec(o.onResize, [size], element[0]);
                element.fire("resize", {
                    size: size
                });
            }, {ns: that.id});

            $(document).on(Metro.events.stop, function(){
                element.removeClass("stop-pointer");

                $(document).off(Metro.events.move, {ns: that.id});
                $(document).off(Metro.events.stop, {ns: that.id});

                var size = {
                    width: parseInt(element.outerWidth()),
                    height: parseInt(element.outerHeight())
                };

                Utils.exec(o.onResizeStop, [size], element[0]);
                element.fire("resizestop", {
                    size: size
                });
            }, {ns: that.id});

            e.preventDefault();
            e.stopPropagation();
        });

    },

    off: function(){
        this.element.data("canResize", false);
    },

    on: function(){
        this.element.data("canResize", true);
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var canResize = function(){
            o.canResize = JSON.parse(element.attr('data-can-resize')) === true;
        };

        switch (attributeName) {
            case "data-can-resize": canResize(); break;
        }
    },

    destroy: function(){
        this.resizer.off(Metro.events.start);
        return this.element;
    }
};

Metro.plugin('resizable', Resizable);