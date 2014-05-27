(function( $ ) {
    $.widget("metro.scrollbar", {

        version: "1.0.0",

        options: {
            height: '100%', /* '100%'|int */
            width: '100%',  /* '100%'|int */
            axis: ['x','y'],      /* x|y|[x,y] */
            wheel: 55      /* step in px */
            //size: 'auto'    /* 'auto'|int */
        },
        startSize: {
            width: null,
            height: null
        },
        elemPadding: false,
        bothScroll: false,
        scrollbar: null,
        contentHeight: 0,
        contentWidth: 0,
        contentMinHeight: 0,
        contentMinWidth: 0,
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
        handlers: false,

        _create: function() {
            var elem = this.element;
            var that = this;
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

            elem.css({
                position: 'relative'
            });

            var width = elem.outerWidth();
            var height = elem.outerHeight();

            this.contentMinWidth = width;
            this.contentMinHeight = height;

            this.startSize.width = this.options.width;
            this.startSize.height = this.options.height;
            
            var sw = (this.startSize.width == parseInt(this.startSize.width)) ? this.startSize.width+'px' : this.startSize.width;
            var sh = (this.startSize.height == parseInt(this.startSize.height)) ? this.startSize.height+'px' : this.startSize.height;

            elem.wrap('<div class="scrollbar" style="width: '+sw+'; height: '+sh+';"></div>');
            this.scrollbar = elem.parents('.scrollbar').first();

            this.scrollbar.parents().first().css({
                overflow: 'hidden'
            });

            this._build(width,height);
            
            $(window).resize(function () {
                that._resize();
            });
        },

        _resize: function () {
            var elem = this.element;

            if( (!isNaN(parseInt(this.element.css('left'))) && parseInt(this.element.css('left')) != 0) || (!isNaN(parseInt(this.element.css('top'))) && parseInt(this.element.css('top')))  ) {
                var l = Math.abs(parseInt(this.element.css('left')));
                var t = Math.abs(parseInt(this.element.css('top')));

                var w = this.scrollbar.width();
                var h = this.scrollbar.height();

                if(this.contentWidth - l < w) {
                    l = l - (w-(this.contentWidth - l));
                    if(l<0) {
                        l = 0;
                    }
                    this.element.css('left',l*(-1));
                }
                this.element.css('left',l*(-1));
                if(this.contentHeight - t < h) {
                    t = t - (h-(this.contentHeight - t));
                    if(t<0) {
                        t = 0;
                    }
                    this.element.css('top',t*(-1));
                }
            }

            this.options.width = this.startSize.width;
            this.options.height = this.startSize.height;

            this.scrollbar.css({
                padding: 0
            });
            if(this.elemPadding) {
                this.element.css({
                    paddingRight: '-=5',
                    paddingBottom: '-=5'
                });
                this.elemPadding = false;
            }

            if(this.scrollbar.find('.scrollbar-v').length>0) {
                this.scrollbar.find('.scrollbar-v').remove();
            }
            if(this.scrollbar.find('.scrollbar-h').length>0) {
                this.scrollbar.find('.scrollbar-h').remove();
            }
            if(this.scrollbar.find('.scrollbar-both').length>0) {
                this.scrollbar.find('.scrollbar-both').remove();
            }

            var width = elem.outerWidth();
            var height = elem.outerHeight();

            this.contentWidth = width;
            this.contentHeight = height;
            this._removeHandlers();
            this._build(width,height);
        },
        _build: function (width,height) {
            var elem = this.element;

            this.options.width = (this.options.width == '100%') ? this.scrollbar.outerWidth() : this.options.width;
            this.options.height = (this.options.height == '100%') ? this.scrollbar.outerHeight() : this.options.height;
            
            this.scrollbar.css({
                width: this.startSize.width,
                height: this.startSize.height
            });

            this.contentWidth = width;
            this.contentHeight = height;

            if(this.options.axis == 'y') {
                /* vertical */
                if(this.contentHeight>this.options.height) {
                    this.scrollbar.css({
                        paddingRight: 20,
                        paddingBottom: 0
                    });
                    var width = elem.outerWidth();
                    var height = elem.outerHeight();
                    this.contentWidth = width;
                    this.contentHeight = height;

                    this._verticalScrollbar();
                    this._startHandlers();
                }
                else {
                    if(this.scrollbar.find('.scrollbar-v').length>0) {
                        this.scrollbar.find('.scrollbar-v').hide();
                    }
                    this.scrollbar.css({
                        paddingRight: 0,
                        paddingBottom: 0
                    });
                }

            }
            else if(this.options.axis == 'x') {
                /* horizontal */
                if(this.contentWidth>this.options.width) {
                    if(this.startSize.height == '100%') {
                        this.scrollbar.css({
                            paddingBottom: 20,
                            paddingRight: 0
                        });
                        var width = elem.outerWidth();
                        var height = elem.outerHeight();
                        this.contentWidth = width;
                        this.contentHeight = height;
                    }

                    this._horizontalScrollbar();
                    this._startHandlers();
                }
                else {
                    if(this.scrollbar.find('.scrollbar-h').length>0) {
                        this.scrollbar.find('.scrollbar-h').hide();
                    }
                    this.scrollbar.css({
                        paddingBottom: 0,
                        paddingRight: 0
                    });
                }
            }
            else {
                /* both */
                if(this.contentHeight>this.options.height && this.contentWidth>this.options.width) {

                    this.bothScroll = true;
                    if(this.scrollbar.find('.scrollbar-both').length>0) {
                        this.scrollbar.find('.scrollbar-both').show();
                    }
                    else {
                        this.scrollbar.append('<div class="scrollbar-both"></div>');
                    }

                    if(!this.elemPadding) {
                        this.element.css({
                            paddingRight: '+=5',
                            paddingBottom: '+=5'
                        });
                        this.elemPadding = true;
                    }


                    var width = elem.outerWidth();
                    var height = elem.outerHeight();
                    this.contentWidth = width;
                    this.contentHeight = height;

                    this._verticalScrollbar();
                    this._horizontalScrollbar();
                    this._startHandlers();
                }
                else {
                    this.bothScroll = false;
                    if(this.scrollbar.find('.scrollbar-both').length>0) {
                        this.scrollbar.find('.scrollbar-both').hide();
                    }
                    if(this.elemPadding) {
                        this.element.css({
                            paddingRight: '-=5',
                            paddingBottom: '-=5'
                        });
                        this.elemPadding = false;
                    }
                    if(this.contentWidth>this.options.width) {
                        if(this.startSize.height == '100%') {
                            this.scrollbar.css({
                                paddingBottom: 20,
                                paddingRight: 0
                            });
                            var width = elem.outerWidth();
                            var height = elem.outerHeight();
                            this.contentWidth = width;
                            this.contentHeight = height;
                        }

                        this._horizontalScrollbar();
                        this._startHandlers();
                    }
                    else {
                        if(this.scrollbar.find('.scrollbar-h').length>0) {
                            this.scrollbar.find('.scrollbar-h').hide();
                        }
                        this.scrollbar.css({
                            paddingBottom: 0,
                            paddingRight: 0
                        });
                    }
                    if(this.contentHeight>this.options.height) {
                        this.scrollbar.css({
                            paddingRight: 20,
                            paddingBottom: 0
                        });
                        var width = elem.outerWidth();
                        var height = elem.outerHeight();
                        this.contentWidth = width;
                        this.contentHeight = height;

                        this._verticalScrollbar();
                        this._startHandlers();
                    }
                    else {
                        if(this.scrollbar.find('.scrollbar-v').length>0) {
                            this.scrollbar.find('.scrollbar-v').hide();
                        }
                        this.scrollbar.css({
                            paddingRight: 0,
                            paddingBottom: 0
                        });
                    }
                }
            }
        },
        _verticalScrollbar: function () {
            if(this.scrollbar.find('.scrollbar-v').length<1) {
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
            }
            else {
                this.scrollbar.find('.scrollbar-v').show();
            }

            var line = this.scrollbar.find('.scrollbar-line-v');
            var btn =  this.scrollbar.find('.scrollbar-line-v-btn');
            var scrollBar = this.scrollbar.find('.scrollbar-v');
            
            if(this.bothScroll) {
                scrollBar.height(this.options.height);
                var h = scrollBar.height()-15;
                this.options.height = h;
                scrollBar.height(h);
            }
            else {
                scrollBar.height(this.options.height);
            }

            var height = this.options.height-32;
            var ratio = height/this.contentHeight;

            line.height(height);

            if(ratio>=(this.contentHeight-32)/this.contentHeight) {
                btn.hide();
            }
            else {
                var btnHeight = ratio*this.options.height;
                btn.show().height(btnHeight);
            }
        },
        _horizontalScrollbar: function () {
            if(this.scrollbar.find('.scrollbar-h').length<1) {
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
            }
            else {
                this.scrollbar.find('.scrollbar-h').show();
            }

            var line = this.scrollbar.find('.scrollbar-line-h');
            var btn =  this.scrollbar.find('.scrollbar-line-h-btn');
            var scrollBar = this.scrollbar.find('.scrollbar-h');

            if(this.bothScroll) {
                scrollBar.width(this.options.width);
                var w = scrollBar.width()-15;
                this.options.width = w;
                scrollBar.width(w);
            }
            else {
                scrollBar.width(this.options.width);
            }

            var width = this.options.width-32;
            var ratio = width/this.contentWidth;
            var btnWidth = ratio*this.options.width;
            var l = (!isNaN(parseInt(this.element.css('left')))) ? parseInt(this.element.css('left')) : 0;
            var left = Math.abs(l)*ratio;
            
            line.width(width);
            if(ratio>=(this.contentWidth-32)/this.contentWidth) {
                btn.hide();
            }
            else {
                btn.show().width(btnWidth).css({
                    left:left
                });
            }
        },

        _startHandlers: function () {
            if(this.handlers) {
                return false;
            }
            this.handlers = true;
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
        _removeHandlers: function () {
            if(!this.handlers) {
                return false;
            }
            this.handlers = false;
            var that = this;
            $(document).mousemove(function(e){
                return false;
            });
            $(document).mouseup(function(e){
                return false;
            });
            this.scrollbar.find('.scrollbar-line-v-btn,.scrollbar-line-h-btn').off('mousedown');
            this.scrollbar.find('.scrollbar-line-v,.scrollbar-line-h').off('click');
            this.scrollbar.find('.scrollbar-v-up,.scrollbar-h-up').off('click');
            this.scrollbar.find('.scrollbar-v-down,.scrollbar-h-down').off('click');
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
            if( (elem !== undefined && (elem.hasClass('scrollbar-h-up') || elem.hasClass('scrollbar-h-down'))) || this.options.axis == 'x' || (this.options.axis != 'x' && this.options.axis != 'y' && this.scrollbar.find('.scrollbar-v').length<1)) {
                var percent = step/this.contentWidth*100;
                var barStep = (this.options.width-32)/100*percent;
                var leftCss = parseInt(this.element.css('left'));
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

                this.element.css({
                    left: left*(-1)
                });
                btn.css({
                    left: barLeft
                });
            }
            else {
                var percent = step/this.contentHeight*100;
                var barStep = (this.options.height-32)/100*percent;
                var topCss = parseInt(this.element.css('top'));
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

                this.element.css({
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
                this.element.css({
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

                this.element.css({
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

                this.element.css({
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

                this.element.css({
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
                if(left+this.dragElem.width>=this.dragElem.parentWidth) {
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

