/* global Metro */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var DropdownDefaultConfig = {
        dropdownDeferred: 0,
        dropFilter: null,
        toggleElement: null,
        noClose: false,
        duration: 50,
        openMode: "auto",
        onDrop: Metro.noop,
        onUp: Metro.noop,
        onDropdownCreate: Metro.noop
    };

    Metro.dropdownSetup = function (options) {
        DropdownDefaultConfig = $.extend({}, DropdownDefaultConfig, options);
    };

    if (typeof globalThis["metroDropdownSetup"] !== undefined) {
        Metro.dropdownSetup(globalThis["metroDropdownSetup"]);
    }

    Metro.Component('dropdown', {
        init: function( options, elem ) {
            this._super(elem, options, DropdownDefaultConfig, {
                _toggle: null,
                displayOrigin: null,
                isOpen: false
            });

            return this;
        },

        _create: function(){
            var that = this, element = this.element;

            this._createStructure();
            this._createEvents();

            this._fireEvent("dropdown-create", {
                element: element
            });

            if (element.hasClass("open")) {
                element.removeClass("open");
                setTimeout(function(){
                    that.open(true);
                },0);
            }
        },

        _createStructure: function(){
            var element = this.element, o = this.options;
            var toggle;
            
            if (o.openMode !== "auto" && o.openMode === "up") {
                element.addClass("drop-up");
            }

            toggle = o.toggleElement !== null ? $(o.toggleElement) : element.siblings('.dropdown-toggle').length > 0 ? element.siblings('.dropdown-toggle') : element.prev();

            this.displayOrigin = Utils.getStyleOne(element, "display");

            element.css("display", "none");

            this._toggle = toggle;
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            var toggle = this._toggle, parent = element.parent();

            toggle.on(Metro.events.click, function(e){
                $(".active-container").removeClass("active-container");

                // parent.siblings(parent[0].tagName).removeClass("active-container");

                if (element.css('display') !== 'none' && !element.hasClass('keep-open')) {
                    that._close(element);
                } else {
                    $('[data-role*=dropdown]').each(function(i, el){
                        if (!element.parents('[data-role*=dropdown]').is(el) && !$(el).hasClass('keep-open') && $(el).css('display') !== 'none') {
                            if (!Utils.isValue(o.dropFilter)) {
                                that._close(el);
                            } else {
                                if ($(el).closest(o.dropFilter).length > 0) {
                                    that._close(el);
                                }
                            }
                        }
                    });
                    if (element.hasClass('horizontal')) {
                        element.css({
                            'visibility': 'hidden',
                            'display': 'block'
                        });
                        var children_width = 0;
                        $.each(element.children('li'), function(){
                            children_width += $(this).outerWidth(true);
                        });

                        element.css({
                            'visibility': 'visible',
                            'display': 'none'
                        });
                        element.css('width', children_width);
                    }
                    that._open(element);
                    parent.addClass("active-container");
                }
                e.preventDefault();
                e.stopPropagation();
            });

            if (o.noClose === true) {
                element.addClass("keep-open").on(Metro.events.click, function (e) {
                    //e.preventDefault();
                    e.stopPropagation();
                });
            }

            $(element).find('li.disabled a').on(Metro.events.click, function(e){
                e.preventDefault();
            });
        },

        _close: function(el, immediate){
            el = $(el);

            var dropdown  = Metro.getPlugin(el, "dropdown");
            var toggle = dropdown._toggle;
            var options = dropdown.options;
            var func = "slideUp";

            toggle.removeClass('active-toggle').removeClass("active-control");
            dropdown.element.parent().removeClass("active-container");

            if (immediate) {
                func = 'hide'
            }

            el[func](immediate ? 0 : options.duration, function(){
                dropdown._fireEvent("close");
                dropdown._fireEvent("up");

                if (options.openMode === "auto") {
                    dropdown.element.removeClass("drop-up drop-as-dialog");
                } 
            });

            this.isOpen = false;
        },

        // TODO Add control: if no space for drop-down and no space for drop-up, element will must drop-down
        _open: function(el, immediate){
            el = $(el);

            var dropdown  = Metro.getPlugin(el, "dropdown");
            var toggle = dropdown._toggle;
            var options = dropdown.options;
            var func = "slideDown";

            toggle.addClass('active-toggle').addClass("active-control");

            el[func](immediate ? 0 : options.duration, function(){
                
                if (options.openMode === "auto") {
                    if (!Metro.utils.inViewport(dropdown.element[0])) {
                        dropdown.element.addClass("drop-up");
                    }
                    if (!Metro.utils.inViewport(dropdown.element[0])) {
                        dropdown.element.removeClass("drop-up").addClass("drop-as-dialog");
                    }
                }

                dropdown._fireEvent("open");
                dropdown._fireEvent("drop");
            });

            this.isOpen = true;
        },

        close: function(immediate){
            this._close(this.element, immediate);
        },

        open: function(immediate){
            this._open(this.element, immediate);
        },

        toggle: function(){
            if (this.isOpen)
                this.close();
            else
                this.open();
        },

        /* eslint-disable-next-line */
        changeAttribute: function(){
        },

        destroy: function(){
            this._toggle.off(Metro.events.click);
        }
    });

    $(document).on(Metro.events.click, function(){
        $('[data-role*=dropdown]').each(function(){
            var el = $(this);

            if (el.css('display')!=='none' && !el.hasClass('keep-open') && !el.hasClass('stay-open') && !el.hasClass('ignore-document-click')) {
                Metro.getPlugin(el, 'dropdown').close();
            }
        });
    });
}(Metro, m4q));