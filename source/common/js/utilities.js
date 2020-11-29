/* global jQuery, Metro */
(function(Metro, $) {
    'use strict';
    Metro.utils = {
        isVisible: function(element){
            var el = $(element)[0];
            return this.getStyleOne(el, "display") !== "none"
                && this.getStyleOne(el, "visibility") !== "hidden"
                && el.offsetParent !== null;
        },

        isUrl: function (val) {
            /* eslint-disable-next-line */
            return /^(\.\/|\.\.\/|ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/.test(val);
        },

        isTag: function(val){
            /* eslint-disable-next-line */
            return /^<\/?[\w\s="/.':;#-\/\?]+>/gi.test(val);
        },

        isEmbedObject: function(val){
            var embed = ["iframe", "object", "embed", "video"];
            var result = false;
            $.each(embed, function(){
                if (typeof val === "string" && val.toLowerCase() === this) {
                    result = true;
                } else if (val.nodeType !== undefined && val.tagName.toLowerCase() === this) {
                    result = true;
                }
            });
            return result;
        },

        isVideoUrl: function(val){
            return /youtu\.be|youtube|twitch|vimeo/gi.test(val);
        },

        isDate: function(val, format){
            var result;

            if (this.isDateObject(val)) {
                return true;
            }

            if (this.isValue(format)) {
                result = String(val).toDate(format);
            } else {
                result = String(new Date(val));
            }

            return result !== "Invalid Date";
        },

        isDateObject: function(v){
            return typeof v === 'object' && v.getMonth !== undefined;
        },

        isInt: function(n){
            return !isNaN(n) && +n % 1 === 0;
        },

        isFloat: function(n){
            return (!isNaN(n) && +n % 1 !== 0) || /^\d*\.\d+$/.test(n);
        },

        isFunc: function(f){
            return this.isType(f, 'function');
        },

        isObject: function(o){
            return this.isType(o, 'object');
        },

        isType: function(o, t){
            if (!this.isValue(o)) {
                return false;
            }

            if (typeof o === t) {
                return o;
            }

            if ((""+t).toLowerCase() === 'tag' && this.isTag(o)) {
                return o;
            }

            if ((""+t).toLowerCase() === 'url' && this.isUrl(o)) {
                return o;
            }

            if ((""+t).toLowerCase() === 'array' && Array.isArray(o)) {
                return o;
            }

            if (this.isTag(o) || this.isUrl(o)) {
                return false;
            }

            if (typeof window[o] === t) {
                return window[o];
            }

            if (typeof o === 'string' && o.indexOf(".") === -1) {
                return false;
            }

            if (typeof o === 'string' && /[/\s([]+/gm.test(o)) {
                return false;
            }

            if (typeof o === "number" && t.toLowerCase() !== "number") {
                return false;
            }

            var ns = o.split(".");
            var i, context = window;

            for(i = 0; i < ns.length; i++) {
                context = context[ns[i]];
            }

            return typeof context === t ? context : false;
        },

        $: function(){
            return window.useJQuery ? jQuery : m4q;
        },

        isMetroObject: function(el, type){
            var $el = $(el), el_obj = Metro.getPlugin(el, type);

            if ($el.length === 0) {
                console.warn(type + ' ' + el + ' not found!');
                return false;
            }

            if (el_obj === undefined) {
                console.warn('Element not contain role '+ type +'! Please add attribute data-role="'+type+'" to element ' + el);
                return false;
            }

            return true;
        },

        isJQuery: function(el){
            return (typeof jQuery !== "undefined" && el instanceof jQuery);
        },

        isM4Q: function(el){
            return (typeof m4q !== "undefined" && el instanceof m4q);
        },

        isQ: function(el){
            return this.isJQuery(el) || this.isM4Q(el);
        },

        isIE11: function(){
            return !!window.MSInputMethodContext && !!document["documentMode"];
        },

        embedUrl: function(val){
            if (val.indexOf("youtu.be") !== -1) {
                val = "https://www.youtube.com/embed/" + val.split("/").pop();
            }
            return "<div class='embed-container'><iframe src='"+val+"'></iframe></div>";
        },

        elementId: function(prefix){
            return prefix+"-"+(new Date()).getTime()+$.random(1, 1000);
        },

        secondsToTime: function(secs) {
            var hours = Math.floor(secs / (60 * 60));

            var divisor_for_minutes = secs % (60 * 60);
            var minutes = Math.floor(divisor_for_minutes / 60);

            var divisor_for_seconds = divisor_for_minutes % 60;
            var seconds = Math.ceil(divisor_for_seconds);

            return {
                "h": hours,
                "m": minutes,
                "s": seconds
            };
        },

        secondsToFormattedString: function(time){
            var sec_num = parseInt(time, 10);
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}

            return [hours, minutes, seconds].join(":");
        },

        func: function(f){
            /* jshint -W054 */
            return new Function("a", f);
        },

        exec: function(f, args, context){
            var result;
            if (f === undefined || f === null) {return false;}
            var func = this.isFunc(f);

            if (func === false) {
                func = this.func(f);
            }

            try {
                result = func.apply(context, args);
            } catch (err) {
                result = null;
                if (window.METRO_THROWS === true) {
                    throw err;
                }
            }
            return result;
        },

        isOutsider: function(element) {
            var el = $(element);
            var inViewport;
            var clone = el.clone();

            clone.removeAttr("data-role").css({
                visibility: "hidden",
                position: "absolute",
                display: "block"
            });
            el.parent().append(clone);

            inViewport = this.inViewport(clone[0]);

            clone.remove();

            return !inViewport;
        },

        inViewport: function(el){
            var rect = this.rect(el);

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        rect: function(el){
            return el.getBoundingClientRect();
        },

        getCursorPosition: function(el, e){
            var a = this.rect(el);
            return {
                x: this.pageXY(e).x - a.left - window.pageXOffset,
                y: this.pageXY(e).y - a.top - window.pageYOffset
            };
        },

        getCursorPositionX: function(el, e){
            return this.getCursorPosition(el, e).x;
        },

        getCursorPositionY: function(el, e){
            return this.getCursorPosition(el, e).y;
        },

        objectLength: function(obj){
            return Object.keys(obj).length;
        },

        percent: function(total, part, round_value){
            if (total === 0) {
                return 0;
            }
            var result = part * 100 / total;
            return round_value === true ? Math.round(result) : Math.round(result * 100) / 100;
        },

        objectShift: function(obj){
            var min = 0;
            $.each(obj, function(i){
                if (min === 0) {
                    min = i;
                } else {
                    if (min > i) {
                        min = i;
                    }
                }
            });
            delete obj[min];

            return obj;
        },

        objectDelete: function(obj, key){
            if (obj[key] !== undefined) delete obj[key];
        },

        arrayDeleteByMultipleKeys: function(arr, keys){
            keys.forEach(function(ind){
                delete arr[ind];
            });
            return arr.filter(function(item){
                return item !== undefined;
            });
        },

        arrayDelete: function(arr, val){
            if (arr.indexOf(val) > -1) arr.splice(arr.indexOf(val), 1);
        },

        arrayDeleteByKey: function(arr, key){
            arr.splice(key, 1);
        },

        nvl: function(data, other){
            return data === undefined || data === null ? other : data;
        },

        objectClone: function(obj){
            var copy = {};
            for(var key in obj) {
                if ($.hasProp(obj, key)) {
                    copy[key] = obj[key];
                }
            }
            return copy;
        },

        github: function(repo, callback){
            var that = this;
            $.json('https://api.github.com/repos/' + repo).then(function(data){
                that.exec(callback, [data]);
            });
        },

        detectIE: function() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                // Edge (IE 12+) => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
        },

        detectChrome: function(){
            return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        },

        encodeURI: function(str){
            return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
        },

        pageHeight: function(){
            var body = document.body,
                html = document.documentElement;

            return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
        },

        cleanPreCode: function(selector){
            var els = Array.prototype.slice.call(document.querySelectorAll(selector), 0);

            els.forEach(function(el){
                var txt = el.textContent
                    .replace(/^[\r\n]+/, "")	// strip leading newline
                    .replace(/\s+$/g, "");

                if (/^\S/gm.test(txt)) {
                    el.textContent = txt;
                    return;
                }

                var mat, str, re = /^[\t ]+/gm, len, min = 1e3;

                /* jshint -W084 */
                /* eslint-disable-next-line */
                while (mat = re.exec(txt)) {
                    len = mat[0].length;

                    if (len < min) {
                        min = len;
                        str = mat[0];
                    }
                }

                if (min === 1e3)
                    return;

                el.textContent = txt.replace(new RegExp("^" + str, 'gm'), "").trim();
            });
        },

        coords: function(element){
            var el = $(element)[0];
            var box = el.getBoundingClientRect();

            return {
                top: box.top + window.pageYOffset,
                left: box.left + window.pageXOffset
            };
        },

        positionXY: function(e, t){
            switch (t) {
                case 'client': return this.clientXY(e);
                case 'screen': return this.screenXY(e);
                case 'page': return this.pageXY(e);
                default: return {x: 0, y: 0};
            }
        },

        /**
         *
         * @param {TouchEvent|Event|MouseEvent} e
         * @returns {{x: (*), y: (*)}}
         */
        clientXY: function(e){
            return {
                x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
                y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY
            };
        },

        /**
         *
         * @param {TouchEvent|Event|MouseEvent} e
         * @returns {{x: (*), y: (*)}}
         */
        screenXY: function(e){
            return {
                x: e.changedTouches ? e.changedTouches[0].screenX : e.screenX,
                y: e.changedTouches ? e.changedTouches[0].screenY : e.screenY
            };
        },

        /**
         *
         * @param {TouchEvent|Event|MouseEvent} e
         * @returns {{x: (*), y: (*)}}
         */
        pageXY: function(e){
            return {
                x: e.changedTouches ? e.changedTouches[0].pageX : e.pageX,
                y: e.changedTouches ? e.changedTouches[0].pageY : e.pageY
            };
        },

        isRightMouse: function(e){
            return "which" in e ? e.which === 3 : "button" in e ? e.button === 2 : undefined;
        },

        hiddenElementSize: function(el, includeMargin){
            var width, height, clone = $(el).clone(true);

            clone.removeAttr("data-role").css({
                visibility: "hidden",
                position: "absolute",
                display: "block"
            });
            $("body").append(clone);

            if (!this.isValue(includeMargin)) {
                includeMargin = false;
            }

            width = clone.outerWidth(includeMargin);
            height = clone.outerHeight(includeMargin);
            clone.remove();
            return {
                width: width,
                height: height
            };
        },

        getStyle: function(element, pseudo){
            var el = $(element)[0];
            return window.getComputedStyle(el, pseudo);
        },

        getStyleOne: function(el, property){
            return this.getStyle(el).getPropertyValue(property);
        },

        getInlineStyles: function(element){
            var i, l, styles = {}, el = $(element)[0];
            for (i = 0, l = el.style.length; i < l; i++) {
                var s = el.style[i];
                styles[s] = el.style[s];
            }

            return styles;
        },

        updateURIParameter: function(uri, key, value) {
            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            if (uri.match(re)) {
                return uri.replace(re, '$1' + key + "=" + value + '$2');
            }
            else {
                return uri + separator + key + "=" + value;
            }
        },

        getURIParameter: function(url, name){
            if (!url) url = window.location.href;
            /* eslint-disable-next-line */
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },

        getLocales: function(){
            return Object.keys(Metro.locales);
        },

        addLocale: function(locale){
            Metro.locales = $.extend( {}, Metro.locales, locale );
        },

        aspectRatioH: function(width, a){
            if (a === "16/9") return width * 9 / 16;
            if (a === "21/9") return width * 9 / 21;
            if (a === "4/3") return width * 3 / 4;
        },

        aspectRatioW: function(height, a){
            if (a === "16/9") return height * 16 / 9;
            if (a === "21/9") return height * 21 / 9;
            if (a === "4/3") return height * 4 / 3;
        },

        valueInObject: function(obj, value){
            return Object.values(obj).indexOf(value) > -1;
        },

        keyInObject: function(obj, key){
            return Object.keys(obj).indexOf(key) > -1;
        },

        inObject: function(obj, key, val){
            return obj[key] !== undefined && obj[key] === val;
        },

        newCssSheet: function(media){
            var style = document.createElement("style");

            if (media !== undefined) {
                style.setAttribute("media", media);
            }

            style.appendChild(document.createTextNode(""));

            document.head.appendChild(style);

            return style.sheet;
        },

        addCssRule: function(sheet, selector, rules, index){
            if("insertRule" in sheet) {
                sheet.insertRule(selector + "{" + rules + "}", index);
            }
            else if("addRule" in sheet) {
                sheet.addRule(selector, rules, index);
            }
        },

        media: function(query){
            return window.matchMedia(query).matches;
        },

        mediaModes: function(){
            return window.METRO_MEDIA;
        },

        mediaExist: function(media){
            return window.METRO_MEDIA.indexOf(media) > -1;
        },

        inMedia: function(media){
            return window.METRO_MEDIA.indexOf(media) > -1 && window.METRO_MEDIA.indexOf(media) === window.METRO_MEDIA.length - 1;
        },

        isValue: function(val){
            return val !== undefined && val !== null && val !== "";
        },

        isNull: function(val){
            return val === undefined || val === null;
        },

        isNegative: function(val){
            return parseFloat(val) < 0;
        },

        isPositive: function(val){
            return parseFloat(val) > 0;
        },

        isZero: function(val){
            return (parseFloat(val.toFixed(2))) === 0.00;
        },

        between: function(val, bottom, top, equals){
            return equals === true ? val >= bottom && val <= top : val > bottom && val < top;
        },

        parseMoney: function(val){
            return Number(parseFloat(val.replace(/[^0-9-.]/g, '')));
        },

        parseCard: function(val){
            return val.replace(/[^0-9]/g, '');
        },

        parsePhone: function(val){
            return this.parseCard(val);
        },

        parseNumber: function(val, thousand, decimal){
            return val.replace(new RegExp('\\'+thousand, "g"), "").replace(new RegExp('\\'+decimal, 'g'), ".");
        },

        nearest: function(val, precision, down){
            val /= precision;
            val = Math[down === true ? 'floor' : 'ceil'](val) * precision;
            return val;
        },

        bool: function(value){
            switch(value){
                case true:
                case "true":
                case 1:
                case "1":
                case "on":
                case "yes":
                    return true;
                default:
                    return false;
            }
        },

        copy: function(element){
            var body = document.body, range, sel;
            var el = $(element)[0];

            if (document.createRange && window.getSelection) {
                range = document.createRange();
                sel = window.getSelection();
                sel.removeAllRanges();
                try {
                    range.selectNodeContents(el);
                    sel.addRange(range);
                } catch (e) {
                    range.selectNode(el);
                    sel.addRange(range);
                }
            } else if (body["createTextRange"]) {
                range = body["createTextRange"]();
                range["moveToElementText"](el);
                range.select();
            }

            document.execCommand("Copy");

            if (window.getSelection) {
                if (window.getSelection().empty) {  // Chrome
                    window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges) {  // Firefox
                    window.getSelection().removeAllRanges();
                }
            } else if (document["selection"]) {  // IE?
                document["selection"].empty();
            }
        },

        decCount: function(v){
            return v % 1 === 0 ? 0 : v.toString().split(".")[1].length;
        },

        /**
         * Add symbols to string on the left side
         * @param str Where
         * @param pad what
         * @param length to length
         */
        lpad: function(str, pad, length){
            var _str = ""+str;
            if (length && _str.length >= length) {
                return _str;
            }
            return Array((length + 1) - _str.length).join(pad) + _str;
        },

        rpad: function(str, pad, length){
            var _str = ""+str;
            if (length && _str.length >= length) {
                return _str;
            }
            return _str + Array((length + 1) - _str.length).join(pad);
        }
    };

    if (window.METRO_GLOBAL_COMMON === true) {
        window.Utils = Metro.utils;
    }
}(Metro, m4q));