var MyObjectDefaultConfig = {
    onMyObjectCreate: Metro.noop
};

Metro.myObjectSetup = function (options) {
    MyObjectDefaultConfig = $.extend({}, MyObjectDefaultConfig, options);
};

if (typeof window["metroMyObjectSetup"] !== undefined) {
    Metro.myObjectSetup(window["metroMyObjectSetup"]);
}

Component('name', {
    init: function( options, elem ) {
        this._super(elem, options, MyObjectDefaultConfig);

        this._create();

        return this;
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        Metro.checkRuntime(element, this.name);

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
});
