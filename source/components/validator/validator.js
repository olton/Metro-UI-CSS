/* global Metro */
(function(Metro, $) {
    'use strict';

    var Utils = Metro.utils;
    var ValidatorFuncs = {
        required: function(val){
            if (Array.isArray(val)) {
                return val.length > 0 ? val : false;
            } else {
                return Utils.isValue(val) ? val.trim() : false;
            }
        },
        length: function(val, len){
            if (Array.isArray(val)) {return val.length === parseInt(len);}
            if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
                return false;
            }
            return val.trim().length === parseInt(len);
        },
        minlength: function(val, len){
            if (Array.isArray(val)) {return val.length >= parseInt(len);}
            if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
                return false;
            }
            return val.trim().length >= parseInt(len);
        },
        maxlength: function(val, len){
            if (Array.isArray(val)) {return val.length <= parseInt(len);}
            if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
                return false;
            }
            return val.trim().length <= parseInt(len);
        },
        min: function(val, min_value){
            if (!Utils.isValue(min_value) || isNaN(min_value)) {
                return false;
            }
            if (!this.number(val)) {
                return false;
            }
            if (isNaN(val)) {
                return false;
            }
            return Number(val) >= Number(min_value);
        },
        max: function(val, max_value){
            if (!Utils.isValue(max_value) || isNaN(max_value)) {
                return false;
            }
            if (!this.number(val)) {
                return false;
            }
            if (isNaN(val)) {
                return false;
            }
            return Number(val) <= Number(max_value);
        },
        email: function(val){
            /* eslint-disable-next-line */
            return /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(val);
        },
        domain: function(val){
            /* eslint-disable-next-line */
            return /^((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(val);
        },
        url: function(val){
            /* eslint-disable-next-line */
            var regexp    = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
            return regexp.test(val);
        },
        date: function(val, format, locale){
            if (Utils.isNull(format)) {
                return String(new Date(val)).toLowerCase() !== "invalid date";
            } else {
                return String(val.toDate(format, locale)).toLowerCase() !== "invalid date";
            }
        },
        number: function(val){
            return !isNaN(val);
        },
        integer: function(val){
            return Utils.isInt(val);
        },
        float: function(val){
            return Utils.isFloat(val);
        },
        digits: function(val){
            return /^\d+$/.test(val);
        },
        hexcolor: function(val){
            /* eslint-disable-next-line */
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
        },
        color: function(val){
            if (!Utils.isValue(val)) return false;
            return Metro.colors.color(val, Metro.colors.PALETTES.STANDARD) !== false || Metro.colors.isColor(Metro.colors.parse(val));
        },
        pattern: function(val, pat){
            if (!Utils.isValue(val)) return false;
            if (!Utils.isValue(pat)) return false;
            var reg = new RegExp(pat);
            return reg.test(val);
        },
        compare: function(val, val2){
            return val === val2;
        },
        not: function(val, not_this){
            return val !== not_this;
        },
        notequals: function(val, val2){
            if (Utils.isNull(val)) return false;
            if (Utils.isNull(val2)) return false;
            return val.trim() !== val2.trim();
        },
        equals: function(val, val2){
            if (Utils.isNull(val)) return false;
            if (Utils.isNull(val2)) return false;
            return val.trim() === val2.trim();
        },
        custom: function(val, func){
            if (Utils.isFunc(func) === false) {
                return false;
            }
            return Utils.exec(func, [val]);
        },

        is_control: function(el){
            return el.parent().hasClass("input")
                || el.parent().hasClass("select")
                || el.parent().hasClass("textarea")
                || el.parent().hasClass("checkbox")
                || el.parent().hasClass("switch")
                || el.parent().hasClass("radio")
                || el.parent().hasClass("spinner")
                ;
        },

        reset_state: function(el){
            var input = $(el);
            var is_control = ValidatorFuncs.is_control(input);

            if (is_control) {
                input.parent().removeClass("invalid valid");
            } else {
                input.removeClass("invalid valid");
            }
        },

        set_valid_state: function(el){
            var input = $(el);
            var is_control = ValidatorFuncs.is_control(input);

            if (is_control) {
                input.parent().addClass("valid");
            } else {
                input.addClass("valid");
            }
        },

        set_invalid_state: function(el){
            var input = $(el);
            var is_control = ValidatorFuncs.is_control(input);

            if (is_control) {
                input.parent().addClass("invalid");
            } else {
                input.addClass("invalid");
            }
        },

        reset: function(form){
            var that = this;
            $.each($(form).find("[data-validate]"), function(){
                that.reset_state(this);
            });

            return this;
        },

        validate: function(el, result, cb_ok, cb_error, required_mode){
            var this_result = true;
            var input = $(el);
            var funcs = input.data('validate') !== undefined ? String(input.data('validate')).split(" ").map(function(s){return s.trim();}) : [];
            var errors = [];
            var hasForm = input.closest('form').length > 0;
            var attr_name, radio_checked;

            if (funcs.length === 0) {
                return true;
            }

            this.reset_state(input);

            if (input.attr('type') && input.attr('type').toLowerCase() === "checkbox") {
                if (funcs.indexOf('required') === -1) {
                    this_result = true;
                } else {
                    this_result = input.is(":checked");
                }

                if (this_result === false) {
                    errors.push('required');
                }

                if (result !== undefined) {
                    result.val += this_result ? 0 : 1;
                }
            } else if (input.attr('type') && input.attr('type').toLowerCase() === "radio") {
                attr_name = input.attr('name');
                if (typeof attr_name  === undefined) {
                    this_result = true;
                } else {
                    /*
                    * Fix with escaped name by nlared https://github.com/nlared
                    * */
                    radio_checked = $("input[name=" + attr_name.replace("[", "\\\[").replace("]", "\\\]") + "]:checked"); // eslint-disable-line
                    this_result = radio_checked.length > 0;
                }
                if (result !== undefined) {
                    result.val += this_result ? 0 : 1;
                }
            } else {
                $.each(funcs, function(){
                    if (this_result === false) return;
                    var rule = this.split("=");
                    var f, a, b;

                    f = rule[0]; rule.shift();
                    a = rule.join("=");

                    if (['compare', 'equals', 'notequals'].indexOf(f) > -1) {
                        a = hasForm ? input[0].form.elements[a].value : $("[name="+a+"]").val();
                    }

                    if (f === 'date') {
                        a = input.attr("data-value-format");
                        b = input.attr("data-value-locale");
                    }

                    if (Utils.isFunc(ValidatorFuncs[f]) === false)  {
                        this_result = true;
                    } else {
                        if (required_mode === true || f === "required") {
                            this_result = ValidatorFuncs[f](input.val(), a, b);
                        } else {
                            if (input.val().trim() !== "") {
                                this_result = ValidatorFuncs[f](input.val(), a, b);
                            } else {
                                this_result = true;
                            }
                        }
                    }

                    if (this_result === false) {
                        errors.push(f);
                    }

                    if (result !== undefined) {
                        result.val += this_result ? 0 : 1;
                    }
                });
            }

            if (this_result === false) {
                this.set_invalid_state(input);

                if (result !== undefined) {
                    result.log.push({
                        input: input[0],
                        name: input.attr("name"),
                        value: input.val(),
                        funcs: funcs,
                        errors: errors
                    });
                }

                if (cb_error !== undefined) Utils.exec(cb_error, [input, input.val()], input[0]);

            } else {
                this.set_valid_state(input);

                if (cb_ok !== undefined) Utils.exec(cb_ok, [input, input.val()], input[0]);
            }

            return this_result;
        }
    };

    Metro['validator'] = ValidatorFuncs;

    var ValidatorDefaultConfig = {
        validatorDeferred: 0,
        submitTimeout: 200,
        interactiveCheck: false,
        clearInvalid: 0,
        requiredMode: true,
        useRequiredClass: true,
        onBeforeSubmit: Metro.noop_true,
        onSubmit: Metro.noop,
        onError: Metro.noop,
        onValidate: Metro.noop,
        onErrorForm: Metro.noop,
        onValidateForm: Metro.noop,
        onValidatorCreate: Metro.noop
    };

    Metro.validatorSetup = function (options) {
        ValidatorDefaultConfig = $.extend({}, ValidatorDefaultConfig, options);
    };

    if (typeof window["metroValidatorSetup"] !== undefined) {
        Metro.validatorSetup(window["metroValidatorSetup"]);
    }

    Metro.Component('validator', {
        name: "Validator",

        init: function( options, elem ) {
            this._super(elem, options, ValidatorDefaultConfig, {
                _onsubmit: null,
                _onreset: null,
                result: []
            });

            return this;
        },

        _create: function(){
            var that = this, element = this.element, o = this.options;
            var inputs = element.find("[data-validate]");

            element
                .attr("novalidate", 'novalidate');

            $.each(inputs, function(){
                var input = $(this);
                var funcs = input.data("validate");
                var required = funcs.indexOf("required") > -1;
                if (required && o.useRequiredClass === true) {
                    if (ValidatorFuncs.is_control(input)) {
                        input.parent().addClass("required");
                    } else {
                        input.addClass("required");
                    }
                }
                if (o.interactiveCheck === true) {
                    input.on(Metro.events.inputchange, function () {
                        ValidatorFuncs.validate(this, undefined, undefined, undefined, o.requiredMode);
                    });
                }
            });

            this._onsubmit = null;
            this._onreset = null;

            if (element[0].onsubmit !== null) {
                this._onsubmit = element[0].onsubmit;
                element[0].onsubmit = null;
            }

            if (element[0].onreset !== null) {
                this._onreset = element[0].onreset;
                element[0].onreset = null;
            }

            element[0].onsubmit = function(){
                return that._submit();
            };

            element[0].onreset = function(){
                return that._reset();
            };

            this._fireEvent("validator-create", {
                element: element
            });
        },

        _reset: function(){
            ValidatorFuncs.reset(this.element);
            if (this._onsubmit !==  null) Utils.exec(this._onsubmit, null, this.element[0]);
        },

        _submit: function(){
            var that = this, element = this.element, o = this.options;
            var form = this.elem;
            var inputs = element.find("[data-validate]");
            var submit = element.find("input[type=submit], button[type=submit]");
            var result = {
                val: 0,
                log: []
            };
            var formData = $.serializeToArray(element);

            if (submit.length > 0) {
                submit.attr('disabled', 'disabled').addClass('disabled');
            }

            $.each(inputs, function(){
                ValidatorFuncs.validate(this, result, o.onValidate, o.onError, o.requiredMode);
            });

            submit.removeAttr("disabled").removeClass("disabled");

            result.val += Utils.exec(o.onBeforeSubmit, [formData], this.elem) === false ? 1 : 0;

            if (result.val === 0) {

                this._fireEvent("validate-form", {
                    data: formData
                });

                setTimeout(function(){
                    // TODO need fix event name to equivalent
                    Utils.exec(o.onSubmit, [formData], form);
                    element.fire("formsubmit", {
                        data: formData
                    });
                    if (that._onsubmit !==  null) Utils.exec(that._onsubmit, null, form);
                }, o.submitTimeout);
            } else {

                this._fireEvent("error-form", {
                    log: result.log,
                    data: formData
                });

                if (o.clearInvalid > 0) {
                    setTimeout(function(){
                        $.each(inputs, function(){
                            var inp  = $(this);
                            if (ValidatorFuncs.is_control(inp)) {
                                inp.parent().removeClass("invalid");
                            } else {
                                inp.removeClass("invalid");
                            }
                        })
                    }, o.clearInvalid);
                }
            }

            return result.val === 0;
        },

        changeAttribute: function(){
        }
    });
}(Metro, m4q));