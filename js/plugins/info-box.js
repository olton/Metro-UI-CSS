var InfoBox = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.overlay = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        type: "",
        width: 480,
        height: "auto",
        overlay: true,
        overlayColor: '#000000',
        overlayAlpha: .5,
        autoHide: 0,
        removeOnClose: false,
        closeButton: true,
        clsBox: "",
        clsBoxContent: "",
        clsOverlay: "",
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onInfoBoxCreate: Metro.noop
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

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onInfoBoxCreate, [element], element[0]);
    },

    _overlay: function(){
        var that = this, element = this.element, o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay").addClass(o.clsOverlay);

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var closer, content;

        if (o.overlay === true) {
            this.overlay = this._overlay();
        }

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("infobox"));
        }

        element.addClass("info-box").addClass(o.type).addClass(o.clsBox);

        closer = element.find("closer");
        if (closer.length === 0) {
            closer = $("<span>").addClass("button square closer");
            closer.appendTo(element);
        }

        if (o.closeButton !== true) {
            closer.hide();
        }

        content = element.find(".info-box-content");
        if (content.length > 0) {
            content.addClass(o.clsBoxContent);
        }

        element.css({
            width: o.width,
            height: o.height,
            visibility: "hidden",
            top: '100%',
            left: ( $(window).width() - element.outerWidth() ) / 2
        });

        element.appendTo($('body'));
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".closer", function(){
            that.close();
        });

        element.on(Metro.events.click, ".js-dialog-close", function(){
            that.close();
        });

        $(window).on(Metro.events.resize + "_" + element.attr("id"), function(){
            that.reposition();
        });
    },

    _setPosition: function(){
        var element = this.element;
        element.css({
            top: ( $(window).height() - element.outerHeight() ) / 2,
            left: ( $(window).width() - element.outerWidth() ) / 2
        });
    },

    reposition: function(){
        this._setPosition();
    },

    setContent: function(c){
        var that = this, element = this.element, o = this.options;
        var content = element.find(".info-box-content");
        if (content.length === 0) {
            return ;
        }
        content.html(c);
        this.reposition();
    },

    setType: function(t){
        var that = this, element = this.element, o = this.options;
        element.removeClass("success info alert warning").addClass(t);
    },

    open: function(){
        var that = this, element = this.element, o = this.options;

        if (o.overlay === true) {
            this.overlay.appendTo($("body"));
        }

        this._setPosition();

        element.css({
            visibility: "visible"
        });

        Utils.exec(o.onOpen, [element], element[0]);
        element.data("open", true);
        if (parseInt(o.autoHide) > 0) {
            setTimeout(function(){
                that.close();
            }, parseInt(o.autoHide));
        }
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        if (o.overlay === true) {
            $('body').find('.overlay').remove();
        }

        element.css({
            visibility: "hidden",
            top: "100%"
        });

        Utils.exec(o.onClose, [element], element[0]);
        element.data("open", false);

        if (o.removeOnClose === true) {
            this.destroy();
            element.remove();
        }
    },

    isOpen: function(){
        return this.element.data("open") === true;
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        element.off(Metro.events.click, ".closer");
        element.off(Metro.events.click, ".js-dialog-close");
        $(window).off(Metro.events.resize + "_" + element.attr("id"));
    }
};

Metro.plugin('infobox', InfoBox);

Metro['infobox'] = {
    isInfoBox: function(el){
        return Utils.isMetroObject(el, "dialog");
    },

    open: function(el, c, t){
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $(el).data("infobox");
        if (c !== undefined) {
            ib.setContent(c);
        }
        if (t !== undefined) {
            ib.setType(t);
        }
        ib.open();
    },

    close: function(el){
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $(el).data("infobox");
        ib.close();
    },

    setContent: function(el, c){
        if (!this.isInfoBox(el)) {
            return false;
        }

        if (c === undefined) {
            c = "";
        }

        var ib = $(el).data("infobox");
        ib.setContent(c);
        ib.reposition();
    },

    setType: function(el, t){
        if (!this.isInfoBox(el)) {
            return false;
        }

        var ib = $(el).data("infobox");
        ib.setType(t);
        ib.reposition();
    },

    isOpen: function(el){
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $(el).data("infobox");
        return ib.isOpen();
    },

    create: function(c, t, o, open){
        var el, ib, box_type, con;

        box_type = t !== undefined ? t : "";

        el = $("<div>").appendTo($("body"));
        $("<div>").addClass("info-box-content").appendTo(el);

        var ib_options = $.extend({}, {
            removeOnClose: true,
            type: box_type
        }, (o !== undefined ? o : {}));

        el.infobox(ib_options);
        ib = el.data('infobox');
        ib.setContent(c);
        if (open !== false) {
            ib.open();
        }

        return el;
    }
};