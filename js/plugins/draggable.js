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
        var dragArea;
        var offset, position, shift, coords;
        var dragElement  = o.dragElement !== 'self' ? element.find(o.dragElement) : element;

        dragElement[0].ondragstart = function(){return false;};

        dragElement.on(Metro.events.start, function(e){

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

            if (o.dragArea === 'document' || o.dragArea === 'window') {
                o.dragArea = "body";
            }

            if (o.dragArea === 'parent') {
                dragArea = element.parent();
            } else {
                dragArea = $(o.dragArea);
            }

            offset = {
                left: dragArea.offset().left,
                top:  dragArea.offset().top
            };

            position = Utils.pageXY(e);

            var drg_h = element.outerHeight(),
                drg_w = element.outerWidth(),
                pos_y = element.offset().top + drg_h - Utils.pageXY(e).y,
                pos_x = element.offset().left + drg_w - Utils.pageXY(e).x;

            Utils.exec(o.onDragStart, [position, element]);

            $(document).on(Metro.events.move, function(e){
                var pageX, pageY;

                if (that.drag === false) {
                    return ;
                }
                that.move = true;

                pageX = Utils.pageXY(e).x - offset.left;
                pageY = Utils.pageXY(e).y - offset.top;

                var t = (pageY > 0) ? (pageY + pos_y - drg_h) : (0);
                var l = (pageX > 0) ? (pageX + pos_x - drg_w) : (0);
                var t_delta = dragArea.innerHeight() + dragArea.scrollTop() - element.outerHeight();
                var l_delta = dragArea.innerWidth() + dragArea.scrollLeft() - element.outerWidth();

                if(t >= 0 && t <= t_delta) {
                    position.y = t;
                    element.offset({top: t + offset.top});
                }
                if(l >= 0 && l <= l_delta) {
                    position.x = l;
                    element.offset({left: l + offset.left});
                }

                Utils.exec(o.onDragMove, [position, element]);

                e.preventDefault();
            });
        });

        dragElement.on(Metro.events.stop, function(e){
            element.css({
                cursor: that.backup.cursor,
                zIndex: that.backup.zIndex
            }).removeClass("draggable");
            that.drag = false;
            that.move = false;
            position = Utils.pageXY(e);
            $(document).off(Metro.events.move);
            //console.log(o.onDragStop);
            Utils.exec(o.onDragStop, [position, element]);
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