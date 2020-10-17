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
                colors: []
            });
            return this;
        },

        _create: function(){
            var o = this.options;

            this.colors = o.gradientColors !== "" ? o.gradientColors.toArray(",") : ["#fff", "#000"];

            console.log(this.colors);

            this._createStructure();

            this._fireEvent('gradient-box-create');
        },

        _createStructure: function(){
            var element = this.element, o = this.options;
            var gradientFunc, gradientRule, gradientOptions = [];

            gradientFunc = o.gradientMode.toLowerCase() + "-gradient";

            if (o.gradientType !== "") {
                gradientOptions.push(o.gradientType);
            }

            if (o.gradientSize !== "") {
                gradientOptions.push(o.gradientSize);
            }

            if (gradientFunc === "linear-gradient" && o.gradientPosition === "") {
                o.gradientPosition = "to bottom";
            }
            if (o.gradientPosition !== "") {
                gradientOptions.push(o.gradientPosition);
            }

            gradientRule = gradientFunc + "(" + (gradientOptions.length ? gradientOptions.join(" ") + ", " : "") + this.colors.join(", ") + ")";

            console.log(gradientRule);

            element.addClass("gradient-box");
            element.css({
                background: gradientRule
            });
        },

        // changeAttribute: function(attr, newValue){
        // },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));