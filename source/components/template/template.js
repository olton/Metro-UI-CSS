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
                template: null,
                data: {}
            });
            return this;
        },

        _exec: function(){
            var element = this.element;
            var template;

            template = this.template
                .replace(/(&lt;%)/gm, "<%")
                .replace(/(%&gt;)/gm, "%>")
                .replace(/(&lt;)/gm, "<")
                .replace(/(&gt;)/gm, ">");

            element.html(Tpl(template, this.data));
        },

        _create: function(){
            this.template = this.element.html();
            this.data = Utils.isObject(this.options.templateData) || {};
            this._exec();
            this._fireEvent('template-create');
        },

        buildWith: function(obj){
            var data = Utils.isObject(obj);
            if (!data) {
                return;
            }
            this.data = data;
            this._exec();
        },

        changeAttribute: function(a, v){
            if (a === "data-template-data") {
                this.options.templateData = v;
                this.data = Utils.isObject(v) || {};
                this._exec();
            }
        },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));