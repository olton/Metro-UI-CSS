var Slider = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.slider = null;
        this.value = 0;
        this.percent = 0;
        this.pixel = 0;
        this.buffer = 0;
        this.keyInterval = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        min: 0,
        max: 100,
        accuracy: 0,
        showMinMax: false,
        minMaxPosition: Metro.position.TOP,
        value: 0,
        buffer: 0,
        hint: false,
        hintAlways: false,
        hintPosition: Metro.position.TOP,
        hintMask: "$1",
        vertical: false,
        target: null,
        returnType: "value", // value or percent
        size: 0,

        clsSlider: "",
        clsBackside: "",
        clsComplete: "",
        clsBuffer: "",
        clsMarker: "",
        clsHint: "",
        clsMinMax: "",
        clsMin: "",
        clsMax: "",

        onStart: Metro.noop,
        onStop: Metro.noop,
        onMove: Metro.noop,
        onClick: Metro.noop,
        onChange: Metro.noop,
        onChangeValue: Metro.noop,
        onChangeBuffer: Metro.noop,
        onFocus: Metro.noop,
        onBlur: Metro.noop,
        onSliderCreate: Metro.noop
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
        var that = this, element = this.element, o = this.options;

        this._createSlider();
        this._createEvents();
        this.buff(o.buffer);
        this.val(o.value);

        Utils.exec(o.onSliderCreate, [element]);
    },

    _createSlider: function(){
        var element = this.element, o = this.options;

        var prev = element.prev();
        var parent = element.parent();
        var slider = $("<div>").addClass("slider " + element[0].className).addClass(o.clsSlider);
        var backside = $("<div>").addClass("backside").addClass(o.clsBackside);
        var complete = $("<div>").addClass("complete").addClass(o.clsComplete);
        var buffer = $("<div>").addClass("buffer").addClass(o.clsBuffer);
        var marker = $("<button>").attr("type", "button").addClass("marker").addClass(o.clsMarker);
        var hint = $("<div>").addClass("hint").addClass(o.hintPosition + "-side").addClass(o.clsHint);
        var id = Utils.uniqueId();
        var i;

        slider.attr("id", id);

        if (o.size > 0) {
            if (o.vertical === true) {
                slider.outerHeight(o.size);
            } else {
                slider.outerWidth(o.size);
            }
        }

        if (o.vertical === true) {
            slider.addClass("vertical-slider");
        }

        if (prev.length === 0) {
            parent.prepend(slider);
        } else {
            slider.insertAfter(prev);
        }

        if (o.hintAlways === true) {
            hint.css({
                display: "block"
            }).addClass("permanent-hint");
        }

        element.appendTo(slider);
        backside.appendTo(slider);
        complete.appendTo(slider);
        buffer.appendTo(slider);
        marker.appendTo(slider);
        hint.appendTo(marker);

        if (o.showMinMax === true) {
            var min_max_wrapper = $("<div>").addClass("slider-min-max clear").addClass(o.clsMinMax);
            $("<span>").addClass("place-left").addClass(o.clsMin).html(o.min).appendTo(min_max_wrapper);
            $("<span>").addClass("place-right").addClass(o.clsMax).html(o.max).appendTo(min_max_wrapper);
            if (o.minMaxPosition === Metro.position.TOP) {
                min_max_wrapper.insertBefore(slider);
            } else {
                min_max_wrapper.insertAfter(slider);
            }
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                slider.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }

        this.slider = slider;
    },

    _createEvents: function(){
        var that = this, slider = this.slider, o = this.options;
        var marker = slider.find(".marker");
        var hint = slider.find(".hint");

        marker.on(Metro.events.start, function(){
            $(document).on(Metro.events.move, function(e){
                if (o.hint === true && o.hintAlways !== true) {
                    hint.fadeIn();
                }
                that._move(e);
                Utils.exec(o.onMove, [that.value, that.percent, slider]);
            });

            $(document).on(Metro.events.stop, function(){
                $(document).off(Metro.events.move);
                $(document).off(Metro.events.stop);

                if (o.hintAlways !== true) {
                    hint.fadeOut();
                }

                Utils.exec(o.onStop, [that.value, that.percent, slider]);
            });

            Utils.exec(o.onStart, [that.value, that.percent, slider]);
        });

        marker.on(Metro.events.focus, function(){
            Utils.exec(o.onFocus, [that.value, that.percent, slider]);
        });

        marker.on(Metro.events.blur, function(){
            Utils.exec(o.onBlur, [that.value, that.percent, slider]);
        });

        marker.on(Metro.events.keydown, function(e){

            var key = e.keyCode ? e.keyCode : e.which;

            if ([37,38,39,40].indexOf(key) === -1) {
                return;
            }

            var step = o.accuracy === 0 ? 1 : o.accuracy;

            if (that.keyInterval) {
                return ;
            }
            that.keyInterval = setInterval(function(){

                var val = that.value;

                if (e.keyCode === 37 || e.keyCode === 40) { // left, down
                    if (val - step < o.min) {
                        val = o.min;
                    } else {
                        val -= step;
                    }
                }

                if (e.keyCode === 38 || e.keyCode === 39) { // right, up
                    if (val + step > o.max) {
                        val = o.max;
                    } else {
                        val += step;
                    }
                }

                that.value = that._correct(val);
                that.percent = that._convert(that.value, 'val2prc');
                that.pixel = that._convert(that.percent, 'prc2pix');

                that._redraw();
            }, 100);

            e.preventDefault();
        });

        marker.on(Metro.events.keyup, function(){
            clearInterval(that.keyInterval);
            that.keyInterval = false;
        });

        slider.on(Metro.events.click, function(e){
            that._move(e);
            Utils.exec(o.onClick, [that.value, that.percent, slider]);
            Utils.exec(o.onStop, [that.value, that.percent, slider]);
        });

        $(window).resize(function(){
            that.val(that.value);
            that.buff(that.buffer);
        });
    },

    _convert: function(v, how){
        var slider = this.slider, o = this.options;
        var length = (o.vertical === true ? slider.outerHeight() : slider.outerWidth()) - slider.find(".marker").outerWidth();
        switch (how) {
            case "pix2prc": return Math.round( v * 100 / length );
            case "pix2val": return Math.round( this._convert(v, 'pix2prc') * ((o.max - o.min) / 100) + o.min );
            case "val2prc": return Math.round( (v - o.min)/( (o.max - o.min) / 100 )  );
            case "prc2pix": return Math.round( v / ( 100 / length ));
            case "val2pix": return Math.round( this._convert(this._convert(v, 'val2prc'), 'prc2pix') );
        }

        return 0;
    },

    _correct: function(value){
        var accuracy  = this.options.accuracy;
        var min = this.options.min, max = this.options.max;

        if (accuracy === 0 || isNaN(accuracy)) {
            return value;
        }

        value = Math.floor(value / accuracy) * accuracy + Math.round(value % accuracy / accuracy) * accuracy;

        if (value < min) {
            value = min;
        }

        if (value > max) {
            value = max;
        }

        return value;
    },

    _move: function(e){
        var slider = this.slider, o = this.options;
        var offset = slider.offset(),
            marker_size = slider.find(".marker").outerWidth(),
            length = o.vertical === true ? slider.outerHeight() : slider.outerWidth(),
            cPos, cPix, cStart = 0, cStop = length - marker_size;

        cPos = o.vertical === true ? Utils.pageXY(e).y - offset.top : Utils.pageXY(e).x - offset.left;
        cPix = o.vertical === true ? length - cPos - marker_size / 2 : cPos - marker_size / 2;

        if (cPix < cStart || cPix > cStop) {
            return ;
        }

        this.value = this._correct(this._convert(cPix, 'pix2val'));
        this.percent = this._convert(this.value, 'val2prc');
        this.pixel = this._convert(this.percent, 'prc2pix');

        this._redraw();
    },

    _hint: function(){
        var o = this.options, slider = this.slider, hint = slider.find(".hint");
        var value;

        value = o.hintMask.replace("$1", this.value).replace("$2", this.percent);

        hint.text(value);
    },

    _value: function(){
        var element = this.element, o = this.options, slider = this.slider;
        var value = o.returnType === 'value' ? this.value : this.percent;

        if (element[0].tagName === "INPUT") {
            element.val(value);
        }

        element.trigger("change");

        if (o.target !== null) {
            var target = $(o.target);
            if (target.length !== 0) {

                $.each(target, function(){
                    var t = $(this);
                    if (this.tagName === "INPUT") {
                        t.val(value);
                    } else {
                        t.text(value);
                    }
                });
            }
        }

        Utils.exec(o.onChangeValue, [value, this.percent, slider], element[0]);
        Utils.exec(o.onChange, [value, this.percent, this.buffer], element[0]);
    },

    _marker: function(){
        var slider = this.slider, o = this.options;
        var marker = slider.find(".marker"), complete = slider.find(".complete");
        var length = o.vertical === true ? slider.outerHeight() : slider.outerWidth();
        var marker_size = parseInt(Utils.getStyleOne(marker, "width"));
        var slider_visible = Utils.isVisible(slider);

        if (slider_visible) {
            marker.css({
                'margin-top': 0,
                'margin-left': 0
            });
        }

        if (o.vertical === true) {
            if (slider_visible) {
                marker.css('top', length - this.pixel);
            } else {
                marker.css('top', this.percent + "%");
                marker.css('margin-top', this.percent === 0 ? 0 : -1 * marker_size / 2);
            }
            complete.css('height', this.percent+"%");
        } else {
            if (slider_visible) {
                marker.css('left', this.pixel);
            } else {
                marker.css('left', this.percent + "%");
                marker.css('margin-left', this.percent === 0 ? 0 : -1 * marker_size / 2);
            }
            complete.css('width', this.percent+"%");
        }
    },

    _redraw: function(){
        this._marker();
        this._value();
        this._hint();
    },

    _buffer: function(){
        var element = this.element, o = this.options;
        var buffer = this.slider.find(".buffer");

        if (o.vertical === true) {
            buffer.css("height", this.buffer + "%");
        } else {
            buffer.css("width", this.buffer + "%");
        }

        Utils.exec(o.onChangeBuffer, [this.buffer, this.slider], element[0]);
        Utils.exec(o.onChange, [element.val(), this.percent, this.buffer], element[0]);
    },

    val: function(v){
        var o = this.options;

        if (v === undefined || isNaN(v)) {
            return this.value;
        }

        if (v < o.min) {
            v = o.min;
        }

        if (v > o.max) {
            v = o.max;
        }

        this.value = this._correct(v);
        this.percent = this._convert(this.value, 'val2prc');
        this.pixel = this._convert(this.percent, 'prc2pix');

        this._redraw();
    },

    buff: function(v){
        var slider = this.slider;
        var buffer = slider.find(".buffer");

        if (v === undefined || isNaN(v)) {
            return this.buffer;
        }

        if (buffer.length === 0) {
            return false;
        }

        v = parseInt(v);

        if (v > 100) {
            v = 100;
        }

        if (v < 0) {
            v = 0;
        }

        this.buffer = v;
        this._buffer();
    },

    changeValue: function(){
        var element = this.element, o = this.options;
        var val = element.attr("data-value");
        if (val < o.min) {
            val = o.min
        }
        if (val > o.max) {
            val = o.max
        }
        this.val(val);
    },

    changeBuffer: function(){
        var element = this.element;
        var val = parseInt(element.attr("data-buffer"));
        if (val < 0) {
            val = 0
        }
        if (val > 100) {
            val = 100
        }
        this.buff(val);
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.changeValue(); break;
            case "data-buffer": this.changeBuffer(); break;
            case 'disabled': this.toggleState(); break;
        }
    }
};

Metro.plugin('slider', Slider);