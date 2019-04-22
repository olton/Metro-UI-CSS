// TODO source as array, mode as array

var HtmlContainerDefaultConfig = {
    method: "get",
    htmlSource: null,
    requestData: null,
    insertMode: "replace", // replace, append, prepend
    onHtmlLoad: Metro.noop,
    onHtmlLoadFail: Metro.noop,
    onHtmlLoadDone: Metro.noop,
    onHtmlContainerCreate: Metro.noop
};

Metro.htmlContainerSetup = function (options) {
    HtmlContainerDefaultConfig = $.extend({}, HtmlContainerDefaultConfig, options);
};

if (typeof window.metroHtmlContainerSetup !== undefined) {
    Metro.htmlContainerSetup(window.metroHtmlContainerSetup);
}

var HtmlContainer = {
    init: function( options, elem ) {
        this.options = $.extend( {}, HtmlContainerDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        if (Utils.isValue(o.htmlSource)) {
            this._load();
        }

        o.method = o.method.toLowerCase();

        Utils.exec(o.onHtmlContainerCreate, null, element[0]);
        element.fire("htmlcontainercreate");
    },

    _load: function(){
        var element = this.element, o = this.options;
        var data = element.attr("data-request-data");

        if (!Utils.isValue(o.requestData)) {
            data = {};
        }

        $[o.method](o.htmlSource, data, function(data){
            switch (o.insertMode.toLowerCase()) {
                case "prepend": element.prepend(data); break;
                case "append": element.append(data); break;
                default: {
                    element.html(data);
                }
            }
            Utils.exec(o.onHtmlLoad, [data, o.htmlSource], element[0]);
            element.fire("htmlload", {
                data: data,
                source: o.htmlSource
            });
        })
        .fail(function(xhr){
            Utils.exec(o.onHtmlLoadFail, [xhr], element[0]);
            element.fire("htmlloadfail", {
                xhr: xhr
            });
        })
        .always(function(xhr){
            Utils.exec(o.onHtmlLoadDone, [xhr], element[0]);
            element.fire("htmlloaddone", {
                xhr: xhr
            });
        });
    },

    load: function(source, data){
        var o = this.options;
        if (source) {
            o.htmlSource = source;
        }
        if (data) {
            if (typeof data === 'string') {
                o.requestData = JSON.parse(data);
            } else {
                o.requestData = data;
            }
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
};

Metro.plugin('htmlcontainer', HtmlContainer);