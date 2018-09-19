var Resizable = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.resizer = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onResizableCreate, [this.element]);

        return this;
    },
    options: {
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
        this._createStructure();
        this._createEvents();
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        if (Utils.isValue(o.resizeElement) && element.find(o.resizeElement).length > 0) {
            this.resizer = element.find(o.resizeElement);
        } else {
            this.resizer = $("<span>").addClass("resize-element").appendTo(element);
        }
    },

    _createEvents: function(){
        var element = this.element, o = this.options;

        this.resizer.on(Metro.events.start + "-resize-element", function(e){

            if (o.canResize === false) {
                return ;
            }

            var startXY = Utils.pageXY(e);
            var startWidth = parseInt(element.outerWidth());
            var startHeight = parseInt(element.outerHeight());
            var size = {width: startWidth, height: startHeight};

            Utils.exec(o.onResizeStart, [element, size]);

            $(document).on(Metro.events.move + "-resize-element", function(e){
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

                Utils.exec(o.onResize, [element, size]);
            });

            $(document).on(Metro.events.stop + "-resize-element", function(){
                $(document).off(Metro.events.move + "-resize-element");
                $(document).off(Metro.events.stop + "-resize-element");

                var size = {
                    width: parseInt(element.outerWidth()),
                    height: parseInt(element.outerHeight())
                };

                Utils.exec(o.onResizeStop, [element, size]);
            });

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
    }
};

Metro.plugin('resizable', Resizable);