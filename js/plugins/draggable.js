var Draggable = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.drag = false;
        this.move = false;
        this.backup = {
            cursor: 'default',
            zIndex: '0'
        };

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onDraggableCreate, [this.element]);

        return this;
    },

    options: {
        dragElement: 'self',
        dragArea: "parent",
        onCanDrag: Metro.noop_true,
        onDragStart: Metro.noop,
        onDragStop: Metro.noop,
        onDragMove: Metro.noop,
        onDraggableCreate: Metro.noop
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
        var that = this, element = this.element, elem = this.elem, o = this.options;
        var dragArea;
        var position = {
            x: 0,
            y: 0
        };
        var dragElement  = o.dragElement !== 'self' ? element.find(o.dragElement) : element;

        dragElement[0].ondragstart = function(){return false;};

        dragElement.on(Metro.events.start, function(e){

            if (o.dragArea === 'document' || o.dragArea === 'window') {
                o.dragArea = "body";
            }

            dragArea = o.dragArea === 'parent' ? element.parent() : $(o.dragArea);

            var coord = o.dragArea === "body" ? element.offset() : element.position(),
                shiftX = Utils.pageXY(e).x - coord.left,
                shiftY = Utils.pageXY(e).y - coord.top;

            var moveElement = function(e){
                var top = Utils.pageXY(e).y - shiftY;
                var left = Utils.pageXY(e).x - shiftX;

                if (top < 0) top = 0;
                if (left < 0) left = 0;

                if (top > dragArea.outerHeight() - element.outerHeight()) top = dragArea.outerHeight() - element.outerHeight();
                if (left > dragArea.outerWidth() - element.outerWidth()) left = dragArea.outerWidth() - element.outerWidth();

                position.y = top;
                position.x = left;

                element.css({
                    left: left,
                    top: top
                });
            };


            if (element.data("canDrag") === false || Utils.exec(o.onCanDrag, [element]) !== true) {
                return ;
            }

            if (isTouch === false && e.which !== 1) {
                return ;
            }

            that.drag = true;

            that.backup.cursor = element.css("cursor");
            that.backup.zIndex = element.css("z-index");

            element.css("position", "absolute").addClass("draggable");

            element.appendTo(dragArea);

            moveElement(e);

            Utils.exec(o.onDragStart, [position, element]);

            $(document).on(Metro.events.move+".draggable", function(e){
                moveElement(e);
                Utils.exec(o.onDragMove, [position], elem);
                e.preventDefault();
            });

            $(document).on(Metro.events.stop+".draggable", function(e){
                element.css({
                    cursor: that.backup.cursor,
                    zIndex: that.backup.zIndex
                }).removeClass("draggable");

                if (that.drag) {
                    $(document).off(Metro.events.move+".draggable");
                    $(document).off(Metro.events.stop+".draggable");
                }

                that.drag = false;
                that.move = false;

                Utils.exec(o.onDragStop, [position], elem);
                e.preventDefault();
                e.stopPropagation();
            });
        });
    },

    off: function(){
        this.element.data("canDrag", false);
    },

    on: function(){
        this.element.data("canDrag", true);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('draggable', Draggable);