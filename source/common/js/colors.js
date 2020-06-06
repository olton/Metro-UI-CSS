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
        algorithm: 1,
        step: 0.1,
        distance: 5,
        tint1: 0.8,
        tint2: 0.4,
        shade1: 0.6,
        shade2: 0.3,
        alpha: 1
    };

    function RGB(r, g, b){
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
    }

    RGB.prototype.toString = function(){
        return "rgb(" + [this.r, this.g, this.b].join(",") + ")";
    }

    function RGBA(r, g, b, a){
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a || 1;
    }

    RGBA.prototype.toString = function(){
        return "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")";
    }

    function HSV(h, s, v){
        this.h = h || 0;
        this.s = s || 0;
        this.v = v || 0;
    }

    HSV.prototype.toString = function(){
        return "hsv(" + [this.h, this.s, this.v].join(",") + ")";
    }

    function HSL(h, s, l){
        this.h = h || 0;
        this.s = s || 0;
        this.l = l || 0;
    }

    HSL.prototype.toString = function(){
        return "hsl(" + [this.h, this.s, this.l].join(",") + ")";
    }

    function HSLA(h, s, l, a){
        this.h = h || 0;
        this.s = s || 0;
        this.l = l || 0;
        this.a = a || 1;
    }

    HSLA.prototype.toString = function(){
        return "hsla(" + [this.h, this.s, this.l, this.a].join(",") + ")";
    }

    function CMYK(c, m, y, k){
        this.c = c || 0;
        this.m = m || 0;
        this.y = y || 0;
        this.k = k || 0;
    }

    CMYK.prototype.toString = function(){
        return "cmyk(" + [this.c, this.m, this.y, this.k].join(",") + ")";
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
            aliceBlue: "#f0f8ff",
            antiqueWhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedAlmond: "#ffebcd",
            blue: "#0000ff",
            blueViolet: "#8a2be2",
            brown: "#a52a2a",
            burlyWood: "#deb887",
            cadetBlue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerBlue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkBlue: "#00008b",
            darkCyan: "#008b8b",
            darkGoldenRod: "#b8860b",
            darkGray: "#a9a9a9",
            darkGreen: "#006400",
            darkKhaki: "#bdb76b",
            darkMagenta: "#8b008b",
            darkOliveGreen: "#556b2f",
            darkOrange: "#ff8c00",
            darkOrchid: "#9932cc",
            darkRed: "#8b0000",
            darkSalmon: "#e9967a",
            darkSeaGreen: "#8fbc8f",
            darkSlateBlue: "#483d8b",
            darkSlateGray: "#2f4f4f",
            darkTurquoise: "#00ced1",
            darkViolet: "#9400d3",
            deepPink: "#ff1493",
            deepSkyBlue: "#00bfff",
            dimGray: "#696969",
            dodgerBlue: "#1e90ff",
            fireBrick: "#b22222",
            floralWhite: "#fffaf0",
            forestGreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#DCDCDC",
            ghostWhite: "#F8F8FF",
            gold: "#ffd700",
            goldenRod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenYellow: "#adff2f",
            honeyDew: "#f0fff0",
            hotPink: "#ff69b4",
            indianRed: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderBlush: "#fff0f5",
            lawnGreen: "#7cfc00",
            lemonChiffon: "#fffacd",
            lightBlue: "#add8e6",
            lightCoral: "#f08080",
            lightCyan: "#e0ffff",
            lightGoldenRodYellow: "#fafad2",
            lightGray: "#d3d3d3",
            lightGreen: "#90ee90",
            lightPink: "#ffb6c1",
            lightSalmon: "#ffa07a",
            lightSeaGreen: "#20b2aa",
            lightSkyBlue: "#87cefa",
            lightSlateGray: "#778899",
            lightSteelBlue: "#b0c4de",
            lightYellow: "#ffffe0",
            lime: "#00ff00",
            limeGreen: "#32dc32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumAquaMarine: "#66cdaa",
            mediumBlue: "#0000cd",
            mediumOrchid: "#ba55d3",
            mediumPurple: "#9370db",
            mediumSeaGreen: "#3cb371",
            mediumSlateBlue: "#7b68ee",
            mediumSpringGreen: "#00fa9a",
            mediumTurquoise: "#48d1cc",
            mediumVioletRed: "#c71585",
            midnightBlue: "#191970",
            mintCream: "#f5fffa",
            mistyRose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajoWhite: "#ffdead",
            navy: "#000080",
            oldLace: "#fdd5e6",
            olive: "#808000",
            oliveDrab: "#6b8e23",
            orange: "#ffa500",
            orangeRed: "#ff4500",
            orchid: "#da70d6",
            paleGoldenRod: "#eee8aa",
            paleGreen: "#98fb98",
            paleTurquoise: "#afeeee",
            paleVioletRed: "#db7093",
            papayaWhip: "#ffefd5",
            peachPuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderBlue: "#b0e0e6",
            purple: "#800080",
            rebeccaPurple: "#663399",
            red: "#ff0000",
            rosyBrown: "#bc8f8f",
            royalBlue: "#4169e1",
            saddleBrown: "#8b4513",
            salmon: "#fa8072",
            sandyBrown: "#f4a460",
            seaGreen: "#2e8b57",
            seaShell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            slyBlue: "#87ceeb",
            slateBlue: "#6a5acd",
            slateGray: "#708090",
            snow: "#fffafa",
            springGreen: "#00ff7f",
            steelBlue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whiteSmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowGreen: "#9acd32"
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
            var _color = color.toLowerCase();

            var a = _color
                .replace(/[^\d.,]/g, "")
                .split(",")
                .map(function(v) {
                    return _color.includes("hs") ? parseFloat(v) : parseInt(v);
                });

            if (_color[0] === "#") {
                return this.expandHexColor(_color);
            }

            if (_color.includes("rgba")) {
                return new RGBA(a[0], a[1], a[2], a[3]);
            }
            if (_color.includes("rgb")) {
                return new RGB(a[0], a[1], a[2]);
            }
            if (_color.includes("cmyk")) {
                return new CMYK(a[0], a[1], a[2], a[3]);
            }
            if (_color.includes("hsv")) {
                return new HSV(a[0], a[1], a[2]);
            }
            if (_color.includes("hsla")) {
                return new HSLA(a[0], a[1], a[2], a[3]);
            }
            if (_color.includes("hsl")) {
                return new HSL(a[0], a[1], a[2]);
            }
            return _color;
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

        isColor: function(color){
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
            if (!this["is"+type.toUpperCase()](color)) {
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
            this.check(color, "hsl");
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

        toHEX: function(color){
            return typeof color === "string"
                ? this.expandHexColor(color)
                : this.rgb2hex(this.toRGB(color));
        },

        toRGB: function(color){
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
            var rgb = this.toRGB(color);
            var type = this.colorType(color).toLowerCase();
            var gray = Math.round(rgb.r * 0.2125 + rgb.g * 0.7154 + rgb.b * 0.0721);
            var mono = new RGB(gray, gray, gray);

            return this.toColor(mono, type);
        },

        darken: function(color, amount){
            amount = typeof amount !== "undefined" ? amount : 10;
            return this.lighten(color, -1 * Math.abs(amount));
        },

        lighten: function(color, amount){
            var type, res, alpha, ring;

            var calc = function (_color, _amount) {
                var r, g, b;
                var col = _color.slice(1);

                var num = parseInt(col, 16);
                r = (num >> 16) + _amount;

                if (r > 255) r = 255;
                else if (r < 0) r = 0;

                b = ((num >> 8) & 0x00ff) + _amount;

                if (b > 255) b = 255;
                else if (b < 0) b = 0;

                g = (num & 0x0000ff) + _amount;

                if (g > 255) g = 255;
                else if (g < 0) g = 0;

                return "#" + (g | (b << 8) | (r << 16)).toString(16);
            };

            if (isNaN(amount)) amount = 10;

            ring = amount > 0;

            type = this.colorType(color).toLowerCase();

            if (type === Types.RGBA || type === Types.HSLA) {
                alpha = color.a;
            }

            do {
                res = calc(this.toHEX(color), amount);
                ring ? amount-- : amount++;
            } while (res.length < 7);

            return this.toColor(res, type, alpha);
        },

        hueShift: function(color, angle){
            var hsv = this.toHSV(color);
            var type = this.colorType(color).toLowerCase();
            var h = hsv.h;
            var alpha;

            h += angle;
            while (h >= 360.0) h -= 360.0;
            while (h < 0.0) h += 360.0;
            hsv.h = h;

            if (type === Types.RGBA || type === Types.HSLA) {
                alpha = color.a;
            }

            return this.toColor(hsv, type, alpha);
        },

        createScheme: function(color, name, format, options){
            var opt = $.extend({}, ColorsDefaultConfig, options);
            var i, scheme = [], hsv, rgb, h, s, v;
            var self = this;

            hsv = this.toHSV(color);
            h = hsv.h;
            s = hsv.s;
            v = hsv.v;

            if (this.isHSV(hsv) === false) {
                console.warn("The value is a not supported color format!");
                return false;
            }

            function convert(source, format) {
                var result;
                switch (format) {
                    case "hex":
                        result = source.map(function (v) {
                            return self.toHEX(v);
                        });
                        break;
                    case "rgb":
                        result = source.map(function (v) {
                            return self.toRGB(v);
                        });
                        break;
                    case "rgba":
                        result = source.map(function (v) {
                            return self.toRGBA(v, opt.alpha);
                        });
                        break;
                    case "hsl":
                        result = source.map(function (v) {
                            return self.toHSL(v);
                        });
                        break;
                    case "hsla":
                        result = source.map(function (v) {
                            return self.toHSLA(v, opt.alpha);
                        });
                        break;
                    case "cmyk":
                        result = source.map(function (v) {
                            return self.toCMYK(v);
                        });
                        break;
                    default:
                        result = source;
                }

                return result;
            }

            function clamp(num, min, max) {
                return Math.max(min, Math.min(num, max));
            }

            function toRange(a, b, c) {
                return a < b ? b : a > c ? c : a;
            }

            function shift(h, s) {
                h += s;
                while (h >= 360.0) h -= 360.0;
                while (h < 0.0) h += 360.0;
                return h;
            }

            switch (name) {
                case "monochromatic":
                case "mono":
                    if (opt.algorithm === 1) {
                        rgb = this.hsv2rgb(hsv);
                        rgb.r = toRange(
                            Math.round(rgb.r + (255 - rgb.r) * opt.tint1),
                            0,
                            255
                        );
                        rgb.g = toRange(
                            Math.round(rgb.g + (255 - rgb.g) * opt.tint1),
                            0,
                            255
                        );
                        rgb.b = toRange(
                            Math.round(rgb.b + (255 - rgb.b) * opt.tint1),
                            0,
                            255
                        );
                        scheme.push(this.rgb2hsv(rgb));

                        rgb = this.hsv2rgb(hsv);
                        rgb.r = toRange(
                            Math.round(rgb.r + (255 - rgb.r) * opt.tint2),
                            0,
                            255
                        );
                        rgb.g = toRange(
                            Math.round(rgb.g + (255 - rgb.g) * opt.tint2),
                            0,
                            255
                        );
                        rgb.b = toRange(
                            Math.round(rgb.b + (255 - rgb.b) * opt.tint2),
                            0,
                            255
                        );
                        scheme.push(this.rgb2hsv(rgb));

                        scheme.push(hsv);

                        rgb = this.hsv2rgb(hsv);
                        rgb.r = toRange(Math.round(rgb.r * opt.shade1), 0, 255);
                        rgb.g = toRange(Math.round(rgb.g * opt.shade1), 0, 255);
                        rgb.b = toRange(Math.round(rgb.b * opt.shade1), 0, 255);
                        scheme.push(this.rgb2hsv(rgb));

                        rgb = this.hsv2rgb(hsv);
                        rgb.r = toRange(Math.round(rgb.r * opt.shade2), 0, 255);
                        rgb.g = toRange(Math.round(rgb.g * opt.shade2), 0, 255);
                        rgb.b = toRange(Math.round(rgb.b * opt.shade2), 0, 255);
                        scheme.push(this.rgb2hsv(rgb));

                    } else if (opt.algorithm === 2) {

                        scheme.push(hsv);
                        for (i = 1; i <= opt.distance; i++) {
                            v = clamp(v - opt.step, 0, 1);
                            s = clamp(s - opt.step, 0, 1);
                            scheme.push(new HSV(h, s, v));
                        }

                    } else if (opt.algorithm === 3) {

                        scheme.push(hsv);
                        for (i = 1; i <= opt.distance; i++) {
                            v = clamp(v - opt.step, 0, 1);
                            scheme.push(new HSV(h, s, v));
                        }

                    } else {

                        v = clamp(hsv.v + opt.step * 2, 0, 1);
                        scheme.push(new HSV(h, s, v));

                        v = clamp(hsv.v + opt.step, 0, 1);
                        scheme.push(new HSV(h, s, v));

                        scheme.push(hsv);
                        s = hsv.s;
                        v = hsv.v;

                        v = clamp(hsv.v - opt.step, 0, 1);
                        scheme.push(new HSV(h, s, v));

                        v = clamp(hsv.v - opt.step * 2, 0, 1);
                        scheme.push(new HSV(h, s, v));

                    }
                    break;

                case "complementary":
                case "complement":
                case "comp":
                    scheme.push(hsv);

                    h = shift(hsv.h, 180.0);
                    scheme.push(new HSV(h, s, v));
                    break;

                case "double-complementary":
                case "double-complement":
                case "double":
                    scheme.push(hsv);

                    h = shift(h, 180.0);
                    scheme.push(new HSV(h, s, v));

                    h = shift(h, opt.angle);
                    scheme.push(new HSV(h, s, v));

                    h = shift(h, 180.0);
                    scheme.push(new HSV(h, s, v));

                    break;

                case "analogous":
                case "analog":
                    h = shift(h, opt.angle);
                    scheme.push(new HSV(h, s, v));

                    scheme.push(hsv);

                    h = shift(hsv.h, 0.0 - opt.angle);
                    scheme.push(new HSV(h, s, v));

                    break;

                case "triadic":
                case "triad":
                    scheme.push(hsv);
                    for (i = 1; i < 3; i++) {
                        h = shift(h, 120.0);
                        scheme.push(new HSV(h, s, v));
                    }
                    break;

                case "tetradic":
                case "tetra":
                    scheme.push(hsv);

                    h = shift(hsv.h, 180.0);
                    scheme.push(new HSV(h, s, v));

                    h = shift(hsv.h, -1 * opt.angle);
                    scheme.push(new HSV(h, s, v));

                    h = shift(h, 180.0);
                    scheme.push(new HSV(h, s, v));

                    break;

                case "square":
                    scheme.push(hsv);
                    for (i = 1; i < 4; i++) {
                        h = shift(h, 90.0);
                        scheme.push(new HSV(h, s, v));
                    }
                    break;

                case "split-complementary":
                case "split-complement":
                case "split":
                    h = shift(h, 180.0 - opt.angle);
                    scheme.push(new HSV(h, s, v));

                    scheme.push(hsv);

                    h = shift(hsv.h, 180.0 + opt.angle);
                    scheme.push(new HSV(h, s, v));
                    break;

                default:
                    console.warn("Unknown scheme name");
            }

            return convert(scheme, format);
        },

        getScheme: function(){
            return this.createScheme.apply(this, arguments)
        }
    };

    var ColorType = function(color, options){
        this._setValue(color);
        this._setOptions(options);
    }

    ColorType.prototype = {
        _setValue: function(color){
            if (typeof color === "string") {
                color = Colors.expandHexColor(Colors.parse(color));
            }
            if (!Colors.isColor(color)) {
                color = "#000000";
            }
            this._value = color;
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

        toRGB: function() {
            if (!this._value) {
                return;
            }
            this._value = Colors.toRGB(this._value);
            return this;
        },

        rgb: function(){
            return this._value ? Colors.toRGB(this._value) : undefined;
        },

        toRGBA: function(alpha) {
            if (!this._value) {
                return;
            }
            if (Colors.isRGBA(this._value)) {
                if (alpha) {
                    this._value = Colors.toRGBA(this._value, alpha);
                }
            } else {
                this._value = Colors.toRGBA(this._value, alpha);
            }
            return this;
        },

        rgba: function(alpha) {
            return this._value
                ? Colors.isRGBA(this._value)
                    ? this._value
                    : Colors.toRGBA(this._value, alpha)
                : undefined;
        },

        toHEX: function() {
            if (!this._value) {
                return;
            }
            this._value = Colors.toHEX(this._value);
            return this;
        },

        hex: function() {
            return this._value ? Colors.toHEX(this._value) : undefined;
        },

        toHSV: function() {
            if (!this._value) {
                return;
            }
            this._value = Colors.toHSV(this._value);
            return this;
        },

        hsv: function() {
            return this._value ? Colors.toHSV(this._value) : undefined;
        },

        toHSL: function() {
            if (!this._value) {
                return;
            }
            this._value = Colors.toHSL(this._value);
            return this;
        },

        hsl: function() {
            return this._value ? Colors.toHSL(this._value) : undefined;
        },

        toHSLA: function(alpha) {
            if (!this._value) {
                return;
            }
            if (Colors.isHSLA(this._value)) {
                if (alpha) {
                    this._value = Colors.toHSLA(this._value, alpha);
                }
            } else {
                this._value = Colors.toHSLA(this._value, alpha);
            }
            return this;
        },

        hsla: function(alpha) {
            return this._value
                ? Colors.isHSLA(this._value)
                    ? this._value
                    : Colors.toHSLA(this._value, alpha)
                : undefined;
        },

        toCMYK: function() {
            if (!this._value) {
                return;
            }
            this._value = Colors.toCMYK(this._value);
            return this;
        },

        cmyk: function() {
            return this._value ? Colors.toCMYK(this._value) : undefined;
        },

        toWebsafe: function() {
            if (!this._value) {
                return;
            }
            this._value = Colors.websafe(this._value);
            return this;
        },

        websafe: function() {
            return this._value ? Colors.websafe(this._value) : undefined;
        },

        toString: function() {
            return this._value ? Colors.colorToString(this._value) : undefined;
        },

        darken: function(amount) {
            amount = amount || 10;
            if (!this._value) {
                return;
            }
            this._value = Colors.darken(this._value, amount);
            return this;
        },

        lighten: function(amount) {
            amount = amount || 10;
            if (!this._value) {
                return;
            }
            this._value = Colors.lighten(this._value, amount);
            return this;
        },

        isDark: function() {
            return this._value ? Colors.isDark(this._value) : undefined;
        },

        isLight: function() {
            return this._value ? Colors.isLight(this._value) : undefined;
        },

        hueShift: function(angle) {
            if (!this._value) {
                return;
            }
            this._value = Colors.hueShift(this._value, angle);
            return this;
        },

        grayscale: function() {
            if (!this._value || this.type === Types.UNKNOWN) {
                return;
            }
            this._value = Colors.grayscale(
                this._value,
                ("" + this.type).toLowerCase()
            );
            return this;
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
        }
    }

    Metro.colors = Colors.init();
    window.Color = Metro.Color = ColorType;

    if (window.METRO_GLOBAL_COMMON === true) {
        window.Colors = Metro.colors;
    }

}(Metro, m4q));