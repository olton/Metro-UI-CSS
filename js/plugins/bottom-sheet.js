var BottomSheet = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.toggle = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        mode: "list",
        toggle: null,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onBottomSheetCreate: Metro.noop
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

        Utils.exec(o.onBottomSheetCreate, [element], element[0]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;

        element
            .addClass("bottom-sheet")
            .addClass(o.mode+"-list");

        if (Utils.isValue(o.toggle) && $(o.toggle).length > 0) {
            this.toggle = $(o.toggle);
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(this.toggle)) {
            this.toggle.on(Metro.events.click, function(){
                that.toggleView();
            });
        }

        element.on(Metro.events.click, "li", function(){
            that.close();
        });
    },

    isOpen: function(){
        return this.element.hasClass("opened");
    },

    open: function(mode){
        var element = this.element, o = this.options;

        if (Utils.isValue(mode)) {
            element.removeClass("list-style grid-style").addClass(mode+"-style");
        }

        this.element.addClass("opened");
        Utils.exec(o.onOpen, [element], element[0]);
    },

    close: function(){
        var element = this.element, o = this.options;

        element.removeClass("opened");
        Utils.exec(o.onClose, [element], element[0]);
    },

    toggle: function(mode){
        if (this.isOpen()) {
            this.close();
        } else {
            this.open(mode);
        }
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('bottomsheet', BottomSheet);

Metro['bottomsheet'] = {
    isBottomSheet: function(el){
        return Utils.isMetroObject(el, "bottomsheet");
    },

    open: function(el, as){
        if (!this.isBottomSheet(el)) {
            return false;
        }
        var sheet = $(el).data("bottomsheet");
        sheet.open(as);
    },

    close: function(el){
        if (!this.isBottomSheet(el)) {
            return false;
        }
        var sheet = $(el).data("bottomsheet");
        sheet.close();
    },

    toggle: function(el, as){
        if (!this.isBottomSheet(el)) {
            return false;
        }
        if (this.isOpen(el)) {
            this.close(el);
        } else {
            this.open(el, as);
        }
    },

    isOpen: function(el){
        if (!this.isBottomSheet(el)) {
            return false;
        }
        var sheet = $(el).data("bottomsheet");
        return sheet.isOpen();
    }
};