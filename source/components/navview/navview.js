/* global Metro */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var NavigationViewDefaultConfig = {
        navviewDeferred: 0,
        compact: "md",
        expand: "lg",
        toggle: null,
        activeState: false,
        onMenuItemClick: Metro.noop,
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
                if (that.pane.width() === 48) {
                    element.addClass("js-compact");
                } else {
                    element.removeClass("js-compact");
                }
                that._calcMenuHeight();
            }, 200);
        },

        _createStructure: function(){
            var element = this.element, o = this.options;
            var pane, content, toggle, menu/*, menu_container, menu_h, menu_container_h*/;

            element
                .addClass("navview")
                .addClass(o.compact !== false ? "navview-compact-"+o.compact : "")
                .addClass(o.expand !== false ? "navview-expand-"+o.expand : "");

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

                if (pane_width > 48 /*|| !element.hasClass("compacted") */) {
                    return false;
                }

                if(dir === -1 && Math.abs(top) <= distance) {
                    menu.css('top', parseInt(menu.css('top')) + step * dir);
                }

                if(dir === 1 && top <= -step) {
                    menu.css('top', parseInt(menu.css('top')) + step * dir);
                }
            });

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

                that._fireEvent("menu-item-click", {
                    item: this
                });

            });

            if (this.paneToggle !== null) {
                this.paneToggle.on(Metro.events.click, function(){
                    that.pane.toggleClass("open");
                })
            }

            $(window).on(Metro.events.resize, function(){
                var menu_h, menu_container_h,
                    menu_container = element.children(".navview-menu-container"),
                    menu;

                if (that.pane.hasClass("open")) {
                    that._recalc();
                    return ;
                }

                element.removeClass("expanded");
                that.pane.removeClass("open");

                if ($(this).width() <= Metro.media_sizes[(""+o.compact).toUpperCase()]) {
                    element.removeClass("compacted");
                }

                if (menu_container.length) {
                    menu = menu_container.children(".navview-menu");
                    setTimeout(function () {
                        menu_h = menu.height();
                        menu_container_h = menu_container.height();
                        that.menuScrollStep = menu.children(":not(.item-separator), :not(.item-header)")[0].clientHeight;
                        that.menuScrollDistance = menu_h > menu_container_h ? Utils.nearest(menu_h - menu_container_h, that.menuScrollStep) : 0;
                    }, 0);
                }

                that._recalc();

            }, {ns: this.id})
        },

        _togglePaneMode: function(){
            var element = this.element;
            var pane = this.pane;
            var pane_compact = pane.width() < 280;

            if ((pane_compact || element.hasClass("expanded")) && !element.hasClass("compacted")) {
                element.toggleClass("expanded");
            } else

            if (element.hasClass("compacted") || !pane_compact) {
                element.toggleClass("compacted");
            }

        },

        pullClick: function(el){
            var that = this;
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
            } else {
                this._togglePaneMode();
            }

            this._recalc();

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

        toggleMode: function(){
            this._togglePaneMode();
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
}(Metro, m4q));