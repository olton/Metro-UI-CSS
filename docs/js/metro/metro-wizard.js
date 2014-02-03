(function( $ ) {
    $.widget("metro.wizard", {

        version: "1.0.0",

        options: {
            stepper: true,
            stepperType: 'default',
            locale: $.Metro.currentLocale,
            finishStep: 'default',
            buttons: {
                cancel: true,
                help: false,
                prior: true,
                next: true,
                finish: true
            },
            onCancel: function(page, wiz){},
            onHelp: function(page, wiz){},
            onPrior: function(page, wiz){return true;},
            onNext: function(page, wiz){return true;},
            onFinish: function(page, wiz){},
            onPage: function(page, wiz){}
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
            this.options.onPage(this._currentStep + 1, element);
        },

        _createStepper: function(steps){
            var stepper, o = this.options;

            stepper = $("<div/>").addClass("stepper")
                .attr("data-role", "stepper")
                .attr("data-steps", steps);

            if (o.stepperType != 'default') {
                stepper.addClass(o.stepperType);
            }

            return stepper;
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;

            if (o.buttons) {
                var actions = $("<div/>").addClass("actions").appendTo(element);
                var group_left = $("<div/>").addClass("group-left").appendTo(actions);
                var group_right = $("<div/>").addClass("group-right").appendTo(actions);

                if (o.buttons.cancel) {
                    $("<button type='button'/>").addClass("btn-cancel").html($.Metro.Locale[o.locale].buttons[2]).appendTo(group_left).on('click', function(){
                        o.onCancel(that._currentStep+1, element);
                    });
                }
                if (o.buttons.help) {
                    $("<button type='button'/>").addClass("btn-help").html($.Metro.Locale[o.locale].buttons[3]).appendTo(group_right).on('click', function(){
                        o.onHelp(that._currentStep+1, element);
                    });
                }
                if (o.buttons.prior) {
                    $("<button type='button'/>").addClass("btn-prior").html($.Metro.Locale[o.locale].buttons[4]).appendTo(group_right).on('click', function(){
                        if (o.onPrior(that._currentStep+1, element)) that.prior();
                    });
                }
                if (o.buttons.next) {
                    $("<button type='button'/>").addClass("btn-next").html($.Metro.Locale[o.locale].buttons[5]).appendTo(group_right).on('click', function(){
                        if (o.onNext(that._currentStep+1, element)) that.next();
                    });
                }
                if (o.buttons.finish) {
                    $("<button type='button' disabled/>").addClass("btn-finish").html($.Metro.Locale[o.locale].buttons[6]).appendTo(group_right).on('click', function(){
                        o.onFinish(that._currentStep+1, element);
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

            this.options.onPage(this._currentStep + 1, this.element);
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

            this.options.onPage(this._currentStep + 1, this.element);
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

