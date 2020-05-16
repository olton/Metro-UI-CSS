/* global jQuery, Utils */

/* Metro 4 Core */

var $ = m4q; // eslint-disable-line

if (typeof m4q === 'undefined') {
    throw new Error('Metro 4 requires m4q helper!');
}

if (!('MutationObserver' in window)) {
    throw new Error('Metro 4 requires MutationObserver!');
}

var meta_init = $.meta('metro4:init').attr("content");
var meta_init_mode = $.meta('metro4:init:mode').attr("content");
var meta_locale = $.meta('metro4:locale').attr("content");
var meta_week_start = $.meta('metro4:week_start').attr("content");
var meta_date_format = $.meta('metro4:date_format').attr("content");
var meta_date_format_input = $.meta('metro4:date_format_input').attr("content");
var meta_animation_duration = $.meta('metro4:animation_duration').attr("content");
var meta_callback_timeout = $.meta('metro4:callback_timeout').attr("content");
var meta_timeout = $.meta('metro4:timeout').attr("content");
var meta_scroll_multiple = $.meta('metro4:scroll_multiple').attr("content");
var meta_cloak = $.meta('metro4:cloak').attr("content"); //default or fade
var meta_cloak_duration = $.meta('metro4:cloak_duration').attr("content"); //100

var meta_jquery = $.meta('metro4:jquery').attr("content"); //undefined
window.jquery_present = typeof jQuery !== "undefined";
if (window.METRO_JQUERY === undefined) {
    window.METRO_JQUERY = meta_jquery !== undefined ? JSON.parse(meta_jquery) : true;
}

/* Added by Ken Kitay https://github.com/kens-code*/
var meta_about = $.meta('metro4:about').attr("content");
if (window.METRO_SHOW_ABOUT === undefined) {
    window.METRO_SHOW_ABOUT = meta_about !== undefined ? JSON.parse(meta_about) : true;
}
/* --- end ---*/

var meta_compile = $.meta('metro4:compile').attr("content");
if (window.METRO_SHOW_COMPILE_TIME === undefined) {
    window.METRO_SHOW_COMPILE_TIME = meta_compile !== undefined ? JSON.parse(meta_compile) : true;
}

if (window.METRO_INIT === undefined) {
    window.METRO_INIT = meta_init !== undefined ? JSON.parse(meta_init) : true;
}

if (window.METRO_INIT_MODE === undefined) {
    window.METRO_INIT_MODE = meta_init_mode !== undefined ? meta_init_mode : "contentloaded";
}

if (window.METRO_DEBUG === undefined) {window.METRO_DEBUG = true;}

if (window.METRO_WEEK_START === undefined) {
    window.METRO_WEEK_START = meta_week_start !== undefined ? parseInt(meta_week_start) : 0;
}
if (window.METRO_DATE_FORMAT === undefined) {
    window.METRO_DATE_FORMAT = meta_date_format !== undefined ? meta_date_format : "%Y-%m-%d";
}
if (window.METRO_DATE_FORMAT_INPUT === undefined) {
    window.METRO_DATE_FORMAT_INPUT = meta_date_format_input !== undefined ? meta_date_format_input : "%Y-%m-%d";
}
if (window.METRO_LOCALE === undefined) {
    window.METRO_LOCALE = meta_locale !== undefined ? meta_locale : 'en-US';
}
if (window.METRO_ANIMATION_DURATION === undefined) {
    window.METRO_ANIMATION_DURATION = meta_animation_duration !== undefined ? parseInt(meta_animation_duration) : 100;
}
if (window.METRO_CALLBACK_TIMEOUT === undefined) {
    window.METRO_CALLBACK_TIMEOUT = meta_callback_timeout !== undefined ? parseInt(meta_callback_timeout) : 500;
}
if (window.METRO_TIMEOUT === undefined) {
    window.METRO_TIMEOUT = meta_timeout !== undefined ? parseInt(meta_timeout) : 2000;
}
if (window.METRO_SCROLL_MULTIPLE === undefined) {
    window.METRO_SCROLL_MULTIPLE = meta_scroll_multiple !== undefined ? parseInt(meta_scroll_multiple) : 20;
}
if (window.METRO_CLOAK_REMOVE === undefined) {
    window.METRO_CLOAK_REMOVE = meta_cloak !== undefined ? (""+meta_cloak).toLowerCase() : "fade";
}
if (window.METRO_CLOAK_DURATION === undefined) {
    window.METRO_CLOAK_DURATION = meta_cloak_duration !== undefined ? parseInt(meta_cloak_duration) : 500;
}
if (window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE === undefined) {window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE = true;}
if (window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS === undefined) {window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS = true;}
if (window.METRO_HOTKEYS_FILTER_TEXT_INPUTS === undefined) {window.METRO_HOTKEYS_FILTER_TEXT_INPUTS = true;}
if (window.METRO_HOTKEYS_BUBBLE_UP === undefined) {window.METRO_HOTKEYS_BUBBLE_UP = false;}
if (window.METRO_THROWS === undefined) {window.METRO_THROWS = true;}

