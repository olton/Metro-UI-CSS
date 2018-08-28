var Spinner = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        step: 1,
        plusIcon: "<span class='default-icon-plus'></span>",
        minusIcon: "<span class='default-icon-minus'></span>",
        buttonsPosition: "default",
        value: 0,
        minValue: null,
        maxValue: null,
        fixed: 0,
        onChange: Metro.noop,
        onSpinnerCreate: Metro.noop
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
        var spinner = $("<div>").addClass("spinner").addClass("buttons-"+o.buttonsPosition).addClass(element[0].className);
        var wrapper = $("<div>").addClass("input-wrapper");
        var button_plus = $("<button>").addClass("button spinner-button spinner-button-plus").html(o.plusIcon);
        var button_minus = $("<button>").addClass("button spinner-button spinner-button-minus").html(o.minusIcon);

        element[0].className = '';

        spinner.insertBefore(element);
        element.appendTo(spinner);

        element.addClass("original-input");

        wrapper.appendTo(spinner);
        button_plus.appendTo(spinner);
        button_minus.appendTo(spinner);

        wrapper.text(Number(o.value));

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var spinner = element.closest(".spinner");
        var wrapper = spinner.find(".input-wrapper");

        spinner.on(Metro.events.click, ".spinner-button", function(e){
            var button = $(this);
            var plus = button.hasClass("spinner-button-plus");
            var val = Number(element.val());
            var step = Number(o.step);

            if (plus) {
                val += step;
            } else {
                val -= step;
            }

            that._setValue(val.toFixed(o.fixed));

            Utils.exec(o.onChange, [val], element[0]);
        });
    },

    _setValue: function(val){
        var that = this, element = this.element, o = this.options;
        var spinner = element.closest(".spinner");
        var wrapper = spinner.find(".input-wrapper");

        if (Utils.isValue(o.maxValue) && val > Number(o.maxValue)) {
            val =  Number(o.maxValue);
        }

        if (Utils.isValue(o.minValue) && val < Number(o.minValue)) {
            val =  Number(o.minValue);
        }

        element.val(val);
        wrapper.text(val);
    },

    val: function(val){
        var that = this, element = this.element, o = this.options;
        if (!Utils.isValue(val)) {
            return element.val();
        }

        that._setValue(val.toFixed(o.fixed));

        Utils.exec(o.onChange, [val], element[0]);
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    },

    destroy: function(){

    }
};

Metro.plugin('spinner', Spinner);