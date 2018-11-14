var Spinner = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.repeat_timer = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        step: 1,
        plusIcon: "<span class='default-icon-plus'></span>",
        minusIcon: "<span class='default-icon-minus'></span>",
        buttonsPosition: "default",
        defaultValue: 0,
        minValue: null,
        maxValue: null,
        fixed: 0,
        repeatThreshold: 500,
        hideCursor: false,
        clsSpinner: "",
        clsSpinnerInput: "",
        clsSpinnerButton: "",
        clsSpinnerButtonPlus: "",
        clsSpinnerButtonMinus: "",
        onBeforeChange: Metro.noop_true,
        onChange: Metro.noop,
        onPlusClick: Metro.noop,
        onMinusClick: Metro.noop,
        onArrowUp: Metro.noop,
        onArrowDown: Metro.noop,
        onButtonClick: Metro.noop,
        onArrowClick: Metro.noop,
        onSpinnerCreate: Metro.noop
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

        Utils.exec(o.onCreate, [element]);
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var spinner = $("<div>").addClass("spinner").addClass("buttons-"+o.buttonsPosition).addClass(element[0].className).addClass(o.clsSpinner);
        var button_plus = $("<button>").attr("type", "button").addClass("button spinner-button spinner-button-plus").addClass(o.clsSpinnerButton + " " + o.clsSpinnerButtonPlus).html(o.plusIcon);
        var button_minus = $("<button>").attr("type", "button").addClass("button spinner-button spinner-button-minus").addClass(o.clsSpinnerButton + " " + o.clsSpinnerButtonMinus).html(o.minusIcon);
        var init_value = element.val().trim();

        if (!Utils.isValue(init_value)) {
            element.val(0);
        }

        element[0].className = '';

        spinner.insertBefore(element);
        element.appendTo(spinner).addClass(o.clsSpinnerInput);

        element.addClass("original-input");

        button_plus.appendTo(spinner);
        button_minus.appendTo(spinner);

        if (o.hideCursor === true) {
            spinner.addClass("hide-cursor");
        }

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var spinner = element.closest(".spinner");

        var spinnerButtonClick = function(plus, threshold){
            var curr = element.val();

            var val = Number(element.val());
            var step = Number(o.step);

            if (plus) {
                val += step;
            } else {
                val -= step;
            }

            that._setValue(val.toFixed(o.fixed), true);

            Utils.exec(plus ? o.onPlusClick : o.onMinusClick, [curr, val, element.val()], element[0]);
            Utils.exec(plus ? o.onArrowUp : o.onArrowDown, [curr, val, element.val()], element[0]);
            Utils.exec(o.onButtonClick, [curr, val, element.val(), plus ? 'plus' : 'minus'], element[0]);
            Utils.exec(o.onArrowClick, [curr, val, element.val(), plus ? 'plus' : 'minus'], element[0]);

            setTimeout(function(){
                if (that.repeat_timer) {
                    spinnerButtonClick(plus, 100);
                }
            }, threshold);
        };

        spinner.on(Metro.events.click, function(e){
            $(".focused").removeClass("focused");
            spinner.addClass("focused");
            e.preventDefault();
            e.stopPropagation();
        });

        spinner.on(Metro.events.start, ".spinner-button", function(){
            that.repeat_timer = true;
            spinnerButtonClick($(this).hasClass("spinner-button-plus"), o.repeatThreshold);
        });

        spinner.on(Metro.events.stop, ".spinner-button", function(){
            that.repeat_timer = false;
        });

        element.on(Metro.events.keydown, function(e){
            if (e.keyCode === Metro.keyCode.UP_ARROW || e.keyCode === Metro.keyCode.DOWN_ARROW) {
                that.repeat_timer = true;
                spinnerButtonClick(e.keyCode === Metro.keyCode.UP_ARROW, o.repeatThreshold);
            }
        });

        spinner.on(Metro.events.keyup, function(){
            that.repeat_timer = false;
        });
    },

    _setValue: function(val, trigger_change){
        var element = this.element, o = this.options;

        if (Utils.exec(o.onBeforeChange, [val], element[0]) !== true) {
            return ;
        }

        if (Utils.isValue(o.maxValue) && val > Number(o.maxValue)) {
            val =  Number(o.maxValue);
        }

        if (Utils.isValue(o.minValue) && val < Number(o.minValue)) {
            val =  Number(o.minValue);
        }

        element.val(val);

        Utils.exec(o.onChange, [val], element[0]);

        if (trigger_change === true) {
            element.trigger("change");
        }
    },

    val: function(val){
        var that = this, element = this.element, o = this.options;
        if (!Utils.isValue(val)) {
            return element.val();
        }

        that._setValue(val.toFixed(o.fixed), true);
    },

    toDefault: function(){
        var element = this.element, o = this.options;
        var val = Utils.isValue(o.defaultValue) ? Number(o.defaultValue) : 0;
        this._setValue(val.toFixed(o.fixed), true);
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
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element;

        var changeValue = function(){
            var val = element.attr('value').trim();
            if (Utils.isValue(val)) {
                that._setValue(Number(val), false);
            }
        };

        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'value': changeValue(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var spinner = element.closest(".spinner");

        spinner.off(Metro.events.click, ".spinner-button");
        element.insertBefore(spinner);
        spinner.remove();
    }
};

Metro.plugin('spinner', Spinner);

$(document).on(Metro.events.click, function(){
    $(".spinner").removeClass("focused");
});

