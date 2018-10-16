var Window = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.win = null;
        this.overlay = null;
        this.position = {
            top: 0,
            left: 0
        };
        this.hidden = false;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onWindowCreate, [this.win, this.element]);

        return this;
    },

    dependencies: ['draggable', 'resizeable'],

    options: {
        hidden: false,
        width: "auto",
        height: "auto",
        btnClose: true,
        btnMin: true,
        btnMax: true,
        clsCaption: "",
        clsContent: "",
        clsWindow: "",
        draggable: true,
        dragElement: ".window-caption",
        dragArea: "parent",
        shadow: false,
        icon: "",
        title: "Window",
        content: "default",
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
        var win, overlay;
        var parent = o.dragArea === "parent" ? element.parent() : $(o.dragArea);

        if (o.modal === true) {
            o.btnMax = false;
            o.btnMin = false;
            o.resizable = false;
        }

        if (o.content === "default") {
            o.content = element;
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

        setTimeout(function(){
            that._setPosition();

            if (o.hidden !== true) {
                that.win.removeClass("no-visible");
            }
            Utils.exec(o.onShow, [win], win[0]);
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

        win = $("<div>").addClass("window");
        win.css({
            width: o.width,
            height: o.height,
            position: o.position,
            top: o.top,
            left: o.left
        });

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

        if (o.icon !== undefined) {
            icon = $("<span>").addClass("icon").html(o.icon);
            icon.appendTo(caption);
        }

        if (o.title !== undefined) {
            title = $("<span>").addClass("title").html(o.title);
            title.appendTo(caption);
        }

        if (o.content !== undefined && o.content !== 'original') {

            if (Utils.isUrl(o.content) && Utils.isVideoUrl(o.content)) {
                o.content = Utils.embedUrl(o.content);
            }

            if (!Utils.isJQueryObject(o.content) && Utils.isFunc(o.content)) {
                o.content = Utils.exec(o.content);
            }

            if (Utils.isJQueryObject(o.content)) {
                o.content.appendTo(content);
            } else {
                content.html(o.content);
            }
        }

        if (o.btnClose === true || o.btnMin === true || o.btnMax === true) {
            buttons = $("<div>").addClass("buttons");
            buttons.appendTo(caption);

            if (o.btnMax === true) {
                btnMax = $("<span>").addClass("btn-max");
                btnMax.appendTo(buttons);
            }

            if (o.btnMin === true) {
                btnMin = $("<span>").addClass("btn-min");
                btnMin.appendTo(buttons);
            }

            if (o.btnClose === true) {
                btnClose = $("<span>").addClass("btn-close");
                btnClose.appendTo(buttons);
            }
        }

        win.attr("id", o.id === undefined ? Utils.elementId("window") : o.id);

        if (o.resizable === true) {
            resizer = $("<span>").addClass("resize-element");
            resizer.appendTo(win);
            win.addClass("resizable");
        }

        win.on(Metro.events.dblclick, ".window-caption", function(e){
            that.maximized(e);
        });
        win.on(Metro.events.click, ".btn-max", function(e){
            that.maximized(e);
        });
        win.on(Metro.events.click, ".btn-min", function(e){
            that.minimized(e);
        });
        win.on(Metro.events.click, ".btn-close", function(e){
            that.close(e);
        });

        if (o.resizable === true) {
            win.resizable({
                resizeElement: ".resize-element",
                onResizeStart: o.onResizeStart,
                onResizeStop: o.onResizeStop,
                onResize: o.onResize
            });
        }

        if (o.draggable === true) {
            win.draggable({
                dragElement: o.dragElement,
                dragArea: o.dragArea,
                onDragStart: o.onDragStart,
                onDragStop: o.onDragStop,
                onDragMove: o.onDragMove
            })
        }

        win.addClass(o.clsWindow);
        caption.addClass(o.clsCaption);
        content.addClass(o.clsContent);

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
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    maximized: function(e){
        var win = this.win,  o = this.options;
        var target = $(e.currentTarget);
        win.toggleClass("maximized");
        if (target.hasClass("window-caption")) {
            Utils.exec(o.onCaptionDblClick, [win]);
        } else {
            Utils.exec(o.onMaxClick, [win]);
        }
    },

    minimized: function(){
        var win = this.win,  element = this.element, o = this.options;
        win.toggleClass("minimized");
        Utils.exec(o.onMinClick, [win], element[0]);
    },

    close: function(){
        var that = this, win = this.win,  element = this.element, o = this.options;
        var timer = null;

        if (Utils.exec(o.onCanClose, [win]) === false) {
            return false;
        }

        var timeout = 0;

        if (o.onClose !== Metro.noop) {
            timeout = 500;
        }

        Utils.exec(o.onClose, [win], element[0]);

        timer = setTimeout(function(){
            timer = null;
            if (o.modal === true) {
                win.siblings(".overlay").remove();
            }
            Utils.exec(o.onCloseClick, [win], element[0]);
            Utils.exec(o.onWindowDestroy, [win], element[0]);
            if (o.closeAction === Metro.actions.REMOVE) {
                win.remove();
            } else {
                that.hide();
            }

        }, timeout);
    },

    hide: function(){
        this.win.css({
            display: "none"
        });
    },
    show: function(){
        this.win.removeClass("no-visible");
        this.win.css({
            display: "flex"
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

    toggleButtons: function(a) {
        var win = this.win;
        var btnClose = win.find(".btn-close");
        var btnMin = win.find(".btn-min");
        var btnMax = win.find(".btn-max");

        if (a === "data-btn-close") {
            btnClose.toggle();
        }
        if (a === "data-btn-min") {
            btnMin.toggle();
        }
        if (a === "data-btn-max") {
            btnMax.toggle();
        }
    },

    changeSize: function(a){
        var element = this.element, win = this.win;
        if (a === "data-width") {
            win.css("width", element.data("width"));
        }
        if (a === "data-height") {
            win.css("height", element.data("height"));
        }
    },

    changeClass: function(a){
        var element = this.element, win = this.win, o = this.options;
        if (a === "data-cls-window") {
            win[0].className = "window " + (o.resizable ? " resizeable " : " ") + element.attr("data-cls-window");
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

    setContent: function(){
        var element = this.element, win = this.win;
        var content = element.attr("data-content");
        var result;

        if (!Utils.isJQueryObject(content) && Utils.isFunc(content)) {
            result = Utils.exec(content);
        } else if (Utils.isJQueryObject(content)) {
            result = content.html();
        } else {
            result = content;
        }

        win.find(".window-content").html(result);
    },

    setTitle: function(){
        var element = this.element, win = this.win;
        var title = element.attr("data-title");
        win.find(".window-caption .title").html(title);
    },

    setIcon: function(){
        var element = this.element, win = this.win;
        var icon = element.attr("data-icon");
        win.find(".window-caption .icon").html(icon);
    },

    getIcon: function(){
        return this.win.find(".window-caption .icon").html();
    },

    getTitle: function(){
        return this.win.find(".window-caption .title").html();
    },

    toggleDraggable: function(){
        var element = this.element, win = this.win;
        var flag = JSON.parse(element.attr("data-draggable"));
        var drag = win.data("draggable");
        if (flag === true) {
            drag.on();
        } else {
            drag.off();
        }
    },

    toggleResizable: function(){
        var element = this.element, win = this.win;
        var flag = JSON.parse(element.attr("data-resizable"));
        var resize = win.data("resizable");
        if (flag === true) {
            resize.on();
            win.find(".resize-element").removeClass("resize-element-disabled");
        } else {
            resize.off();
            win.find(".resize-element").addClass("resize-element-disabled");
        }
    },

    changeTopLeft: function(a){
        var element = this.element, win = this.win;
        var pos;
        if (a === "data-top") {
            pos = parseInt(element.attr("data-top"));
            if (!isNaN(pos)) {
                return ;
            }
            win.css("top", pos);
        }
        if (a === "data-left") {
            pos = parseInt(element.attr("data-left"));
            if (!isNaN(pos)) {
                return ;
            }
            win.css("left", pos);
        }
    },

    changePlace: function () {
        var element = this.element, win = this.win;
        var place = element.attr("data-place");
        win.addClass(place);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-btn-close":
            case "data-btn-min":
            case "data-btn-max": this.toggleButtons(attributeName); break;
            case "data-width":
            case "data-height": this.changeSize(attributeName); break;
            case "data-cls-window":
            case "data-cls-caption":
            case "data-cls-content": this.changeClass(attributeName); break;
            case "data-shadow": this.toggleShadow(); break;
            case "data-icon": this.setIcon(); break;
            case "data-title": this.setTitle(); break;
            case "data-content": this.setContent(); break;
            case "data-draggable": this.toggleDraggable(); break;
            case "data-resizable": this.toggleResizable(); break;
            case "data-top":
            case "data-left": this.changeTopLeft(attributeName); break;
            case "data-place": this.changePlace(); break;
        }
    }
};

Metro.plugin('window', Window);

Metro['window'] = {

    isWindow: function(el){
        return Utils.isMetroObject(el, "window");
    },

    min: function(el, a){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.min(a);
    },

    max: function(el, a){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.max(a);
    },

    show: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.show();
    },

    hide: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.hide();
    },

    toggle: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.toggle();
    },

    isOpen: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        return win.isOpen();
    },

    close: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.close();
    },

    create: function(options){
        var w;

        w = $("<div>").appendTo($("body"));

        var w_options = $.extend({}, {
        }, (options !== undefined ? options : {}));

        return w.window(w_options);
    }
};