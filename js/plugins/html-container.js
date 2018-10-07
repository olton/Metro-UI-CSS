// TODO source as array, mode as array

var HtmlContainer = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        htmlSource: null,
        insertMode: "replace", // replace, append, prepend
        onLoad: Metro.noop,
        onFail: Metro.noop,
        onDone: Metro.noop,
        onHtmlContainerCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

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
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(o.htmlSource)) {
            this._load();
        }

        Utils.exec(o.onHtmlContainerCreate, [element], element[0]);
    },

    _load: function(){
        var that = this, element = this.element, elem = this.elem, o = this.options;
        var xhttp, html;

        html = o.htmlSource;

        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 404) {
                    elem.innerHTML = "Page not found.";
                    Utils.exec(o.onFail, [this], elem);
                }
                if (this.status === 200) {
                    switch (o.insertMode.toLowerCase()) {
                        case "prepend": element.prepend(this.responseText); break;
                        case "append": element.append(this.responseText); break;
                        default: {
                            element.html(this.responseText);
                        }
                    }
                    Utils.exec(o.onLoad, [this.responseText], elem);
                }

                Utils.exec(o.onDone, [this], elem);
            }
        };
        xhttp.open("GET", html, true);
        xhttp.send();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, elem = this.elem, o = this.options;

        var changeHTMLSource = function(){
            var html = element.attr("data-html-source");
            if (Utils.isNull(html)) {
                return ;
            }
            if (html.trim() === "") {
                element.html("");
            }
            o.htmlSource = html;
            this._load();
        };

        var changeInsertMode = function(){
            var attr = element.attr("data-insert-mode");
            if (Utils.isValue(attr)) {
                o.insertMode = attr;
            }
        };

        switch (attributeName) {
            case "data-html-source": changeHTMLSource(); break;
            case "data-insert-mode": changeInsertMode(); break;
        }
    },

    destroy: function(){}
};

Metro.plugin('htmlcontainer', HtmlContainer);