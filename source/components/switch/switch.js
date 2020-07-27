/* global Metro */
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
            this._super(elem, options, SwitchDefaultConfig);

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

            check.appendTo(container);
            caption.appendTo(container);

            if (element.attr("data-on")) check.attr("data-on", element.attr("data-on"));
            if (element.attr("data-off")) check.attr("data-off", element.attr("data-off"));

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

            this._fireEvent("switch-create");
        },

        disable: function(){
            this.element.data("disabled", true);
            this.element.parent().addClass("disabled");
        },

        enable: function(){
            this.element.data("disabled", false);
            this.element.parent().removeClass("disabled");
        },

        toggleState: function(){
            if (this.elem.disabled) {
                this.disable();
            } else {
                this.enable();
            }
        },

        toggle: function(v){
            var element = this.element;

            if (!Utils.isValue(v)) {
                element.prop("checked", !Utils.bool(element.prop("checked")));
            } else {
                element.prop("checked", v === 1);
            }

            return this;
        },

        changeAttribute: function(attributeName){
            switch (attributeName) {
                case 'disabled': this.toggleState(); break;
            }
        },

        destroy: function(){
            return this.element;
        }
    });
}(Metro, m4q));