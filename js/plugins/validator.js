var ValidatorFuncs = {
    required: function(val){
        return val.trim() !== "";
    },
    length: function(val, len){
        if (len === undefined || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length === parseInt(len);
    },
    minlength: function(val, len){
        if (len === undefined || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length >= parseInt(len);
    },
    maxlength: function(val, len){
        if (len === undefined || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length <= parseInt(len);
    },
    min: function(val, min_value){
        if (min_value === undefined || isNaN(min_value)) {
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
        if (max_value === undefined || isNaN(max_value)) {
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
        if (pat === undefined) {
            return false;
        }
        var reg = new RegExp(pat);
        return reg.test(val);
    },
    compare: function(val, val2){
        return val === val2;
    },

    is_control: function(el){
        return el.parent().hasClass("input") || el.parent().hasClass("select") || el.parent().hasClass("textarea") || el.parent().hasClass("checkbox") || el.parent().hasClass("switch");
    },

    validate: function(el, result, cb_ok, cb_error){
        var this_result = true;
        var input = $(el);
        var control = ValidatorFuncs.is_control(input);
        var funcs = input.data('validate') !== undefined ? String(input.data('validate')).split(" ").map(function(s){return s.trim();}) : [];
        var errors = [];

        if (funcs.length === 0) {
            return true;
        }

        if (control) {
            input.parent().removeClass("invalid valid");
        } else {
            input.removeClass("invalid valid");
        }

        if (input.attr('type').toLowerCase() === "checkbox") {
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
        } else {
            $.each(funcs, function(){
                if (this_result === false) return;
                var rule = this.split("=");
                var f, a;

                f = rule[0]; rule.shift();
                a = rule.join("=");

                if (f === 'compare') {
                    a = input[0].form.elements[a].value;
                }

                if (Utils.isFunc(ValidatorFuncs[f]) === false)  {
                    this_result = true;
                } else {
                    this_result = ValidatorFuncs[f](input.val(), a);
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
            if (control) {
                input.parent().addClass("invalid")
            } else {
                input.addClass("invalid")
            }

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
            if (control) {
                input.parent().addClass("valid")
            } else {
                input.addClass("valid")
            }

            if (cb_ok !== undefined) Utils.exec(cb_ok, [input, input.val()], input[0]);
        }

        return true;
    }
};

Metro['validator'] = ValidatorFuncs;

var Validator = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._onsubmit = null;
        this._action = null;
        this.result = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        submitTimeout: 200,
        interactiveCheck: false,
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

        this._action = element[0].action;

        element
            .attr("novalidate", 'novalidate')
            .attr("action", "javascript:");

        $.each(inputs, function(){
            var input = $(this);
            var funcs = input.data("validate");
            var required = funcs.indexOf("required") > -1;
            if (required) {
                if (ValidatorFuncs.is_control(input)) {
                    input.parent().addClass("required");
                } else {
                    input.addClass("required");
                }
            }
            if (o.interactiveCheck === true) {
                input.on(Metro.events.inputchange, function () {
                    ValidatorFuncs.validate(this);
                });
            }
        });

        this._onsubmit = null;

        if (element[0].onsubmit !== null) {
            this._onsubmit = element[0].onsubmit;
            element[0].onsubmit = null;
        }

        element[0].onsubmit = function(){
            return that._submit();
        };

        Utils.exec(this.options.onValidatorCreate, [element], this.elem);
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

        $.each(inputs, function(){
            ValidatorFuncs.validate(this, result, o.onValidate, o.onError);
        });

        submit.removeAttr("disabled").removeClass("disabled");

        element[0].action = this._action;

        result.val += Utils.exec(o.onBeforeSubmit, [element], this.elem) === false ? 1 : 0;

        if (result.val === 0) {
            Utils.exec(o.onValidateForm, [element], form);
            setTimeout(function(){
                Utils.exec(o.onSubmit, [element], form);
                if (that._onsubmit !==  null) Utils.exec(that._onsubmit, null, form);
            }, o.submitTimeout);
        } else {
            Utils.exec(o.onErrorForm, [result.log, element], form);
        }

        return result.val === 0;
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
        }
    }
};

Metro.plugin('validator', Validator);