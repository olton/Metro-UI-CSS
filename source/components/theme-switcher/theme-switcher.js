(function(Metro, $) {
    'use strict';

    var STATE = {
        LIGHT: "light",
        DARK: "dark",
    }

    var ThemeSwitcherDefaultConfig = {
        state: STATE.LIGHT,
        target: "html",
        clsDark: "",
        onThemeSwitcherCreate: Metro.noop
    };

    Metro.themeSwitcherSetup = function (options) {
        ThemeSwitcherDefaultConfig = $.extend({}, ThemeSwitcherDefaultConfig, options);
    };

    if (typeof window["metroThemeSwitcherSetup"] !== undefined) {
        Metro.themeSwitcherSetup(window["metroThemeSwitcherSetup"]);
    }

    Metro.Component('theme-switcher', {
        init: function( options, elem ) {
            this._super(elem, options, ThemeSwitcherDefaultConfig, {
                container: null,
                state: null,
                target: null,
            });
            this.state = this.options.state;
            return this;
        },

        _create: function(){
            this._createStructure();
            this._createEvents();

            this._fireEvent('theme-switcher-create');
        },

        _createStructure: function(){
            const that = this, element = this.element, elem = this.elem,  o = this.options;
            const check = $("<span>").addClass("check");

            element.attr("type", "checkbox")

            this.container = element.wrap(
                $("<label>").addClass("theme-switcher")
            )

            check.appendTo(this.container)

            this.target = $(o.target)
            if (this.target.length === 0) {
                this.target = $("html");
            }

            this._setState(o.state === STATE.DARK)
            this._updateState()
        },

        _createEvents: function(){
            const that = this, elem = this.elem, o = this.options;
            this.container.on("click", (e) => {
                this._updateState()
            })
        },

        _setState: function(state = false){
            this.elem.checked = state
        },

        _updateState: function(){
            if (this.elem.checked) {
                this.target.addClass("dark-side").addClass(this.options.clsDark);
            } else {
                this.target.removeClass("dark-side").addClass(this.options.clsDark);
            }
        },

        changeAttribute: function(attr, newValue){
            if (attr === "data-target") {
                this.target = $(newValue)
                this._updateState()
            }
        },

        destroy: function(){
            this.container.remove();
        }
    });
}(Metro, m4q));