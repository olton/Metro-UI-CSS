$.widget( "metro.draggable" , {

    version: "3.0.0",

    options: {
        dragElement: null,
        dragArea: null,
        zIndex: 2000,
        onDragStart: function(el){},
        onDragStop: function(el){},
        onDragMove: function(el, offset){}
    },

    drag: false,
    oldCursor: null,
    oldZindex: null,
    oldPosition: null,


    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();
        this._createDraggable();

        element.data('draggable', this);
    },

    _createDraggable: function(){
        var that = this, element = this.element, o = this.options;
        var dragElement  = o.dragElement ? element.find(o.dragElement) : element;

        addTouchEvents(element[0]);

        dragElement.on('mousedown', function(e){
            var result, el = $(this);

            that.drag = true;

            if (typeof o.onDragStart === 'function') {
                o.onDragStart(element);
            } else {
                if (typeof window[o.onDragStart] === 'function') {
                    window[o.onDragStart](element);
                } else {
                    result = eval("(function(){"+o.onDragStart+"})");
                    result.call(element);
                }
            }

            that.oldCursor = el.css('cursor') ? el.css('cursor') : 'default' ;
            that.oldZindex= element.css('z-index');
            dragElement.css({
                cursor: 'move'
            });

            element.css({
                'z-index': o.zIndex
            });

            var dragArea = o.dragArea ? $(o.dragArea) : $(window);
            var os = {
                left: o.dragArea ? dragArea.offset().left : 0,
                top: o.dragArea ? dragArea.offset().top : 0
            };

            var drg_h = element.outerHeight(),
                drg_w = element.outerWidth(),
                pos_y = element.offset().top + drg_h - e.pageY,
                pos_x = element.offset().left + drg_w - e.pageX;

            //console.log(pos_x, pos_y);

            dragArea.on('mousemove', function(e){
                var offset, pageX, pageY;

                if (!that.drag) return false;


                pageX = e.pageX - os.left;
                pageY = e.pageY - os.top;

                var t = (pageY > 0) ? (pageY + pos_y - drg_h) : (0);
                var l = (pageX > 0) ? (pageX + pos_x - drg_w) : (0);
                var t_delta = dragArea.innerHeight() + dragArea.scrollTop() - element.outerHeight();
                var l_delta = dragArea.innerWidth() + dragArea.scrollLeft() - element.outerWidth();

                if(t >= 0 && t <= t_delta) {
                    element.offset({top: t + os.top});
                }
                if(l >= 0 && l <= l_delta) {
                    element.offset({left: l + os.left});
                }

                offset = {
                    left: l,
                    top: t
                };

                if (typeof o.onDragMove === 'function') {
                    o.onDragMove(element, offset);
                } else {
                    if (typeof window[o.onDragMove] === 'function') {
                        window[o.onDragMove](element, offset);
                    } else {
                        result = eval("(function(){"+o.onDragMove+"})");
                        result.call(element, offset);
                    }
                }
            });

            //e.preventDefault();
        });

        dragElement.on('mouseup', function(e){
            var result, el = $(this);

            that.drag = false;
            dragElement.css({
                cursor: that.oldCursor
            });
            element.css({
                'z-index': that.oldZindex,
                'position': that.oldPosition
            });

            if (typeof o.onDragStop === 'function') {
                o.onDragStop(element);
            } else {
                if (typeof window[o.onDragStop] === 'function') {
                    window[o.onDragStop](element);
                } else {
                    result = eval("(function(){"+o.onDragStop+"})");
                    result.call(element);
                }
            }

            //e.preventDefault();
        });

    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _destroy: function () {
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});
