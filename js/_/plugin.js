var myObject = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        onCreate: Metro.noop
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

        Utils.exec(o.onCreate, [element]);
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

Metro.plugin('myobj', myObject);