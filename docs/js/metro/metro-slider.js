(function( $ ) {
    $.widget("metro.slider", {

        version: "1.0.0",

        options: {
            position: 0,
            accuracy: 0,
            color: 'default',
            completeColor: 'default',
            markerColor: 'default',
            colors: [],
            showHint: false,
            change: function(value, slider){},
            changed: function(value, slider){},

            _slider: {
                vertical: false,
                offset: 0,
                length: 0,
                marker: 0,
                ppp: 0,
                start: 0,
                stop: 0
            }
        },


        _create: function(){
            var that = this,
                element = this.element,

                o = this.options,
                s = this.options._slider;

            if (element.data('accuracy') != undefined) {
                o.accuracy = element.data('accuracy') > 0 ? element.data('accuracy') : 0;
            }
            if (element.data('position') != undefined) {
                o.position = this._correctValue(element.data('position') > 0 ? (element.data('position') > 100 ? 100 : element.data('position')) : 0);
            }
            if (element.data('color') != undefined) {
                o.color = element.data('color');
            }
            if (element.data('completeColor') != undefined) {
                o.completeColor = element.data('completeColor');
            }
            if (element.data('markerColor') != undefined) {
                o.markerColor = element.data('markerColor');
            }
            if (element.data('colors') != undefined) {
                o.colors = element.data('colors').split(",");
            }
            if (element.data('showHint') != undefined) {
                o.showHint = element.data('showHint');
            }

            s.vertical = element.hasClass("vertical");

            this._createSlider();
            this._initPoints();
            this._placeMarker(o.position);

            addTouchEvents(element[0]);

            element.children('.marker').on('mousedown', function (e) {
                e.preventDefault();
                that._startMoveMarker(e);
            });

            element.on('mousedown', function (e) {
                e.preventDefault();
                that._startMoveMarker(e);
            });
        },

        _startMoveMarker: function(e){
            var element = this.element, o = this.options, that = this, hint = element.children('.hint');

            $(element).on('mousemove', function (event) {
                that._movingMarker(event);
                if (!element.hasClass('permanent-hint')) {
                    hint.css('display', 'block');
                }
            });
            $(element).on('mouseup', function () {
                $(element).off('mousemove');
                element.off('mouseup');
                element.data('value', that.options.position);
                element.trigger('changed', that.options.position);
                o.changed(that.options.position, element);
                if (!element.hasClass('permanent-hint')) {
                    hint.css('display', 'none');
                }
            });

            this._initPoints();

            this._movingMarker(e)
        },

        _movingMarker: function (event) {
            var cursorPos,
                percents,
                valuePix,

                vertical = this.options._slider.vertical,
                sliderOffset = this.options._slider.offset,
                sliderStart = this.options._slider.start,
                sliderEnd = this.options._slider.stop,
                sliderLength = this.options._slider.length,
                markerSize = this.options._slider.marker;

            if (vertical) {
                cursorPos = event.pageY - sliderOffset;
            } else {
                cursorPos = event.pageX - sliderOffset;
            }

            if (cursorPos < sliderStart) {
                cursorPos = sliderStart;
            } else if (cursorPos > sliderEnd) {
                cursorPos = sliderEnd;
            }

            if (vertical) {
                valuePix = sliderLength - cursorPos - markerSize / 2;
            } else {
                valuePix = cursorPos - markerSize / 2;
            }

            percents = this._pixToPerc(valuePix);

            this._placeMarker(percents);

            this.options.position = percents;

            this.options.change(Math.round(percents), this.element);
        },

        _placeMarker: function (value) {
            var size, size2, o = this.options, colorParts = 0, colorIndex = 0, colorDelta = 0,
                marker = this.element.children('.marker'),
                complete = this.element.children('.complete'),
                hint = this.element.children('.hint');

            colorParts = o.colors.length;
            colorDelta = o._slider.length / colorParts;

            if (this.options._slider.vertical) {
                size = this._percToPix(value) + this.options._slider.marker;
                size2 = this.options._slider.length - size;
                marker.css('top', size2);
                complete.css('height', size);
                if (colorParts) {
                    colorIndex = Math.round(size / colorDelta)-1;
                    complete.css('background-color', o.colors[colorIndex<0?0:colorIndex]);
                }
                if (o.showHint) {
                    hint.html(Math.round(value)).css('top', size2 - hint.height()/2);
                }
            } else {
                size = this._percToPix(value);
                marker.css('left', size);
                complete.css('width', size);
                if (colorParts) {
                    colorIndex = Math.round(size / colorDelta)-1;
                    complete.css('background-color', o.colors[colorIndex<0?0:colorIndex]);
                }
                if (o.showHint) {
                    hint.html(Math.round(value)).css('left', size - hint.width()/2);
                }
            }

        },

        _pixToPerc: function (valuePix) {
            var valuePerc;
            valuePerc = valuePix * this.options._slider.ppp;
            return this._correctValue(valuePerc);
        },

        _percToPix: function (value) {
            if (this.options._slider.ppp === 0) {
                return 0;
            }
            return value / this.options._slider.ppp;
        },

        _correctValue: function (value) {
            var accuracy = this.options.accuracy;
            if (accuracy === 0) {
                return value;
            }
            if (value === 100) {
                return 100;
            }
            value = Math.floor(value / accuracy) * accuracy + Math.round(value % accuracy / accuracy) * accuracy;
            if (value > 100) {
                return 100;
            }
            return value;
        },

        _initPoints: function(){
            var s = this.options._slider, element = this.element;

            if (s.vertical) {
                s.offset = element.offset().top;
                s.length = element.height();
                s.marker = element.children('.marker').height();
            } else {
                s.offset = element.offset().left;
                s.length = element.width();
                s.marker = element.children('.marker').width();
            }

            s.ppp = 100 / (s.length - s.marker);
            s.start = s.marker / 2;
            s.stop = s.length - s.marker / 2;
        },

        _createSlider: function(){
            var element = this.element,
                options = this.options,
                complete, marker, hint;

            element.html('');

            complete = $("<div/>").addClass("complete").appendTo(element);
            marker = $("<a/>").addClass("marker").appendTo(element);

            if (options.showHint) {
                hint = $("<span/>").addClass("hint").appendTo(element);
            }

            if (options.color != 'default') {
                element.css('background-color', options.color);
            }
            if (options.completeColor != 'default') {
                complete.css('background-color', options.completeColor);
            }
            if (options.markerColor != 'default') {
                marker.css('background-color', options.markerColor);
            }
        },

        value: function (value) {
            if (typeof value !== 'undefined') {
                this._placeMarker(parseInt(value));
                this.options.position = parseInt(value);
                this.options.change(Math.round(parseInt(value)), this.element);
                return this;
            } else {
                return Math.round(this.options.position);
            }
        },

        _destroy: function(){},

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );


