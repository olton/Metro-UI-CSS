/* global Metro, Utils, Component */
var NavigationViewDefaultConfig = {
    navviewDeferred: 0,
    compact: "md",
    expand: "lg",
    toggle: null,
    activeState: false,
    onMenuItemClick: Metro.noop,
    onNavViewCreate: Metro.noop
};

Metro.navViewSetup = function (options) {
    NavigationViewDefaultConfig = $.extend({}, NavigationViewDefaultConfig, options);
};

if (typeof window["metroNavViewSetup"] !== undefined) {
    Metro.navViewSetup(window["metroNavViewSetup"]);
}

Component('nav-view', {
    init: function( options, elem ) {
        this._super(elem, options, NavigationViewDefaultConfig);

        this.pane = null;
        this.content = null;
        this.paneToggle = null;
        this.id = Utils.elementId("navview");
        this.menuScrollDistance = 0;
        this.menuScrollStep = 0;

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, this.name);

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onNavViewCreate, null, element[0]);
        element.fire("navviewcreate");
    },

    _calcMenuHeight: function(){
        var element = this.element, pane, menu;
        var elements_height = 0;

        pane = element.children(".navview-pane");
        if (pane.length === 0) {
            return;
        }

        menu = pane.children(".navview-menu-container");

        if (menu.length === 0) {
            return ;
        }

        $.each(menu.prevAll(), function(){
            elements_height += $(this).outerHeight(true);
        });
        $.each(menu.nextAll(), function(){
            elements_height += $(this).outerHeight(true);
        });
        menu.css({
            height: "calc(100% - "+(elements_height)+"px)"
        });
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var pane, content, toggle, menu, menu_container, menu_h, menu_container_h;
        var other_pane_container, prev;

        element
            .addClass("navview")
            .addClass(o.compact !== false ? "navview-compact-"+o.compact : "")
            .addClass(o.expand !== false ? "navview-expand-"+o.expand : "");

        pane = element.children(".navview-pane");
        content = element.children(".navview-content");
        toggle = $(o.toggle);
        menu = pane.children(".navview-menu");

        if (menu.length) {
            prev = menu.prevAll();
            other_pane_container = $("<div>").addClass("navview-container");
            other_pane_container.append(prev.reverse());
            pane.prepend(other_pane_container);

            menu_container = $("<div>").addClass("navview-menu-container").insertBefore(menu);
            menu.appendTo(menu_container);
        }

        this._calcMenuHeight();

        if (menu.length) {
            setTimeout(function(){
                menu_h = menu.height();
                menu_container_h = menu_container.height();
                that.menuScrollStep = menu.children(":not(.item-separator), :not(.item-header)")[0].clientHeight;
                that.menuScrollDistance = menu_h > menu_container_h ? Utils.nearest(menu_h - menu_container_h, that.menuScrollStep) : 0;
            }, 0)
        }

        this.pane = pane.length > 0 ? pane : null;
        this.content = content.length > 0 ? content : null;
        this.paneToggle = toggle.length > 0 ? toggle : null;

        setTimeout(function(){
            if (that.pane.width() === 48) {
                element.addClass("js-compact");
            } else {
                element.removeClass("js-compact");
            }
        }, 200);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var menu_container = element.find(".navview-menu-container");
        var menu = menu_container.children(".navview-menu");

        if (menu_container.length) {
            menu_container.on("mousewheel", function(e){
                var dir = e.deltaY > 0 ? -1 : 1;
                var step = that.menuScrollStep;
                var top = parseInt(menu.css('top'));

                if (!element.hasClass("compacted")) {
                    return false;
                }

                if(dir === -1 && Math.abs(top) <= that.menuScrollDistance) {
                    menu.css('top', parseInt(menu.css('top')) + step * dir);
                }

                if(dir === 1 && top <= -step) {
                    menu.css('top', parseInt(menu.css('top')) + step * dir);
                }
            });
        }

        element.on(Metro.events.click, ".pull-button, .holder", function(){
            that.pullClick(this);
        });

        element.on(Metro.events.click, ".navview-menu li", function(){
            if (o.activeState === true) {
                element.find(".navview-menu li").removeClass("active");
                $(this).toggleClass("active");
            }
        });

        element.on(Metro.events.click, ".navview-menu li > a", function(){
            Utils.exec(o.onMenuItemClick, null, this);
            element.fire("menuitemclick", {
                item: this
            });
        });

        if (this.paneToggle !== null) {
            this.paneToggle.on(Metro.events.click, function(){
                that.pane.toggleClass("open");
            })
        }

        $(window).on(Metro.events.resize, function(){
            var menu_h, menu_container_h, menu_container = element.children(".navview-menu-container"), menu;

            element.removeClass("expanded");
            that.pane.removeClass("open");

            if ($(this).width() <= Metro.media_sizes[String(o.compact).toUpperCase()]) {
                element.removeClass("compacted");
            }

            if (menu_container.length) {

                that._calcMenuHeight();

                menu = menu_container.children(".navview-menu");

                setTimeout(function () {
                    menu_h = menu.height();
                    menu_container_h = menu_container.height();
                    that.menuScrollStep = menu.children(":not(.item-separator), :not(.item-header)")[0].clientHeight;
                    that.menuScrollDistance = menu_h > menu_container_h ? Utils.nearest(menu_h - menu_container_h, that.menuScrollStep) : 0;
                }, 0);
            }

            element.removeClass("js-compact");

            setTimeout(function(){
                if (that.pane.width() === 48) {
                    element.addClass("js-compact");
                }
            }, 200);

        }, {ns: this.id})
    },

    pullClick: function(el){
        var that = this, element = this.element;
        var pane = this.pane;
        var pane_compact = pane.width() < 280;
        var input;

        var target = $(el);

        if (target && target.hasClass("holder")) {
            input = target.parent().find("input");
            setTimeout(function(){
                input.focus();
            }, 200);
        }

        if (that.pane.hasClass("open")) {
            that.close();
        } else

        if ((pane_compact || element.hasClass("expanded")) && !element.hasClass("compacted")) {
            element.toggleClass("expanded");
        } else

        if (element.hasClass("compacted") || !pane_compact) {
            element.toggleClass("compacted");
        }

        setTimeout(function(){
            if (that.pane.width() === 48) {
                element.addClass("js-compact");
            } else {
                element.removeClass("js-compact");
            }
        }, 200);

        return true;
    },

    open: function(){
        this.pane.addClass("open");
    },

    close: function(){
        this.pane.removeClass("open");
    },

    toggle: function(){
        var pane = this.pane;
        pane.hasClass("open") ? pane.removeClass("open") : pane.addClass("open");
    },

    /* eslint-disable-next-line */
    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.click, ".pull-button, .holder");
        element.off(Metro.events.click, ".navview-menu li");
        element.off(Metro.events.click, ".navview-menu li > a");

        if (this.paneToggle !== null) {
            this.paneToggle.off(Metro.events.click);
        }

        $(window).off(Metro.events.resize,{ns: this.id});

        return element;
    }
});
