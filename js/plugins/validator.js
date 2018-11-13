var ValidatorFuncs = {
    required: function(val){
        return Utils.isValue(val.trim());
    },
    length: function(val, len){
        if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length === parseInt(len);
    },
    minlength: function(val, len){
        if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length >= parseInt(len);
    },
    maxlength: function(val, len){
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
        return /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(val);
    },
    domain: function(val){
        return /^((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(val);
    },
    url: function(val){
        return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(val);
    },
    date: function(val){
        return (new Date(val) !== "Invalid Date" && !isNaN(new Date(val)));
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
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },
    color: function(val){
        return Colors.color(val, Colors.PALETTES.STANDARD) !== false;
    },
    pattern: function(val, pat){
        if (!Utils.isValue(pat)) {
            return false;
        }
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
        return val.trim() !== val2.trim();
    },
    equals: function(val, val2){
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
        var input = Utils.isJQueryObject(el) === false ? $(el) : el ;
        var is_control = ValidatorFuncs.is_control(input);

        if (is_control) {
            input.parent().removeClass("invalid valid");
        } else {
            input.removeClass("invalid valid");
        }
    },

    set_valid_state: function(input){
        if (Utils.isJQueryObject(input) === false) {
            input = $(input);
        }
        var is_control = ValidatorFuncs.is_control(input);

        if (is_control) {
            input.parent().addClass("valid");
        } else {
            input.addClass("valid");
        }
    },

    set_invalid_state: function(input){
        if (Utils.isJQueryObject(input) === false) {
            input = $(input);
        }
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
            if (input.attr('name') === undefined) {
                this_result = true;
            }

            var radio_selector = 'input[name=' + input.attr('name') + ']:checked';
            this_result = $(radio_selector).length > 0;

            if (result !== undefined) {
                result.val += this_result ? 0 : 1;
            }
        } else {
            $.each(funcs, function(){
                if (this_result === false) return;
                var rule = this.split("=");
                var f, a;

                f = rule[0]; rule.shift();
                a = rule.join("=");

                if (['compare', 'equals', 'notequals'].indexOf(f) > -1) {
                    a = input[0].form.elements[a].value;
                }

                if (Utils.isFunc(ValidatorFuncs[f]) === false)  {
                    this_result = true;
                } else {
                    if (required_mode === true || f === "required") {
                        this_result = ValidatorFuncs[f](input.val(), a);
                    } else {
                        if (input.val().trim() !== "") {
                            this_result = ValidatorFuncs[f](input.val(), a);
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

var Validator = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._onsubmit = null;
        this._onreset = null;
        this.result = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['utils', 'colors'],

    options: {
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
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

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
        var inputs = element.find("[data-validate]");

        element
            .attr("novalidate", 'novalidate');
            //.attr("action", "javascript:");

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

        Utils.exec(this.options.onValidatorCreate, [element], this.elem);
    },

    _reset: function(){
        ValidatorFuncs.reset(this.element);
        if (this._onsubmit !==  null) Utils.exec(this._onsubmit, null, this.element[0]);
    },

    _submit: function(){
        var that = this, element = this.element, o = this.options;
        var form = this.elem;
        var inputs = element.find("[data-validate]");
        var submit = element.find(":submit").attr('disabled', 'disabled').addClass('disabled');
        var result = {
            val: 0,
            log: []
        };
        var formData = Utils.formData(element);

        $.each(inputs, function(){
            ValidatorFuncs.validate(this, result, o.onValidate, o.onError, o.requiredMode);
        });

        submit.removeAttr("disabled").removeClass("disabled");

        result.val += Utils.exec(o.onBeforeSubmit, [element, formData], this.elem) === false ? 1 : 0;

        if (result.val === 0) {
            Utils.exec(o.onValidateForm, [element, formData], form);
            setTimeout(function(){
                Utils.exec(o.onSubmit, [element, formData], form);
                if (that._onsubmit !==  null) Utils.exec(that._onsubmit, null, form);
            }, o.submitTimeout);
        } else {
            Utils.exec(o.onErrorForm, [result.log, element, formData], form);
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

    changeAttribute: function(attributeName){
        switch (attributeName) {
        }
    }
};

Metro.plugin('validator', Validator);