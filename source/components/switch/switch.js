/**
 * global Metro, METRO_LOCALE, Cake
 *
 * @format
 */

(function (Metro, $) {
    "use strict";
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
        showOnOff: false,
        onSwitchCreate: Metro.noop,
    };

    Metro.switchSetup = function (options) {
        SwitchDefaultConfig = $.extend({}, SwitchDefaultConfig, options);
    };

    if (typeof globalThis["metroSwitchSetup"] !== undefined) {
        Metro.switchSetup(globalThis["metroSwitchSetup"]);
    }

    Metro.Component("switch", {
        init: function (options, elem) {
            this._super(elem, options, SwitchDefaultConfig, {});

            return this;
        },

        _create: function () {
            var element = this.element,
                o = this.options;

            const strings = this.strings;

            var container;
            var check = $("<span>").addClass("check");
            var caption = $("<span>").addClass("caption").html(o.caption);

            element.attr("type", "checkbox");

            if (element.attr("readonly") !== undefined) {
                element.on("click", function (e) {
                    e.preventDefault();
                });
            }

            container = element.wrap($("<label>").addClass((o.material === true ? " switch-material " : " switch ") + element[0].className));

            this.component = container;

            check.appendTo(container);
            caption.appendTo(container);

            if (o.transition === true) {
                container.addClass("transition-on");
            }

            if (o.captionPosition === "left") {
                container.addClass("caption-left");
            }

            element[0].className = "";

            container.addClass(o.clsSwitch);
            caption.addClass(o.clsCaption);
            check.addClass(o.clsCheck);

            if (element.is(":disabled")) {
                this.disable();
            } else {
                this.enable();
            }

            if (o.showOnOff) {
                const on = element.attr("data-on") || o.textOn || strings.label_on;
                const off = element.attr("data-off") || o.textOff || strings.label_off;

                check.attr("data-on", on);
                check.attr("data-off", off);
            } else {
                check.removeAttr("data-on");
                check.removeAttr("data-off");
            }

            this._fireEvent("switch-create");
        },

        disable: function () {
            this.element.prop("disabled", true);
        },

        enable: function () {
            this.element.prop("disabled", false);
        },

        toggleState: function () {
            var element = this.element;

            if (!element.is(":disabled")) {
                this.disable();
            } else {
                this.enable();
            }
        },

        toggle: function (v) {
            var element = this.element;

            if (element.is(":disabled")) return this;

            if (!Utils.isValue(v)) {
                element.prop("checked", !Utils.bool(element.prop("checked")));
            } else {
                element.prop("checked", v === 1);
            }

            return this;
        },

        changeAttribute: function (attr, newVal) {},

        destroy: function () {
            return this.element;
        },
    });
})(Metro, m4q);
