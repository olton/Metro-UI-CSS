/* global Metro, Utils, Component */
var SpinnerDefaultConfig = {
    spinnerDeferred: 0,
    step: 1,
    plusIcon: "<span class='default-icon-plus'></span>",
    minusIcon: "<span class='default-icon-minus'></span>",
    buttonsPosition: "default",
    defaultValue: 0,
    minValue: null,
    maxValue: null,
    fixed: 0,
    repeatThreshold: 1000,
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
};

Metro.spinnerSetup = function (options) {
    SpinnerDefaultConfig = $.extend({}, SpinnerDefaultConfig, options);
};

if (typeof window["metroSpinnerSetup"] !== undefined) {
    Metro.spinnerSetup(window["metroSpinnerSetup"]);
}

Component('spinner', {
    init: function( options, elem ) {
        this._super(elem, options, SpinnerDefaultConfig);

        this.repeat_timer = false;

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, this.name);

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onSpinnerCreate, null, element[0]);
        element.fire("spinnercreate");
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
        var spinner_buttons = spinner.find(".spinner-button");

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
            element.fire(plus ? "plusclick" : "minusclick", {
                curr: curr,
                val: val,
                elementVal: element.val()
            });

            Utils.exec(plus ? o.onArrowUp : o.onArrowDown, [curr, val, element.val()], element[0]);
            element.fire(plus ? "arrowup" : "arrowdown", {
                curr: curr,
                val: val,
                elementVal: element.val()
            });

            Utils.exec(o.onButtonClick, [curr, val, element.val(), plus ? 'plus' : 'minus'], element[0]);
            element.fire("buttonclick", {
                button: plus ? "plus" : "minus",
                curr: curr,
                val: val,
                elementVal: element.val()
            });

            Utils.exec(o.onArrowClick, [curr, val, element.val(), plus ? 'plus' : 'minus'], element[0]);
            element.fire("arrowclick", {
                button: plus ? "plus" : "minus",
                curr: curr,
                val: val,
                elementVal: element.val()
            });

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

        spinner_buttons.on(Metro.events.start, function(e){
            var plus = $(this).closest(".spinner-button").hasClass("spinner-button-plus");
            e.preventDefault();
            that.repeat_timer = true;
            spinnerButtonClick(plus, o.repeatThreshold);
        });

        spinner_buttons.on(Metro.events.stop, function(){
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
            element.fire("change", {
                val: val
            });
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
        element.fire("change", {
            val: val
        });
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
        var spinner_buttons = spinner.find(".spinner-button");

        spinner.off(Metro.events.click);
        spinner_buttons.off(Metro.events.start);
        spinner_buttons.off(Metro.events.stop);
        element.off(Metro.events.keydown);
        spinner.off(Metro.events.keyup);

        return element;
    }
});

$(document).on(Metro.events.click, function(){
    $(".spinner").removeClass("focused");
});

