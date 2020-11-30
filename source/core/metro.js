/* global jQuery, define */
/* Metro 4 Core */
(function( factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define('metro4', factory );
    } else {
        factory( );
    }
}(function( ) {
    'use strict';

    var $ = m4q; // eslint-disable-line

    if (typeof m4q === 'undefined') {
        throw new Error('Metro 4 requires m4q helper!');
    }

    if (!('MutationObserver' in window)) {
        throw new Error('Metro 4 requires MutationObserver!');
    }

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
        locales: {},
        utils: {},
        colors: {},
        dialog: null,
        pagination: null,
        md5: null,
        storage: null,
        export: null,
        animations: null,
        cookie: null,
        template: null,
        defaults: {},

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
                            var attr = mutation.attributeName, newValue = element.attr(attr), oldValue = mutation.oldValue;

                            if (mc !== undefined) {
                                element.fire("attr-change", {
                                    attr: attr,
                                    newValue: newValue,
                                    oldValue: oldValue,
                                    __this: element[0]
                                });

                                $.each(mc, function(){
                                    var plug = Metro.getPlugin(element, this);
                                    if (plug && typeof plug.changeAttribute === "function") {
                                        plug.changeAttribute(attr, newValue, oldValue);
                                    }
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
            var that = this;

            if (window.METRO_BLUR_IMAGE) {
                html.addClass("use-blur-image");
            }

            if (window.METRO_SHOW_ABOUT) Metro.info(true);

            if (isTouch === true) {
                html.addClass("metro-touch-device");
            } else {
                html.addClass("metro-no-touch-device");
            }

            Metro.sheet = this.utils.newCssSheet();

            this.utils.addCssRule(Metro.sheet, "*, *::before, *::after", "box-sizing: border-box;");

            window.METRO_MEDIA = [];
            $.each(Metro.media_queries, function(key, query){
                if (that.utils.media(query)) {
                    window.METRO_MEDIA.push(Metro.media_mode[key]);
                }
            });

            Metro.observe();

            Metro.initHotkeys(hotkeys);
            Metro.initWidgets(widgets, "init");

            if (window.METRO_CLOAK_REMOVE !== "fade") {
                $(".m4-cloak").removeClass("m4-cloak");
                $(window).fire("metro-initiated");
            } else {
                $(".m4-cloak").animate({
                    draw: {
                        opacity: 1
                    },
                    dur: 300,
                    onDone: function(){
                        $(".m4-cloak").removeClass("m4-cloak");
                        $(window).fire("metro-initiated");
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

                if (element.data('hotKeyBonded') === true && redefine !== true) {
                    return;
                }

                Metro.hotkeys[hotkey] = [this, fn];
                element.data('hotKeyBonded', true);
                element.fire("hot-key-bonded", {
                    __this: element[0],
                    hotkey: hotkey,
                    fn: fn
                });
            });
        },

        initWidgets: function(widgets) {
            var that = this;

            $.each(widgets, function () {
                var $this = $(this), roles;

                if (!this.hasAttribute("data-role")) {
                    return ;
                }

                roles = $this.attr('data-role').split(/\s*,\s*/);

                roles.map(function (func) {

                    var $$ = that.utils.$();
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

                            $this.fire("create", {
                                __this: $this[0],
                                name: _func
                            });
                            $(document).fire("component-create", {
                                element: $this[0],
                                name: _func
                            });
                        } catch (e) {
                            console.error("Error creating component " + func + " for ", $this[0]);
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

            if (window.useJQuery) {
                register(jQuery);
            }
        },

        pluginExists: function(name){
            var $ = window.useJQuery ? jQuery : m4q;
            return typeof $.fn[normalizeComponentName(name)] === "function";
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
            this.utils.arrayDelete(mc, _name);
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

        $: function(){
            return window.useJQuery ? jQuery : m4q;
        },

        get$el: function(el){
            return Metro.$()($(el)[0]);
        },

        get$elements: function(el){
            return Metro.$()($(el));
        },

        getPlugin: function(el, name){
            var _name = normalizeComponentName(name);
            var $el = Metro.get$el(el);
            return $el.length ? $el.data(_name) : undefined;
        },

        makePlugin: function(el, name, options){
            var _name = normalizeComponentName(name);
            var $el = Metro.get$elements(el);
            return $el.length && typeof $el[_name] === "function" ? $el[_name](options) : undefined;
        },

        Component: function(nameName, compObj){
            var name = normalizeComponentName(nameName);
            var Utils = Metro.utils;
            var component = $.extend({name: name}, {
                _super: function(el, options, defaults, setup){
                    var self = this;

                    this.elem = el;
                    this.element = $(el);
                    this.options = $.extend( {}, defaults, options );
                    this.component = this.elem;

                    this._setOptionsFromDOM();
                    this._runtime();

                    if (setup && typeof setup === 'object') {
                        $.each(setup, function(key, val){
                            self[key] = val;
                        })
                    }

                    this._createExec();
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

                _runtime: function(){
                    var element = this.element, mc;
                    var roles = (element.attr("data-role") || "").toArray(",").map(function(v){
                        return normalizeComponentName(v);
                    }).filter(function(v){
                        return v.trim() !== "";
                    });

                    if (!element.attr('data-role-'+this.name)) {
                        element.attr("data-role-"+this.name, true);
                        if (roles.indexOf(this.name) === -1) {
                            roles.push(this.name);
                            element.attr("data-role", roles.join(","));
                        }

                        mc = element.data('metroComponent');
                        if (mc === undefined) {
                            mc = [this.name];
                        } else {
                            mc.push(this.name);
                        }
                        element.data('metroComponent', mc);
                    }
                },

                _createExec: function(){
                    var that = this, timeout = this.options[this.name+'Deferred'];

                    if (timeout) {
                        setTimeout(function(){
                            that._create();
                        }, timeout)
                    } else {
                        that._create();
                    }
                },

                _fireEvent: function(eventName, data, log, noFire){
                    var element = this.element, o = this.options;
                    var _data;
                    var event = eventName.camelCase().capitalize();

                    data = $.extend({}, data, {__this: element[0]});

                    _data = data ? Object.values(data) : {};

                    if (log) {
                        console.warn(log);
                        console.warn("Event: " + "on"+eventName.camelCase().capitalize());
                        console.warn("Data: ", data);
                        console.warn("Element: ", element[0]);
                    }

                    if (noFire !== true)
                        element.fire(event.toLowerCase(), data);

                    return Utils.exec(o["on"+event], _data, element[0]);
                },

                _fireEvents: function(events, data, log, noFire){
                    var that = this, _events;

                    if (arguments.length === 0) {
                        return ;
                    }

                    if (arguments.length === 1) {

                        $.each(events, function () {
                            var ev = this;
                            that._fireEvent(ev.name, ev.data, ev.log, ev.noFire);
                        });

                        return Utils.objectLength(events);
                    }

                    if (!Array.isArray(events) && typeof events !== "string") {
                        return ;
                    }

                    _events = Array.isArray(events) ? events : events.toArray(",");

                    $.each(_events, function(){
                        that._fireEvent(this, data, log, noFire);
                    });
                },

                getComponent: function(){
                    return this.component;
                },

                getComponentName: function(){
                    return this.name;
                }
            }, compObj);

            Metro.plugin(name, component);

            return component;
        }
    };

    $(window).on(Metro.events.resize, function(){
        window.METRO_MEDIA = [];
        $.each(Metro.media_queries, function(key, query){
            if (Metro.utils.media(query)) {
                window.METRO_MEDIA.push(Metro.media_mode[key]);
            }
        });
    });

    window.Metro = Metro;

    if (window.METRO_INIT ===  true) {
        $(function(){
            Metro.init()
        });
    }

    return Metro;

}));
