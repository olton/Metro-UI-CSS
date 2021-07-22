/* global Metro, METRO_LOCALE, Cake */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var SwitchDefaultConfig = {
        switchDeferred: 0,
        material: false,
        transition: true,
        caption: "",
        captionPosition: "right",
        clsSwitch: "",
        clsCheck: "",
        clsCaption: "",
        textOn: "",
        textOff: "",
        locale: METRO_LOCALE,
        showOnOff: false,
        onSwitchCreate: Metro.noop
    };

    Metro.switchSetup = function (options) {
        SwitchDefaultConfig = $.extend({}, SwitchDefaultConfig, options);
    };

    if (typeof window["metroSwitchSetup"] !== undefined) {
        Metro.switchSetup(window["metroSwitchSetup"]);
    }

    Metro.Component('switch', {
        init: function( options, elem ) {
            this._super(elem, options, SwitchDefaultConfig, {
                locale: null
            });

            return this;
        },

        _create: function(){
            var element = this.element, o = this.options;
            var container ;
            var check = $("<span>").addClass("check");
            var caption = $("<span>").addClass("caption").html(o.caption);

            element.attr("type", "checkbox");

            if (element.attr("readonly") !== undefined) {
                element.on("click", function(e){
                    e.preventDefault();
                })
            }

            container = element.wrap(
                $("<label>").addClass((o.material === true ? " switch-material " : " switch ") + element[0].className)
            );

            this.component = container;

            check.appendTo(container);
            caption.appendTo(container);

            if (o.transition === true) {
                container.addClass("transition-on");
            }

            if (o.captionPosition === 'left') {
                container.addClass("caption-left");
            }

            element[0].className = '';

            container.addClass(o.clsSwitch);
            caption.addClass(o.clsCaption);
            check.addClass(o.clsCheck);

            if (element.is(':disabled')) {
                this.disable();
            } else {
                this.enable();
            }

            this.i18n(o.locale);
            this._fireEvent("switch-create");
        },

        disable: function(){
            this.element.prop("disabled", true);
        },

        enable: function(){
            this.element.prop("disabled", false);
        },

        toggleState: function(){
            var element = this.element;

            if (!element.is(":disabled")) {
                this.disable();
            } else {
                this.enable();
            }
        },

        toggle: function(v){
            var element = this.element;

            if (element.is(":disabled")) return this;

            if (!Utils.isValue(v)) {
                element.prop("checked", !Utils.bool(element.prop("checked")));
            } else {
                element.prop("checked", v === 1);
            }

            return this;
        },

        changeLocale: function(where, val){
            var element = this.element, o = this.options;
            var check = element.siblings(".check");

            o["text"+Cake.capitalize(where)] = val

            check.attr("data-"+where, val);
        },

        i18n: function(locale){
            var element = this.element, o = this.options;
            var check = element.siblings(".check");
            var on, off;

            o.locale = locale;
            this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];

            if (o.showOnOff) {
                on = element.attr("data-on") || o.textOn || this.locale.switch.on;
                off = element.attr("data-off") || o.textOff || this.locale.switch.off;

                check.attr("data-on", on);
                check.attr("data-off", off);
            } else {
                check.removeAttr("data-on");
                check.removeAttr("data-off");
            }
        },

        changeAttribute: function(attr, newVal){
            switch (attr) {
                case 'data-on':
                case 'data-text-on': this.changeLocale('on', newVal); break;
                case 'data-off':
                case 'data-text-off': this.changeLocale('off', newVal); break;
            }
        },

        destroy: function(){
            return this.element;
        }
    });
}(Metro, m4q));