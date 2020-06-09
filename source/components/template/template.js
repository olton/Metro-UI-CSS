/* global Metro */
(function(Metro, $) {
    'use strict';

    var Utils = Metro.utils;
    var Tpl = Metro.template;
    var TemplateDefaultConfig = {
        templateData: null,
        onTemplateCompile: Metro.noop,
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
                template: null,
                data: {}
            });
            return this;
        },

        _compile: function(){
            var element = this.element;
            var template, compiled;

            template = this.template
                .replace(/(&lt;%)/gm, "<%")
                .replace(/(%&gt;)/gm, "%>")
                .replace(/(&lt;)/gm, "<")
                .replace(/(&gt;)/gm, ">");

            compiled = Tpl(template, this.data);
            element.html(compiled);

            this._fireEvent('template-compile', {
                template: template,
                compiled: compiled,
                element: element
            });
        },

        _create: function(){
            var element = this.element, o = this.options;
            this.template = element.html();
            this.data = Utils.isObject(o.templateData) || {};
            this._compile();
            this._fireEvent('template-create', {
                element: element
            });
        },

        buildWith: function(obj){
            var data = Utils.isObject(obj);
            if (!data) {
                return;
            }
            this.data = data;
            this._compile();
        },

        changeAttribute: function(a, v){
            if (a === "data-template-data") {
                this.options.templateData = v;
                this.data = Utils.isObject(v) || {};
                this._compile();
            }
        },

        destroy: function(){
            return this.element;
        }
    });
}(Metro, m4q));