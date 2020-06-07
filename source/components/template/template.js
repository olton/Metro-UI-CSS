/* global Metro */
(function(Metro, $) {
    'use strict';

    var Utils = Metro.utils;
    var Tpl = Metro.template;
    var TemplateDefaultConfig = {
        templateData: null,
        onTemplateCreate: Metro.noop
    };

    Metro.templateSetup = function (options) {
        TemplateDefaultConfig = $.extend({}, TemplateDefaultConfig, options);
    };

    if (typeof window["metroTemplateSetup"] !== undefined) {
        Metro.templateSetup(window["metroTemplateSetup"]);
    }

    Metro.Component('template', {
        init: function( options, elem ) {
            this._super(elem, options, TemplateDefaultConfig, {
                template: null
            });
            return this;
        },

        _exec: function(){
            var element = this.element, o = this.options;
            var template, data;

            data = Utils.isObject(o.templateData) || {};

            template = this.template
                .replace(/(&lt;%)/gm, "<%")
                .replace(/(%&gt;)/gm, "%>")
                .replace(/(&lt;)/gm, "<")
                .replace(/(&gt;)/gm, ">");

            element.html(Tpl(template, data));
        },

        _create: function(){
            this.template = this.element.html();
            this._exec();
            this._fireEvent('template-create');
        },

        changeAttribute: function(a, v){
            if (a === "data-template-data") {
                this.options.templateData = v;
                this._exec();
            }
        },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));