/* global Metro, Utils, Component */
var StepperDefaultConfig = {
    stepperDeferred: 0,
    view: Metro.stepperView.SQUARE, // square, cycle, diamond
    steps: 3,
    step: 1,
    stepClick: false,
    clsStepper: "",
    clsStep: "",
    clsComplete: "",
    clsCurrent: "",
    onStep: Metro.noop,
    onStepClick: Metro.noop,
    onStepperCreate: Metro.noop
};

Metro.stepperSetup = function (options) {
    StepperDefaultConfig = $.extend({}, StepperDefaultConfig, options);
};

if (typeof window["metroStepperSetup"] !== undefined) {
    Metro.stepperSetup(window["metroStepperSetup"]);
}

Component('stepper', {
    init: function( options, elem ) {
        this._super(elem, options, StepperDefaultConfig);

        this.current = 0;

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, this.name);

        if (o.step <= 0) {
            o.step = 1;
        }

        this._createStepper();
        this._createEvents();

        Utils.exec(o.onStepperCreate, null, element[0]);
        element.fire("steppercreate");
    },

    _createStepper: function(){
        var element = this.element, o = this.options;
        var i;

        element.addClass("stepper").addClass(o.view).addClass(o.clsStepper);

        for(i = 1; i <= o.steps; i++) {
            $("<span>").addClass("step").addClass(o.clsStep).data("step", i).html("<span>"+i+"</span>").appendTo(element);
        }

        this.current = 1;
        this.toStep(o.step);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".step", function(){
            var step = $(this).data("step");
            if (o.stepClick === true) {
                that.toStep(step);
                Utils.exec(o.onStepClick, [step], element[0]);
                element.fire("stepclick", {
                    step: step
                });
            }
        });
    },

    next: function(){
        var element = this.element;
        var steps = element.find(".step");

        if (this.current + 1 > steps.length) {
            return ;
        }

        this.current++;

        this.toStep(this.current);
    },

    prev: function(){
        if (this.current - 1 === 0) {
            return ;
        }

        this.current--;

        this.toStep(this.current);
    },

    last: function(){
        var element = this.element;

        this.toStep(element.find(".step").length);
    },

    first: function(){
        this.toStep(1);
    },

    toStep: function(step){
        var element = this.element, o = this.options;
        var target = $(element.find(".step").get(step - 1));

        if (target.length === 0) {
            return ;
        }

        this.current = step;

        element.find(".step")
            .removeClass("complete current")
            .removeClass(o.clsCurrent)
            .removeClass(o.clsComplete);

        target.addClass("current").addClass(o.clsCurrent);
        target.prevAll().addClass("complete").addClass(o.clsComplete);

        Utils.exec(o.onStep, [this.current], element[0]);
        element.fire("step", {
            step: this.current
        });
    },

    changeAttribute: function(){
    },

    destroy: function(){
        var element = this.element;
        element.off(Metro.events.click, ".step");
        return element;
    }
});
