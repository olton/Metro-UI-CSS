(function( jQuery ) {

    "use strict";

    jQuery.widget("metro.stepper", {

        version: "3.0.0",

        options: {
            steps: 3,
            start: 1,
            type: 'default',
            clickable: true,
            onStep: function(index, step){},
            onStepClick: function(index, step){}
        },

        _create: function(){
            var element = this.element, o = this.options, element_id = element.attr('id');

            jQuery.each(element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = jQuery.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            if (!element.hasClass('stepper')) {element.addClass('stepper');}
            if (element_id === undefined) {
                element_id = window.uniqueId(this.widgetName+'_');
                element.attr('id', element_id);
            }

            this._createStepper();
            if (o.clickable) {this._createEvents();}
            this._positioningSteps();
            this._stepTo(o.start);

            element.data('stepper', this);

        },

        _createEvents: function(){
            var that = this, element = this.element, o= this.options;
            element.on('click', 'li', function(e){
                var step = jQuery(this).data('step');


                if (typeof o.onStepClick === 'string') {
                    window[o.onStepClick](step - 1, step);
                } else {
                    o.onStepClick(step - 1, step);
                }

                element.trigger("stepclick", step);
            });
        },

        _createStepper: function(){
            var element = this.element, o= this.options;
            var i, ul, li;

            ul = jQuery("<ul/>");

            switch(o.type) {
                case 'diamond': element.addClass('diamond'); break;
                case 'cycle': element.addClass('cycle'); break;
            }

            for(i=0;i< o.steps;i++) {
                li = jQuery("<li/>").data('step', i + 1).appendTo(ul);
            }
            ul.appendTo(element);
        },

        _positioningSteps: function(){
            var that = this, element = this.element, o = this.options,
                steps = element.find("li"),
                element_width = element.width(),
                steps_length = steps.length-1,
                step_width = jQuery(steps[0]).width();

            jQuery.each(steps, function(i, step){
                var left = i === 0 ? 0 : (element_width - step_width)/steps_length * i;
                jQuery(step).animate({
                    left: left
                });
            });
        },

        _stepTo: function(step){
            var element = this.element, o = this.options;
            var steps = element.find("li");

            steps.removeClass('current').removeClass('complete');

            jQuery.each(steps, function(i, s){
                if (i < step - 1) {jQuery(s).addClass('complete');}
                if (i === step - 1) {
                    jQuery(s).addClass('current') ;

                    if (typeof  o.onStep === 'string') {
                        window[o.onStep](i+1, s);
                    } else {
                        o.onStep(i+1, s);
                    }
                }
            });
        },

        stepTo: function(step){
            this._stepTo(step);
        },

        first: function(){
            var o = this.options;
            o.start = 1;
            this._stepTo(o.start);
        },

        last: function(){
            var element = this.element, o = this.options;
            var steps = element.find("li");

            o.start = steps.length;
            this._stepTo(o.start);
        },

        next: function(){
            var element = this.element, o = this.options;
            var steps = element.find("li");

            if (o.start + 1 > steps.length) {return;}

            o.start++;
            this._stepTo(o.start);
        },

        prior: function(){
            var o = this.options;

            if (o.start - 1 === 0) {return;}

            o.start--;
            this._stepTo(o.start);
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    });
})( jQuery );