window.METRO_MEDIA = [];

var isTouch = (('ontouchstart' in window) || (navigator["MaxTouchPoints"] > 0) || (navigator["msMaxTouchPoints"] > 0));

var normalizeComponentName = function(name){
    return typeof name !== "string" ? undefined : name.replace(/-/g, "").toLowerCase();
};

var Metro = {

    version: "@@version",
    compileTime: "@@compile",
    buildNumber: "@@build",
    isTouchable: isTouch,
    fullScreenEnabled: document.fullscreenEnabled,
    sheet: null,

    controlsPosition: {
        INSIDE: "inside",
        OUTSIDE: "outside"
    },

    groupMode: {
        ONE: "one",
        MULTI: "multi"
    },

    aspectRatio: {
        HD: "hd",
        SD: "sd",
        CINEMA: "cinema"
    },

    fullScreenMode: {
        WINDOW: "window",
        DESKTOP: "desktop"
    },

    position: {
        TOP: "top",
        BOTTOM: "bottom",
        LEFT: "left",
        RIGHT: "right",
        TOP_RIGHT: "top-right",
        TOP_LEFT: "top-left",
        BOTTOM_LEFT: "bottom-left",
        BOTTOM_RIGHT: "bottom-right",
        LEFT_BOTTOM: "left-bottom",
        LEFT_TOP: "left-top",
        RIGHT_TOP: "right-top",
        RIGHT_BOTTOM: "right-bottom"
    },

    popoverEvents: {
        CLICK: "click",
        HOVER: "hover",
        FOCUS: "focus"
    },

    stepperView: {
        SQUARE: "square",
        CYCLE: "cycle",
        DIAMOND: "diamond"
    },

    listView: {
        LIST: "list",
        CONTENT: "content",
        ICONS: "icons",
        ICONS_MEDIUM: "icons-medium",
        ICONS_LARGE: "icons-large",
        TILES: "tiles",
        TABLE: "table"
    },

    events: {
        click: 'click',
        start: isTouch ? 'touchstart' : 'mousedown',
        stop: isTouch ? 'touchend' : 'mouseup',
        move: isTouch ? 'touchmove' : 'mousemove',
        enter: isTouch ? 'touchstart' : 'mouseenter',

        startAll: 'mousedown touchstart',
        stopAll: 'mouseup touchend',
        moveAll: 'mousemove touchmove',

        leave: 'mouseleave',
        focus: 'focus',
        blur: 'blur',
        resize: 'resize',
        keyup: 'keyup',
        keydown: 'keydown',
        keypress: 'keypress',
        dblclick: 'dblclick',
        input: 'input',
        change: 'change',
        cut: 'cut',
        paste: 'paste',
        scroll: 'scroll',
        mousewheel: 'mousewheel',
        inputchange: "change input propertychange cut paste copy drop",
        dragstart: "dragstart",
        dragend: "dragend",
        dragenter: "dragenter",
        dragover: "dragover",
        dragleave: "dragleave",
        drop: 'drop',
        drag: 'drag'
    },

    keyCode: {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        BREAK: 19,
        CAPS: 20,
        ESCAPE: 27,
        SPACE: 32,
        PAGEUP: 33,
        PAGEDOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        COMMA: 188
    },

    media_queries: {
        FS: "(min-width: 0px)",
        XS: "(min-width: 360px)",
        SM: "(min-width: 576px)",
        MD: "(min-width: 768px)",
        LG: "(min-width: 992px)",
        XL: "(min-width: 1200px)",
        XXL: "(min-width: 1452px)"
    },

    media_sizes: {
        FS: 0,
        XS: 360,
        SM: 576,
        LD: 640,
        MD: 768,
        LG: 992,
        XL: 1200,
        XXL: 1452
    },

    media_mode: {
        FS: "fs",
        XS: "xs",
        SM: "sm",
        MD: "md",
        LG: "lg",
        XL: "xl",
        XXL: "xxl"
    },

    media_modes: ["fs","xs","sm","md","lg","xl","xxl"],

    actions: {
        REMOVE: 1,
        HIDE: 2
    },

    hotkeys: {},

    about: function(){
        var content =
            "<h3>About</h3>" +
            "<hr>" +
            "<div><b>Metro 4</b> - v" + Metro.version +". "+ Metro.showCompileTime() + "</div>" +
            "<div><b>M4Q</b> - " + m4q.version + "</div>";
        Metro.infobox.create(content)
    },

    info: function(){
        console.info("Metro 4 - v" + Metro.version +". "+ Metro.showCompileTime());
        console.info("m4q - " + m4q.version);
    },

    showCompileTime: function(){
        return "Built at: " + Metro.compileTime;
    },

    aboutDlg: function(){
        alert("Metro 4 - v" + Metro.version +". "+ Metro.showCompileTime());
    },

    ver: function(){
        return Metro.version;
    },

    build: function(){
        return Metro.build;
    },

    compile: function(){
        return Metro.compileTime;
    },

    observe: function(){
        var observer, observerCallback;
        var observerConfig = {
            childList: true,
            attributes: true,
            subtree: true
        };
        observerCallback = function(mutations){
            mutations.map(function(mutation){

                if (mutation.type === 'attributes' && mutation.attributeName !== "data-role") {
                    if (mutation.attributeName === 'data-hotkey') {

                        Metro.initHotkeys([mutation.target], true);

                    } else {

                        var element = $(mutation.target);
                        var mc = element.data('metroComponent');

                        if (mc !== undefined) {
                            $.each(mc, function(){
                                var plug = Metro.getPlugin(element, this);
                                if (plug) plug.changeAttribute(mutation.attributeName);
                            });
                        }
                    }
                } else

                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    var i, widgets = [];
                    var $node, node, nodes = mutation.addedNodes;

                    if (nodes.length) {
                        for(i = 0; i < nodes.length; i++) {
                            node = nodes[i];
                            $node = $(node);

                            if ($node.attr("data-role") !== undefined) {
                                widgets.push(node);
                            }

                            $.each($node.find("[data-role]"), function(){
                                var o = this;
                                if (widgets.indexOf(o) !== -1) {
                                    return;
                                }
                                widgets.push(o);
                            });
                        }

                        if (widgets.length) Metro.initWidgets(widgets, "observe");
                    }

                } else  {
                    //console.log(mutation);
                }
            });
        };
        observer = new MutationObserver(observerCallback);
        observer.observe($("html")[0], observerConfig);
    },

    init: function(){
        var widgets = $("[data-role]");
        var hotkeys = $("[data-hotkey]");
        var html = $("html");

        if (window.METRO_SHOW_ABOUT) Metro.info(true);

        if (isTouch === true) {
            html.addClass("metro-touch-device");
        } else {
            html.addClass("metro-no-touch-device");
        }

        Metro.sheet = Utils.newCssSheet();

        window.METRO_MEDIA = [];
        $.each(Metro.media_queries, function(key, query){
            if (Utils.media(query)) {
                window.METRO_MEDIA.push(Metro.media_mode[key]);
            }
        });

        Metro.observe();

        Metro.initHotkeys(hotkeys);
        Metro.initWidgets(widgets, "init");

        if (window.METRO_CLOAK_REMOVE !== "fade") {
            $(".m4-cloak").removeClass("m4-cloak");
            $(window).fire("metroinitied");
        } else {
            $(".m4-cloak").animate({
                draw: {
                    opacity: 1
                },
                dur: 300,
                onDone: function(){
                    $(".m4-cloak").removeClass("m4-cloak");
                    $(window).fire("metroinitied");
                }
            });
        }
    },

    initHotkeys: function(hotkeys, redefine){
        $.each(hotkeys, function(){
            var element = $(this);
            var hotkey = element.attr('data-hotkey') ? element.attr('data-hotkey').toLowerCase() : false;
            var fn = element.attr('data-hotkey-func') ? element.attr('data-hotkey-func') : false;

            if (hotkey === false) {
                return;
            }

            if (element.data('hotKeyBonded') === true && !Utils.bool(redefine)) {
                return;
            }

            Metro.hotkeys[hotkey] = [this, fn];

            element.data('hotKeyBonded', true);
        });
    },

    initWidgets: function(widgets) {
        $.each(widgets, function () {
            var $this = $(this);
            var roles = $this.data('role').split(/\s*,\s*/);

            roles.map(function (func) {

                var $$ = Utils.$();
                var _func = normalizeComponentName(func);

                if ($$.fn[_func] !== undefined && $this.attr("data-role-"+_func) === undefined) {
                    try {
                        $$.fn[_func].call($this);
                        $this.attr("data-role-"+_func, true);

                        var mc = $this.data('metroComponent');

                        if (mc === undefined) {
                            mc = [_func];
                        } else {
                            mc.push(_func);
                        }
                        $this.data('metroComponent', mc);
                    } catch (e) {
                        console.error("Error creating component " + func);
                        throw e;
                    }
                }
            });
        });
    },

    plugin: function(name, object){
        var _name = normalizeComponentName(name);

        var register = function($){
            $.fn[_name] = function( options ) {
                return this.each(function() {
                    $.data( this, _name, Object.create(object).init(options, this ));
                });
            };
        }

        register(m4q);

        if (window.METRO_JQUERY && window.jquery_present) {
            register(jQuery);
        }
    },

    destroyPlugin: function(element, name){
        var p, mc;
        var el = $(element);
        var _name = normalizeComponentName(name);

        p = Metro.getPlugin(el, _name);

        if (typeof p === 'undefined') {
            console.warn("Component "+name+" can not be destroyed: the element is not a Metro 4 component.");
            return ;
        }

        if (typeof p['destroy'] !== 'function') {
            console.warn("Component "+name+" can not be destroyed: method destroy not found.");
            return ;
        }

        p['destroy']();
        mc = el.data("metroComponent");
        Utils.arrayDelete(mc, _name);
        el.data("metroComponent", mc);
        $.removeData(el[0], _name);
        el.removeAttr("data-role-"+_name);
    },

    destroyPluginAll: function(element){
        var el = $(element);
        var mc = el.data("metroComponent");

        if (mc !== undefined && mc.length > 0) $.each(mc, function(){
            Metro.destroyPlugin(el[0], this);
        });
    },

    noop: function(){},
    noop_true: function(){return true;},
    noop_false: function(){return false;},

    requestFullScreen: function(element){
        if (element["mozRequestFullScreen"]) {
            element["mozRequestFullScreen"]();
        } else if (element["webkitRequestFullScreen"]) {
            element["webkitRequestFullScreen"]();
        } else if (element["msRequestFullscreen"]) {
            element["msRequestFullscreen"]();
        } else {
            element.requestFullscreen().catch( function(err){
                console.warn("Error attempting to enable full-screen mode: "+err.message+" "+err.name);
            });
        }
    },

    exitFullScreen: function(){
        if (document["mozCancelFullScreen"]) {
            document["mozCancelFullScreen"]();
        }
        else if (document["webkitCancelFullScreen"]) {
            document["webkitCancelFullScreen"]();
        }
        else if (document["msExitFullscreen"]) {
            document["msExitFullscreen"]();
        } else {
            document.exitFullscreen().catch( function(err){
                console.warn("Error attempting to disable full-screen mode: "+err.message+" "+err.name);
            });
        }
    },

    inFullScreen: function(){
        var fsm = (document.fullscreenElement || document["webkitFullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"]);
        return fsm !== undefined;
    },

    checkRuntime: function(el, name){
        var element = $(el);
        var _name = normalizeComponentName(name);
        if (!element.attr("data-role-"+_name)) {
            Metro.makeRuntime(element, _name);
        }
    },

    makeRuntime: function(el, name){
        var element = $(el);
        var _name = normalizeComponentName(name);

        element.attr("data-role-"+_name, true);
        element.attr("data-role", _name);
        var mc = element.data('metroComponent');

        if (mc === undefined) {
            mc = [_name];
        } else {
            mc.push(_name);
        }
        element.data('metroComponent', mc);
    },

    $: function(){
        return window.METRO_JQUERY && window.jquery_present ? jQuery : m4q;
    },

    get$el: function(el){
        return Metro.$()($(el)[0]);
    },

    getPlugin: function(el, name){
        var _name = normalizeComponentName(name);
        var $el = Metro.get$el(el);
        return $el.length ? $el.data(_name) : undefined;
    },

    makePlugin: function(el, name, options){
        var _name = normalizeComponentName(name);
        var $el = Metro.get$el(el);
        return $el.length && typeof $el[_name] === "function" ? $el[_name](options) : undefined;
    },

    createExec: function(that){
        var timeout = that.options[that.name.toLowerCase()+'Deferred'];
        if (timeout > 0) {
            setTimeout(function(){
                that._create();
            }, timeout)
        } else {
            that._create();
        }
    }
};

/* eslint-disable-next-line */
var Component = function(nameName, compObj){
    var name = normalizeComponentName(nameName);
    var component = $.extend({name: name}, {
        _super: function(el, options, defaults){
            this.elem = el;
            this.element = $(el);
            this.options = $.extend( {}, defaults, options );

            this._setOptionsFromDOM();
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
        }
    }, compObj);
    Metro.plugin(name, component);
    return component;
}

Metro.Component = Component;

Metro.locales = {};

window.Metro = Metro;

$(window).on(Metro.events.resize, function(){
    window.METRO_MEDIA = [];
    $.each(Metro.media_queries, function(key, query){
        if (Utils.media(query)) {
            window.METRO_MEDIA.push(Metro.media_mode[key]);
        }
    });
});
