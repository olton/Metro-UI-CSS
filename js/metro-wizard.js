(function( $ ) {
    $.widget("metro.wizard", {

        version: "1.0.0",

        options: {
            stepper: true,
            locale: $.Metro.currentLocale,
            finishStep: 'default',
            buttons: {
                cancel: true,
                help: true,
                prior: true,
                next: true,
                finish: true
            },
            onCancel: function(){},
            onHelp: function(){},
            onPrior: function(){return true;},
            onNext: function(){return true;},
            onFinish: function(){}
        },

        _stepper: undefined,
        _currentStep: 0,
        _steps: undefined,

        _create: function(){
            var that = this,
                element = this.element,
                o = this.options,
                steps = element.find(".step");

            this._steps = steps;

            if (o.stepper) {
                this._stepper = this._createStepper(steps.length).insertBefore(element.find('.steps'));
            }

            if (element.data('locale') != undefined) o.locale = element.data('locale');

            this._createEvents();
        },

        _createStepper: function(steps){
            var stepper;

            stepper = $("<div/>").addClass("stepper")
                .attr("data-role", "stepper")
                .attr("data-steps", steps);

            return stepper;
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;

            if (o.buttons) {
                var actions = $("<div/>").addClass("actions").appendTo(element);
                var group_left = $("<div/>").addClass("group-left").appendTo(actions);
                var group_right = $("<div/>").addClass("group-right").appendTo(actions);

                if (o.buttons.cancel) {
                    $("<button/>").addClass("btn-cancel").html($.Metro.Locale[o.locale].buttons[2]).appendTo(group_left).on('click', function(){
                        o.onCancel();
                    });
                }
                if (o.buttons.help) {
                    $("<button/>").addClass("btn-help").html($.Metro.Locale[o.locale].buttons[3]).appendTo(group_right).on('click', function(){
                        o.onHelp();
                    });
                }
                if (o.buttons.prior) {
                    $("<button/>").addClass("btn-prior").html($.Metro.Locale[o.locale].buttons[4]).appendTo(group_right).on('click', function(){
                        if (o.onPrior()) that.prior();
                    });
                }
                if (o.buttons.next) {
                    $("<button/>").addClass("btn-next").html($.Metro.Locale[o.locale].buttons[5]).appendTo(group_right).on('click', function(){
                        if (o.onNext()) that.next();
                    });
                }
                if (o.buttons.finish) {
                    $("<button disabled/>").addClass("btn-finish").html($.Metro.Locale[o.locale].buttons[6]).appendTo(group_right).on('click', function(){
                        o.onFinish();
                    });
                }
            }
        },

        next: function(){
            var new_step = this._currentStep + 1;

            if (new_step == this._steps.length) return false;
            this._currentStep = new_step;
            this._steps.hide();
            $(this._steps[new_step]).show();

            this._stepper.stepper('next');

            var finish = parseInt(this.options.finishStep == 'default' ? this._steps.length - 1 : this.options.finishStep);
            if (new_step == finish) {
                this.element.find('.btn-finish').attr('disabled', false);
            } else {
                this.element.find('.btn-finish').attr('disabled', true);
            }

            return true;
        },

        prior: function(){
            var new_step = this._currentStep - 1;

            if (new_step < 0) return false;
            this._currentStep = new_step;
            this._steps.hide();
            $(this._steps[new_step]).show();

            this._stepper.stepper('prior');

            var finish = parseInt(this.options.finishStep == 'default' ? this._steps.length - 1 : this.options.finishStep);
            if (new_step == finish) {
                this.element.find('.btn-finish').attr('disabled', false);
            } else {
                this.element.find('.btn-finish').attr('disabled', true);
            }

            return true;
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

