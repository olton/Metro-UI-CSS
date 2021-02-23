/* global Metro */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var KeylockDefaultConfig = {
        keylockDeferred: 0,

        stateOnIcon: "<span>&times;</span>",
        stateOffIcon: "<span>&checkmark;</span>",

        transition: true,

        onCaption: "",
        offCaption: "",
        captionPosition: "right",

        clsKeylock: "",
        clsStateOn: "",
        clsStateOff: "",
        clsCaption: "",
        clsIcon: "",
        clsOnCaption: "",
        clsOffCaption: "",

        onKeylockCreate: Metro.noop
    };

    Metro.keylockSetup = function (options) {
        KeylockDefaultConfig = $.extend({}, KeylockDefaultConfig, options);
    };

    if (typeof window["metroKeylockSetup"] !== undefined) {
        Metro.keylockSetup(window["metroKeylockSetup"]);
    }

    Metro.Component('keylock', {
        init: function( options, elem ) {
            this._super(elem, options, KeylockDefaultConfig);

            return this;
        },

        _create: function(){
            var element = this.element, o = this.options;
            var container;
            var icon = $("<span>").addClass("icon").addClass(o.clsIcon);
            var caption = $("<span>").addClass("caption").addClass(o.clsCaption);
            var stateOnIcon = $(o.stateOnIcon).addClass("state-on").addClass(o.clsStateOn);
            var stateOffIcon = $(o.stateOffIcon).addClass("state-off").addClass(o.clsStateOff);
            var onCaption = $("<span>").addClass("state-on").addClass(o.clsOnCaption).html(o.onCaption);
            var offCaption = $("<span>").addClass("state-off").addClass(o.clsOffCaption).html(o.offCaption);

            element.attr("type", "checkbox");

            if (element.attr("readonly") !== undefined) {
                element.on("click", function(e){
                    e.preventDefault();
                })
            }

            container = element.wrap(
                $("<label>").addClass("keylock").addClass(o.clsKeylock)
            );

            icon.appendTo(container);
            caption.appendTo(container);

            stateOnIcon.appendTo(icon);
            stateOffIcon.appendTo(icon);

            onCaption.appendTo(caption);
            offCaption.appendTo(caption);

            if (o.transition === true) {
                container.addClass("transition-on");
            }

            if (o.captionPosition === 'left') {
                container.addClass("caption-left");
            }

            element[0].className = '';

            if (element.is(':disabled')) {
                this.disable();
            } else {
                this.enable();
            }

            this._fireEvent("keylock-create");
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