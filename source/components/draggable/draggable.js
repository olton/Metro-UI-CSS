/* global Metro, Utils, Component, setImmediate, isTouch */
var DraggableDefaultConfig = {
    draggableDeferred: 0,
    dragElement: 'self',
    dragArea: "parent",
    timeout: 0,
    onCanDrag: Metro.noop_true,
    onDragStart: Metro.noop,
    onDragStop: Metro.noop,
    onDragMove: Metro.noop,
    onDraggableCreate: Metro.noop
};

Metro.draggableSetup = function (options) {
    DraggableDefaultConfig = $.extend({}, DraggableDefaultConfig, options);
};

if (typeof window["metroDraggableSetup"] !== undefined) {
    Metro.draggableSetup(window["metroDraggableSetup"]);
}

Component('draggable', {
    init: function( options, elem ) {
        this._super(elem, options, DraggableDefaultConfig);

        this.drag = false;
        this.move = false;
        this.backup = {
            cursor: 'default',
            zIndex: '0'
        };
        this.dragArea = null;
        this.dragElement = null;

        this.id = Utils.elementId("draggable");

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        Metro.checkRuntime(this.element, this.name);
        this._createStructure();
        this._createEvents();
        Utils.exec(this.options.onDraggableCreate, [this.element]);
        this.element.fire("draggablecreate");
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var offset = element.offset();
        var dragElement  = o.dragElement !== 'self' ? element.find(o.dragElement) : element;

        element.data("canDrag", true);

        this.dragElement = dragElement;

        dragElement[0].ondragstart = function(){return false;};

        element.css("position", "absolute");

        if (o.dragArea === 'document' || o.dragArea === 'window') {
            o.dragArea = "body";
        }

        setImmediate(function(){
            that.dragArea = o.dragArea === 'parent' ? element.parent() : $(o.dragArea);
            if (o.dragArea !== 'parent') {
                element.appendTo(that.dragArea);
                element.css({
                    top: offset.top,
                    left: offset.left
                });
            }
        });

        if (!element.attr("id")) {
            element.attr("id", Utils.elementId("draggable"));
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, elem = this.elem, o = this.options;
        var position = {
            x: 0,
            y: 0
        };

        this.dragElement.on(Metro.events.startAll, function(e){

            var coord = o.dragArea !== "parent" ? element.offset() : element.position(),
                shiftX = Utils.pageXY(e).x - coord.left,
                shiftY = Utils.pageXY(e).y - coord.top;

            var moveElement = function(e){
                var top = Utils.pageXY(e).y - shiftY;
                var left = Utils.pageXY(e).x - shiftX;

                if (top < 0) top = 0;
                if (left < 0) left = 0;

                if (top > that.dragArea.outerHeight() - element.outerHeight()) top = that.dragArea.outerHeight() - element.outerHeight();
                if (left > that.dragArea.outerWidth() - element.outerWidth()) left = that.dragArea.outerWidth() - element.outerWidth();

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

            element.addClass("draggable");

            moveElement(e);

            Utils.exec(o.onDragStart, [position], element[0]);
            element.fire("dragstart", {
                position: position
            });

            $(document).on(Metro.events.moveAll, function(e){
                e.preventDefault();
                moveElement(e);
                Utils.exec(o.onDragMove, [position], elem);
                element.fire("dragmove", {
                    position: position
                });
            }, {ns: that.id, passive: false});

            $(document).on(Metro.events.stopAll, function(){
                element.css({
                    cursor: that.backup.cursor,
                    zIndex: that.backup.zIndex
                }).removeClass("draggable");

                if (that.drag) {
                    $(document).off(Metro.events.moveAll, {ns: that.id});
                    $(document).off(Metro.events.stopAll, {ns: that.id});
                }

                that.drag = false;
                that.move = false;

                Utils.exec(o.onDragStop, [position], elem);
                element.fire("dragstop", {
                    position: position
                });
            }, {ns: that.id});
        });
    },

    off: function(){
        this.element.data("canDrag", false);
    },

    on: function(){
        this.element.data("canDrag", true);
    },

    /* eslint-disable-next-line */
    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;
        this.dragElement.off(Metro.events.startAll);
        return element;
    }
});
