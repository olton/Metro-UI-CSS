(function( $ ) {
    $.widget("metro.wizard", {

        version: "1.0.0",

        options: {
            stepper: true,
            stepperType: 'default',
            stepperClickable: true,
            startPage: 'default',
            locale: $.Metro.currentLocale,
            finishStep: 'default',
            buttons: {
                cancel: true,
                help: true,
                prior: true,
                next: true,
                finish: true
            },
            onCancel: function(page, wiz){},
            onHelp: function(page, wiz){},
            onPrior: function(page, wiz){return true;},
            onNext: function(page, wiz){return true;},
            onFinish: function(page, wiz){},
            onPage: function(page, wiz){},
            onStepClick: function(step){}
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
                this._stepper = this._createStepper(steps.length)
                    .insertBefore(element.find('.steps'))
                    .stepper({
                        clickable: o.stepperClickable
                    }).on('stepclick', function(e, s){
                        that.stepTo(s);
                        o.onStepClick(s);
                    });
            }

            if (element.data('locale') != undefined) o.locale = element.data('locale');

            this._createEvents();

            var sp = (o.startPage != 'default' && parseInt(o.startPage) > 1) ? o.startPage : 1;
            this.stepTo(sp);

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
                var cancel_button, help_button, prior_button, next_button, finish_button;

                if (o.buttons.cancel) {
                    cancel_button = $("<button type='button'/>").addClass("btn-cancel").html($.Metro.Locale[o.locale].buttons[2]);
                    if (typeof o.buttons.cancel == "boolean") {
                        cancel_button.appendTo(group_left);
                    } else {
                        if (o.buttons.cancel.title) {
                            cancel_button.html(o.buttons.cancel.title);
                        }
                        if (o.buttons.cancel.cls) {
                            cancel_button.addClass(o.buttons.cancel.cls);
                        }
                        if (o.buttons.cancel.group && o.buttons.cancel.group != "left") {
                            cancel_button.appendTo(group_right);
                        } else {
                            cancel_button.appendTo(group_left);
                        }
                    }
                    cancel_button.on('click', function(){
                        o.onCancel(that._currentStep+1, element);
                    });
                }
                if (o.buttons.help) {
                    help_button = $("<button type='button'/>").addClass("btn-help").html($.Metro.Locale[o.locale].buttons[3]);
                    if (typeof o.buttons.help == "boolean") {
                        help_button.appendTo(group_right);
                    } else {
                        if (o.buttons.help.title) {
                            help_button.html(o.buttons.help.title);
                        }
                        if (o.buttons.help.cls) {
                            help_button.addClass(o.buttons.help.cls);
                        }
                        if (o.buttons.help.group && o.buttons.help.group != "left") {
                            help_button.appendTo(group_right);
                        } else {
                            help_button.appendTo(group_left);
                        }
                    }
                    help_button.on('click', function(){
                        o.onHelp(that._currentStep+1, element);
                    });
                }
                if (o.buttons.prior) {
                    prior_button = $("<button type='button'/>").addClass("btn-prior").html($.Metro.Locale[o.locale].buttons[4]);
                    if (typeof o.buttons.prior == "boolean") {
                        prior_button.appendTo(group_right);
                    } else {
                        if (o.buttons.prior.title) {
                            prior_button.html(o.buttons.prior.title);
                        }
                        if (o.buttons.prior.cls) {
                            prior_button.addClass(o.buttons.prior.cls);
                        }
                        if (o.buttons.prior.group && o.buttons.prior.group != "left") {
                            prior_button.appendTo(group_right);
                        } else {
                            prior_button.appendTo(group_left);
                        }
                    }
                    prior_button.on('click', function(){
                        if (o.onPrior(that._currentStep+1, element)) that.prior();
                    });
                }
                if (o.buttons.next) {
                    next_button = $("<button type='button'/>").addClass("btn-next").html($.Metro.Locale[o.locale].buttons[5]);
                    if (typeof o.buttons.next == "boolean") {
                        next_button.appendTo(group_right);
                    } else {
                        if (o.buttons.next.title) {
                            next_button.html(o.buttons.next.title);
                        }
                        if (o.buttons.next.cls) {
                            next_button.addClass(o.buttons.next.cls);
                        }
                        if (o.buttons.next.group && o.buttons.next.group != "left") {
                            next_button.appendTo(group_right);
                        } else {
                            next_button.appendTo(group_left);
                        }
                    }
                    next_button.on('click', function(){
                        if (o.onNext(that._currentStep+1, element)) that.next();
                    });
                }
                if (o.buttons.finish) {
                    finish_button = $("<button type='button'/>").addClass("btn-finish").html($.Metro.Locale[o.locale].buttons[6]);
                    if (typeof o.buttons.finish == "boolean") {
                        finish_button.appendTo(group_right);
                    } else {
                        if (o.buttons.finish.title) {
                            finish_button.html(o.buttons.finish.title);
                        }
                        if (o.buttons.finish.cls) {
                            finish_button.addClass(o.buttons.finish.cls);
                        }
                        if (o.buttons.finish.group && o.buttons.finish.group != "left") {
                            finish_button.appendTo(group_right);
                        } else {
                            finish_button.appendTo(group_left);
                        }
                    }
                    finish_button.on('click', function(){
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
            if (this._stepper != undefined) this._stepper.stepper('stepTo', this._currentStep + 1);

            var finish = parseInt(this.options.finishStep == 'default' ? this._steps.length - 1 : this.options.finishStep);
            if (new_step == finish) {
                this.element.find('.btn-finish').attr('disabled', false);
            } else {
                this.element.find('.btn-finish').attr('disabled', true);
            }

            if (new_step == this._steps.length - 1) {
                this.element.find('.btn-next').attr('disabled', true);
            } else {
                this.element.find('.btn-next').attr('disabled', false);
            }

            if (new_step > 0) {
                this.element.find('.btn-prior').attr('disabled', false);
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
            if (this._stepper != undefined) this._stepper.stepper('stepTo', this._currentStep + 1);

            var finish = parseInt(this.options.finishStep == 'default' ? this._steps.length - 1 : this.options.finishStep);
            if (new_step == finish) {
                this.element.find('.btn-finish').attr('disabled', false);
            } else {
                this.element.find('.btn-finish').attr('disabled', true);
            }

            if (new_step == 0) {
                this.element.find('.btn-prior').attr('disabled', true);
            } else {
                this.element.find('.btn-prior').attr('disabled', false);
            }

            if (new_step < finish) {
                this.element.find('.btn-next').attr('disabled', false);
            }

            return true;
        },

        stepTo: function(step){
            var new_step = step - 1;

            if (new_step < 0) return false;
            this._currentStep = new_step;
            this._steps.hide();
            $(this._steps[new_step]).show();

            this.options.onPage(this._currentStep + 1, this.element);
            if (this._stepper != undefined) this._stepper.stepper('stepTo', step);

            var finish = parseInt(this.options.finishStep == 'default' ? this._steps.length - 1 : this.options.finishStep);
            if (new_step == finish) {
                this.element.find('.btn-finish').attr('disabled', false);
            } else {
                this.element.find('.btn-finish').attr('disabled', true);
            }


            console.log(new_step, finish);

            this.element.find('.btn-next').attr('disabled', !(new_step < finish));
            this.element.find('.btn-prior').attr('disabled', !(new_step > 0));

            return true;
        },

        stepper: function(){
            return this._stepper;
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

