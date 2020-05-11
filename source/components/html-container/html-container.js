/* global Metro, Utils, Component */

// TODO source as array, mode as array

var HtmlContainerDefaultConfig = {
    htmlcontainerDeferred: 0,
    method: "get",
    htmlSource: null,
    requestData: null,
    requestOptions: null,
    insertMode: "replace", // replace, append, prepend
    onHtmlLoad: Metro.noop,
    onHtmlLoadFail: Metro.noop,
    onHtmlLoadDone: Metro.noop,
    onHtmlContainerCreate: Metro.noop
};

Metro.htmlContainerSetup = function (options) {
    HtmlContainerDefaultConfig = $.extend({}, HtmlContainerDefaultConfig, options);
};

if (typeof window["metroHtmlContainerSetup"] !== undefined) {
    Metro.htmlContainerSetup(window["metroHtmlContainerSetup"]);
}

Component('html-container', {
    init: function( options, elem ) {
        this._super(elem, options, HtmlContainerDefaultConfig);

        this.data = {};
        this.opt = {};
        this.htmlSource = '';

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, this.name);

        if (typeof o.requestData === 'string') {
            o.requestData = JSON.parse(o.requestData);
        }

        if (Utils.isObject(o.requestData)) {
            this.data = Utils.isObject(o.requestData);
        }

        if (typeof o.requestOptions === 'string') {
            o.requestOptions = JSON.parse(o.requestOptions);
        }

        if (Utils.isObject(o.requestOptions)) {
            this.opt = Utils.isObject(o.requestOptions);
        }

        o.method = o.method.toLowerCase();

        if (Utils.isValue(o.htmlSource)) {
            this.htmlSource = o.htmlSource;
            this._load();
        }

        Utils.exec(o.onHtmlContainerCreate, null, element[0]);
        element.fire("htmlcontainercreate");
    },

    _load: function(){
        var that = this, element = this.element, o = this.options;

        $[o.method](this.htmlSource, this.data, this.opt).then(function(data){
            var _data = $(data);
            switch (o.insertMode.toLowerCase()) {
                case "prepend": element.prepend(_data); break;
                case "append": element.append(_data); break;
                case "replace": _data.insertBefore(element).script(); element.remove(); break;
                default: {
                    element.html(_data);
                }
            }
            Utils.exec(o.onHtmlLoad, [data, o.htmlSource, that.data, that.opt], element[0]);
            element.fire("htmlload", {
                data: data,
                source: o.htmlSource,
                requestData: that.data,
                requestOptions: that.opt
            });
        }, function(xhr){
            Utils.exec(o.onHtmlLoadFail, [xhr], element[0]);
            element.fire("htmlloadfail", {
                xhr: xhr
            });
        });
    },

    load: function(source, data, opt){
        if (source) {
            this.htmlSource = source;
        }

        if (data) {
            this.data = Utils.isObject(data);
        }

        if (opt) {
            this.opt = Utils.isObject(opt);
        }

        this._load();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeHTMLSource = function(){
            var html = element.attr("data-html-source");
            if (Utils.isNull(html)) {
                return ;
            }
            if (html.trim() === "") {
                element.html("");
            }
            o.htmlSource = html;
            that._load();
        };

        var changeInsertMode = function(){
            var attr = element.attr("data-insert-mode");
            if (Utils.isValue(attr)) {
                o.insertMode = attr;
            }
        };

        var changeRequestData = function(){
            var data = element.attr("data-request-data");
            that.load(o.htmlSource, data);
        };

        switch (attributeName) {
            case "data-html-source": changeHTMLSource(); break;
            case "data-insert-mode": changeInsertMode(); break;
            case "data-request-data": changeRequestData(); break;
        }
    },

    destroy: function(){}
});
