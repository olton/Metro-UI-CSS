(function ($) {

    "use strict";

    $.widget("metro.appbar", {
        version: "3.0.0",
        options: {
        },
        _create: function () {
            var that = this, element = this.element, o = this.options;

            $.each(element.data(), function (key, value) {
                if (key in o) {
                    try {
                        o[key] = $.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            this._initBar();

            element.data('appbar', this);

        },
        _checkFlexMenus: function (element) {
            var element = element || this.element;
            var that = element.data('appbar');
            var o = that.options;

            /* calculation base: appBarWidth minus all visible children */

            //get the base data for calculation
            var appBarWidth = $(element).width();

            var appBarElemsWidth = 0;
            //get the width of all visible children
            $(element).children(":visible").each(function () {
                appBarElemsWidth += $(this).outerWidth();
            });

            //if only one element left we can flex a little bit earlier
            var lastVisibleFlex = that.flexMenu.children(":visible").last();
            if (that.flexMenu.children().length - that.flexMenu.children(":visible").length === 1) {

                //do not do it, if we are over last child
                if (!(($(that.pull).offset().left) < $(lastVisibleFlex).offset().left + $(lastVisibleFlex).outerWidth())) {
                    appBarElemsWidth -= $(that.pull).outerWidth();

                }
            }



            if (appBarWidth < appBarElemsWidth) { //running out of space
                var menuEntryIndex = $(lastVisibleFlex).index();

                //hide the last element of flexmenu
                that.flexMenu.children(":eq(" + menuEntryIndex + ")").css("display", "none");

                //show the element in the hidden app bar menu
                that.flexMenuToggle.children(":eq(" + menuEntryIndex + ")").css("display", "");

                //do it again, for the case that the menu does not fit already
                if (that.flexMenu.children().not(":visible").length !== 0) {
                    that._checkFlexMenus(element);
                }
            } else {
                //if we have enough space we show it to the user

                var menuEntryIndex = $(lastVisibleFlex).index() + 1; //+1 is the next hidden one

                var nextVisible = that.flexMenu.children(":eq(" + menuEntryIndex + ")");

                //be sure,that this is really visible
                nextVisible.css("visibility", "hidden").css("display", "");
                appBarElemsWidth += nextVisible.outerWidth();
                nextVisible.css("visibility", "").css("display", "none");

                //we have the space
                if (appBarWidth > appBarElemsWidth) {
                    that.flexMenuToggle.children(":eq(" + menuEntryIndex + ")").css("display", "none");
                    nextVisible.css("display", "");
                    if (that.flexMenu.children().not(":visible").length !== 0) {
                        that._checkFlexMenus(element);
                    }
                } else { //running out of space again, we do not make it
                    nextVisible.css("display", "none");
                }


            }

            if (that.menu.length === 0 || that.flexMenu.children().not(":visible").length === 0) {
                that.pull.hide();
            } else {
                that.pull.show();
            }
        },
        _initBar: function () {
            var that = this, element = this.element, o = this.options;
            that.pull = $(element).find('.app-bar-pull');
            that.menu = $(element).find('.app-bar-menu').not(".flexible");

            //init calculations of flexmenu
            that.flexMenu = $(element).find('.app-bar-menu.flexible');
            if (that.flexMenu.length > 0) {
                //higher z-index für d-menu
                that.flexMenu.find(".d-menu").css({
                    zIndex: parseInt(that.flexMenu.find(".d-menu").css("z-index")) + 10
                });
                
                
                //Make a copy of the normal menu
                that.flexMenuToggle = that.flexMenu.clone().removeClass("flexible");
                that.flexMenuToggle.css("display", "none").children().css("display", "none");
                $(element).append(that.flexMenuToggle);
                //TODO: Check if there is a better way to init the widgets of the cloned element
                $.Metro.initWidgets();
                
                that.menu = that.menu.add(that.flexMenuToggle);

                element.data('appbar', that);

                //check for space /flex it
                this._checkFlexMenus(element);
            }

            if (that.pull.length > 0) {
                that.pull.on('click', function (e) {
                    that.menu.slideToggle('fast');
                    e.preventDefault();
                    e.stopPropagation();
                });
            }

            if (that.menu.length > 0) {
                $(window).resize(function () {
                    var device_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                    if (device_width > 800) {
                        $(".app-bar:not(.no-responsive-future) .app-bar-menu:not(.flexible)").show();
                    } else {
                        $(".app-bar:not(.no-responsive-future) .app-bar-menu:not(.flexible)").hide();
                    }
                    if (that.flexMenu.length > 0) {
                        //flexmenu works also while resizing
                        $(".app-bar:not(.no-responsive-future):has(.app-bar-menu.flexible)").each(function () {
                            that = $(this).data("appbar");
                            that._checkFlexMenus();

                        });
                    }
                });
            }

            element.data('appbar', that);
        },
        _destroy: function () {
        },
        _setOption: function (key, value) {
            this._super('_setOption', key, value);
        }
    });

})(jQuery);