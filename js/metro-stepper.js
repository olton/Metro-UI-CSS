(function( $ ) {
    $.widget("metro.stepper", {

        version: "1.0.0",

        options: {
            steps: 3,
            start: 1,
            onStep: function(index, step){}
        },

        _create: function(){
            var element = this.element, o = this.options;

            if (element.data('steps') != undefined) o.steps = element.data('steps');
            if (element.data('start') != undefined) o.start = element.data('start');

            this._createStepper();
            this._positioningSteps();
            this._stepTo(o.start);
        },

        _createStepper: function(){
            var element = this.element, o= this.options;
            var i, ul, li;

            ul = $("<ul/>");
            for(i=0;i< o.steps;i++) {
                li = $("<li/>").appendTo(ul);
            }
            ul.appendTo(element);
        },

        _positioningSteps: function(){
            var that = this, element = this.element, o = this.options,
                steps = element.find("li"),
                element_width = element.width(),
                steps_length = steps.length-1,
                step_width = $(steps[0]).width();

            $.each(steps, function(i, step){
                var left = i == 0 ? 0 : (element_width - step_width)/steps_length * i;
                $(step).animate({
                    left: left
                });
            });
        },

        _stepTo: function(step){
            var element = this.element, o = this.options;
            var steps = element.find("li");

            steps.removeClass('current').removeClass('complete');

            $.each(steps, function(i, s){
                if (i < step - 1) $(s).addClass('complete');
                if (i == step - 1) {
                    $(s).addClass('current') ;
                    o.onStep(i+1, s);
                }
            });
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

            if (o.start + 1 > steps.length) return;

            o.start++;
            this._stepTo(o.start);
        },

        prior: function(){
            var o = this.options;

            if (o.start - 1 == 0) return;

            o.start--;
            this._stepTo(o.start);
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

