var TabsMaterial = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.marker = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        deep: false,
        markerColor: "#1d1d1d",
        onBeforeTabOpen: Metro.noop_true,
        onTabOpen: Metro.noop,
        onTabsCreate: Metro.noop
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

        Utils.exec(o.onTabsCreate, [element]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass("tabs-material");

        if (o.deep === true) {
            element.addClass("deep");
        }

        this.marker = element.find(".tab-marker");

        if (this.marker.length === 0) {

            this.marker = $("<span>").addClass("tab-marker").appendTo(element);

            if (Utils.isValue(o.markerColor)) {
                if (Utils.isColor(o.markerColor)) {
                    this.marker.css({
                        backgroundColor: o.markerColor
                    });
                } else {
                    this.marker.addClass(o.markerColor);
                }
            }

        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('tabsmaterial', TabsMaterial);