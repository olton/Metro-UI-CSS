(function( $ ) {
    $.widget("metro.stepper", {

        version: "1.0.0",

        options: {
            diameter: 32
        },

        _create: function(){
            var that = this, element = this.element,
                steps = element.children("li"),
                element_width = element.width(),
                steps_length = steps.length-1,
                step_width = $(steps[0]).width();

            $.each(steps, function(i, step){
                var left = i == 0 ? 0 : (element_width - step_width)/steps_length * i;
                console.log(i, left, step_width);
                $(step).animate({
                    left: left
                });
            });
            console.log('Steps:', steps.length);
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

