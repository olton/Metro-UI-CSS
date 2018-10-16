var Splitter = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        splitMode: "horizontal",
        splitSizes: null,
        gutterSize: 4,
        children: "*",
        onResizeStart: Metro.noop,
        onResizeStop: Metro.noop,
        onResizeSplit: Metro.noop,
        onSplitterCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

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
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onCreate, [element]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var children = element.children(o.children).addClass("split-block");
        var i, children_sizes = [];
        var w = o.splitMode === "horizontal" ? element.width() : element.height();
        var size_without_gutters;

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", Utils.elementId("splitter"));
        }

        element.addClass("splitter");
        if (o.splitMode.toLowerCase() === "vertical") {
            element.addClass("vertical");
        }

        for (i = 0; i < children.length - 1; i++) {
            $("<div>").addClass("gutter").css({
                flexBasis: o.gutterSize
            }).insertAfter($(children[i]));
        }

        if (Utils.isNull(o.splitSizes)) {
            children.css({
                flexBasis: (100/children.length)+"%"
            })
        } else {
            children_sizes = Utils.strToArray(o.splitSizes);
            for(i = 0; i < children_sizes.length; i++) {
                $(children[i]).css({
                    flexBasis: children_sizes[i]+"%"
                });
            }
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var gutters = element.children(".gutter");

        gutters.on(Metro.events.start, function(e){
            var gutter = $(this);
            var prev_block = gutter.prev(".split-block");
            var next_block = gutter.next(".split-block");
            var prev_block_size = parseInt(prev_block.css("flexBasis"));
            var next_block_size = parseInt(next_block.css("flexBasis"));
            var w = o.splitMode === "horizontal" ? element.width() : element.height();
            var start_pos = Utils.getCursorPosition(element, e);

            gutter.addClass("active");

            Utils.exec(o.onResizeStart, [start_pos, gutter, prev_block, next_block], element);

            $(window).on(Metro.events.move + "-" + element.attr("id"), function(e){
                var pos = Utils.getCursorPosition(element, e);
                var new_pos;

                if (o.splitMode === "horizontal") {
                    new_pos = (pos.x * 100 / w) - (start_pos.x * 100 / w);

                } else {
                    new_pos = (pos.y * 100 / w) - (start_pos.y * 100 / w);
                }

                prev_block.css("flex-basis", (prev_block_size + new_pos) + "%");
                next_block.css("flex-basis", (next_block_size - new_pos) + "%");

                Utils.exec(o.onResizeSplit, [pos, gutter, prev_block, next_block], element);
            });

            $(window).on(Metro.events.stop + "-" + element.attr("id"), function(e){

                gutter.removeClass("active");

                $(window).off(Metro.events.move + "-" + element.attr("id"));
                $(window).off(Metro.events.stop + "-" + element.attr("id"));

                Utils.exec(o.onResizeStop, [Utils.getCursorPosition(element, e), gutter, prev_block, next_block], element);
            })
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('splitter', Splitter);