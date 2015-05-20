(function ( $ ) {

    "use strict";

    $.widget( "metro.validator" , {

        version: "1.0.0",

        options: {
            showErrorState: true,
            showErrorHint: true,
            showRequiredState: true,
            showSuccessState: true,
            hintSize: 0,
            hintBackground: '#FFFCC0',
            hintColor: '#000000',
            hideError: 2000,
            hideHint: 5000,
            hintEasing: 'easeInQuad',
            hintEasingTime: 400,
            hintMode: 'hint', // hint, line
            hintPosition: 'right',
            focusInput: true,
            onBeforeSubmit: function(form, result){return true;},
            onErrorInput: function(input){}
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

            if (o.hintMode !== 'line') {
                o.hintMode = 'hint2';
            }

            this._createValidator();

            element.data('validator', this);

        },

        _createValidator: function(){
            var that = this, element = this.element, o = this.options;
            var inputs = element.find("[data-validate-func]");

            element.attr('novalidate', 'novalidate');

            if (o.showRequiredState) {
                inputs.addClass('required');
            }

            inputs.on('focus', function(){
            });

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

                    if (!this_result) {
                        if (typeof o.onErrorInput === 'string') {
                            window[o.onErrorInput](input);
                        } else {
                            o.onErrorInput(input);
                        }
                    }

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
                    if (!this_result && i == 0 && o.focusInput) {
                        input.focus();
                    }
                    result += !this_result ? 1 : 0;
                });

                if (typeof o.onBeforeSubmit === 'string') {
                    result += !window[o.onBeforeSubmit](element, result) ? 1 : 0;
                } else {
                    result += !o.onBeforeSubmit(element, result) ? 1 : 0;
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
            var o = this.options;

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
            var o = this.options, msg = input.data('validateMessage'), pos = input.data('validateMessagePos') || o.hintPosition;
            var hint, top, left;

            hint = $("<div/>").addClass(o.hintMode+' validator-hint').appendTo(input.parent());
            hint.html(this._format(msg, input.val()));
            hint.css({
                'min-width': o.hintSize
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
            if (o.hintMode === 'line') {

            } else {
                // right
                if (pos === 'right') {
                    left = input.offset().left + input.outerWidth() + 15 - $(window).scrollLeft();
                    top = input.offset().top + input.outerHeight() / 2 - hint.outerHeight() / 2 - $(window).scrollTop() - 10;

                    hint.addClass(pos);
                    hint.css({
                        top: top,
                        left: $(window).width() + 100
                    });
                    hint.show().animate({
                        left: left
                    }, o.hintEasingTime, o.hintEasing, function () {
                        setTimeout(function () {
                            hint.hide().remove();
                        }, o.hideHint);
                    });
                } else if (pos === 'left') {
                    left = input.offset().left - hint.outerWidth() - 10 - $(window).scrollLeft();
                    top = input.offset().top + input.outerHeight() / 2 - hint.outerHeight() / 2 - $(window).scrollTop() - 10;

                    hint.addClass(pos);
                    hint.css({
                        top: top,
                        left: -input.offset().left - hint.outerWidth() - 10
                    });
                    hint.show().animate({
                        left: left
                    }, o.hintEasingTime, o.hintEasing, function () {
                        setTimeout(function () {
                            hint.hide().remove();
                        }, o.hideHint);
                    });
                } else if (pos === 'top') {

                } else /*bottom*/ {

                }
            }
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