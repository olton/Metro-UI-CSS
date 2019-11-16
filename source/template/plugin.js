var MyObjectDefaultConfig = {
    onMyObjectCreate: Metro.noop
};

Metro.myObjectSetup = function (options) {
    MyObjectDefaultConfig = $.extend({}, MyObjectDefaultConfig, options);
};

if (typeof window["metroMyObjectSetup"] !== undefined) {
    Metro.myObjectSetup(window["metroMyObjectSetup"]);
}

var MyObject = {
    options: {},

    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
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

        Metro.checkRuntime(element, "component_name");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onMyObjectCreate, [element]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('myobj', MyObject);