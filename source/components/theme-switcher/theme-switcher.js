(function(Metro, $) {
    'use strict';

    var STATE = {
        LIGHT: "light",
        DARK: "dark",
    }

    var ThemeSwitcherDefaultConfig = {
        state: STATE.LIGHT,
        target: "html",
        saveState: true,
        saveStateKey: "THEME:SWITCHER",
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
            const element = this.element, o = this.options;
            let initState = 'light'

            if (o.saveState) {
                initState = Metro.storage.getItem(o.saveStateKey, false)
            }

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

            this._setState(o.saveState ? initState : o.state === STATE.DARK )
            this._updateState()
        },

        _createEvents: function(){
            this.container.on("click", () => {
                this._updateState()
            })
        },

        _setState: function(state = false){
            this.elem.checked = state
        },

        _updateState: function(){
            const o = this.options, elem = this.elem, target = this.target;

            if (elem.checked) {
                target.addClass("dark-side").addClass(this.options.clsDark);
            } else {
                target.removeClass("dark-side").addClass(this.options.clsDark);
            }

            if (o.saveState) {
                Metro.storage.setItem(o.saveStateKey, elem.checked)
            }
        },

        val: function(value){
            if (typeof value === undefined) {
                return this.elem.checked ? 'dark' : 'light';
            }
            this._setState(typeof value === "boolean" ? value : value === 'dark');
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