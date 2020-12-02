/* global Metro, setImmediate */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var DraggableDefaultConfig = {
        dragContext: null,
        draggableDeferred: 0,
        dragElement: 'self',
        dragArea: "parent",
        timeout: 0,
        boundaryRestriction: true,
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

    Metro.Component('draggable', {
        init: function( options, elem ) {
            this._super(elem, options, DraggableDefaultConfig, {
                drag: false,
                move: false,
                backup: {
                    cursor: 'default',
                    zIndex: '0'
                },
                dragArea: null,
                dragElement: null,
                id: Utils.elementId("draggable")
            });

            return this;
        },

        _create: function(){
            this._createStructure();
            this._createEvents();

            this._fireEvent("draggable-create", {
                element: this.element
            });
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
            var that = this, element = this.element, o = this.options;
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

                    if (o.boundaryRestriction) {
                        if (top < 0) top = 0;
                        if (left < 0) left = 0;

                        if (top > that.dragArea.outerHeight() - element.outerHeight()) top = that.dragArea.outerHeight() - element.outerHeight();
                        if (left > that.dragArea.outerWidth() - element.outerWidth()) left = that.dragArea.outerWidth() - element.outerWidth();
                    }

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

                if (Metro.isTouchable === false && e.which !== 1) {
                    return ;
                }

                that.drag = true;

                that.backup.cursor = element.css("cursor");
                that.backup.zIndex = element.css("z-index");

                element.addClass("draggable");

                moveElement(e);

                that._fireEvent("drag-start", {
                    position: position,
                    context: o.dragContext
                });

                $(document).on(Metro.events.moveAll, function(e){
                    e.preventDefault();
                    moveElement(e);

                    that._fireEvent("drag-move", {
                        position: position,
                        context: o.dragContext
                    });

                }, {ns: that.id, passive: false});

                $(document).on(Metro.events.stopAll, function(){
                    // element.css({
                    //     cursor: that.backup.cursor,
                    //     zIndex: that.backup.zIndex
                    // });
                    element.removeClass("draggable");

                    if (that.drag) {
                        $(document).off(Metro.events.moveAll, {ns: that.id});
                        $(document).off(Metro.events.stopAll, {ns: that.id});
                    }

                    that.drag = false;
                    that.move = false;

                    that._fireEvent("drag-stop", {
                        position: position,
                        context: o.dragContext
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
        changeAttribute: function(attributeName, newValue){
        },

        destroy: function(){
            var element = this.element;
            this.dragElement.off(Metro.events.startAll);
            return element;
        }
    });
}(Metro, m4q));