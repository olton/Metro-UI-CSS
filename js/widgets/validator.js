(function ( $ ) {

    "use strict";

    $.widget( "metro.validator" , {

        version: "1.0.0",

        options: {
            showErrorState: true,
            showErrorHint: true,
            hintSize: 200,
            hintBackground: '#FFFCC0',
            hintColor: '#000000',
            showRequiredState: true,
            showSuccessState: true,
            hideError: 2000,
            hideHint: 5000,
            hintEasing: 'easeInQuad',
            hintEasingTime: 400,
            onBeforeSubmit: function(form){}
        },

        funcs: {
            required: function(val){
                return val.trim() !== "";
            },
            minlength: function(val, len){
                if (len == undefined || isNaN(len) || len <= 0) {
                    return false;
                }
                return val.trim().length >= len;
            },
            maxlength: function(val, len){
                if (len == undefined || isNaN(len) || len <= 0) {
                    return false;
                }
                return val.trim().length <= len;
            },
            min: function(val, min_value){
                if (min_value == undefined || isNaN(min_value)) {
                    return false;
                }
                if (val.trim() === "") {
                    return false;
                }
                if (isNaN(val)) {
                    return false;
                }
                return val >= min_value;
            },
            max: function(val, max_value){
                if (max_value == undefined || isNaN(max_value)) {
                    return false;
                }
                if (val.trim() === "") {
                    return false;
                }
                if (isNaN(val)) {
                    return false;
                }
                return val <= max_value;
            },
            email: function(val){
                return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(val);
            },
            url: function(val){
                return /^(?:[a-z]+:)?\/\//i.test(val);
            },
            date: function(val){
                return !!(new Date(val) !== "Invalid Date" && !isNaN(new Date(val)));
            },
            number: function(val){
                return (val - 0) == val && (''+val).trim().length > 0;
            },
            digits: function(val){
                return /^\d+$/.test(val);
            },
            hexcolor: function(val){
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
            },
            pattern: function(val, pat){
                if (pat == undefined) {
                    return false;
                }
                var reg = new RegExp(pat);
                return reg.test(val);
            }
        },

        _create: function () {
            var that = this, element = this.element, o = this.options;

            $.each(element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = $.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            this._createValidator();

            element.data('validator', this);

        },

        _createValidator: function(){
            var that = this, element = this.element, o = this.options;
            var inputs;

            element.attr('novalidate', 'novalidate');

            if (o.showRequiredState) {
                inputs = element.find("[data-validate-func]");
                inputs.addClass('required');
            }

            element.submit = this._submit();
        },

        _submit: function(){
            var that = this, element = this.element, o = this.options;
            var inputs = element.find("[data-validate-func]");

            element.submit(function(e){
                var result = 0;

                $('.validator-hint').hide();
                inputs.removeClass('error success');
                $.each(inputs, function(i, v){
                    var input = $(v);
                    if (input.parent().hasClass('input-control')) {
                        input.parent().removeClass('error success');
                    }
                });

                $.each(inputs, function(i, v){
                    var input = $(v);
                    var func = input.data('validateFunc'), arg = input.data('validateArg');
                    var this_result = that.funcs[func](input.val(), arg);
                    //console.log(func, input.val(), arg, this_result);
                    if (!this_result && o.showErrorState) {
                        that._showError(input);
                    }
                    if (!this_result && o.showErrorHint) {
                        setTimeout(function(){
                            that._showErrorHint(input);
                        }, i*100);

                    }
                    if (this_result && o.showSuccessState) {
                        that._showSuccess(input);
                    }
                    result += !this_result ? 1 : 0;
                });

                if (typeof o.onBeforeSubmit === 'string') {
                    window[o.onBeforeSubmit](element);
                } else {
                    o.onBeforeSubmit(element);
                }

                //return false;
                return result === 0;
            });
        },

        _showSuccess: function(input){
            if (input.parent().hasClass('input-control')) {
                input.parent().addClass('success');
            } else {
                input.addClass('success');
            }
        },

        _showError: function(input){
            var o = this.options, msg = input.data('validateMessage');

            if (input.parent().hasClass('input-control')) {
                input.parent().addClass('error');
            } else {
                input.addClass('error');
            }

            if (o.hideError && o.hideError > 0) {
                setTimeout(function(){
                    input.parent().removeClass('error');
                }, o.hideError);
            }
        },

        _showErrorHint: function(input){
            var o = this.options, msg = input.data('validateMessage'), pos = input.data('validateMessagePos') || 'right';
            var hint;

            hint = $("<div/>").addClass('hint2 validator-hint').appendTo('body');
            hint.html(this._format(msg, input.val()));
            hint.css({
                'max-width': o.hintSize
            });

            if (o.hintBackground.isColor()) {
                hint.css('background-color', o.hintBackground);
            } else {
                hint.addClass(o.hintBackground);
            }

            if (o.hintColor.isColor()) {
                hint.css('color', o.hintColor);
            } else {
                hint.addClass(o.hintColor);
            }

            // Position
            var left = input.offset().left + input.outerWidth() + 15 - $(window).scrollLeft();

            hint.addClass(pos);
            hint.css({
                top: input.offset().top + input.outerHeight()/2 - hint.outerHeight()/2 - $(window).scrollTop() - 10,
                left: $(window).width() + 100
            });
            hint.show().animate({
                left: left
            }, o.hintEasingTime, o.hintEasing, function(){
                setTimeout(function(){
                    hint.hide().remove();
                }, o.hideHint);
            });
        },

        _format: function( source, params ) {
            if ( arguments.length === 1 ) {
                return function() {
                    var args = $.makeArray( arguments );
                    args.unshift( source );
                    return $.validator.format.apply( this, args );
                };
            }
            if ( arguments.length > 2 && params.constructor !== Array  ) {
                params = $.makeArray( arguments ).slice( 1 );
            }
            if ( params.constructor !== Array ) {
                params = [ params ];
            }
            $.each( params, function( i, n ) {
                source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
                    return n;
                });
            });
            return source;
        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });

})( jQuery );