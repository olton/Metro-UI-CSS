var Charms = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            background: ""
        };

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        position: "right",
        opacity: 1,
        clsCharms: "",
        onCharmCreate: Metro.noop,
        onOpen: Metro.noop,
        onClose: Metro.noop
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

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onCharmCreate, [element]);
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        element
            .addClass("charms")
            .addClass(o.position + "-side")
            .addClass(o.clsCharms);

        this.origin.background = element.css("background-color");

        element.css({
            backgroundColor: Utils.computedRgbToRgba(Utils.getStyleOne(element, "background-color"), o.opacity)
        });
    },

    _createEvents: function(){
        var element = this.element, o = this.options;

        element.on(Metro.events.click, function(e){
        });
    },

    open: function(){
        var element = this.element, o = this.options;

        element.addClass("open");

        Utils.exec(o.onOpen, [element]);
    },

    close: function(){
        var element = this.element, o = this.options;

        element.removeClass("open");

        Utils.exec(o.onClose, [element]);
    },

    toggle: function(){
        var element = this.element, o = this.options;

        element.toggleClass("open");

        if (element.hasClass("open") === true) {
            Utils.exec(o.onOpen, [element]);
        } else {
            Utils.exec(o.onClose, [element]);
        }
    },

    opacity: function(v){
        var element = this.element, o = this.options;

        if (v === undefined) {
            return o.opacity;
        }

        var opacity = Math.abs(parseFloat(v));
        if (opacity < 0 || opacity > 1) {
            return ;
        }
        o.opacity = opacity;
        element.css({
            backgroundColor: Utils.computedRgbToRgba(Utils.getStyleOne(element, "background-color"), opacity)
        });
    },

    changeOpacity: function(){
        var element = this.element;
        this.opacity(element.attr("data-opacity"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-opacity": this.changeOpacity(); break;
        }
    },

    destroy: function(){
        var element = this.element, o = this.options;

        element.off(Metro.events.click);

        element
            .removeClass("charms")
            .removeClass(o.position + "-side")
            .removeClass(o.clsCharms);

        element.css("background-color", this.origin.background);
    }
};

Metro.plugin('charms', Charms);

Metro['charms'] = {

    check: function(el){
        if (Utils.isMetroObject(el, "charms") === false) {
            console.log("Element is not a charms component");
            return false;
        }
        return true;
    },

    isOpen: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");

        return charms.hasClass("open");
    },

    open: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.open();
    },

    close: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.close();
    },

    toggle: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.toggle();
    },

    closeAll: function(){
        $('[data-role*=charms]').each(function() {
            $(this).data('charms').close();
        });
    },

    opacity: function(el, opacity){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.opacity(opacity);
    }
};