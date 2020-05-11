/* global Metro, Utils, Component, METRO_ANIMATION_DURATION */
var SidebarDefaultConfig = {
    menuScrollbar: false,
    sidebarDeferred: 0,
    shadow: true,
    position: "left",
    size: 290,
    shift: null,
    staticShift: null,
    toggle: null,
    duration: METRO_ANIMATION_DURATION,
    static: null,
    menuItemClick: true,
    onOpen: Metro.noop,
    onClose: Metro.noop,
    onToggle: Metro.noop,
    onStaticSet: Metro.noop,
    onStaticLoss: Metro.noop,
    onSidebarCreate: Metro.noop
};

Metro.sidebarSetup = function (options) {
    SidebarDefaultConfig = $.extend({}, SidebarDefaultConfig, options);
};

if (typeof window["metroSidebarSetup"] !== undefined) {
    Metro.sidebarSetup(window["metroSidebarSetup"]);
}

Component('sidebar', {
    init: function( options, elem ) {
        this._super(elem, options, SidebarDefaultConfig);

        this.toggle_element = null;
        this.id = Utils.elementId('sidebar');

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, this.name);

        this._createStructure();
        this._createEvents();
        $(window).resize();
        this._checkStatic();

        Utils.exec(o.onSidebarCreate, null, element[0]);
        element.fire("sidebarcreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var header = element.find(".sidebar-header");
        var sheet = Metro.sheet;
        var menu = element.find(".sidebar-menu");

        element.addClass("sidebar").addClass("on-"+o.position);

        if (o.menuScrollbar === false) {
            menu.addClass("hide-scroll");
        }

        if (o.size !== 290) {
            Utils.addCssRule(sheet, ".sidebar", "width: " + o.size + "px;");

            if (o.position === "left") {
                Utils.addCssRule(sheet, ".sidebar.on-left", "left: " + -o.size + "px;");
            } else {
                Utils.addCssRule(sheet, ".sidebar.on-right", "right: " + -o.size + "px;");
            }
        }

        if (o.shadow === true) {
            element.addClass("sidebar-shadow");
        }

        if (o.toggle !== null && $(o.toggle).length > 0) {
            this.toggle_element = $(o.toggle);
        }

        if (header.length > 0) {
            if (header.data("image") !== undefined) {
                header.css({
                    backgroundImage: "url("+header.data("image")+")"
                });
            }
        }

        if (o.static !== null) {
            if (o.staticShift !== null) {
                if (o.position === 'left') {
                    Utils.addCssRule(sheet, "@media screen and " + Metro.media_queries[o.static.toUpperCase()], o.staticShift + "{margin-left: " + o.size + "px; width: calc(100% - " + o.size + "px);}");
                } else {
                    Utils.addCssRule(sheet, "@media screen and " + Metro.media_queries[o.static.toUpperCase()], o.staticShift + "{margin-right: " + o.size + "px; width: calc(100% - " + o.size + "px);}");
                }
            }
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var toggle = this.toggle_element;

        if (toggle !== null) {
            toggle.on(Metro.events.click, function(e){
                that.toggle();
                e.stopPropagation();
            });
        } else if (o.toggle) {
            $.document().on("click", o.toggle, function (e) {
                that.toggle();
                e.stopPropagation();
            })
        }

        if (o.static !== null && ["fs", "sm", "md", "lg", "xl", "xxl"].indexOf(o.static) > -1) {
            $(window).on(Metro.events.resize,function(){
                that._checkStatic();
            }, {ns: this.id});
        }

        if (o.menuItemClick === true) {
            element.on(Metro.events.click, ".sidebar-menu li > a", function(e){
                that.close();
                e.stopPropagation();
            });
        }

        element.on(Metro.events.click, ".sidebar-menu .js-sidebar-close", function(e){
            that.close();
            e.stopPropagation();
        });

        element.on(Metro.events.click, function(e){
            e.stopPropagation();
        });
    },

    _checkStatic: function(){
        var element = this.element, o = this.options;
        if (Utils.mediaExist(o.static) && !element.hasClass("static")) {
            element.addClass("static");
            element.data("opened", false).removeClass('open');
            if (o.shift !== null) {
                $.each(o.shift.split(","), function(){
                    $(this)
                        .animate({
                            draw: {
                                left: 0
                            },
                            dur: o.duration
                        })
                });
            }
            Utils.exec(o.onStaticSet, null, element[0]);
            element.fire("staticset");
        }
        if (!Utils.mediaExist(o.static)) {
            element.removeClass("static");
            Utils.exec(o.onStaticLoss, null, element[0]);
            element.fire("staticloss");
        }
    },

    isOpen: function(){
        return this.element.data("opened") === true;
    },

    open: function(){
        var element = this.element, o = this.options;

        if (element.hasClass("static")) {
            return ;
        }

        element.data("opened", true).addClass('open');

        if (o.shift !== null) {
            $(o.shift)
                .animate({
                    draw: {
                        left: element.outerWidth()
                    },
                    dur: o.duration
                });
        }

        Utils.exec(o.onOpen, null, element[0]);
        element.fire("open");
    },

    close: function(){
        var element = this.element, o = this.options;

        if (element.hasClass("static")) {
            return ;
        }

        element.data("opened", false).removeClass('open');

        if (o.shift !== null) {
            $(o.shift)
                .animate({
                    draw: {
                        left: 0
                    },
                    dur: o.duration
                });
        }

        Utils.exec(o.onClose, null, element[0]);
        element.fire("close");
    },

    toggle: function(){
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
        Utils.exec(this.options.onToggle, null, this.element[0]);
        this.element.fire("toggle");
    },

    changeAttribute: function(){
    },

    destroy: function(){
        var element = this.element, o = this.options;
        var toggle = this.toggle_element;

        if (toggle !== null) {
            toggle.off(Metro.events.click);
        }

        if (o.static !== null && ["fs", "sm", "md", "lg", "xl", "xxl"].indexOf(o.static) > -1) {
            $(window).off(Metro.events.resize, {ns: this.id});
        }

        if (o.menuItemClick === true) {
            element.off(Metro.events.click, ".sidebar-menu li > a");
        }

        element.off(Metro.events.click, ".sidebar-menu .js-sidebar-close");

        return element;
    }
});

Metro['sidebar'] = {
    isSidebar: function(el){
        return Utils.isMetroObject(el, "sidebar");
    },

    open: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        Metro.getPlugin(el, "sidebar").open();
    },

    close: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        Metro.getPlugin(el, "sidebar").close();
    },

    toggle: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        Metro.getPlugin(el, "sidebar").toggle();
    },

    isOpen: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        return Metro.getPlugin(el, "sidebar").isOpen();
    }
};