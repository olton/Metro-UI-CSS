/* global Metro */
(function(Metro, $) {
    'use strict';
    var Types = {
        HEX: "hex",
        HEXA: "hexa",
        RGB: "rgb",
        RGBA: "rgba",
        HSV: "hsv",
        HSL: "hsl",
        HSLA: "hsla",
        CMYK: "cmyk",
        UNKNOWN: "unknown"
    };

    Metro.colorsSetup = function (options) {
        ColorsDefaultConfig = $.extend({}, ColorsDefaultConfig, options);
    };

    if (typeof window["metroColorsSetup"] !== undefined) {
        Metro.colorsSetup(window["metroColorsSetup"]);
    }

    var ColorsDefaultConfig = {
        angle: 30,
        resultType: 'hex',
        results: 6,
        baseLight: "#ffffff",
        baseDark: "self"
    };

    // function HEX(r, g, b) {
    //     this.r = r || "00";
    //     this.g = g || "00";
    //     this.b = b || "00";
    // }
    //
    // HEX.prototype.toString = function(){
    //     return "#" + [this.r, this.g, this.b].join("");
    // }

    // function dec2hex(d){
    //     return Math.round(parseFloat(d) * 255).toString(16);
    // }
    //
    // function hex2dec(h){
    //     return (parseInt(h, 16) / 255);
    // }

    function shift(h, angle){
        h += angle;
        while (h >= 360.0) h -= 360.0;
        while (h < 0.0) h += 360.0;
        return h;
    }

    function clamp(val){
        return Math.min(1, Math.max(0, val));
    }

    function RGB(r, g, b){
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
    }

    RGB.prototype.toString = function(){
        return "rgb(" + [this.r, this.g, this.b].join(", ") + ")";
    }

    function RGBA(r, g, b, a){
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a === 0 ? 0 : a || 1;
    }

    RGBA.prototype.toString = function(){
        return "rgba(" + [this.r, this.g, this.b, parseFloat(this.a).toFixed(2)].join(", ") + ")";
    }

    function HSV(h, s, v){
        this.h = h || 0;
        this.s = s || 0;
        this.v = v || 0;
    }

    HSV.prototype.toString2 = function(){
        return "hsv(" + [this.h, this.s, this.v].join(", ") + ")";
    }

    HSV.prototype.toString = function(){
        return "hsv(" + [Math.round(this.h), Math.round(this.s*100)+"%", Math.round(this.v*100)+"%"].join(", ") + ")";
    }

    function HSL(h, s, l){
        this.h = h || 0;
        this.s = s || 0;
        this.l = l || 0;
    }

    HSL.prototype.toString2 = function(){
        return "hsl(" + [this.h, this.s, this.l].join(", ") + ")";
    }

    HSL.prototype.toString = function(){
        return "hsl(" + [Math.round(this.h), Math.round(this.s*100)+"%", Math.round(this.l*100)+"%"].join(", ") + ")";
    }

    function HSLA(h, s, l, a){
        this.h = h || 0;
        this.s = s || 0;
        this.l = l || 0;
        this.a = a === 0 ? 0 : a || 1;
    }

    HSLA.prototype.toString2 = function(){
        return "hsla(" + [this.h, this.s, this.l, this.a].join(", ") + ")";
    }

    HSLA.prototype.toString = function(){
        return "hsla(" + [Math.round(this.h), Math.round(this.s*100)+"%", Math.round(this.l*100)+"%", parseFloat(this.a).toFixed(2)].join(", ") + ")";
    }

    function CMYK(c, m, y, k){
        this.c = c || 0;
        this.m = m || 0;
        this.y = y || 0;
        this.k = k || 0;
    }

    CMYK.prototype.toString = function(){
        return "cmyk(" + [this.c, this.m, this.y, this.k].join(", ") + ")";
    }

    var Colors = {

        PALETTES: {
            ALL: "all",
            METRO: "metro",
            STANDARD: "standard"
        },

        metro: {
            lime: '#a4c400',
            green: '#60a917',
            emerald: '#008a00',
            blue: '#00AFF0',
            teal: '#00aba9',
            cyan: '#1ba1e2',
            cobalt: '#0050ef',
            indigo: '#6a00ff',
            violet: '#aa00ff',
            pink: '#dc4fad',
            magenta: '#d80073',
            crimson: '#a20025',
            red: '#CE352C',
            orange: '#fa6800',
            amber: '#f0a30a',
            yellow: '#fff000',
            brown: '#825a2c',
            olive: '#6d8764',
            steel: '#647687',
            mauve: '#76608a',
            taupe: '#87794e'
        },

        standard: {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#DCDCDC",
            ghostwhite: "#F8F8FF",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32dc32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370db",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdd5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#db7093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            rebeccapurple: "#663399",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            slyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        },

        all: {},

        init: function(){
            this.all = $.extend( {}, this.standard, this.metro );
            return this;
        },

        color: function(name, palette){
            palette = palette || this.PALETTES.ALL;
            return this[palette][name] !== undefined ? this[palette][name] : false;
        },

        palette: function(palette){
            palette = palette || this.PALETTES.ALL;
            return Object.keys(this[palette]);
        },

        expandHexColor: function(hex){
            if (typeof hex !== "string") {
                throw new Error("Value is not a string!");
            }
            if (hex[0] === "#" && hex.length === 4) {
                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                return (
                    "#" +
                    hex.replace(shorthandRegex, function(m, r, g, b) {
                        return r + r + g + g + b + b;
                    })
                );
            }
            return hex[0] === "#" ? hex : "#" + hex;
        },

        colors: function(palette){
            palette = palette || this.PALETTES.ALL;
            return Object.values(this[palette]);
        },

        random: function(colorType, alpha){
            colorType = colorType || Types.HEX;
            alpha = typeof alpha !== "undefined" ? alpha : 1;

            var hex, r, g, b;

            r = $.random(0, 255);
            g = $.random(0, 255);
            b = $.random(0, 255);

            hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

            return colorType === "hex" ? hex : this.toColor(hex, colorType, alpha);
        },

        parse: function(color){
            var _color = color.toLowerCase().trim();

            var a = _color
                .replace(/[^%\d.,]/g, "")
                .split(",")
                .map(function(v) {
                    if (v.indexOf('%') > -1) {
                        v = ""+parseInt(v)/100;
                    }
                    return v.indexOf(".") > -1 ? parseFloat(v) : parseInt(v);
                });

            if (this.metro[_color]) {
                return this.expandHexColor(this.metro[_color]);
            }

            if (this.standard[_color]) {
                return this.expandHexColor(this.standard[_color]);
            }

            if (_color[0] === "#") {
                return this.expandHexColor(_color);
            }

            if (_color.indexOf("rgba") === 0 && a.length === 4) {
                return new RGBA(a[0], a[1], a[2], a[3]);
            }
            if (_color.indexOf("rgb") === 0 && a.length === 3) {
                return new RGB(a[0], a[1], a[2]);
            }
            if (_color.indexOf("cmyk") === 0 && a.length === 4) {
                return new CMYK(a[0], a[1], a[2], a[3]);
            }
            if (_color.indexOf("hsv") === 0 && a.length === 3) {
                return new HSV(a[0], a[1], a[2]);
            }
            if (_color.indexOf("hsla") === 0 && a.length === 4) {
                return new HSLA(a[0], a[1], a[2], a[3]);
            }
            if (_color.indexOf("hsl")  === 0 && a.length === 3) {
                return new HSL(a[0], a[1], a[2]);
            }
            return undefined;
        },

        createColor: function(colorType, from){
            colorType = colorType || "hex";
            from = from || "#000000";

            var baseColor;

            if (typeof from === "string") {
                baseColor = this.parse(from);
            }

            if (!this.isColor(baseColor)) {
                baseColor = "#000000";
            }

            return this.toColor(baseColor, colorType.toLowerCase());
        },

        isDark: function(color){
            if (!this.isColor(color)) return;
            var rgb = this.toRGB(color);
            var YIQ = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
            return YIQ < 128;
        },

        isLight: function(color){
            return !this.isDark(color);
        },

        isHSV: function(color){
            return color instanceof HSV;
        },

        isHSL: function(color){
            return color instanceof HSL;
        },

        isHSLA: function(color){
            return color instanceof HSLA;
        },

        isRGB: function(color){
            return color instanceof RGB;
        },

        isRGBA: function(color){
            return color instanceof RGBA;
        },

        isCMYK: function(color){
            return color instanceof CMYK;
        },

        isHEX: function(color){
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
        },

        isColor: function(val){
            var color = typeof val === "string" ? this.parse(val) : val;

            return !color
                ? false
                : this.isHEX(color) ||
                  this.isRGB(color) ||
                  this.isRGBA(color) ||
                  this.isHSV(color) ||
                  this.isHSL(color) ||
                  this.isHSLA(color) ||
                  this.isCMYK(color);
        },

        check: function(color, type){
            var that = this, checkFor = typeof type === "string" ? [type] : type;
            var result = false;

            $.each(checkFor, function(){
                if (that["is"+this.toUpperCase()](color)) {
                    result = true;
                }
            });

            if (!result) {
                throw new Error("Value is not a " + type + " color type!");
            }
        },

        colorType: function(color){
            if (this.isHEX(color)) return Types.HEX;
            if (this.isRGB(color)) return Types.RGB;
            if (this.isRGBA(color)) return Types.RGBA;
            if (this.isHSV(color)) return Types.HSV;
            if (this.isHSL(color)) return Types.HSL;
            if (this.isHSLA(color)) return Types.HSLA;
            if (this.isCMYK(color)) return Types.CMYK;

            return Types.UNKNOWN;
        },

        equal: function(color1, color2){
            if (!this.isColor(color1) || !this.isColor(color2)) {
                return false;
            }

            return this.toHEX(color1) === this.toHEX(color2);
        },

        colorToString: function(color){
            return color.toString();
        },

        hex2rgb: function(color){
            if (typeof color !== "string") {
                throw new Error("Value is not a string!")
            }
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
                this.expandHexColor(color)
            );
            var rgb = [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16)
            ];
            return result ? new RGB(rgb[0], rgb[1], rgb[2]) : null;
        },

        rgb2hex: function(color){
            this.check(color, "rgb");
            return (
                "#" +
                ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1)
            );
        },

        rgb2hsv: function(color){
            this.check(color, "rgb");
            var hsv = new HSV();
            var h, s, v;
            var r = color.r / 255,
                g = color.g / 255,
                b = color.b / 255;

            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var delta = max - min;

            v = max;

            if (max === 0) {
                s = 0;
            } else {
                s = 1 - min / max;
            }

            if (max === min) {
                h = 0;
            } else if (max === r && g >= b) {
                h = 60 * ((g - b) / delta);
            } else if (max === r && g < b) {
                h = 60 * ((g - b) / delta) + 360;
            } else if (max === g) {
                h = 60 * ((b - r) / delta) + 120;
            } else if (max === b) {
                h = 60 * ((r - g) / delta) + 240;
            } else {
                h = 0;
            }

            hsv.h = h;
            hsv.s = s;
            hsv.v = v;

            return hsv;
        },

        hsv2rgb: function(color){
            this.check(color, "hsv");
            var r, g, b;
            var h = color.h,
                s = color.s * 100,
                v = color.v * 100;
            var Hi = Math.floor(h / 60);
            var Vmin = ((100 - s) * v) / 100;
            var alpha = (v - Vmin) * ((h % 60) / 60);
            var Vinc = Vmin + alpha;
            var Vdec = v - alpha;

            switch (Hi) {
                case 0:
                    r = v;
                    g = Vinc;
                    b = Vmin;
                    break;
                case 1:
                    r = Vdec;
                    g = v;
                    b = Vmin;
                    break;
                case 2:
                    r = Vmin;
                    g = v;
                    b = Vinc;
                    break;
                case 3:
                    r = Vmin;
                    g = Vdec;
                    b = v;
                    break;
                case 4:
                    r = Vinc;
                    g = Vmin;
                    b = v;
                    break;
                case 5:
                    r = v;
                    g = Vmin;
                    b = Vdec;
                    break;
            }

            return new RGB(
                Math.round((r * 255) / 100),
                Math.round((g * 255) / 100),
                Math.round((b * 255) / 100)
            );
        },

        hsv2hex: function(color){
            this.check(color, "hsv");
            return this.rgb2hex(this.hsv2rgb(color));
        },

        hex2hsv: function(color){
            this.check(color, "hex");
            return this.rgb2hsv(this.hex2rgb(color));
        },

        rgb2cmyk: function(color){
            this.check(color, "rgb");
            var cmyk = new CMYK();

            var r = color.r / 255;
            var g = color.g / 255;
            var b = color.b / 255;

            cmyk.k = Math.min(1 - r, 1 - g, 1 - b);

            cmyk.c = 1 - cmyk.k === 0 ? 0 : (1 - r - cmyk.k) / (1 - cmyk.k);
            cmyk.m = 1 - cmyk.k === 0 ? 0 : (1 - g - cmyk.k) / (1 - cmyk.k);
            cmyk.y = 1 - cmyk.k === 0 ? 0 : (1 - b - cmyk.k) / (1 - cmyk.k);

            cmyk.c = Math.round(cmyk.c * 100);
            cmyk.m = Math.round(cmyk.m * 100);
            cmyk.y = Math.round(cmyk.y * 100);
            cmyk.k = Math.round(cmyk.k * 100);

            return cmyk;
        },

        cmyk2rgb: function(color){
            this.check(color, "cmyk");
            var r = Math.floor(255 * (1 - color.c / 100) * (1 - color.k / 100));
            var g = Math.ceil(255 * (1 - color.m / 100) * (1 - color.k / 100));
            var b = Math.ceil(255 * (1 - color.y / 100) * (1 - color.k / 100));

            return new RGB(r, g, b);
        },

        hsv2hsl: function(color){
            this.check(color, "hsv");
            var h, s, l, d;
            h = color.h;
            l = (2 - color.s) * color.v;
            s = color.s * color.v;
            if (l === 0) {
                s = 0;
            } else {
                d = l <= 1 ? l : 2 - l;
                if (d === 0) {
                    s = 0;
                } else {
                    s /= d;
                }
            }
            l /= 2;
            return new HSL(h, s, l);
        },

        hsl2hsv: function(color){
            this.check(color, ["hsl", "hsla"]);
            var h, s, v, l;
            h = color.h;
            l = color.l * 2;
            s = color.s * (l <= 1 ? l : 2 - l);

            v = (l + s) / 2;

            if (l + s === 0) {
                s = 0;
            } else {
                s = (2 * s) / (l + s);
            }

            return new HSV(h, s, v);
        },

        rgb2websafe: function(color){
            this.check(color, "rgb");
            return new RGB(
                Math.round(color.r / 51) * 51,
                Math.round(color.g / 51) * 51,
                Math.round(color.b / 51) * 51
            );
        },

        rgba2websafe: function(color){
            this.check(color, "rgba");
            var rgbWebSafe = this.rgb2websafe(color);
            return new RGBA(rgbWebSafe.r, rgbWebSafe.g, rgbWebSafe.b, color.a);
        },

        hex2websafe: function(color){
            this.check(color, "hex");
            return this.rgb2hex(this.rgb2websafe(this.hex2rgb(color)));
        },

        hsv2websafe: function(color){
            this.check(color, "hsv");
            return this.rgb2hsv(this.rgb2websafe(this.toRGB(color)));
        },

        hsl2websafe: function(color){
           this.check(color, "hsl");
            return this.hsv2hsl(this.rgb2hsv(this.rgb2websafe(this.toRGB(color))));
        },

        cmyk2websafe: function(color){
            this.check(color, "cmyk");
            return this.rgb2cmyk(this.rgb2websafe(this.cmyk2rgb(color)));
        },

        websafe: function(color){
            if (this.isHEX(color)) return this.hex2websafe(color);
            if (this.isRGB(color)) return this.rgb2websafe(color);
            if (this.isRGBA(color)) return this.rgba2websafe(color);
            if (this.isHSV(color)) return this.hsv2websafe(color);
            if (this.isHSL(color)) return this.hsl2websafe(color);
            if (this.isCMYK(color)) return this.cmyk2websafe(color);

            return color;
        },

        toColor: function(color, type, alpha){
            var result;
            switch (type.toLowerCase()) {
                case "hex":
                    result = this.toHEX(color);
                    break;
                case "rgb":
                    result = this.toRGB(color);
                    break;
                case "rgba":
                    result = this.toRGBA(color, alpha);
                    break;
                case "hsl":
                    result = this.toHSL(color);
                    break;
                case "hsla":
                    result = this.toHSLA(color, alpha);
                    break;
                case "hsv":
                    result = this.toHSV(color);
                    break;
                case "cmyk":
                    result = this.toCMYK(color);
                    break;
                default:
                    result = color;
            }
            return result;
        },

        toHEX: function(val){
            var color = typeof val === "string" ? this.parse(val) : val;

            if (!color) {
                throw new Error("Unknown color format!");
            }

            return typeof color === "string"
                ? color
                : this.rgb2hex(this.toRGB(color));
        },

        toRGB: function(val){
            var color = typeof val === "string" ? this.parse(val) : val;

            if (this.isRGB(color)) return color;
            if (this.isRGBA(color)) return new RGB(color.r, color.g, color.b);
            if (this.isHSV(color)) return this.hsv2rgb(color);
            if (this.isHSL(color)) return this.hsv2rgb(this.hsl2hsv(color));
            if (this.isHSLA(color)) return this.hsv2rgb(this.hsl2hsv(color));
            if (this.isHEX(color)) return this.hex2rgb(color);
            if (this.isCMYK(color)) return this.cmyk2rgb(color);

            throw new Error("Unknown color format!");
        },

        toRGBA: function(color, alpha){
            if (this.isRGBA(color)) {
                if (alpha) {
                    color.a = alpha;
                }
                return color;
            }
            var rgb = this.toRGB(color);
            return new RGBA(rgb.r, rgb.g, rgb.b, alpha);
        },

        toHSV: function(color){
            return this.rgb2hsv(this.toRGB(color));
        },

        toHSL: function(color){
            return this.hsv2hsl(this.rgb2hsv(this.toRGB(color)));
        },

        toHSLA: function(color, alpha){
            if (this.isHSLA(color)) {
                if (alpha) {
                    color.a = alpha;
                }
                return color;
            }
            var hsla = this.hsv2hsl(this.rgb2hsv(this.toRGB(color)));
            hsla.a = alpha;
            return new HSLA(hsla.h, hsla.s, hsla.l, hsla.a);
        },

        toCMYK: function(color){
            return this.rgb2cmyk(this.toRGB(color));
        },

        grayscale: function(color){
            return this.desaturate(color, 100);
        },

        lighten: function(color, amount){
            var hsl, type, alpha;

            if (!this.isColor(color)) {
                throw new Error(color + " is not a valid color value!");
            }

            amount = (amount === 0) ? 0 : (amount || 10);
            hsl = this.toHSL(color);
            hsl.l += amount / 100;
            hsl.l = clamp(hsl.l);

            type = this.colorType(color).toLowerCase();

            if (type === Types.RGBA || type === Types.HSLA) {
                alpha = color.a;
            }

            return this.toColor(hsl, type, alpha);
        },

        darken: function(color, amount){
            return this.lighten(color, -amount);
        },

        spin: function(color, amount){
            var hsl, type, alpha, hue;

            if (!this.isColor(color)) {
                throw new Error(color + " is not a valid color value!");
            }

            hsl = this.toHSL(color);
            hue = (hsl.h + amount) % 360;
            hsl.h = hue < 0 ? 360 + hue : hue;

            type = this.colorType(color).toLowerCase();

            if (type === Types.RGBA || type === Types.HSLA) {
                alpha = color.a;
            }

            return this.toColor(hsl, type, alpha);
        },

        brighten: function(color, amount){
            var rgb, type, alpha;

            if (!this.isColor(color)) {
                throw new Error(color + " is not a valid color value!");
            }

            rgb = this.toRGB(color);
            rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * - (amount / 100))));
            rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * - (amount / 100))));
            rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * - (amount / 100))));

            type = this.colorType(color).toLowerCase();

            if (type === Types.RGBA || type === Types.HSLA) {
                alpha = color.a;
            }

            return this.toColor(rgb, type, alpha);
        },

        saturate: function(color, amount){
            var hsl, type, alpha;

            if (!this.isColor(color)) {
                throw new Error(color + " is not a valid color value!");
            }

            hsl = this.toHSL(color);
            hsl.s += amount / 100;
            hsl.s = clamp(hsl.s);

            type = this.colorType(color).toLowerCase();

            if (type === Types.RGBA || type === Types.HSLA) {
                alpha = color.a;
            }

            return this.toColor(hsl, type, alpha);
        },

        desaturate: function(color, amount){
            var hsl, type, alpha;

            if (!this.isColor(color)) {
                throw new Error(color + " is not a valid color value!");
            }

            hsl = this.toHSL(color);
            hsl.s -= amount / 100;
            hsl.s = clamp(hsl.s);

            type = this.colorType(color).toLowerCase();

            if (type === Types.RGBA || type === Types.HSLA) {
                alpha = color.a;
            }

            return this.toColor(hsl, type, alpha);
        },

        hueShift: function(color, hue, saturation, value){
            var hsv = this.toHSV(color);
            var type = this.colorType(color).toLowerCase();
            var h = hsv.h;
            var alpha;
            var _h = hue || 0;
            var _s = saturation || 0;
            var _v = value || 0;

            h += _h;
            while (h >= 360.0) h -= 360.0;
            while (h < 0.0) h += 360.0;
            hsv.h = h;

            hsv.s += _s;
            if (hsv.s > 1) {hsv.s = 1;}
            if (hsv.s < 0) {hsv.s = 0;}

            hsv.v += _v;
            if (hsv.v > 1) {hsv.v = 1;}
            if (hsv.v < 0) {hsv.v = 0;}

            if (type === Types.RGBA || type === Types.HSLA) {
                alpha = color.a;
            }

            return this.toColor(hsv, type, alpha);
        },

        shade: function(color, amount){
            if (!this.isColor(color)) {
                throw new Error(color + " is not a valid color value!");
            }

            amount /= 100;

            var type = this.colorType(color).toLowerCase();
            var rgb = this.toRGB(color);
            var t = amount < 0 ? 0 : 255;
            var p = amount < 0 ? amount * -1 : amount;
            var r, g, b, a;

            r = (Math.round((t - rgb.r) * p) + rgb.r);
            g = (Math.round((t - rgb.g) * p) + rgb.g);
            b = (Math.round((t - rgb.b) * p) + rgb.b);

            if (type === Types.RGBA || type === Types.HSLA) {
                a = color.a;
            }

            return this.toColor(new RGB(r, g, b), type, a);
        },

        mix: function(color1, color2, amount){

            amount = (amount === 0) ? 0 : (amount || 50);

            var rgb = new RGB(0,0,0);
            var rgb1 = this.toRGB(color1);
            var rgb2 = this.toRGB(color2);

            var p = amount / 100;

            rgb.r = Math.round(((rgb2.r - rgb1.r) * p) + rgb1.r);
            rgb.g = Math.round(((rgb2.g - rgb1.g) * p) + rgb1.g);
            rgb.b = Math.round(((rgb2.b - rgb1.b) * p) + rgb1.b);

            return this.toHEX(rgb);
        },

        multiply: function(color1, color2){
            var rgb1 = this.toRGB(color1);
            var rgb2 = this.toRGB(color2);
            var rgb = new RGB();

            rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
            rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
            rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);

            return this.toHEX(rgb);
        },

        materialPalette: function(color, options){
            var opt = $.extend({}, ColorsDefaultConfig, options);
            var baseLight = opt.baseLight;
            var baseDark = opt.baseDark === "self" || !opt.baseDark ? this.multiply(color, color) : opt.baseDark;

            return {
                "50": this.mix(baseLight, color, 10),
                "100": this.mix(baseLight, color, 30),
                "200": this.mix(baseLight, color, 50),
                "300": this.mix(baseLight, color, 70),
                "400": this.mix(baseLight, color, 85),
                "500": this.mix(baseLight, color, 100),
                "600": this.mix(baseDark, color, 92),
                "700": this.mix(baseDark, color, 83),
                "800": this.mix(baseDark, color, 74),
                "900": this.mix(baseDark, color, 65),

                "A100": this.lighten(this.saturate(this.mix(baseDark, color, 15), 80), 65),
                "A200": this.lighten(this.saturate(this.mix(baseDark, color, 15), 80), 55),
                "A400": this.lighten(this.saturate(this.mix(baseLight, color, 100), 55), 10),
                "A700": this.lighten(this.saturate(this.mix(baseDark, color, 83), 65), 10)
            };
        },

        monochromatic: function(color, options){
            var opt = $.extend({}, ColorsDefaultConfig, options);
            var returnAs = opt.resultType;
            var results = opt.results;
            var hsv = this.toHSV(color);
            var h = hsv.h,
                s = hsv.s,
                v = hsv.v;
            var result = [];
            var mod = 1 / results;
            var self = this;

            while (results--) {
                result.push(new HSV(h, s, v));
                v = (v + mod) % 1;
            }

            return result.map(function(el){
                return self["to"+returnAs.toUpperCase()](el);
            });
        },

        complementary: function(color, options){
            var opt = $.extend({}, ColorsDefaultConfig, options);
            var hsl = this.toHSL(color);
            var result;
            var self = this;

            var returnAs = opt.resultType;

            result = [
                hsl,
                new HSL(shift(hsl.h, 180), hsl.s, hsl.l)
            ];

            return result.map(function(el){
                return self["to"+returnAs.toUpperCase()](el);
            });
        },

        splitComplementary: function(color, options){
            var opt = $.extend({}, ColorsDefaultConfig, options);
            var hsl = this.toHSL(color);
            var h = hsl.h;
            var result, self = this;

            var returnAs = opt.resultType;
            var angle = opt.angle;

            result = [
                hsl,
                new HSL(shift(h, 180 - angle), hsl.s, hsl.l ),
                new HSL(shift(h, 180 + angle), hsl.s, hsl.l )
            ];

            return result.map(function(el){
                return self["to"+returnAs.toUpperCase()](el);
            });
        },

        doubleComplementary: function(color, options){
            var opt = $.extend({}, ColorsDefaultConfig, options);
            var returnAs = opt.resultType;
            var angle = opt.angle;
            var hsl = this.toHSL(color);
            var h = hsl.h;
            var result, self = this;

            result = [
                hsl,
                new HSL(shift(h, 180), hsl.s, hsl.l ),
                new HSL(shift(h, angle), hsl.s, hsl.l ),
                new HSL(shift(h, 180 + angle), hsl.s, hsl.l )
            ];

            return result.map(function(el){
                return self["to"+returnAs.toUpperCase()](el);
            });
        },

        square: function(color, options){
            var opt = $.extend({}, ColorsDefaultConfig, options);
            var returnAs = opt.resultType;
            var result = [], i;
            var hsl = this.toHSL(color);
            var h = hsl.h , self = this;

            result.push(hsl);

            for (i = 1; i < 4; i++) {
                h = shift(h, 90.0);
                result.push(new HSL(h, hsl.s, hsl.l));
            }

            return result.map(function(el){
                return self["to"+returnAs.toUpperCase()](el);
            });
        },

        tetradic: function(color, options){
            var opt = $.extend({}, ColorsDefaultConfig, options);
            var returnAs = opt.resultType;
            var angle = opt.angle;
            var result;
            var hsl = this.toHSL(color);
            var h = hsl.h;
            var self = this;

            result = [
                hsl,
                new HSL(shift(h, 180), hsl.s, hsl.l),
                new HSL(shift(h, 180 - angle), hsl.s, hsl.l),
                new HSL(shift(h, -angle), hsl.s, hsl.l)
            ];

            return result.map(function(el){
                return self["to"+returnAs.toUpperCase()](el);
            });
        },

        triadic: function(color, options){
            var opt = $.extend({}, ColorsDefaultConfig, options);
            var returnAs = opt.resultType;
            var result;
            var hsl = this.toHSL(color);
            var h = hsl.h;
            var self = this;

            result = [
                hsl,
                new HSL(shift(h,120), hsl.s, hsl.l),
                new HSL(shift(h,240), hsl.s, hsl.l)
            ];

            return result.map(function(el){
                return self["to"+returnAs.toUpperCase()](el);
            });
        },

        analogous: function(color, options){
            var opt = $.extend({}, ColorsDefaultConfig, options);
            var returnAs = opt.resultType;
            var angle = opt.angle;

            var hsl = this.toHSL(color);
            var result, self = this;

            result = [
                hsl,
                new HSL(shift(hsl.h, -angle), hsl.s, hsl.l),
                new HSL(shift(hsl.h, +angle), hsl.s, hsl.l)
            ];

            return result.map(function(el){
                return self["to"+returnAs.toUpperCase()](el);
            });
        },

        createScheme: function(color, name, options){
            switch (name.toLowerCase()) {
                case "analogous":
                case "analog": return this.analogous(color, options);

                case "triadic":
                case "triad": return this.triadic(color, options);

                case "tetradic":
                case "tetra": return this.tetradic(color, options);

                case "monochromatic":
                case "mono": return this.monochromatic(color, options);

                case "complementary":
                case "complement":
                case "comp": return this.complementary(color, options);

                case "double-complementary":
                case "double-complement":
                case "double": return this.doubleComplementary(color, options);

                case "split-complementary":
                case "split-complement":
                case "split": return this.splitComplementary(color, options);

                case "square": return this.square(color, options);
                case "material": return this.materialPalette(color, options);
            }
        },

        getScheme: function(){
            return this.createScheme.apply(this, arguments)
        },

        add: function(val1, val2, returnAs){
            var color1 = typeof val1 === "string" ? this.parse(val1) : val1;
            var color2 = typeof val2 === "string" ? this.parse(val2) : val2;
            var c1 = this.toRGBA(color1);
            var c2 = this.toRGBA(color2);
            var result = new RGBA();
            var to = (""+returnAs).toLowerCase() || "hex";

            result.r = Math.round((c1.r + c2.r) / 2);
            result.g = Math.round((c1.g + c2.g) / 2);
            result.b = Math.round((c1.b + c2.b) / 2);
            result.a = Math.round((c1.a + c2.a) / 2);

            return this["to"+to.toUpperCase()](result);
        }
    };

    var Color = function(color, options){
        this._setValue(color);
        this._setOptions(options);
    }

    Color.prototype = {
        _setValue: function(color){
            var _color;

            if (typeof color === "string") {
                _color = Colors.parse(color);
            } else {
                _color = color;
            }

            if (!Colors.isColor(_color)) {
                _color = "#000000";
            }

            this._value = _color;
            this._type = Colors.colorType(this._value);
        },

        _setOptions: function(options){
            options = typeof options === "object" ? options : {};
            this._options = $.extend({}, ColorsDefaultConfig, options);
        },

        getOptions: function(){
            return this._options;
        },

        setOptions: function(options){
            this._setOptions(options);
        },

        setValue: function(color){
            this._setValue(color);
        },

        getValue: function(){
            return this._value;
        },

        channel: function(ch, val){
            var currentType = this._type.toUpperCase();

            if (["red", "green", "blue"].indexOf(ch) > -1) {
                this.toRGB();
                this._value[ch[0]] = val;
                this["to"+currentType]();
            }
            if (ch === "alpha" && this._value.a) {
                this._value.a = val;
            }
            if (["hue", "saturation", "value"].indexOf(ch) > -1) {
                this.toHSV();
                this._value[ch[0]] = val;
                this["to"+currentType]();
            }
            if (["lightness"].indexOf(ch) > -1) {
                this.toHSL();
                this._value[ch[0]] = val;
                this["to"+currentType]();
            }
            if (["cyan", "magenta", "yellow", "black"].indexOf(ch) > -1) {
                this.toCMYK();
                this._value[ch[0]] = val;
                this["to"+currentType]();
            }

            return this;
        },

        channels: function(obj){
            var that = this;

            $.each(obj, function(key, val){
                that.channel(key, val);
            });

            return this;
        },

        toRGB: function() {
            this._value = Colors.toRGB(this._value);
            this._type = Types.RGB;
            return this;
        },

        rgb: function(){
            return this._value ? new Color(Colors.toRGB(this._value)) : undefined;
        },

        toRGBA: function(alpha) {
            if (Colors.isRGBA(this._value)) {
                if (alpha) {
                    this._value = Colors.toRGBA(this._value, alpha);
                }
            } else {
                this._value = Colors.toRGBA(this._value, alpha);
            }
            this._type = Types.RGBA;
            return this;
        },

        rgba: function(alpha) {
            return this._value ? new Color(Colors.toRGBA(this._value, alpha)) : undefined;
        },

        toHEX: function() {
            this._value = Colors.toHEX(this._value);
            this._type = Types.HEX;
            return this;
        },

        hex: function() {
            return this._value ? new Color(Colors.toHEX(this._value)) : undefined;
        },

        toHSV: function() {
            this._value = Colors.toHSV(this._value);
            this._type = Types.HSV;
            return this;
        },

        hsv: function() {
            return this._value ? new Color(Colors.toHSV(this._value)) : undefined;
        },

        toHSL: function() {
            this._value = Colors.toHSL(this._value);
            this._type = Types.HSL;
            return this;
        },

        hsl: function() {
            return this._value ? new Color(Colors.toHSL(this._value)) : undefined;
        },

        toHSLA: function(alpha) {
            if (Colors.isHSLA(this._value)) {
                if (alpha) {
                    this._value = Colors.toHSLA(this._value, alpha);
                }
            } else {
                this._value = Colors.toHSLA(this._value, alpha);
            }
            this._type = Types.HSLA;
            return this;
        },

        hsla: function(alpha) {
            return this._value ? new Color(Colors.toHSLA(this._value, alpha)) : undefined;
        },

        toCMYK: function() {
            this._value = Colors.toCMYK(this._value);
            this._type = Types.CMYK;
            return this;
        },

        cmyk: function() {
            return this._value ? new Color(Colors.toCMYK(this._value)) : undefined;
        },

        toWebsafe: function() {
            this._value = Colors.websafe(this._value);
            this._type = Colors.colorType(this._value);
            return this;
        },

        websafe: function() {
            return this._value ? new Color(Colors.websafe(this._value)) : undefined;
        },

        toString: function() {
            return this._value ? Colors.colorToString(this._value) : "undefined";
        },

        toDarken: function(amount) {
            this._value = Colors.darken(this._value, amount);
            return this;
        },

        darken: function(amount){
            return new Color(Colors.darken(this._value, amount));
        },

        toLighten: function(amount) {
            this._value = Colors.lighten(this._value, amount);
            return this;
        },

        lighten: function(amount){
            return new Color(Colors.lighten(this._value, amount))
        },

        isDark: function() {
            return this._value ? Colors.isDark(this._value) : undefined;
        },

        isLight: function() {
            return this._value ? Colors.isLight(this._value) : undefined;
        },

        toHueShift: function(hue, saturation, value) {
            this._value = Colors.hueShift(this._value, hue, saturation, value);
            return this;
        },

        hueShift: function (hue, saturation, value) {
            return new Color(Colors.hueShift(this._value, hue, saturation, value));
        },

        toGrayscale: function() {
            this._value = Colors.grayscale(this._value, this._type);
            return this;
        },

        grayscale: function(){
            return new Color(Colors.grayscale(this._value, this._type));
        },

        type: function() {
            return Colors.colorType(this._value);
        },

        createScheme: function(name, format, options) {
            return this._value
                ? Colors.createScheme(this._value, name, format, options)
                : undefined;
        },

        getScheme: function(){
            return this.createScheme.apply(this, arguments);
        },

        equal: function(color) {
            return Colors.equal(this._value, color);
        },

        toAdd: function(color){
            this._value = Colors.add(this._value, color, this._type);
            return this;
        },

        add: function(color){
            return new Color(Colors.add(this._value, color, this._type));
        }
    }

    Metro.colors = Colors.init();
    window.Color = Metro.Color = Color;
    window.ColorPrimitive = Metro.colorPrimitive = {
        RGB: RGB,
        RGBA: RGBA,
        HSV: HSV,
        HSL: HSL,
        HSLA: HSLA,
        CMYK: CMYK
    };

    if (window.METRO_GLOBAL_COMMON === true) {
        window.Colors = Metro.colors;
    }

}(Metro, m4q));