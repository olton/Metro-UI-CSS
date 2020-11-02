/* global Metro */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var WindowDefaultConfig = {
        windowDeferred: 0,
        hidden: false,
        width: "auto",
        height: "auto",
        btnClose: true,
        btnMin: true,
        btnMax: true,
        draggable: true,
        dragElement: ".window-caption .icon, .window-caption .title",
        dragArea: "parent",
        shadow: false,
        icon: "",
        title: "Window",
        content: null,
        resizable: true,
        overlay: false,
        overlayColor: 'transparent',
        overlayAlpha: .5,
        modal: false,
        position: "absolute",
        checkEmbed: true,
        top: "auto",
        left: "auto",
        place: "auto",
        closeAction: Metro.actions.REMOVE,
        customButtons: null,

        clsCustomButton: "",
        clsCaption: "",
        clsContent: "",
        clsWindow: "",

        _runtime: false,

        minWidth: 0,
        minHeight: 0,
        maxWidth: 0,
        maxHeight: 0,
        onDragStart: Metro.noop,
        onDragStop: Metro.noop,
        onDragMove: Metro.noop,
        onCaptionDblClick: Metro.noop,
        onCloseClick: Metro.noop,
        onMaxClick: Metro.noop,
        onMinClick: Metro.noop,
        onResizeStart: Metro.noop,
        onResizeStop: Metro.noop,
        onResize: Metro.noop,
        onWindowCreate: Metro.noop,
        onShow: Metro.noop,
        onWindowDestroy: Metro.noop,
        onCanClose: Metro.noop_true,
        onClose: Metro.noop
    };

    Metro.windowSetup = function (options) {
        WindowDefaultConfig = $.extend({}, WindowDefaultConfig, options);
    };

    if (typeof window["metroWindowSetup"] !== undefined) {
        Metro.windowSetup(window["metroWindowSetup"]);
    }

    Metro.Component('window', {
        init: function( options, elem ) {
            this._super(elem, options, WindowDefaultConfig, {
                win: null,
                overlay: null,
                position: {
                    top: 0,
                    left: 0
                },
                hidden: false,
                content: null
            });

            return this;
        },

        _create: function(){
            var that = this, element = this.element, o = this.options;
            var win, overlay;
            var parent = o.dragArea === "parent" ? element.parent() : $(o.dragArea);
            var _content;

            if (o.modal === true) {
                o.btnMax = false;
                o.btnMin = false;
                o.resizable = false;
            }

            if (Utils.isNull(o.content)) {
                o.content = element;
            } else {
                if (Utils.isUrl(o.content) && Utils.isVideoUrl(o.content)) {
                    o.content = Utils.embedUrl(o.content);
                    element.css({
                        height: "100%"
                    });
                } else

                if (!Utils.isQ(o.content) && Utils.isFunc(o.content)) {
                    o.content = Utils.exec(o.content);
                }

                _content = $(o.content);
                if (_content.length === 0) {
                    element.appendText(o.content);
                } else {
                    element.append(_content);
                }
                o.content = element;
            }

            if (o._runtime === true) {
                this._runtime(element, "window");
            }

            win = this._window(o);
            win.addClass("no-visible");

            parent.append(win);

            if (o.overlay === true) {
                overlay = this._overlay();
                overlay.appendTo(win.parent());
                this.overlay = overlay;
            }

            this.win = win;

            this._fireEvent("window-create", {
                win: this.win[0],
                element: element
            });

            setTimeout(function(){
                that._setPosition();

                if (o.hidden !== true) {
                    that.win.removeClass("no-visible");
                }

                that._fireEvent("show", {
                    win: that.win[0],
                    element: element
                });
            }, 100);
        },

        _setPosition: function(){
            var o = this.options;
            var win = this.win;
            var parent = o.dragArea === "parent" ? win.parent() : $(o.dragArea);
            var top_center = parent.height() / 2 - win[0].offsetHeight / 2;
            var left_center = parent.width() / 2 - win[0].offsetWidth / 2;
            var top, left, right, bottom;

            if (o.place !== 'auto') {

                switch (o.place.toLowerCase()) {
                    case "top-left": top = 0; left = 0; right = "auto"; bottom = "auto"; break;
                    case "top-center": top = 0; left = left_center; right = "auto"; bottom = "auto"; break;
                    case "top-right": top = 0; right = 0; left = "auto"; bottom = "auto"; break;
                    case "right-center": top = top_center; right = 0; left = "auto"; bottom = "auto"; break;
                    case "bottom-right": bottom = 0; right = 0; left = "auto"; top = "auto"; break;
                    case "bottom-center": bottom = 0; left = left_center; right = "auto"; top = "auto"; break;
                    case "bottom-left": bottom = 0; left = 0; right = "auto"; top = "auto"; break;
                    case "left-center": top = top_center; left = 0; right = "auto"; bottom = "auto"; break;
                    default: top = top_center; left = left_center; bottom = "auto"; right = "auto";
                }

                win.css({
                    top: top,
                    left: left,
                    bottom: bottom,
                    right: right
                });
            }
        },

        _window: function(o){
            var that = this;
            var win, caption, content, icon, title, buttons, btnClose, btnMin, btnMax, resizer, status;
            var width = o.width, height = o.height;

            win = $("<div>").addClass("window");

            if (o.modal === true) {
                win.addClass("modal");
            }

            caption = $("<div>").addClass("window-caption");
            content = $("<div>").addClass("window-content");

            win.append(caption);
            win.append(content);

            if (o.status === true) {
                status = $("<div>").addClass("window-status");
                win.append(status);
            }

            if (o.shadow === true) {
                win.addClass("win-shadow");
            }

            if (Utils.isValue(o.icon)) {
                icon = $("<span>").addClass("icon").html(o.icon);
                icon.appendTo(caption);
            }

            title = $("<span>").addClass("title").html(Utils.isValue(o.title) ? o.title : "&nbsp;");
            title.appendTo(caption);

            if (!Utils.isNull(o.content)) {
                if (Utils.isQ(o.content)) {
                    o.content.appendTo(content);
                } else {
                    content.html(o.content);
                }
            }

            buttons = $("<div>").addClass("buttons");
            buttons.appendTo(caption);

            if (o.btnMax === true) {
                btnMax = $("<span>").addClass("button btn-max sys-button");
                btnMax.appendTo(buttons);
            }

            if (o.btnMin === true) {
                btnMin = $("<span>").addClass("button btn-min sys-button");
                btnMin.appendTo(buttons);
            }

            if (o.btnClose === true) {
                btnClose = $("<span>").addClass("button btn-close sys-button");
                btnClose.appendTo(buttons);
            }

            if (Utils.isValue(o.customButtons)) {
                var customButtons = [];

                if (Utils.isObject(o.customButtons) !== false) {
                    o.customButtons = Utils.isObject(o.customButtons);
                }

                if (typeof o.customButtons === "string" && o.customButtons.indexOf("{") > -1) {
                    customButtons = JSON.parse(o.customButtons);
                } else if (typeof o.customButtons === "object" && Utils.objectLength(o.customButtons) > 0) {
                    customButtons = o.customButtons;
                } else {
                    console.warn("Unknown format for custom buttons");
                }

                $.each(customButtons, function(){
                    var item = this;
                    var customButton = $("<span>");

                    customButton
                        .addClass("button btn-custom")
                        .addClass(o.clsCustomButton)
                        .addClass(item.cls)
                        .attr("tabindex", -1)
                        .html(item.html);

                    if (item.attr && typeof item.attr === 'object') {
                        $.each(item.attr, function(k, v){
                            customButton.attr($.dashedName(k), v);
                        });
                    }

                    customButton.data("action", item.onclick);

                    buttons.prepend(customButton);
                });
            }

            caption.on(Metro.events.stop, ".btn-custom", function(e){
                if (Utils.isRightMouse(e)) return;
                var button = $(this);
                var action = button.data("action");
                Utils.exec(action, [button], this);
            });

            win.attr("id", o.id === undefined ? Utils.elementId("window") : o.id);

            win.on(Metro.events.dblclick, ".window-caption", function(e){
                that.maximized(e);
            });

            caption.on(Metro.events.click, ".btn-max, .btn-min, .btn-close", function(e){
                if (Utils.isRightMouse(e)) return;
                var target = $(e.target);
                if (target.hasClass("btn-max")) that.maximized(e);
                if (target.hasClass("btn-min")) that.minimized(e);
                if (target.hasClass("btn-close")) that.close(e);
            });

            if (o.draggable === true) {
                Metro.makePlugin(win, "draggable", {
                    dragContext: win[0],
                    dragElement: o.dragElement,
                    dragArea: o.dragArea,
                    onDragStart: o.onDragStart,
                    onDragStop: o.onDragStop,
                    onDragMove: o.onDragMove
                });
            }

            win.addClass(o.clsWindow);
            caption.addClass(o.clsCaption);
            content.addClass(o.clsContent);

            if (o.minWidth === 0) {
                o.minWidth = 34;
                $.each(buttons.children(".btn-custom"), function(){
                    o.minWidth += Utils.hiddenElementSize(this).width;
                });
                if (o.btnMax) o.minWidth += 34;
                if (o.btnMin) o.minWidth += 34;
                if (o.btnClose) o.minWidth += 34;
            }

            if (o.minWidth > 0 && !isNaN(o.width) && o.width < o.minWidth) {
                width = o.minWidth;
            }
            if (o.minHeight > 0 && !isNaN(o.height) && o.height > o.minHeight) {
                height = o.minHeight;
            }

            if (o.resizable === true) {
                resizer = $("<span>").addClass("resize-element");
                resizer.appendTo(win);
                win.addClass("resizable");

                Metro.makePlugin(win, "resizable", {
                    minWidth: o.minWidth,
                    minHeight: o.minHeight,
                    maxWidth: o.maxWidth,
                    maxHeight: o.maxHeight,
                    resizeElement: ".resize-element",
                    onResizeStart: o.onResizeStart,
                    onResizeStop: o.onResizeStop,
                    onResize: o.onResize
                });
            }

            win.css({
                width: width,
                height: height,
                position: o.position,
                top: o.top,
                left: o.left
            });

            return win;
        },

        _overlay: function(){
            var o = this.options;

            var overlay = $("<div>");
            overlay.addClass("overlay");

            if (o.overlayColor === 'transparent') {
                overlay.addClass("transparent");
            } else {
                overlay.css({
                    background: Metro.colors.toRGBA(o.overlayColor, o.overlayAlpha)
                });
            }

            return overlay;
        },

        width: function(v){
            var win = this.win;

            if (!Utils.isValue(v)) {
                return win.width();
            }

            win.css("width", parseInt(v));

            return this;
        },

        height: function(v){
            var win = this.win;

            if (!Utils.isValue(v)) {
                return win.height();
            }

            win.css("height", parseInt(v));

            return this;
        },

        maximized: function(e){
            var win = this.win, o = this.options;
            var target = $(e.currentTarget);

            if (o.btnMax) {
                win.removeClass("minimized");
                win.toggleClass("maximized");
            }

            if (target.hasClass && target.hasClass("window-caption")) {

                this._fireEvent("caption-dbl-click", {
                    win: win[0]
                });

            } else {

                this._fireEvent("max-click", {
                    win: win[0]
                });

            }
        },

        minimized: function(){
            var win = this.win, o = this.options;

            if (o.btnMin) {
                win.removeClass("maximized");
                win.toggleClass("minimized");
            }

            this._fireEvent("min-click", {
                win: win[0]
            });
        },

        close: function(){
            var that = this, win = this.win,  o = this.options;

            if (Utils.exec(o.onCanClose, [win]) === false) {
                return false;
            }

            var timeout = 0;

            if (o.onClose !== Metro.noop) {
                timeout = 500;
            }

            this._fireEvent("close", {
                win: win[0]
            });

            setTimeout(function(){
                if (o.modal === true) {
                    win.siblings(".overlay").remove();
                }

                that._fireEvent("close-click", {
                    win: win[0]
                });

                if (o.closeAction === Metro.actions.REMOVE) {
                    that._fireEvent("window-destroy", {
                        win: win[0]
                    });
                    win.remove();
                } else {
                    that.hide();
                }

            }, timeout);
        },

        hide: function(){
            var win = this.win;

            win.css({
                display: "none"
            });

            this._fireEvent("hide", {
                win: win[0]
            });
        },

        show: function(){
            var win = this.win;

            win
                .removeClass("no-visible")
                .css({
                    display: "flex"
                });

            this._fireEvent("show", {
                win: win[0]
            });

        },

        toggle: function(){
            if (this.win.css("display") === "none" || this.win.hasClass("no-visible")) {
                this.show();
            } else {
                this.hide();
            }
        },

        isOpen: function(){
            return this.win.hasClass("no-visible");
        },

        min: function(a){
            a ? this.win.addClass("minimized") : this.win.removeClass("minimized");
        },

        max: function(a){
            a ? this.win.addClass("maximized") : this.win.removeClass("maximized");
        },

        changeClass: function(a){
            var element = this.element, win = this.win, o = this.options;

            if (a === "data-cls-window") {
                win[0].className = "window " + (o.resizable ? " resizable " : " ") + element.attr("data-cls-window");
            }
            if (a === "data-cls-caption") {
                win.find(".window-caption")[0].className = "window-caption " + element.attr("data-cls-caption");
            }
            if (a === "data-cls-content") {
                win.find(".window-content")[0].className = "window-content " + element.attr("data-cls-content");
            }
        },

        toggleShadow: function(){
            var element = this.element, win = this.win;
            var flag = JSON.parse(element.attr("data-shadow"));
            if (flag === true) {
                win.addClass("win-shadow");
            } else {
                win.removeClass("win-shadow");
            }
        },

        setContent: function(c){
            var element = this.element, win = this.win;
            var content = Utils.isValue(c) ? c : element.attr("data-content");
            var result;

            if (!Utils.isQ(content) && Utils.isFunc(content)) {
                result = Utils.exec(content);
            } else if (Utils.isQ(content)) {
                result = content.html();
            } else {
                result = content;
            }

            win.find(".window-content").html(result);
        },

        setTitle: function(t){
            var element = this.element, win = this.win;
            var title = Utils.isValue(t) ? t : element.attr("data-title");
            win.find(".window-caption .title").html(title);
        },

        setIcon: function(i){
            var element = this.element, win = this.win;
            var icon = Utils.isValue(i) ? i : element.attr("data-icon");
            win.find(".window-caption .icon").html(icon);
        },

        getIcon: function(){
            return this.win.find(".window-caption .icon").html();
        },

        getTitle: function(){
            return this.win.find(".window-caption .title").html();
        },

        toggleDraggable: function(f){
            var win = this.win;
            var flag = Utils.bool(f);
            var drag = Metro.getPlugin(win, "draggable");
            if (flag === true) {
                drag.on();
            } else {
                drag.off();
            }
        },

        toggleResizable: function(f){
            var win = this.win;
            var flag = Utils.bool(f);
            var resize = Metro.getPlugin(win, "resizable");
            if (flag === true) {
                resize.on();
                win.find(".resize-element").removeClass("resize-element-disabled");
            } else {
                resize.off();
                win.find(".resize-element").addClass("resize-element-disabled");
            }
        },

        changePlace: function (p) {
            var element = this.element, win = this.win;
            var place = Utils.isValue(p) ? p : element.attr("data-place");
            win.addClass(place);
        },

        pos: function(top, left){
            var win = this.win;
            win.css({
                top: top,
                left: left
            });
            return this;
        },

        top: function(v){
            this.win.css({
                top: v
            });
            return this;
        },

        left: function(v){
            this.win.css({
                left: v
            });
            return this;
        },

        changeAttribute: function(attr, value){
            var changePos = function(a, v){
                var win = this.win;
                var pos;
                if (a === "data-top") {
                    pos = parseInt(v);
                    if (!isNaN(pos)) {
                        return ;
                    }
                    win.css("top", pos);
                }
                if (a === "data-left") {
                    pos = parseInt(v);
                    if (!isNaN(pos)) {
                        return ;
                    }
                    win.css("left", pos);
                }
            };

            var toggleButtons = function(a, v) {
                var win = this.win;
                var btnClose = win.find(".btn-close");
                var btnMin = win.find(".btn-min");
                var btnMax = win.find(".btn-max");
                var _v = Utils.bool(v);
                var func = _v ? "show" : "hide";

                switch (a) {
                    case "data-btn-close": btnClose[func](); break;
                    case "data-btn-min": btnMin[func](); break;
                    case "data-btn-max": btnMax[func](); break;
                }
            };

            var changeSize = function(a, v){
                var win = this.win;
                if (a === "data-width") {
                    win.css("width", +v);
                }
                if (a === "data-height") {
                    win.css("height", +v);
                }
            };

            switch (attr) {
                case "data-btn-close":
                case "data-btn-min":
                case "data-btn-max": toggleButtons(attr, value); break;
                case "data-width":
                case "data-height": changeSize(attr, value); break;
                case "data-cls-window":
                case "data-cls-caption":
                case "data-cls-content": this.changeClass(attr); break;
                case "data-shadow": this.toggleShadow(); break;
                case "data-icon": this.setIcon(); break;
                case "data-title": this.setTitle(); break;
                case "data-content": this.setContent(); break;
                case "data-draggable": this.toggleDraggable(value); break;
                case "data-resizable": this.toggleResizable(value); break;
                case "data-top":
                case "data-left": changePos(attr, value); break;
                case "data-place": this.changePlace(); break;
            }
        },

        destroy: function(){
            return this.element;
        }
    });

    Metro['window'] = {

        isWindow: function(el){
            return Utils.isMetroObject(el, "window");
        },

        min: function(el, a){
            if (!this.isWindow(el)) {
                return false;
            }
            Metro.getPlugin(el,"window").min(a);
        },

        max: function(el, a){
            if (!this.isWindow(el)) {
                return false;
            }
            Metro.getPlugin(el, "window").max(a);
        },

        show: function(el){
            if (!this.isWindow(el)) {
                return false;
            }
            Metro.getPlugin(el, "window").show();
        },

        hide: function(el){
            if (!this.isWindow(el)) {
                return false;
            }
            Metro.getPlugin(el, "window").hide();
        },

        toggle: function(el){
            if (!this.isWindow(el)) {
                return false;
            }
            Metro.getPlugin(el, "window").toggle();
        },

        isOpen: function(el){
            if (!this.isWindow(el)) {
                return false;
            }
            var win = Metro.getPlugin(el,"window");
            return win.isOpen();
        },

        close: function(el){
            if (!this.isWindow(el)) {
                return false;
            }
            Metro.getPlugin(el, "window").close();
        },

        pos: function(el, top, left){
            if (!this.isWindow(el)) {
                return false;
            }
            Metro.getPlugin(el, "window").pos(top, left);
        },

        top: function(el, top){
            if (!this.isWindow(el)) {
                return false;
            }
            Metro.getPlugin(el, "window").top(top);
        },

        left: function(el, left){
            if (!this.isWindow(el)) {
                return false;
            }
            Metro.getPlugin(el, "window").left(left);
        },

        width: function(el, width){
            if (!this.isWindow(el)) {
                return false;
            }
            Metro.getPlugin(el, "window").width(width);
        },

        height: function(el, height){
            if (!this.isWindow(el)) {
                return false;
            }
            Metro.getPlugin(el, "window").height(height);
        },

        create: function(options, parent){
            var w;

            w = $("<div>").appendTo(parent ? $(parent) : $("body"));

            var w_options = $.extend({
                _runtime: true
            }, (options ? options : {}));

            return Metro.makePlugin(w, "window", w_options);
        }
    };
}(Metro, m4q));