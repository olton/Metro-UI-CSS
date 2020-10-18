/* global Metro */
(function(Metro, $) {
    'use strict';

    var GradientBoxDefaultConfig = {
        gradientMode: "linear", // linear, radial
        gradientType: "",
        gradientPosition: "",
        gradientSize: "",
        gradientColors: "",
        onGradientBoxCreate: Metro.noop
    };

    Metro.gradientBoxSetup = function (options) {
        GradientBoxDefaultConfig = $.extend({}, GradientBoxDefaultConfig, options);
    };

    if (typeof window["metroGradientBoxSetup"] !== undefined) {
        Metro.gradientBoxSetup(window["metroGradientBoxSetup"]);
    }

    Metro.Component('gradient-box', {
        init: function( options, elem ) {
            this._super(elem, options, GradientBoxDefaultConfig, {
                // define instance vars here
                colors: [],
                type: "",
                size: "",
                position: "",
                mode: "linear",
                func: "linear-gradient"
            });
            return this;
        },

        _create: function(){
            var o = this.options;

            this.colors = o.gradientColors !== "" ? o.gradientColors.toArray(",") : ["#fff", "#000"];
            this.mode = o.gradientMode.toLowerCase();
            this.type = o.gradientType.toLowerCase();
            this.size = o.gradientSize.toLowerCase();
            this.func = this.mode + "-gradient";

            if (this.mode === "linear" && o.gradientPosition === "") {
                this.position = "to bottom";
            } else {
                this.position = o.gradientPosition.toLowerCase();
            }

            this._createStructure();
            this._setGradient();
            this._fireEvent('gradient-box-create');
        },

        _createStructure: function(){
            this.element.addClass("gradient-box");
        },

        _setGradient: function (){
            var element = this.element, o = this.options;
            var gradientFunc, gradientRule, gradientOptions = [];

            gradientFunc = o.gradientMode.toLowerCase() + "-gradient";

            if (this.type) {
                gradientOptions.push(this.type);
            }

            if (this.size) {
                gradientOptions.push(this.size);
            }

            if (this.position) {
                gradientOptions.push(this.position);
            }

            gradientRule = gradientFunc + "(" + (gradientOptions.length ? gradientOptions.join(" ") + ", " : "") + this.colors.join(", ") + ")";

            element.css({
                background: gradientRule
            });
        },

        changeAttribute: function(attr, newValue){
            if (attr.indexOf("data-gradient-") === -1) {
                return ;
            }

            switch (attr) {
                case "data-gradient-mode": this.func = newValue.toLowerCase() + "-gradient"; break;
                case "data-gradient-colors": this.colors = newValue ? newValue.toArray(",") : ["#fff", "#000"]; break;
                case "data-gradient-type": this.type = newValue.toLowerCase(); break;
                case "data-gradient-size": this.size = newValue.toLowerCase(); break;
                case "data-gradient-position": this.position = newValue.toLowerCase(); break;
            }

            this._setGradient();
        },

        destroy: function(){
            return this.element;
        }
    });
}(Metro, m4q));