$.widget("metro.input", {

    version: "3.0.0",

    options: {
        showLabelOnValue: false
    },

    _create: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });

        if (element.hasClass('file')) {this._createInputFile();}
        if (element.hasClass('text')) {this._createInputText();}
        if (element.hasClass('password')) {this._createInputText();}
        if (element.hasClass('select')) {this._createInputSelect();}
        if (element.hasClass('textarea')) {this._createInputTextarea();}
        if (element.hasClass('modern')) {this._createInputModern();}

        element.data('input', this);

    },

    _createInputModern: function(){
        var element = this.element;
        var input = element.find("input");
        var placeholder = element.find(".placeholder");

        if (input.val() !== "") {
            placeholder.css({display: "none"});
        }

        input.on("blur", function(){
            if (input.val() !== "") {
                placeholder.css({display: "none"});
            } else {
                placeholder.css({display: "block"});
            }
        });
        input.on("focus", function(){
            if (input.val() !== "") {
                placeholder.css({display: "none"});
            } else {
                placeholder.css({display: "block"});
            }
        });
    },

    _createInputFile: function(){
        var element = this.element;
        var wrapper, button, input;
        wrapper = $("<input type='text' class='input-file-wrapper' readonly style='z-index: 1; cursor: default;'>");
        button = element.children('.button');
        input = element.children('input[type="file"]');
        input.css('z-index', 0);
        wrapper.insertAfter(input);
        input.attr('tabindex', '-1');
        button.attr('type', 'button');
        wrapper.attr('placeholder', input.attr('placeholder'))

        input.on('change', function(){
            var val = $(this).val();
            if (val !== '') {
                wrapper.val(val.replace(/.+[\\\/]/, ""));
                wrapper.attr('title', val.replace(/.+[\\\/]/, ""));
            }
        });

        element.on('click', '.button, .input-file-wrapper', function(){
            input.trigger('click');
        });
    },

    _createInputText: function(){
        var element = this.element;
        var helper_clear = element.find('.helper-button.clear');
        var helper_reveal = element.find('.helper-button.reveal');
        var input = element.find('input');
        var helpers = element.find('.helper-button');
        var buttons = element.find('.button');
        var states = element.find('.input-state-error, .input-state-warning, .input-state-info, .input-state-success, .input-state-required');
        var padding = 0;


        $.each(buttons, function(){
            var b = $(this);
            padding += b.outerWidth();
        });

        input.css({
            'padding-right': padding + 5
        });

        states.css({
            'right': padding + 8
        });

        helpers
            .attr('tabindex', -1)
            .attr('type', 'button');

        if (helper_clear) {
            helper_clear.on('click', function(){
                input.val('').trigger('change').focus();
            });
        }
        if (helper_reveal && element.hasClass('password')) {
            helper_reveal
                .on('mousedown', function(){input.attr('type', 'text');})
                .on('mouseup', function(){input.attr('type', 'password').focus();});
        }
    },

    _createInputSelect: function(){

    },

    _createInputTextarea: function(){

    },

    _destroy: function(){

    },

    _setOption: function(key, value){
        this._super('_setOption', key, value);
    }
});
