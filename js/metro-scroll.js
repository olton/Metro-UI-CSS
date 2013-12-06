(function( $ ) {
    $.widget("metro.scrollbar", {

        version: "1.0.0",

        options: {
            height: 'auto', /* 'auto'|int */
            width: 'auto',  /* 'auto'|int */
            axis: ['x','y'],      /* x|y|[x,y] */
            wheel: 55      /* step in px */
            //size: 'auto'    /* 'auto'|int */
        },
        bothScroll: false,
        scrollbar: null,
        scrollbarContainer: null,
        contentHeight: 0,
        contentWidth: 0,
        dragElem: null,
        dragStart: false,
        startCoords: {
            x:0,
            y:0
        },
        currCoords: {
            x:0,
            y:0
        },

        _create: function() {
            var elem = this.element;
            if(elem.data('scroll') != undefined) {
                var dataScroll = elem.data('scroll');
                if(dataScroll == 'vertical') {
                    this.options.axis = 'y';
                }
                if(dataScroll == 'horizontal') {
                    this.options.axis = 'x';
                }
                if(dataScroll == 'both') {
                    this.options.axis = ['x','y'];
                }
            }
            if(elem.data('height') != undefined) {
                this.options.height = elem.data('height');
            }
            if(elem.data('width') != undefined) {
                this.options.width = elem.data('width');
            }
            if(elem.data('wheel') != undefined) {
                this.options.wheel = elem.data('wheel');
            }

            elem.wrap('<div class="scrollbar"><div class="scrollbar-container"></div></div>');

            elem.css({
               // background: 'yellow'
            })
            this.scrollbar = elem.parents('.scrollbar').first();
            this.scrollbarContainer = elem.parents('.scrollbar-container').first();
            if(this.options.height == 'auto') {
                this.options.height = this.scrollbar.height();
            }
            if(this.options.width == 'auto') {
                this.options.width = this.scrollbar.width();
            }
            if(this.options.height<50) {
                this.options.height = 50;
            }
            this.scrollbarContainer.css({
                width: elem.width(),
                height: elem.height()
            });
            this.contentHeight = this.scrollbarContainer.height();
            this.contentWidth = this.scrollbarContainer.width();

            var paddingRight = 0;
            var paddingBottom = 0;
            if(typeof this.options.axis != 'object') {
                if(this.options.axis == 'x') {
                    paddingBottom = 20;
                }
                else if(this.options.axis == 'y') {
                    paddingRight = 20;
                }
            }
            else {
                paddingRight = (this.options.width<this.contentWidth) ? 20 : 0;
                paddingBottom = (this.options.height<this.contentHeight) ? 20 : 0;
            }

            this.scrollbar.css({
                paddingRight: paddingRight,
                paddingBottom: paddingBottom,
                boxSizing: 'content-box'
            });

            this.options.width -= paddingRight;

            if(this.options.width+paddingRight == this.contentWidth) {
                this.contentWidth = this.options.width;
                this.scrollbarContainer.css({
                    width: this.options.width
                });
            }
            if(this.options.height+paddingBottom == this.contentHeight) {
                this.contentHeight = this.options.height;
                this.scrollbarContainer.css({
                    height: this.options.height
                });
            }

            this.scrollbar.css({
                width: this.options.width,
                height: this.options.height
            });

            if(this.options.axis == 'x') {
                if(this.options.width<this.contentWidth) {
                    this._horizontalScrollbar();
                }
                else if(this.options.width==this.contentWidth) {
                    this.scrollbar.css({
                        height: this.options.height + paddingBottom
                    });
                }
            }
            else if(this.options.axis == 'y') {
                if(this.options.height<this.contentHeight) {
                    this._verticalScrollbar();
                }
            }
            else {
                if(this.options.width<this.contentWidth && this.options.height<this.contentHeight) {
                    this.bothScroll = true;
                    this.scrollbar.append('<div class="scrollbar-both"></div>');
                }
                if(this.options.width<this.contentWidth) {
                    this._horizontalScrollbar();
                }
                if(this.options.height<this.contentHeight) {
                    this._verticalScrollbar();
                }
            }
            if(this.options.height<this.contentHeight || this.options.width<this.contentWidth) {
                this._startHandlers();
            }
        },

        _verticalScrollbar: function () {
            var str = [];
            str[str.length] = '<div class="scrollbar-v">';
            str[str.length] = '<div class="scrollbar-v-up"></div>';
            str[str.length] = '<div class="scrollbar-v-down"></div>';
            str[str.length] = '<div class="scrollbar-line-v">';
            str[str.length] = '<div class="scrollbar-line-v-btn"></div>';
            str[str.length] = '</div>';
            str[str.length] = '</div>';
            str = str.join('');

            this.scrollbar.append(str);

            var line = this.scrollbar.find('.scrollbar-line-v');
            var btn =  this.scrollbar.find('.scrollbar-line-v-btn');
            var scrollBar = this.scrollbar.find('.scrollbar-v');

            if(this.bothScroll) {
                var h = scrollBar.height()-15;
                this.options.height = h;
                scrollBar.height(h);
            }

            var height = this.options.height-32;
            var ratio = height/this.contentHeight;
            var btnHeight = ratio*this.options.height;


            line.height(height);
            btn.height(btnHeight);
        },
        _horizontalScrollbar: function () {
            var str = [];
            str[str.length] = '<div class="scrollbar-h">';
            str[str.length] = '<div class="scrollbar-h-up"></div>';
            str[str.length] = '<div class="scrollbar-h-down"></div>';
            str[str.length] = '<div class="scrollbar-line-h">';
            str[str.length] = '<div class="scrollbar-line-h-btn"></div>';
            str[str.length] = '</div>';
            str[str.length] = '</div>';
            str = str.join('');

            this.scrollbar.append(str);

            var line = this.scrollbar.find('.scrollbar-line-h');
            var btn =  this.scrollbar.find('.scrollbar-line-h-btn');
            var scrollBar = this.scrollbar.find('.scrollbar-h');

            if(this.bothScroll) {
                var w = scrollBar.width()-15;
                this.options.width = w;
                scrollBar.width(w);
            }

            var width = this.options.width-32;
            var ratio = width/this.contentWidth;
            var btnWidth = ratio*this.options.width;

            line.width(width);
            btn.width(btnWidth);
        },

        _startHandlers: function () {
            var that = this;
            $(document).mousemove(function(e){
                that._drag(e);
            });
            $(document).mouseup(function(e){
                that._dragEnd(e);
            });
            this.scrollbar.find('.scrollbar-line-v-btn,.scrollbar-line-h-btn').on('mousedown', function(e){
                that._dragStart(e, $(this));
            });
            this.scrollbar.find('.scrollbar-line-v,.scrollbar-line-h').on('click', function(e){
                that._clickPos(e, $(this));
            });
            this.scrollbar.find('.scrollbar-v-up,.scrollbar-h-up').on('click', function(e){
                that._fixScroll(1,$(this));
            });
            this.scrollbar.find('.scrollbar-v-down,.scrollbar-h-down').on('click', function(e){
                that._fixScroll(-1,$(this));
            });
            this.scrollbar.mousewheel(function(e, delta) {
                that._fixScroll(delta);
                return false;
            });
        },

        _clickPos: function (e,elem) {
            if($(e.target).attr('class') == 'scrollbar-line-v' || $(e.target).attr('class') == 'scrollbar-line-h') {
                var offset = elem.offset();
                if($(e.target).attr('class') == 'scrollbar-line-v') {
                    var top = e.pageY - offset.top;

                    var btn = elem.find('.scrollbar-line-v-btn');

                    this.dragElem = {
                        elem: btn,
                        width: btn.width(),
                        height: btn.height(),
                        parent: elem,
                        parentWidth:  elem.width(),
                        parentHeight:  elem.height(),
                        parentOffset:  offset
                    };

                    this._scrollTo(0,top,'y');

                    this.dragElem = null;
                }
                else {
                    var left = e.pageX - offset.left;

                    var btn = elem.find('.scrollbar-line-h-btn');

                    this.dragElem = {
                        elem: btn,
                        width: btn.width(),
                        height: btn.height(),
                        parent: elem,
                        parentWidth:  elem.width(),
                        parentHeight:  elem.height(),
                        parentOffset:  offset
                    };

                    this._scrollTo(left,0,'x');

                    this.dragElem = null;
                }
            }
        },
        _fixScroll: function (delta,elem) {
            var step = this.options.wheel;
            if( (elem !== undefined && (elem.hasClass('scrollbar-h-up') || elem.hasClass('scrollbar-h-down'))) || this.options.axis == 'x') {
                var percent = step/this.contentWidth*100;
                var barStep = (this.options.width-32)/100*percent;
                var leftCss = parseInt(this.scrollbarContainer.css('left'));
                var pos = (!isNaN(leftCss)) ? Math.abs(leftCss) : 0;

                var btn = this.scrollbar.find('.scrollbar-line-h-btn');
                var parent = this.scrollbar.find('.scrollbar-line-h');

                var barLeftCss = parseFloat(btn.css('left'));
                var barPos = (!isNaN(barLeftCss)) ? barLeftCss : 0;

                if(delta>0) {
                    var left = pos-step;
                    var barLeft = barPos-barStep;
                }
                else {
                    var left = pos+step;
                    var barLeft = barPos+barStep;
                }

                if(left<0) {
                    left = 0;
                }
                if(left>this.contentWidth-this.options.width) {
                    left = this.contentWidth-this.options.width;
                }

                var parentsSize = {
                    width: parent.width(),
                    height: parent.height()
                };
                var dragElemSize = {
                    width: btn.width(),
                    height: btn.height()
                };
                if(barLeft<0) {
                    barLeft = 0;
                }
                if(barLeft+dragElemSize.width>parentsSize.width) {
                    barLeft = parentsSize.width-dragElemSize.width;
                }

                this.scrollbarContainer.css({
                    left: left*(-1)
                });
                btn.css({
                    left: barLeft
                });
            }
            else {
                var percent = step/this.contentHeight*100;
                var barStep = (this.options.height-32)/100*percent;
                var topCss = parseInt(this.scrollbarContainer.css('top'));
                var pos = (!isNaN(topCss)) ? Math.abs(topCss) : 0;

                var btn = this.scrollbar.find('.scrollbar-line-v-btn');
                var parent = this.scrollbar.find('.scrollbar-line-v');

                var barTopCss = parseFloat(btn.css('top'));
                var barPos = (!isNaN(barTopCss)) ? barTopCss : 0;

                if(delta>0) {
                    var top = pos-step;
                    var barTop = barPos-barStep;
                }
                else {
                    var top = pos+step;
                    var barTop = barPos+barStep;
                }

                if(top<0) {
                    top = 0;
                }
                if(top>this.contentHeight-this.options.height) {
                    top = this.contentHeight-this.options.height;
                }

                var parentsSize = {
                    width: parent.width(),
                    height: parent.height()
                };
                var dragElemSize = {
                    width: btn.width(),
                    height: btn.height()
                };
                if(barTop<0) {
                    barTop = 0;
                }
                if(barTop+dragElemSize.height>parentsSize.height) {
                    barTop = parentsSize.height-dragElemSize.height;
                }

                this.scrollbarContainer.css({
                    top: top*(-1)
                });
                btn.css({
                    top: barTop
                });
            }
        },
        _scrollTo: function (left,top,xy) {
            if(xy == 'x') {
                var width = this.options.width-32;
                var ratio = width/this.contentWidth;

                var currLeft = left/ratio;

                if(currLeft<0) {
                    currLeft = 0;
                }
                if(currLeft>this.contentWidth-this.options.width) {
                    currLeft = this.contentWidth-this.options.width;
                }
                if(left<0) {
                    left = 0;
                }
                if(left>this.dragElem.parentWidth-this.dragElem.width) {
                    left = this.dragElem.parentWidth-this.dragElem.width;
                }

                this.dragElem.elem.css({
                    left:left
                });
                this.scrollbarContainer.css({
                    left: currLeft*(-1)
                });
            }
            else {
                var height = this.options.height-32;
                var ratio = height/this.contentHeight;

                var currTop = top/ratio;
                if(currTop<0) {
                    currTop = 0;
                }
                if(currTop>this.contentHeight-this.options.height) {
                    currTop = this.contentHeight-this.options.height;
                }
                if(top<0) {
                    top = 0;
                }
                if(top>this.dragElem.parentHeight-this.dragElem.height) {
                    top = this.dragElem.parentHeight-this.dragElem.height;
                }

                this.dragElem.elem.css({
                    top:top
                });

                this.scrollbarContainer.css({
                    top: currTop*(-1)
                });
            }
        },
        _scroll: function () {
            if(this.dragElem.elem.hasClass('scrollbar-line-h-btn')) {
                var width = this.options.width-32;
                var ratio = width/this.contentWidth;

                var leftCss = parseInt(this.dragElem.elem.css('left'));
                var leftCurr = (!isNaN(leftCss)) ? Math.abs(leftCss) : 0;
                var left = leftCurr/ratio;

                if(left<0) {
                    left = 0;
                }
                if(left>this.contentWidth-this.options.width) {
                    left = this.contentWidth-this.options.width;
                }

                this.scrollbarContainer.css({
                    left: left*(-1)
                });
            }
            else {
                var height = this.options.height-32;
                var ratio = height/this.contentHeight;

                var topCss = parseInt(this.dragElem.elem.css('top'));
                var topCurr = (!isNaN(topCss)) ? Math.abs(topCss) : 0;
                var top = topCurr/ratio;
                if(top<0) {
                    top = 0;
                }
                if(top>this.contentHeight-this.options.height) {
                    top = this.contentHeight-this.options.height;
                }

                this.scrollbarContainer.css({
                    top: top*(-1)
                });
            }
        },

        _startCoordsDiff: function (e) {
            var offset = this.dragElem.elem.offset();
            this.startCoords.x = e.pageX - offset.left;
            this.startCoords.y = e.pageY - offset.top;
        },
        _dragStart: function (e,elem) {
            var parent = elem.parents().first();
            this.dragElem = {
                elem: elem,
                width: elem.width(),
                height: elem.height(),
                parent: parent,
                parentWidth:  parent.width(),
                parentHeight:  parent.height(),
                parentOffset:  parent.offset()
            };
            this.dragStart = true;
            this.currCoords.x = e.pageX;
            this.currCoords.y = e.pageY;

            this._startCoordsDiff(e);
        },
        _drag: function (e) {
            if( this.dragStart ) {
                this.currCoords.x = e.pageX;
                this.currCoords.y = e.pageY;
                var left = this.currCoords.x - this.startCoords.x - this.dragElem.parentOffset.left;
                var top = this.currCoords.y - this.startCoords.y - this.dragElem.parentOffset.top;
                if(left<0) {
                    left = 0;
                }
                if(left+this.dragElem.width>this.dragElem.parentWidth) {
                    left = this.dragElem.parentWidth-this.dragElem.width;
                }
                if(top<0) {
                    top = 0;
                }
                if(top+this.dragElem.height>this.dragElem.parentHeight) {
                    top = this.dragElem.parentHeight-this.dragElem.height;
                }
                this.dragElem.elem.css({
                    left: left,
                    top: top
                });
                this._scroll();
            }
        },
        _dragEnd: function (e) {
            if(this.dragStart) {
                this.dragElem = null;
                this.dragStart = false;
                this.startCoords.x = 0;
                this.startCoords.y = 0;
                this.currCoords.x = null;
                this.currCoords.y = null;
            }
        },

        _destroy: function() {

        },
        _setOption: function(key, value) {
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

$(function () {
    $('[data-role=scrollbox]').scrollbar();
});
