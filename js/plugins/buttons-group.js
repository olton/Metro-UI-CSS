var ButtonsGroup = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.active = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        targets: "button",
        clsActive: "bg-gray",
        mode: Metro.groupMode.ONE,
        onButtonClick: Metro.noop,
        onButtonsGroupCreate: Metro.noop
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

        this._createGroup();
        this._createEvents();

        Utils.exec(o.onButtonsGroupCreate, [element]);
    },

    _createGroup: function(){
        var that = this, element = this.element, o = this.options;

        if (o.mode === Metro.groupMode.ONE && element.find(o.clsActive).length === 0) {
            $(element.find(o.targets)[0]).addClass(o.clsActive);
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, o.targets, function(){
            var el = $(this);

            Utils.exec(o.onButtonClick, [el]);

            if (o.mode === Metro.groupMode.ONE && el.hasClass(o.clsActive)) {
                return ;
            }

            if (o.mode === Metro.groupMode.ONE) {
                element.find(o.targets).removeClass(o.clsActive);
                el.addClass(o.clsActive);
            } else {
                el.toggleClass(o.clsActive);
            }

        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element, o = this.options;
        element.off(Metro.events.click, o.targets);
        element.find(o.targets).removeClass(o.clsActive);
    }

};

Metro.plugin('buttonsGroup', ButtonsGroup);