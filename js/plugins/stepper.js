var Stepper = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.current = 0;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
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

        if (o.step <= 0) {
            o.step = 1;
        }

        this._createStepper();
        this._createEvents();

        Utils.exec(o.onStepperCreate, [element]);
    },

    _createStepper: function(){
        var that = this, element = this.element, o = this.options;
        var i;

        element.addClass("stepper").addClass(o.view).addClass(o.clsStepper);

        for(i = 1; i <= o.steps; i++) {
            var step = $("<span>").addClass("step").addClass(o.clsStep).data("step", i).html("<span>"+i+"</span>").appendTo(element);
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
                Utils.exec(o.onStepClick, [step, element]);
            }
        });
    },

    next: function(){
        var that = this, element = this.element, o = this.options;
        var steps = element.find(".step");

        if (this.current + 1 > steps.length) {
            return ;
        }

        this.current++;

        this.toStep(this.current);
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;

        if (this.current - 1 === 0) {
            return ;
        }

        this.current--;

        this.toStep(this.current);
    },

    last: function(){
        var that = this, element = this.element, o = this.options;

        this.toStep(element.find(".step").length);
    },

    first: function(){
        this.toStep(1);
    },

    toStep: function(step){
        var that = this, element = this.element, o = this.options;
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

        Utils.exec(o.onStep, [this.current, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('stepper', Stepper);