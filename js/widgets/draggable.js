$.widget( "metro.draggable" , {

    version: "3.0.0",

    options: {
        dragElement: null,
        onDragStart: function(el){},
        onDragStop: function(el){},
        onDragMove: function(el){}
    },

    drag: false,
    oldCursor: null,
    oldZindex: null,


    _create: function () {
        var that = this, element = this.element, o = this.options;

        setTimeout(function(){

        }, 500);

        this._setOptionsFromDOM();
        this._createDraggable();

        element.data('draggable', this);
    },

    _createDraggable: function(){
        var that = this, element = this.element, o = this.options;
        var dragElement  = o.dragElement ? element.find(o.dragElement) : element;
        console.log(dragElement);

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
            el.css({
                cursor: 'move'
            });

            console.log(element, that.oldZindex);

            element.css('z-index', '2000');

            var drg_h = element.outerHeight(),
                drg_w = element.outerWidth(),
                pos_y = element.offset().top + drg_h - e.pageY,
                pos_x = element.offset().left + drg_w - e.pageX;

            $(window).on('mousemove', function(e){
                var offset;

                if (!that.drag) return false;

                var t = (e.pageY > 0)?(e.pageY + pos_y - drg_h):(0);
                var l = (e.pageX > 0)?(e.pageX + pos_x - drg_w):(0);

                if(t >= 0 && t <= window.innerHeight - element.outerHeight()) {
                    element.offset({top: t});
                }
                if(l >= 0 && l <= window.innerWidth - element.outerWidth()) {
                    element.offset({left: l});
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

            e.preventDefault();
        });

        dragElement.on('mouseup', function(e){
            var result, el = $(this);

            that.drag = false;
            el.css({
                cursor: that.oldCursor
            });
            element.css({
                'z-index': that.oldZindex
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

            e.preventDefault();
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
