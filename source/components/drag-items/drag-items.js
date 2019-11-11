var DragItemsDefaultConfig = {
    target: null,
    dragItem: "li",
    dragMarker: ".drag-item-marker",
    drawDragMarker: false,
    clsDragItemAvatar: "",
    clsDragItem: "",
    canDrag: true,
    onDragStartItem: Metro.noop,
    onDragMoveItem: Metro.noop,
    onDragDropItem: Metro.noop,
    onDragItemsCreate: Metro.noop
};

Metro.dragItemsSetup = function (options) {
    DragItemsDefaultConfig = $.extend({}, DragItemsDefaultConfig, options);
};

if (typeof window["metroDragItemsSetup"] !== undefined) {
    Metro.dragItemsSetup(window["metroDragItemsSetup"]);
}

var DragItems = {
    options: {},

    init: function( options, elem ) {
        this.options = $.extend( {}, DragItemsDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.id = null;
        this.canDrag = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
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

        this.id = Utils.elementId("dragItems");
        o.canDrag ? this.on() : this.off();

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onDragItemsCreate, [element]);
        element.fire("dragitemscreate");
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass("drag-items-target");

        if (o.drawDragMarker === true) {
            element.find(o.dragItem).each(function(){
                $("<span>").addClass("drag-item-marker").appendTo(this);
            })
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var doc = $.document(), body = $.body();
        var offset, shift = {top: 0, left: 0}, width, height;

        var move = function(e, avatar, dragItem){
            var x = Utils.pageXY(e).x, y = Utils.pageXY(e).y;
            var _top = y - shift.top;
            var _left = x - shift.left;

            avatar.css({
                top: _top,
                left: _left
            });

            var target = document.elementsFromPoint(x, y).filter(function(el){
                return $(el).hasClass('drag-items-target');
            });

            if (target.length === 0) {
                return;
            }

            var sibling = document.elementsFromPoint(x, y).filter(function(el){
                var $el = $(el);
                return $.matches(el, o.dragItem) && !$el.hasClass("dragged-item-avatar");
            })[0];

            if (!Utils.isValue(sibling)) {
                dragItem.appendTo(target);
            } else {
                var $sibling = $(sibling);
                var $sibling_offset = $sibling.offset();
                var offsetY = y - $sibling_offset.top;
                var offsetX = x - $sibling_offset.left;
                var side;// = (offsetY >= $sibling.height() / 2) ? "bottom" : "top";
                var dim = {w: $sibling.width(), h: $sibling.height()};

                if (offsetX < dim.w * 1 / 3 && (offsetY < dim.h * 1 / 2 || offsetY > dim.h * 1 / 2)) {
                    side = 'left';
                } else if (offsetX > dim.w * 2 / 3 && (offsetY < dim.h * 1 / 2 || offsetY > dim.h * 1 / 2)) {
                    side = 'right';
                } else if (offsetX > dim.w * 1 / 3 && offsetX < dim.w * 2 / 3 && offsetY > dim.h / 2) {
                    side = 'bottom';
                } else {
                    side = "top";
                }

                if (!$sibling.hasClass("dragged-item")) {
                    if (side === "top" || side === "left") {
                        dragItem.insertBefore($sibling);
                    } else {
                        dragItem.insertAfter($sibling);
                    }
                }
            }
        };

        element.on(Metro.events.startAll, (o.drawDragMarker ? o.dragMarker : o.dragItem), function(e_start){
            var dragItem = $(e_start.target).closest(o.dragItem);
            var avatar;

            if (Utils.isRightMouse(e_start)) {
                return ;
            }

            if (that.canDrag !== true) {
                return ;
            }

            dragItem.addClass("dragged-item").addClass(o.clsDragItem);
            avatar = $("<div>").addClass("dragged-item-avatar").addClass(o.clsDragItemAvatar);
            offset = dragItem.offset();
            width = dragItem.width();
            height = dragItem.height();
            shift.top = Utils.pageXY(e_start).y - offset.top;
            shift.left = Utils.pageXY(e_start).x - offset.left;

            avatar.css({
                top: offset.top,
                left: offset.left,
                width: width,
                height: height
            }).appendTo(body);

            Utils.exec(o.onDragStartItem, [dragItem[0], avatar[0]], element[0]);
            element.fire("dragstartitem", {
                dragItem: dragItem[0],
                avatar: avatar[0]
            });

            doc.on(Metro.events.moveAll, function(e_move){

                move(e_move, avatar, dragItem);

                Utils.exec(o.onDragMoveItem, [dragItem[0], avatar[0]], element[0]);
                element.fire("dragmoveitem", {
                    dragItem: dragItem[0],
                    avatar: avatar[0]
                });

                e_move.preventDefault();

            }, {ns: that.id, passive: false});

            doc.on(Metro.events.stopAll, function(e_stop){

                Utils.exec(o.onDragDropItem, [dragItem[0], avatar[0]], element[0]);
                element.fire("dragdropitem", {
                    dragItem: dragItem[0],
                    avatar: avatar[0]
                });

                dragItem.removeClass("dragged-item").removeClass(o.clsDragItem);
                avatar.remove();

                doc.off(Metro.events.moveAll, {ns: that.id});
                doc.off(Metro.events.stopAll, {ns: that.id});

            }, {ns: that.id});

            if (o.drawDragMarker) {
                e_start.preventDefault();
                e_start.stopPropagation();
            }
        });
    },

    on: function(){
        this.canDrag = true;
        this.element.find(".drag-item-marker").show();
    },

    off: function(){
        this.canDrag = false;
        this.element.find(".drag-item-marker").hide();
    },

    toggle: function(){
        this.canDrag = this.canDrag ? this.off() : this.on();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;
        var changeCanDrag = function(){
            o.canDtag = JSON.parse(element.attr("data-can-drag"));
            o.canDtag ? that.on() : that.off();
        };

        if (attributeName === "data-can-drag") {
            changeCanDrag();
        }
    },

    destroy: function(){
        var element = this.element;
        element.off(Metro.events.startAll, (o.drawDragMarker ? o.dragMarker : o.dragItem));
        return element;
    }
};

Metro.plugin('dragitems', DragItems);