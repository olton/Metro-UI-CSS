/* global Metro */
/* eslint-disable */
(function(Metro, $) {
    'use strict';

    var Utils = Metro.utils;
    var ColorSelectorDefaultConfig = {
        defaultSwatches: "#FFFFFF,#000000,#FFFB0D,#0532FF,#FF9300,#00F91A,#FF2700,#686868,#EE5464,#D27AEE,#5BA8C4,#E64AA9,#1ba1e2,#6a00ff,#bebebe,#f8f8f8",
        userColors: null,
        returnValueType: "hex",
        returnAsString: true,
        showValues: "hex, rgb, hsl, hsv, cmyk",
        showUserColors: true,
        target: null,
        addUserColorTitle: "ADD TO SWATCHES",
        clearUserColorTitle: "",
        userColorsTitle: "USER COLORS",
        clsSelector: "",
        clsSwatches: "",
        clsSwatch: "",
        clsValue: "",
        clsLabel: "",
        clsInput: "",
        clsUserColorButton: "",
        clsUserColors: "",
        clsUserColorsTitle: "",
        clsUserColor: "",
        onColor: Metro.noop,
        onMyObjectCreate: Metro.noop
    };

    Metro.colorSelectorSetup = function (options) {
        ColorSelectorDefaultConfig = $.extend({}, ColorSelectorDefaultConfig, options);
    };

    if (typeof window["metroColorSelectorSetup"] !== undefined) {
        Metro.colorSelectorSetup(window["metroColorSelectorSetup"]);
    }

    Metro.Component('color-selector', {
        init: function( options, elem ) {
            this._super(elem, options, ColorSelectorDefaultConfig, {
                // define instance vars here
                id: Utils.elementId("color-selector"),
                defaultSwatches: [],
                showValues: [],
                userColors: [],
                hue: 0,
                saturation: 0,
                lightness: 1,
                hsl: null,
                hsv: null,
                rgb: null,
                cmyk: null,
                hex: null
            });
            return this;
        },

        _create: function(){
            var that = this, element = this.element, o = this.options;

            if (Utils.isValue(o.defaultSwatches)) this.defaultSwatches = o.defaultSwatches.toArray(",");
            if (Utils.isValue(o.showValues)) this.showValues = o.showValues.toArray(",");
            if (Utils.isValue(o.userColors)) this.userColors = o.userColors.toArray(",");

            this._createStructure();
            this._createEvents();

            this._fireEvent('color-selector-create');
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            var colorBox, row, swatches, map, value, inputs, radios, userColors, userColorsActions;

            element.addClass("color-selector").addClass(o.clsSelector);

            element.append( colorBox = $("<div>").addClass("color-box") );

            colorBox.append( row = $("<div>").addClass("row") );

            row.append( swatches = $("<div>").addClass("default-swatches").addClass(o.clsSwatches) );
            $.each(this.defaultSwatches, function(){
                swatches.append(
                    $("<button>")
                        .attr("data-color", this)
                        .attr("type", "button")
                        .addClass("swatch")
                        .addClass(o.clsSwatch)
                        .css("background-color", this)
                );
            });

            colorBox.append( row = $("<div>").addClass("row") );

            row.append( map = $("<div>").addClass("color-map") );
            map.append( $("<button>").attr("type", "button").addClass("cursor color-cursor") )
            map.append( $("<canvas>").addClass("color-canvas") )

            row.append( map = $("<div>").addClass("hue-map") );
            map.append( $("<button>").attr("type", "button").addClass("cursor hue-cursor") )
            map.append( $("<canvas>").addClass("hue-canvas") )

            colorBox.append( row = $("<div>").addClass("row") );

            row.append( value = $("<div>").addClass("color-value-hex") );
            value.append( $("<input type='radio' name='returnType' value='hex' checked>").addClass("check-color-value-hex") );
            value.append( $("<input type='text' data-prepend='HEX:' readonly>").addClass("input-small color-value-x") );

            row.append( value = $("<div>").addClass("color-value-rgb") );
            value.append( $("<input type='radio' name='returnType' value='rgb'>").addClass("check-color-value-rgb") );
            value.append( $("<input type='text' data-prepend='R:' readonly>").addClass("input-small color-value-r") );
            value.append( $("<input type='text' data-prepend='G:' readonly>").addClass("input-small color-value-g") );
            value.append( $("<input type='text' data-prepend='B:' readonly>").addClass("input-small color-value-b") );

            row.append( value = $("<div>").addClass("color-value-hsl") );
            value.append( $("<input type='radio' name='returnType' value='hsl'>").addClass("check-color-value-hsv") );
            value.append( $("<input type='text' data-prepend='H:' readonly>").addClass("input-small color-value-h") );
            value.append( $("<input type='text' data-prepend='S:' readonly>").addClass("input-small color-value-s") );
            value.append( $("<input type='text' data-prepend='L:' readonly>").addClass("input-small color-value-l") );

            row.append( value = $("<div>").addClass("color-value-hsv") );
            value.append( $("<input type='radio' name='returnType' value='hsv'>").addClass("check-color-value-hsl") );
            value.append( $("<input type='text' data-prepend='H:' readonly>").addClass("input-small color-value-h") );
            value.append( $("<input type='text' data-prepend='S:' readonly>").addClass("input-small color-value-s") );
            value.append( $("<input type='text' data-prepend='V:' readonly>").addClass("input-small color-value-v") );

            row.append( value = $("<div>").addClass("color-value-cmyk") );
            value.append( $("<input type='radio' name='returnType' value='cmyk'>").addClass("check-color-value-cmyk") );
            value.append( $("<input type='text' data-prepend='C:' readonly>").addClass("input-small color-value-c") );
            value.append( $("<input type='text' data-prepend='M:' readonly>").addClass("input-small color-value-m") );
            value.append( $("<input type='text' data-prepend='Y:' readonly>").addClass("input-small color-value-y") );
            value.append( $("<input type='text' data-prepend='K:' readonly>").addClass("input-small color-value-k") );

            colorBox.append( row = $("<div>").addClass("row user-colors-container") );
            row.append( $("<div>").addClass("user-colors-title").addClass(o.clsUserColorsTitle).html(o.userColorsTitle) );
            row.append( userColors = $("<div>").addClass("user-colors").addClass(o.clsUserColors) );
            row.append( userColorsActions = $("<div>").addClass("user-colors-actions") );
            userColorsActions.append(
                $("<button>")
                    .addClass("button add-button")
                    .addClass(o.clsUserColorButton)
                    .html("<span class='user-swatch'></span><span>"+o.addUserColorTitle+"</span>")
            );

            inputs = colorBox.find("input[type=text]");
            Metro.makePlugin(inputs, 'input', {
                clearButton: false,
                clsPrepend: o.clsLabel,
                clsComponent: o.clsInput
            });
            inputs.addClass(o.clsValue);

            radios = colorBox.find("input[type=radio]").each(function(){
                $(this).attr("name", that.id + "-returnType");
            });
            radios.each(function(){
                if ($(this).val() === o.returnValueType) {
                    this.checked = true;
                }
            });
            Metro.makePlugin(radios, 'radio', {
                style: 2
            });

            $.each(["hex", "rgb", "hsv", "hsl", "cmyk"], function(){
                if (that.showValues.indexOf(this) === -1) element.find(".color-value-"+this).hide();
            });

            if (!o.showUserColors) {
                element.find(".user-colors-container").hide();
            }

            this._fillUserColors();

            this.hueCanvas = element.find(".hue-canvas");
            this.hueCursor = element.find(".hue-cursor");
            this.shadeCanvas = element.find(".color-canvas");
            this.shadeCursor = element.find(".color-cursor");

            this._createShadeCanvas();
            this._createHueCanvas();
            this._setColorValues();
            this._updateCursorsColor();
        },

        _createShadeCanvas: function(color){
            var canvas = this.shadeCanvas[0];
            var ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if(!color) color = '#f00';

            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            var whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            whiteGradient.addColorStop(0, "#fff");
            whiteGradient.addColorStop(1, "transparent");
            ctx.fillStyle = whiteGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            var blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            blackGradient.addColorStop(0, "transparent");
            blackGradient.addColorStop(1, "#000");
            ctx.fillStyle = blackGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        _createHueCanvas: function(){
            var canvas = this.hueCanvas[0];
            var ctx = canvas.getContext('2d');
            var hueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

            hueGradient.addColorStop(0.00, "hsl(0,100%,50%)");
            hueGradient.addColorStop(0.17, "hsl(298.8, 100%, 50%)");
            hueGradient.addColorStop(0.33, "hsl(241.2, 100%, 50%)");
            hueGradient.addColorStop(0.50, "hsl(180, 100%, 50%)");
            hueGradient.addColorStop(0.67, "hsl(118.8, 100%, 50%)");
            hueGradient.addColorStop(0.83, "hsl(61.2,100%,50%)");
            hueGradient.addColorStop(1.00, "hsl(360,100%,50%)");
            ctx.fillStyle = hueGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        _updateHueCursor: function(y){
            this.hueCursor.css({
                "top": y
            });
        },

        _getHueColor: function(pageY){
            var canvas = this.hueCanvas[0];
            var rect = canvas.getBoundingClientRect();
            var y, percent, color, hue;

            y = pageY - rect.top;

            if ( y > rect.height ) y = rect.height;
            if ( y < 0 ) y = 0;

            percent = y / rect.height;
            hue = 360 - (360 * percent);
            if (hue === 360) hue = 0;
            color = "hsl("+ hue +", 100%, 50%)";
            this.hue = hue;

            this._createShadeCanvas(color);
            this._updateHueCursor(y);
            this._updateCursorsColor();
            this._setColorValues();
        },

        _getShadeColor: function(pageX, pageY){
            var colorRect = this.shadeCanvas[0].getBoundingClientRect();
            var x = pageX - colorRect.left;
            var y = pageY - colorRect.top;

            if(x > colorRect.width) x = colorRect.width;
            if(x < 0) x = 0;
            if(y > colorRect.height) y = colorRect.height;
            if(y < 0) y = .1;

            var xRatio = x / colorRect.width * 100;
            var yRatio = y / colorRect.height * 100;
            var hsvValue = 1 - (yRatio / 100);
            var hsvSaturation = xRatio / 100;
            var lightness = (hsvValue / 2) * (2 - hsvSaturation);
            var saturation = (hsvValue * hsvSaturation) / (1 - Math.abs(2 * lightness - 1));

            if (isNaN(lightness)) {
                lightness = 0;
            }

            if (isNaN(saturation)) {
                saturation = 0;
            }

            this.lightness = (Math.round(lightness * 100) / 100).toFixed(1);
            this.saturation = (Math.round(saturation * 100) / 100).toFixed(1);

            this._updateColorCursor(x, y);
            this._updateCursorsColor();
            this._setColorValues();
        },

        _updateCursorsColor: function(){
            this.shadeCursor.css({backgroundColor: Metro.colors.toHEX(new Metro.colorPrimitive.HSL(this.hue, this.saturation, this.lightness))});
            this.hueCursor.css({backgroundColor: Metro.colors.toHEX(new Metro.colorPrimitive.HSL(this.hue, 1, .5))});
        },

        _updateColorCursor: function(x, y){
            this.shadeCursor.css({
                top: y,
                left: x
            })
        },

        _colorToPos: function (color){
            var shadeCanvasRect = this.shadeCanvas[0].getBoundingClientRect();
            var hueCanvasRect = this.hueCanvas[0].getBoundingClientRect();
            var hsl = Metro.colors.toHSL(color);
            var hsv = Metro.colors.toHSV(color);
            var x = shadeCanvasRect.width * hsv.s;
            var y = shadeCanvasRect.height * (1 - hsv.v);
            var hueY = hueCanvasRect.height - ((hsl.h / 360) * hueCanvasRect.height);

            this.hue = hsl.h;
            this.saturation = hsl.s;
            this.lightness = hsl.l;

            this._updateHueCursor(hueY);
            this._updateColorCursor(x, y);
            this._updateCursorsColor();
            this._createShadeCanvas("hsl("+ this.hue +", 100%, 50%)");
            this._setColorValues();
        },

        _setColorValues: function(){
            var element = this.element, o = this.options;
            var hsl = Metro.colors.toHSL(new Metro.colorPrimitive.HSL(this.hue, this.saturation, this.lightness));
            var rgb = Metro.colors.toRGB(hsl);
            var hsv = Metro.colors.toHSV(hsl);
            var cmyk = Metro.colors.toCMYK(hsl);
            var hex = Metro.colors.toHEX(hsl);
            var target = $(o.target);

            this.hsl = hsl;
            this.hsv = hsv;
            this.rgb = rgb;
            this.hex = hex;
            this.cmyk = cmyk;

            element.find(".color-value-hex .color-value-x input").val(hex);

            element.find(".color-value-rgb .color-value-r input").val(rgb.r);
            element.find(".color-value-rgb .color-value-g input").val(rgb.g);
            element.find(".color-value-rgb .color-value-b input").val(rgb.b);

            element.find(".color-value-hsl .color-value-h input").val(hsl.h.toFixed(0));
            element.find(".color-value-hsl .color-value-s input").val(hsl.s.toFixed(4));
            element.find(".color-value-hsl .color-value-l input").val(hsl.l.toFixed(4));

            element.find(".color-value-hsv .color-value-h input").val(hsv.h.toFixed(0));
            element.find(".color-value-hsv .color-value-s input").val(hsv.s.toFixed(4));
            element.find(".color-value-hsv .color-value-v input").val(hsv.v.toFixed(4));

            element.find(".color-value-cmyk .color-value-c input").val(cmyk.c.toFixed(0));
            element.find(".color-value-cmyk .color-value-m input").val(cmyk.m.toFixed(0));
            element.find(".color-value-cmyk .color-value-y input").val(cmyk.y.toFixed(0));
            element.find(".color-value-cmyk .color-value-k input").val(cmyk.k.toFixed(0));

            if (target && target.length) {
                target.css({
                    backgroundColor: hex,
                    color: Metro.colors.isLight(hex) ? "#000" : "#fff"
                });
            }

            element.find(".user-colors-actions .user-swatch").css({
                backgroundColor: hex
            });

            this._fireEvent("color", {
                hue: this.hue,
                saturation: this.saturation,
                lightness: this.lightness,
                color: this.val()
            });
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            var hueCanvas = this.hueCanvas;
            var shadeCanvas = this.shadeCanvas;
            var radios = element.find("input[type=radio]");
            var addButton = element.find(".user-colors-actions .add-button");

            addButton.on("click", function(){
                var color = Metro.colors.toHEX(new Metro.colorPrimitive.HSL(that.hue, that.saturation, that.lightness));
                if (that.userColors.indexOf(color) !== -1) {
                    return ;
                }
                that.userColors.push(color);
                element.find(".user-colors").append(
                    $("<button>")
                        .attr("data-color", color)
                        .attr("type", "button")
                        .addClass("swatch user-swatch")
                        .css({
                            backgroundColor: color
                        })
                )
            });

            radios.on("click", function(){
                o.returnValueType = $(this).val();
            });

            hueCanvas.on(Metro.events.startAll, function(e){
                if (e.cancelable) e.preventDefault();
                that._getHueColor(Utils.pageXY(e).y);
                that.hueCursor.addClass("dragging");

                $(window).on(Metro.events.moveAll, function(e){
                    if (e.cancelable) e.preventDefault();
                    that._getHueColor(Utils.pageXY(e).y);
                }, {ns: that.id, passive: false});

                $(window).on(Metro.events.stopAll, function(){
                    that.hueCursor.removeClass("dragging");
                    $(window).off(Metro.events.moveAll, {ns: that.id});
                })
            }, {passive: false});

            shadeCanvas.on(Metro.events.startAll, function(e){
                if (e.cancelable) e.preventDefault();
                that._getShadeColor(Utils.pageXY(e).x, Utils.pageXY(e).y);
                that.shadeCursor.addClass("dragging");

                $(window).on(Metro.events.moveAll, function(e){
                    if (e.cancelable) e.preventDefault();
                    that._getShadeColor(Utils.pageXY(e).x, Utils.pageXY(e).y);
                }, {ns: that.id, passive: false});

                $(window).on(Metro.events.stopAll, function(){
                    that.shadeCursor.removeClass("dragging");
                    $(window).off(Metro.events.moveAll, {ns: that.id});
                })
            }, {passive: false});

            element.on("click", ".swatch", function(e){
                that._colorToPos($(this).attr("data-color"));
                if (e.cancelable) e.preventDefault();
            })
        },

        val: function(v){
            var o = this.options;

            if (!Utils.isValue(v) || !Metro.colors.isColor(v)) {
                var res;
                switch (o.returnValueType.toLowerCase()) {
                    case "rgb":
                        res = this.rgb;
                        break;
                    case "hsl":
                        res = this.hsl;
                        break;
                    case "hsv":
                        res = this.hsv;
                        break;
                    case "cmyk":
                        res = this.cmyk;
                        break;
                    default: res = this.hex;
                }
                return o.returnAsString ? res.toString() : res;
            }

            this._colorToPos(Metro.colors.toHEX(v));
        },

        user: function(v){
            var element = this.element;
            var colors;

            if (!Utils.isValue(v)) {
                return this.userColors;
            }

            if (!Array.isArray(v) && typeof v !== "string") {
                return ;
            }

            if (typeof v === "string") {
                this.userColors = v.toArray(",");
            } else {
                this.userColors = v;
            }

            this._fillUserColors();
        },

        _fillUserColors: function(){
            var colors = this.element.find(".user-colors").clear();

            console.log(this.userColors);

            $.each(this.userColors, function(){
                var color = this;
                colors.append(
                    $("<button>")
                        .attr("data-color", color)
                        .attr("type", "button")
                        .addClass("swatch user-swatch")
                        .css({
                            backgroundColor: color
                        })
                )
            });
        },

        changeAttribute: function(attr, newValue){
            var o = this.options;

            if (attr === "data-return-value-type") {
                o.returnValueType = newValue;
            }

            if (attr === "data-return-as-string") {
                o.returnValueType = Utils.bool(newValue);
            }
        },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));
/* eslint-enable */
