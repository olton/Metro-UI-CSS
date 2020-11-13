/* global Metro */
/* eslint-disable */
(function(Metro, $) {
    'use strict';

    var supportedColorTypes = "hex, rgb, rgba, hsl, hsla, hsv, cmyk";
    var Utils = Metro.utils;
    var ColorSelectorDefaultConfig = {
        defaultSwatches: "#FFFFFF,#000000,#FFFB0D,#0532FF,#FF9300,#00F91A,#FF2700,#686868,#EE5464,#D27AEE,#5BA8C4,#E64AA9,#1ba1e2,#6a00ff,#bebebe,#f8f8f8",
        userColors: null,
        returnValueType: "hex",
        returnAsString: true,
        showValues: supportedColorTypes,
        showAsString: null,
        showUserColors: true,
        target: null,
        controller: null,
        addUserColorTitle: "ADD TO SWATCHES",
        clearUserColorTitle: "",
        userColorsTitle: "USER COLORS",
        hslMode: "percent",
        showAlphaChannel: true,
        inputThreshold: 300,
        initColor: null,
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
                showAsString: [],
                hue: 0,
                saturation: 0,
                lightness: 1,
                alpha: 1,
                hsl: null,
                hsla: null,
                hsv: null,
                rgb: null,
                rgba: null,
                cmyk: null,
                hex: null,
                inputInterval: null
            });
            return this;
        },

        _create: function(){
            var that = this, element = this.element, o = this.options;

            if (Utils.isValue(o.defaultSwatches)) this.defaultSwatches = o.defaultSwatches.toArray(",").map(function (el){return el.toUpperCase();});
            if (Utils.isValue(o.showValues)) this.showValues = o.showValues.toArray(",");
            if (Utils.isValue(o.userColors)) this.userColors = o.userColors.toArray(",").map(function (el){return el.toUpperCase();});
            if (Utils.isValue(o.showAsString)) this.showAsString = o.showAsString.toArray(",");

            this._createStructure();
            this._createEvents();

            this._fireEvent('color-selector-create');
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            var colorBox, row, swatches, map, value, inputs, radios, userColors,
                userColorsActions, hueCanvas, shadeCanvas, hueCursor, shadeCursor,
                colorBlock, alphaCanvas, alphaCursor;

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
            map.append( shadeCursor = $("<button>").attr("type", "button").addClass("cursor color-cursor") )
            map.append( shadeCanvas = $("<canvas>").addClass("color-canvas") )

            row.append( map = $("<div>").addClass("hue-map") );
            map.append( hueCursor = $("<button>").attr("type", "button").addClass("cursor hue-cursor") )
            map.append( hueCanvas = $("<canvas>").addClass("hue-canvas") )

            row.append( map = $("<div>").addClass("alpha-map") );
            map.append( alphaCursor = $("<button>").attr("type", "button").addClass("cursor alpha-cursor") )
            map.append( alphaCanvas = $("<canvas>").addClass("alpha-canvas") )

            colorBox.append( row = $("<div>").addClass("row color-values-block") );

            row.append( value = $("<div>").addClass("color-value-hex") );
            value.append( $("<input type='radio' name='returnType' value='hex' checked>").addClass("check-color-value-hex") );
            value.append( colorBlock = $("<div>").addClass("color-block as-string") );
            colorBlock.append( $("<input type='text' data-prepend='HEX:' readonly>").addClass("input-small value-hex") );

            row.append( value = $("<div>").addClass("color-value-rgb") );
            value.append( $("<input type='radio' name='returnType' value='rgb'>").addClass("check-color-value-rgb") );
            value.append( colorBlock = $("<div>").addClass("color-block") );
            colorBlock.append( $("<input type='text' data-prepend='R:' readonly>").addClass("input-small value-r") );
            colorBlock.append( $("<input type='text' data-prepend='G:' readonly>").addClass("input-small value-g") );
            colorBlock.append( $("<input type='text' data-prepend='B:' readonly>").addClass("input-small value-b") );
            value.append( colorBlock = $("<div>").addClass("color-block as-string") );
            colorBlock.append( $("<input type='text' data-prepend='RGB:' readonly>").addClass("input-small value-rgb") );

            if (this.showAsString.indexOf("rgb") > -1) {
                value.find(".value-r,.value-g,.value-b").parent().hide();
            } else {
                value.find(".value-rgb").parent().hide();
            }

            row.append( value = $("<div>").addClass("color-value-rgba") );
            value.append( $("<input type='radio' name='returnType' value='rgba'>").addClass("check-color-value-rgba") );
            value.append( colorBlock = $("<div>").addClass("color-block") );
            colorBlock.append( $("<input type='text' data-prepend='R:' readonly>").addClass("input-small value-r") );
            colorBlock.append( $("<input type='text' data-prepend='G:' readonly>").addClass("input-small value-g") );
            colorBlock.append( $("<input type='text' data-prepend='B:' readonly>").addClass("input-small value-b") );
            colorBlock.append( $("<input type='text' data-prepend='A:' readonly>").addClass("input-small value-a") );
            value.append( colorBlock = $("<div>").addClass("color-block as-string") );
            colorBlock.append( $("<input type='text' data-prepend='RGBA:' readonly>").addClass("input-small value-rgba") );

            if (this.showAsString.indexOf("rgba") > -1) {
                value.find(".value-r,.value-g,.value-b,.value-a").parent().hide();
            } else {
                value.find(".value-rgba").parent().hide();
            }

            row.append( value = $("<div>").addClass("color-value-hsl") );
            value.append( $("<input type='radio' name='returnType' value='hsl'>").addClass("check-color-value-hsl") );
            value.append( colorBlock = $("<div>").addClass("color-block") );
            colorBlock.append( $("<input type='text' data-prepend='H:' readonly>").addClass("input-small value-h") );
            colorBlock.append( $("<input type='text' data-prepend='S:' readonly>").addClass("input-small value-s") );
            colorBlock.append( $("<input type='text' data-prepend='L:' readonly>").addClass("input-small value-l") );
            value.append( colorBlock = $("<div>").addClass("color-block as-string") );
            colorBlock.append( $("<input type='text' data-prepend='HSL:' readonly>").addClass("input-small value-hsl") );

            if (this.showAsString.indexOf("hsl") > -1) {
                value.find(".value-h,.value-s,.value-l").parent().hide();
            } else {
                value.find(".value-hsl").parent().hide();
            }

            row.append( value = $("<div>").addClass("color-value-hsla") );
            value.append( $("<input type='radio' name='returnType' value='hsla'>").addClass("check-color-value-hsla") );
            value.append( colorBlock = $("<div>").addClass("color-block") );
            colorBlock.append( $("<input type='text' data-prepend='H:' readonly>").addClass("input-small value-h") );
            colorBlock.append( $("<input type='text' data-prepend='S:' readonly>").addClass("input-small value-s") );
            colorBlock.append( $("<input type='text' data-prepend='L:' readonly>").addClass("input-small value-l") );
            colorBlock.append( $("<input type='text' data-prepend='A:' readonly>").addClass("input-small value-a") );
            value.append( colorBlock = $("<div>").addClass("color-block as-string") );
            colorBlock.append( $("<input type='text' data-prepend='HSLA:' readonly>").addClass("input-small value-hsla") );

            if (this.showAsString.indexOf("hsla") > -1) {
                value.find(".value-h,.value-s,.value-l,.value-a").parent().hide();
            } else {
                value.find(".value-hsla").parent().hide();
            }

            row.append( value = $("<div>").addClass("color-value-hsv") );
            value.append( $("<input type='radio' name='returnType' value='hsv'>").addClass("check-color-value-hsl") );
            value.append( colorBlock = $("<div>").addClass("color-block") );
            colorBlock.append( $("<input type='text' data-prepend='H:' readonly>").addClass("input-small value-h") );
            colorBlock.append( $("<input type='text' data-prepend='S:' readonly>").addClass("input-small value-s") );
            colorBlock.append( $("<input type='text' data-prepend='V:' readonly>").addClass("input-small value-v") );
            value.append( colorBlock = $("<div>").addClass("color-block as-string") );
            colorBlock.append( $("<input type='text' data-prepend='HSV:' readonly>").addClass("input-small value-hsv") );

            if (this.showAsString.indexOf("hsv") > -1) {
                value.find(".value-h,.value-s,.value-v").parent().hide();
            } else {
                value.find(".value-hsv").parent().hide();
            }

            row.append( value = $("<div>").addClass("color-value-cmyk") );
            value.append( $("<input type='radio' name='returnType' value='cmyk'>").addClass("check-color-value-cmyk") );
            value.append( colorBlock = $("<div>").addClass("color-block") );
            colorBlock.append( $("<input type='text' data-prepend='C:' readonly>").addClass("input-small value-c") );
            colorBlock.append( $("<input type='text' data-prepend='M:' readonly>").addClass("input-small value-m") );
            colorBlock.append( $("<input type='text' data-prepend='Y:' readonly>").addClass("input-small value-y") );
            colorBlock.append( $("<input type='text' data-prepend='K:' readonly>").addClass("input-small value-k") );
            value.append( colorBlock = $("<div>").addClass("color-block as-string") );
            colorBlock.append( $("<input type='text' data-prepend='CMYK:' readonly>").addClass("input-small value-cmyk") );

            if (this.showAsString.indexOf("cmyk") > -1) {
                value.find(".value-s,.value-m,.value-y,.value-k").parent().hide();
            } else {
                value.find(".value-cmyk").parent().hide();
            }

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

            $.each(supportedColorTypes.toArray(","), function(){
                if (that.showValues.indexOf(this) === -1) element.find(".color-value-"+this).hide();
            });

            if (!o.showUserColors) {
                element.find(".user-colors-container").hide();
            }

            if (!o.showAlphaChannel) {
                element.addClass("no-alpha-channel");
                $.each(["rgba", "hsla"], function(){
                    element.find(".color-value-"+this).hide();
                });
            }

            this._fillUserColors();

            this.hueCanvas = hueCanvas;
            this.hueCursor = hueCursor;
            this.shadeCanvas = shadeCanvas;
            this.shadeCursor = shadeCursor;
            this.alphaCanvas = alphaCanvas;
            this.alphaCursor = alphaCursor;

            this._createShadeCanvas();
            this._createHueCanvas();
            this._createAlphaCanvas();
            this._setColorValues();
            this._updateCursorsColor();

            if (o.initColor && Metro.colors.isColor(o.initColor)) {
                this._colorToPos(o.initColor);
            }
        },

        _createShadeCanvas: function(color){
            var canvas = this.shadeCanvas[0];
            var ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if(!color) color = '#f00';

            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = hueGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        _createAlphaCanvas: function(){
            var canvas = this.alphaCanvas[0];
            var ctx = canvas.getContext('2d');
            var alphaGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            var startColor = new Metro.colorPrimitive.HSLA(this.hue, 1, .5, 1).toString(), endColor = "rgba(0,0,0,0)";

            alphaGradient.addColorStop(0.00, startColor);
            alphaGradient.addColorStop(1.00, endColor);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = alphaGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        _updateHueCursor: function(y){
            this.hueCursor.css({
                "top": y
            });
        },

        _updateAlphaCursor: function(y){
            this.alphaCursor.css({
                "top": y
            });
        },

        _getHueColor: function(pageY){
            var canvas = this.hueCanvas;
            var offset = canvas.offset();
            var height = canvas.height();
            var y, percent, color, hue;

            y = pageY - offset.top;

            if ( y > height ) y = height;
            if ( y < 0 ) y = 0;

            percent = y / height;
            hue = 360 - (360 * percent);
            if (hue === 360) hue = 0;
            color = "hsl("+ hue +", 100%, 50%)";
            this.hue = hue;

            this._createShadeCanvas(color);
            this._createAlphaCanvas();
            this._updateHueCursor(y);
            this._updateCursorsColor();
            this._setColorValues();
        },

        _getAlphaValue: function(pageY){
            var canvas = this.alphaCanvas;
            var offset = canvas.offset();
            var height = canvas.height();
            var y, percent;

            y = pageY - offset.top;

            if ( y > height ) y = height;
            if ( y < 0 ) y = 0;

            percent = 1 - y / height;
            this.alpha = percent.toFixed(2);

            this._updateAlphaCursor(y);
            this._updateCursorsColor();
            this._setColorValues();
        },

        _getShadeColor: function(pageX, pageY){
            var canvas = this.shadeCanvas;
            var offset = canvas.offset();
            var width = canvas.width();
            var height = canvas.height();
            var x = pageX - offset.left;
            var y = pageY - offset.top;

            if(x > width) x = width;
            if(x < 0) x = 0;
            if(y > height) y = height;
            if(y < 0) y = .1;

            var xRatio = x / width * 100;
            var yRatio = y / height * 100;
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
            this.alphaCursor.css({backgroundColor: Metro.colors.toRGBA(new Metro.colorPrimitive.HSL(this.hue, 1, .5), this.alpha).toString()});
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
            this._createAlphaCanvas();
            this._setColorValues();
        },

        _setColorValues: function(){
            var element = this.element, o = this.options;
            var hsl = Metro.colors.toHSL(new Metro.colorPrimitive.HSL(this.hue, this.saturation, this.lightness));
            var hsla = Metro.colors.toHSLA(hsl, this.alpha);
            var rgb = Metro.colors.toRGB(hsl);
            var rgba = Metro.colors.toRGBA(rgb, this.alpha);
            var hsv = Metro.colors.toHSV(hsl);
            var cmyk = Metro.colors.toCMYK(hsl);
            var hex = Metro.colors.toHEX(hsl);
            var target = $(o.target);
            var controller = $(o.controller);
            var percent = o.hslMode === "percent";

            this.hsl = hsl;
            this.hsla = hsla;
            this.hsv = hsv;
            this.rgb = rgb;
            this.rgba = rgba;
            this.hex = hex;
            this.cmyk = cmyk;

            element.find(".color-value-hex .value-hex input").val(hex);

            element.find(".color-value-rgb .value-r input").val(rgb.r);
            element.find(".color-value-rgb .value-g input").val(rgb.g);
            element.find(".color-value-rgb .value-b input").val(rgb.b);
            element.find(".color-value-rgb .value-rgb input").val(rgb.toString());

            element.find(".color-value-rgba .value-r input").val(rgba.r);
            element.find(".color-value-rgba .value-g input").val(rgba.g);
            element.find(".color-value-rgba .value-b input").val(rgba.b);
            element.find(".color-value-rgba .value-a input").val(rgba.a);
            element.find(".color-value-rgba .value-rgba input").val(rgba.toString());

            element.find(".color-value-hsl .value-h input").val(hsl.h.toFixed(0));
            element.find(".color-value-hsl .value-s input").val(percent ? Math.round(hsl.s*100)+"%" : hsl.s.toFixed(4));
            element.find(".color-value-hsl .value-l input").val(percent ? Math.round(hsl.l*100)+"%" : hsl.l.toFixed(4));
            element.find(".color-value-hsl .value-hsl input").val(hsl.toString());

            element.find(".color-value-hsla .value-h input").val(hsla.h.toFixed(0));
            element.find(".color-value-hsla .value-s input").val(percent ? Math.round(hsla.s*100)+"%" : hsl.s.toFixed(4));
            element.find(".color-value-hsla .value-l input").val(percent ? Math.round(hsla.l*100)+"%" : hsl.l.toFixed(4));
            element.find(".color-value-hsla .value-a input").val(hsla.a);
            element.find(".color-value-hsla .value-hsla input").val(hsla.toString());

            element.find(".color-value-hsv .value-h input").val(hsv.h.toFixed(0));
            element.find(".color-value-hsv .value-s input").val(percent ? Math.round(hsv.s*100)+"%" : hsv.s.toFixed(4));
            element.find(".color-value-hsv .value-v input").val(percent ? Math.round(hsv.v*100)+"%" : hsv.v.toFixed(4));
            element.find(".color-value-hsv .value-hsv input").val(hsv.toString());

            element.find(".color-value-cmyk .value-c input").val(cmyk.c.toFixed(0));
            element.find(".color-value-cmyk .value-m input").val(cmyk.m.toFixed(0));
            element.find(".color-value-cmyk .value-y input").val(cmyk.y.toFixed(0));
            element.find(".color-value-cmyk .value-k input").val(cmyk.k.toFixed(0));
            element.find(".color-value-cmyk .value-cmyk input").val(cmyk.toString());

            element.find(".user-colors-actions .user-swatch").css({
                backgroundColor: hex
            });

            if (target && target.length) {
                target.css({
                    backgroundColor: hex
                });
            }

            if (controller && controller.length) {
                controller.val(this.val());
            }

            this._fireEvent("color", {
                hue: this.hue,
                saturation: this.saturation,
                lightness: this.lightness,
                color: this.val()
            });
        },

        _clearInputInterval: function(){
            clearInterval(this.inputInterval);
            this.inputInterval = false;
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            var hueMap = element.find(".hue-map");
            var alphaMap = element.find(".alpha-map");
            var shadeMap = element.find(".color-map");
            var controller = $(o.controller);

            if (controller && controller.length) {
                controller.on(Metro.events.inputchange, function(e){
                    that._clearInputInterval();
                    if (!that.inputInterval) that.inputInterval = setTimeout(function(){
                        var val = controller.val();
                        if (val && Metro.colors.isColor(val)) {
                            that.val(val);
                        }
                        that._clearInputInterval();
                    }, o.inputThreshold);
                });
            }

            alphaMap.on(Metro.events.startAll, function(e){

                that._getAlphaValue(Utils.pageXY(e).y);
                that.alphaCursor.addClass("dragging");

                $(document).on(Metro.events.moveAll, function(e){
                    e.preventDefault();
                    that._getAlphaValue(Utils.pageXY(e).y);
                }, {ns: that.id, passive: false});

                $(document).on(Metro.events.stopAll, function(){
                    that.alphaCursor.removeClass("dragging");
                    $(document).off(Metro.events.moveAll, {ns: that.id});
                    $(document).off(Metro.events.stopAll, {ns: that.id});
                }, {ns: that.id});

            });

            hueMap.on(Metro.events.startAll, function(e){

                that._getHueColor(Utils.pageXY(e).y);
                that.hueCursor.addClass("dragging");

                $(document).on(Metro.events.moveAll, function(e){
                    e.preventDefault();
                    that._getHueColor(Utils.pageXY(e).y);
                }, {ns: that.id, passive: false});

                $(document).on(Metro.events.stopAll, function(){
                    that.hueCursor.removeClass("dragging");
                    $(document).off(Metro.events.moveAll, {ns: that.id});
                    $(document).off(Metro.events.stopAll, {ns: that.id});
                }, {ns: that.id});

            });

            shadeMap.on(Metro.events.startAll, function(e){

                that._getShadeColor(Utils.pageXY(e).x, Utils.pageXY(e).y);
                that.shadeCursor.addClass("dragging");

                $(document).on(Metro.events.moveAll, function(e){
                    e.preventDefault();
                    that._getShadeColor(Utils.pageXY(e).x, Utils.pageXY(e).y);
                }, {ns: that.id, passive: false});

                $(document).on(Metro.events.stopAll, function(){
                    that.shadeCursor.removeClass("dragging");
                    $(document).off(Metro.events.moveAll, {ns: that.id});
                    $(document).off(Metro.events.stopAll, {ns: that.id});
                }, {ns: that.id})

            });

            element.on("click", ".swatch", function(e){
                that._colorToPos($(this).attr("data-color"));
                e.preventDefault();
                e.stopPropagation();
            });

            element.on("click", ".add-button", function(e){
                var color = Metro.colors.toHEX(new Metro.colorPrimitive.HSL(that.hue, that.saturation, that.lightness)).toUpperCase();

                if (that.userColors.indexOf(color) > -1) {
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
                );

                e.preventDefault();
                e.stopPropagation();
            });

            element.on("click", "input[type=radio]", function(e){
                o.returnValueType = $(this).val();
                e.stopPropagation();
            });
        },

        val: function(v){
            var o = this.options;

            if (!Utils.isValue(v) || !Metro.colors.isColor(v)) {
                var res;
                switch (o.returnValueType.toLowerCase()) {
                    case "rgb":
                        res = this.rgb;
                        break;
                    case "rgba":
                        res = this.rgba;
                        break;
                    case "hsl":
                        res = this.hsl;
                        break;
                    case "hsla":
                        res = this.hsla;
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
            if (!Utils.isValue(v)) {
                return this.userColors;
            }

            if (!Array.isArray(v) && typeof v !== "string") {
                return ;
            }

            if (typeof v === "string") {
                this.userColors = v.toArray(",").map(function (el){return el.toUpperCase();});
            } else {
                this.userColors = v.map(function (el){return el.toUpperCase();});
            }

            this._fillUserColors();
        },

        _fillUserColors: function(){
            var colors = this.element.find(".user-colors").clear();

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

        createMaterialPalette: function(color){
            if (arguments.length === 0) {
                color = this.val();
            }

            if (!Metro.colors.isColor(color)) {
                throw new Error("The initial value is not a color value");
            }

            return Metro.colors.materialPalette(Metro.colors.toHEX(color))
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
