/* global Metro */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var NavigationViewDefaultConfig = {
        navviewDeferred: 0,
        expandPoint: null,
        compacted: false,
        toggle: null,
        animate: true,
        activeState: true,
        initialView: "expand",
        onMenuItemClick: Metro.noop,
        onPaneClose: Metro.noop,
        onBeforePaneClose: Metro.noop,
        onPaneOpen: Metro.noop,
        onBeforePaneOpen: Metro.noop,
        onNavviewCreate: Metro.noop
    };

    Metro.navViewSetup = function (options) {
        NavigationViewDefaultConfig = $.extend({}, NavigationViewDefaultConfig, options);
    };

    if (typeof window["metroNavViewSetup"] !== undefined) {
        Metro.navViewSetup(window["metroNavViewSetup"]);
    }

    Metro.Component('nav-view', {
        init: function( options, elem ) {
            this._super(elem, options, NavigationViewDefaultConfig, {
                pane: null,
                content: null,
                paneToggle: null,
                id: Utils.elementId("navview"),
                menuScrollDistance: 0,
                menuScrollStep: 0
            });

            return this;
        },

        _create: function(){
            this._createStructure();
            this._createEvents();

            this._fireEvent("navview-create");
        },

        _calcMenuHeight: function(){
            var element = this.element, pane, menu_container;
            var elements_height = 0;

            pane = element.children(".navview-pane");
            if (pane.length === 0) {
                return;
            }

            menu_container = pane.children(".navview-menu-container");

            if (menu_container.length === 0) {
                return ;
            }

            $.each(menu_container.prevAll(), function(){
                elements_height += $(this).outerHeight(true);
            });

            $.each(menu_container.nextAll(), function(){
                elements_height += $(this).outerHeight(true);
            });

            menu_container.css({
                height: "calc(100% - "+(elements_height)+"px)"
            });

            this.menuScrollStep = 48;
            this.menuScrollDistance = Utils.nearest(menu_container[0].scrollHeight - menu_container.height(), 48);
        },

        _recalc: function(){
            var that = this, element = this.element;
            setTimeout(function(){
                that._calcMenuHeight();
            }, 200);
        },

        _createStructure: function(){
            var element = this.element, o = this.options;
            var pane, content, toggle, menu;

            element.addClass("navview")

            if (o.initialView !== 'compact') {
                element.addClass("expanded");
            } else {
                element.addClass("compacted handmade");
            }

            pane = element.children(".navview-pane");
            content = element.children(".navview-content");
            toggle = $(o.toggle);
            menu = pane.children(".navview-menu");

            if (menu.length) {
                menu.prevAll().reverse().wrapAll($("<div>").addClass("navview-container"));
                menu.wrap($("<div>").addClass("navview-menu-container"));
            }

            this.pane = pane.length > 0 ? pane : null;
            this.content = content.length > 0 ? content : null;
            this.paneToggle = toggle.length > 0 ? toggle : null;

            if (o.animate) {
                element.addClass("animate-panes")
            }

            this._recalc();
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            var menu_container = element.find(".navview-menu-container");
            var menu = menu_container.children(".navview-menu");

            menu_container.on("mousewheel", function(e){
                var pane_width = element.find(".navview-pane").width();
                var dir = e.deltaY > 0 ? -1 : 1;
                var step = that.menuScrollStep;
                var distance = that.menuScrollDistance;
                var top = parseInt(menu.css('top'));

                if (pane_width > 50) {
                    return false;
                }

                if(dir === -1 && Math.abs(top) <= distance) {
                    menu.css('top', parseInt(menu.css('top')) + step * dir);
                }

                if(dir === 1 && top <= -step) {
                    menu.css('top', parseInt(menu.css('top')) + step * dir);
                }
            }, {
                passive: true
            });

            element.on(Metro.events.click, ".pull-button", function(){
                that._pullClick(this, 'pull');
            });

            element.on(Metro.events.click, ".holder", function(){
                that._pullClick(this, 'holder');
            });

            element.on(Metro.events.click, ".navview-menu li", function(){
                if (o.activeState === true) {
                    element.find(".navview-menu li.active").removeClass("active");
                    $(this).toggleClass("active");
                }
            });

            element.on(Metro.events.click, ".navview-menu li > a", function(){
                that._fireEvent("menu-item-click", {
                    item: this
                });
            });

            if (this.paneToggle !== null) {
                this.paneToggle.on(Metro.events.click, function(){
                    that.pane.toggleClass("open");
                })
            }

            $(window).on(Metro.events.resize, () => {
                this._recalc();

                if (!element.hasClass("handmade")) {
                    if (Metro.utils.isValue(o.expandPoint) && Metro.utils.mediaExist(o.expandPoint)) {
                        element.removeClass("compacted");
                        element.addClass("expanded");
                    } else {
                        element.removeClass("expanded");
                        element.addClass("compacted");
                    }
                }
            }, {ns: this.id})
        },

        _togglePaneMode: function(hand = false){
            var element = this.element, o = this.options;
            var pane = this.pane;

            element.toggleClass("expanded");
            element.toggleClass("compacted");
            element.toggleClass("handmade");

            if (element.hasClass("compacted")) {
                Metro.utils.exec(o.onPaneClose, null, this)
            } else {
                Metro.utils.exec(o.onPaneOpen, null, this)
            }
        },

        _pullClick: function(el, sender){
            var input, target = $(el);

            if (target && target.hasClass("holder")) {
                input = target.parent().find("input");
                setTimeout(function(){
                    input.focus();
                }, 200);
            }

            this._togglePaneMode(sender === 'pull');

            this._recalc();

            return true;
        },

        toggle: function(){
            this._togglePaneMode();
        },

        compact: function(){
            const element = this.element, o = this.options;
            element.addClass("compacted handmade")
            element.removeClass("expanded")
            this._recalc()
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

            element.remove();
        }
    });
}(Metro, m4q));