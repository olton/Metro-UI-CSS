/* global Metro, Utils */
/* eslint-disable-next-line */
function RGB(r, g, b){
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
}

/* eslint-disable-next-line */
function RGBA(r, g, b, a){
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
    this.a = a || 1;
}

/* eslint-disable-next-line */
function HSV(h, s, v){
    this.h = h || 0;
    this.s = s || 0;
    this.v = v || 0;
}

/* eslint-disable-next-line */
function HSL(h, s, l){
    this.h = h || 0;
    this.s = s || 0;
    this.l = l || 0;
}

/* eslint-disable-next-line */
function HSLA(h, s, l, a){
    this.h = h || 0;
    this.s = s || 0;
    this.l = l || 0;
    this.a = a || 1;
}

/* eslint-disable-next-line */
function CMYK(c, m, y, k){
    this.c = c || 0;
    this.m = m || 0;
    this.y = y || 0;
    this.k = k || 0;
}

var Colors = {

    TYPES: {
        HEX: "hex",
        RGB: "rgb",
        RGBA: "rgba",
        HSV: "hsv",
        HSL: "hsl",
        CMYK: "cmyk",
        UNKNOWN: "unknown"
    },

    PALETTES: {
        ALL: "colorList",
        METRO: "colorListMetro",
        STANDARD: "colorListStandard"
    },

    colorListMetro: {
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

    colorListStandard: {
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

    colorList: {},

    options: {
        angle: 30,
        algorithm: 1,
        step: 0.1,
        distance: 5,
        tint1: 0.8,
        tint2: 0.4,
        shade1: 0.6,
        shade2: 0.3,
        alpha: 1
    },

    init: function(){
        this.colorList = $.extend( {}, this.colorListStandard, this.colorListMetro );
        return this;
    },

    setup: function(options){
        this.options = $.extend( {}, this.options, options );
    },

    color: function(name, palette){
        palette = palette || this.PALETTES.ALL;
        return this[palette][name] !== undefined ? this[palette][name] : false;
    },

    palette: function(palette){
        palette = palette || this.PALETTES.ALL;
        return Object.keys(this[palette]);
    },

    colors: function(palette){
        var c = [];
        palette = palette || this.PALETTES.ALL;
        $.each(this[palette], function(){
            c.push(this);
        });
        return c;
    },

    hex2rgb: function(hex){
        var regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace( regex, function( m, r, g, b ) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
        return result ? {
            r: parseInt( result[1], 16 ),
            g: parseInt( result[2], 16 ),
            b: parseInt( result[3], 16 )
        } : null;
    },

    rgb2hex: function(rgb){
        return "#" +
            (( 1 << 24 ) + ( rgb.r << 16 ) + ( rgb.g << 8 ) + rgb.b )
                .toString( 16 ).slice( 1 );
    },

    rgb2hsv: function(rgb){
        var hsv = new HSV();
        var h, s, v;
        var r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
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
            h = 60 * ( (g - b) / delta );
        } else if (max === r && g < b) {
            h = 60 * ( (g - b) / delta) + 360;
        } else if (max === g) {
            h = 60 * ( (b - r) / delta) + 120;
        } else if (max === b) {
            h = 60 * ( (r - g) / delta) + 240;
        } else {
            h = 0;
        }

        hsv.h = h;
        hsv.s = s;
        hsv.v = v;

        return hsv;
    },

    hsv2rgb: function(hsv){
        var r, g, b;
        var h = hsv.h, s = hsv.s * 100, v = hsv.v * 100;
        var Hi = Math.floor(h / 60);
        var Vmin = (100 - s) * v / 100;
        var alpha = (v - Vmin) * ( (h % 60) / 60 );
        var Vinc = Vmin + alpha;
        var Vdec = v - alpha;

        switch (Hi) {
            case 0: r = v; g = Vinc; b = Vmin; break;
            case 1: r = Vdec; g = v; b = Vmin; break;
            case 2: r = Vmin; g = v; b = Vinc; break;
            case 3: r = Vmin; g = Vdec; b = v; break;
            case 4: r = Vinc; g = Vmin; b = v; break;
            case 5: r = v; g = Vmin; b = Vdec; break;
        }

        return {
            r: Math.round(r * 255 / 100),
            g: Math.round(g * 255 / 100),
            b: Math.round(b * 255 / 100)
        };
    },

    hsv2hex: function(hsv){
        return this.rgb2hex(this.hsv2rgb(hsv));
    },

    hex2hsv: function(hex){
        return this.rgb2hsv(this.hex2rgb(hex));
    },

    rgb2cmyk: function(rgb){
        var cmyk = new CMYK();

        var r = rgb.r / 255;
        var g = rgb.g / 255;
        var b = rgb.b / 255;

        cmyk.k = Math.min( 1 - r, 1 - g, 1 - b );
        cmyk.c = ( 1 - r - cmyk.k ) / ( 1 - cmyk.k );
        cmyk.m = ( 1 - g - cmyk.k ) / ( 1 - cmyk.k );
        cmyk.y = ( 1 - b - cmyk.k ) / ( 1 - cmyk.k );

        cmyk.c = Math.round( cmyk.c * 100 );
        cmyk.m = Math.round( cmyk.m * 100 );
        cmyk.y = Math.round( cmyk.y * 100 );
        cmyk.k = Math.round( cmyk.k * 100 );

        return cmyk;
    },

    cmyk2rgb: function(cmyk){
        var rgb = new RGB();

        var c = cmyk.c / 100;
        var m = cmyk.m / 100;
        var y = cmyk.y / 100;
        var k = cmyk.k / 100;

        rgb.r = 1 - Math.min( 1, c * ( 1 - k ) + k );
        rgb.g = 1 - Math.min( 1, m * ( 1 - k ) + k );
        rgb.b = 1 - Math.min( 1, y * ( 1 - k ) + k );

        rgb.r = Math.round( rgb.r * 255 );
        rgb.g = Math.round( rgb.g * 255 );
        rgb.b = Math.round( rgb.b * 255 );

        return rgb;
    },

    hsv2hsl: function(hsv){
        var h, s, l;
        h = hsv.h;
        l = (2 - hsv.s) * hsv.v;
        s = hsv.s * hsv.v;
        s /= (l <= 1) ? l : 2 - l;
        l /= 2;
        return {h: h, s: s, l: l};
    },

    hsl2hsv: function(hsl){
        var h, s, v, l;
        h = hsl.h;
        l = hsl.l * 2;
        s = hsl.s * (l <= 1 ? l : 2 - l);
        v = (l + s) / 2;
        s = (2 * s) / (l + s);
        return {h: h, s: s, l: v};
    },

    rgb2websafe: function(rgb){
        return {
            r: Math.round(rgb.r / 51) * 51,
            g: Math.round(rgb.g / 51) * 51,
            b: Math.round(rgb.b / 51) * 51
        };
    },

    rgba2websafe: function(rgba){
        return {
            r: Math.round(rgba.r / 51) * 51,
            g: Math.round(rgba.g / 51) * 51,
            b: Math.round(rgba.b / 51) * 51,
            a: rgba.a
        };
    },

    hex2websafe: function(hex){
        return this.rgb2hex(this.rgb2websafe(this.toRGB(hex)));
    },

    hsv2websafe: function(hsv){
        return this.rgb2hsv(this.rgb2websafe(this.toRGB(hsv)));
    },

    hsl2websafe: function(hsl){
        return this.hsv2hsl(this.rgb2hsv(this.rgb2websafe(this.toRGB(hsl))));
    },

    cmyk2websafe: function(cmyk){
        return this.rgb2cmyk(this.rgb2websafe(this.cmyk2rgb(cmyk)));
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

    is: function(color){
        if (this.isHEX(color)) return this.TYPES.HEX;
        if (this.isRGB(color)) return this.TYPES.RGB;
        if (this.isRGBA(color)) return this.TYPES.RGBA;
        if (this.isHSV(color)) return this.TYPES.HSV;
        if (this.isHSL(color)) return this.TYPES.HSL;
        if (this.isCMYK(color)) return this.TYPES.CMYK;

        return this.TYPES.UNKNOWN;
    },

    toRGB: function(color){
        if (this.isHSV(color)) return this.hsv2rgb(color);
        if (this.isHSL(color)) return this.hsv2rgb(this.hsl2hsv(color));
        if (this.isRGB(color)) return color;
        if (this.isHEX(color)) return this.hex2rgb(color);
        if (this.isCMYK(color)) return this.cmyk2rgb(color);

        throw new Error("Unknown color format!");
    },

    toRGBA: function(color, alpha){
        var result = this.toRGB(color);
        result.a = alpha || 1;
        return result;
    },

    toHSV: function(color){
        return this.rgb2hsv(this.toRGB(color));
    },

    toHSL: function(color){
        return this.hsv2hsl(this.rgb2hsv(this.toRGB(color)));
    },

    toHSLA: function(color, alpha){
        var hsla;
        hsla = this.hsv2hsl(this.rgb2hsv(this.toRGB(color)));
        hsla.a = alpha || this.options.alpha;
        return hsla;
    },

    toHEX: function(color){
        return this.rgb2hex(this.toRGB(color));
    },

    toCMYK: function(color){
        return this.rgb2cmyk(this.toRGB(color));
    },

    toHexString: function(color){
        return this.toHEX(color);
    },

    toHsvString: function(color){
        var hsv = this.toHSV(color);
        return "hsv("+[hsv.h, hsv.s, hsv.v].join(",")+")";
    },

    toHslString: function(color){
        var hsl = this.toHSL(color);
        return "hsl("+[Math.round(hsl.h), Math.round(hsl.s * 100) + "%" , Math.round(hsl.l * 100) + "%"].join(",")+")";
    },

    toHslaString: function(color){
        var hsl = this.toHSLA(color);
        return "hsl("+[Math.round(hsl.h), Math.round(hsl.s * 100) + "%" , Math.round(hsl.l * 100) + "%", hsl.a].join(",")+")";
    },

    toCmykString: function(color){
        var cmyk = this.toCMYK(color);
        return "cmyk("+[cmyk.c, cmyk.m, cmyk.y, cmyk.k].join(",")+")";
    },

    toRgbString: function(color){
        var rgb = this.toRGB(color);
        return "rgb("+[rgb.r, rgb.g, rgb.b].join(",")+")";
    },

    toRgbaString: function(color){
        var rgb = this.toRGBA(color);
        return "rgba("+[rgb.r, rgb.g, rgb.b, rgb.a].join(",")+")";
    },

    toString: function(color){
        if (this.isHEX(color)) return this.toHexString(color);
        if (this.isRGB(color)) return this.toRgbString(color);
        if (this.isRGBA(color)) return this.toRgbaString(color);
        if (this.isHSV(color)) return this.toHsvString(color);
        if (this.isHSL(color)) return this.toHslString(color);
        if (this.isHSLA(color)) return this.toHslaString(color);
        if (this.isCMYK(color)) return this.toCmykString(color);

        throw new Error("Unknown color format!");
    },

    grayscale: function(color, output){
        output = output || "hex";
        var rgb = this.toRGB(color);
        var gray = Math.round(rgb.r * 0.2125 + rgb.g * 0.7154 + rgb.b * 0.0721);
        var mono = {
            r: gray,
            g: gray,
            b: gray
        };
        return this["rgb2"+output](mono);
    },

    darken: function(color, amount){
        if (amount === undefined) {
            amount = 10;
        }
        return this.lighten(color, -1 * Math.abs(amount));
    },

    lighten: function(color, amount){
        var type, res, alpha = 1, ring = amount > 0;

        var calc = function(_color, _amount){
            var col = _color.slice(1);

            var num = parseInt(col, 16);
            var r = (num >> 16) + _amount;

            if (r > 255) r = 255;
            else if  (r < 0) r = 0;

            var b = ((num >> 8) & 0x00FF) + _amount;

            if (b > 255) b = 255;
            else if  (b < 0) b = 0;

            var g = (num & 0x0000FF) + _amount;

            if (g > 255) g = 255;
            else if (g < 0) g = 0;

            res = "#" + (g | (b << 8) | (r << 16)).toString(16);
            return res;
        };

        if (amount === undefined) {
            amount = 10;
        }

        type = this.is(color);

        if (type === this.TYPES.RGBA) {
            alpha = color.a;
        }

        do {
            res = calc(this.toHEX(color), amount);
            /* jshint -W030 */
            ring ? amount-- : amount++;
        } while (res.length < 7);

        switch (type) {
            case "rgb": return this.toRGB(res);
            case "rgba": return this.toRGBA(res, alpha);
            case "hsv": return this.toHSV(res);
            case "hsl": return this.toHSL(res);
            case "cmyk": return this.toCMYK(res);
            default: return res;
        }
    },

    isDark: function(color){
        var rgb = this.toRGB(color);
        var YIQ = (
            ( rgb.r * 299 ) +
            ( rgb.g * 587 ) +
            ( rgb.b * 114 )
        ) / 1000;
        return ( YIQ < 128 );
    },

    isLight: function(hex){
        return !this.isDark(hex);
    },

    isHSV: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "v" in val;
    },

    isHSL: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "l" in val;
    },

    isHSLA: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "l" in val && "a" in val;
    },

    isRGB: function(val){
        return Utils.isObject(val) && "r" in val && "g" in val && "b" in val;
    },

    isRGBA: function(val){
        return Utils.isObject(val) && "r" in val && "g" in val && "b" in val && "a" in val;
    },

    isCMYK: function(val){
        return Utils.isObject(val) && "c" in val && "m" in val && "y" in val && "k" in val;
    },

    isHEX: function(val){
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },

    isColor: function(color){
        return this.isHEX(color) || this.isRGB(color) || this.isRGBA(color) || this.isHSV(color) || this.isHSL(color) || this.isCMYK(color);
    },

    hueShift: function(h, s){
        h+=s;
        while (h >= 360.0) h -= 360.0;
        while (h < 0.0) h += 360.0;
        return h;
    },

    getScheme: function(color, name, format, options){
        this.options = $.extend( {}, this.options, options );

        var i;
        var scheme = [];
        var hsv;
        var that = this;

        hsv = this.toHSV(color);

        if (this.isHSV(hsv) === false) {
            console.warn("The value is a not supported color format!");
            return false;
        }

        function convert(source, format) {
            var result = [];
            var o = that.options;
            switch (format) {
                case "hex": result = source.map(function(v){return Colors.toHEX(v);}); break;
                case "rgb": result = source.map(function(v){return Colors.toRGB(v);}); break;
                case "rgba": result = source.map(function(v){return Colors.toRGBA(v, o.alpha);}); break;
                case "hsl": result = source.map(function(v){return Colors.toHSL(v);}); break;
                case "cmyk": result = source.map(function(v){return Colors.toCMYK(v);}); break;
                default: result = source;
            }

            return result;
        }

        function clamp( num, min, max ){
            return Math.max( min, Math.min( num, max ));
        }

        function toRange(a, b, c){
            return a < b ? b : ( a > c ? c : a);
        }

        var rgb, h = hsv.h, s = hsv.s, v = hsv.v;
        var o = this.options;

        switch (name) {
            case "monochromatic":
            case "mono":
                if (o.algorithm === 1) {

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r + (255 - rgb.r) * o.tint1), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g + (255 - rgb.g) * o.tint1), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b + (255 - rgb.b) * o.tint1), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r + (255 - rgb.r) * o.tint2), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g + (255 - rgb.g) * o.tint2), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b + (255 - rgb.b) * o.tint2), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    scheme.push(hsv);

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r * o.shade1), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g * o.shade1), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b * o.shade1), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r * o.shade2), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g * o.shade2), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b * o.shade2), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));
                } else if (o.algorithm === 2) {
                    scheme.push(hsv);
                    for(i = 1; i <= o.distance; i++) {
                        v = clamp(v - o.step, 0, 1);
                        s = clamp(s - o.step, 0, 1);
                        scheme.push({h: h, s: s, v: v});
                    }
                } else if (o.algorithm === 3) {
                    scheme.push(hsv);
                    for(i = 1; i <= o.distance; i++) {
                        v = clamp(v - o.step, 0, 1);
                        scheme.push({h: h, s: s, v: v});
                    }
                } else {
                    v = clamp(hsv.v + o.step * 2, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    v = clamp(hsv.v + o.step, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    scheme.push(hsv); s = hsv.s; v = hsv.v;

                    v = clamp(hsv.v - o.step, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    v = clamp(hsv.v - o.step * 2, 0, 1);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'complementary':
            case 'complement':
            case 'comp':
                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0);
                scheme.push({h: h, s: s, v: v});
                break;

            case 'double-complementary':
            case 'double-complement':
            case 'double':
                scheme.push(hsv);

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(h, o.angle);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                break;

            case 'analogous':
            case 'analog':

                h = this.hueShift(h, o.angle);
                scheme.push({h: h, s: s, v: v});

                scheme.push(hsv);

                h = this.hueShift(hsv.h, 0.0 - o.angle);
                scheme.push({h: h, s: s, v: v});

                break;

            case 'triadic':
            case 'triad':
                scheme.push(hsv);
                for ( i = 1; i < 3; i++ ) {
                    h = this.hueShift(h, 120.0);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'tetradic':
            case 'tetra':
                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(hsv.h, -1 * o.angle);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                break;

            case 'square':
                scheme.push(hsv);
                for ( i = 1; i < 4; i++ ) {
                    h = this.hueShift(h, 90.0);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'split-complementary':
            case 'split-complement':
            case 'split':
                h = this.hueShift(h, 180.0 - o.angle);
                scheme.push({h: h, s: s, v: v});

                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0 + o.angle);
                scheme.push({h: h, s: s, v: v});
                break;

            default: console.warn("Unknown scheme name " + name);
        }

        return convert(scheme, format);
    }
};

Metro.colors = Colors.init();