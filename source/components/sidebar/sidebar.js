/* global Metro, METRO_ANIMATION_DURATION */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
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

    Metro.Component('sidebar', {
        init: function( options, elem ) {
            this._super(elem, options, SidebarDefaultConfig, {
                toggle_element: null,
                id: Utils.elementId('sidebar')
            });

            return this;
        },

        _create: function(){
            var element = this.element;

            this._createStructure();
            this._createEvents();
            $(window).resize();
            this._checkStatic();

            this._fireEvent("sidebar-create", {
                element: element
            });
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

                this._fireEvent("static-set");
            }
            if (!Utils.mediaExist(o.static)) {
                element.removeClass("static");
                this._fireEvent("static-loss");
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

            this._fireEvent("open");
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

            this._fireEvent("close");
        },

        toggle: function(){
            if (this.isOpen()) {
                this.close();
            } else {
                this.open();
            }

            this._fireEvent("toggle");
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
}(Metro, m4q));