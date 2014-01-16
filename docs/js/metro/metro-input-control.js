(function( $ ) {
    $.widget("metro.inputControl", {

        version: "1.0.0",

        options: {
        },

        _create: function(){
            var that = this,
                control = this.element;

            if (control.hasClass('text')) {
                this.initTextInput(control, that);
            } else if (control.hasClass('password')) {
                this.initPasswordInput(control, that);
            } else if (control.hasClass('checkbox') || control.hasClass('radio') || control.hasClass('switch')) {
                this.initCheckboxInput(control, that);
            } else if (control.hasClass('file')) {
                this.initFileInput(control, that);
            }
        },

        initCheckboxInput: function(el, that) {
        },

        initFileInput: function(el, that){
            var button, input, wrapper;
            wrapper = $("<input type='text' id='__input_file_wrapper__' readonly style='z-index: 1; cursor: default;'>");
            button = el.children('.btn-file');
            input = el.children('input[type="file"]');
            input.css('z-index', 0);
            wrapper.insertAfter(input);
            input.attr('tabindex', '-1');
            //button.attr('tabindex', '-1');
            button.attr('type', 'button');

            input.on('change', function(){
                var val = $(this).val();
                if (val != '') {
                    wrapper.val(val);
                }
            });

            button.on('click', function(){
                input.trigger('click');
            });
        },

        initTextInput: function(el, that){
            var button = el.children('.btn-clear'),
                input = el.children('input[type=text]');

            //console.log(button.length);
            //button = el.children('.btn-clear');

            if (button.length == 0) return;

            button.attr('tabindex', '-1');
            button.attr('type', 'button');

            button.on('click', function(){
                input = el.children('input');
                if (input.prop('readonly')) return;
                input.val('');
                input.focus();
                that._trigger("onClear", null, el);
            });

            if (!input.attr("disabled")) input.on('click', function(){$(this).focus();});
        },

        initPasswordInput: function(el, that){
            var button = el.children('.btn-reveal'),
                input = el.children('input[type=password]');
            var wrapper;

            if (button.length == 0) return;

            button.attr('tabindex', '-1');
            button.attr('type', 'button');

            button.on('mousedown', function(e){
                input.attr('type', 'text');
                //e.preventDefault();

//                wrapper = el.find(".__wrapper__").length == 0 ? $('<input type="text" class="__wrapper__" />') : el.find(".__wrapper__");
//
//                input.hide();
//                wrapper.appendTo(that.element);
//                wrapper.val(input.val());
//
//                that._trigger("onPasswordShow", null, that.element);
            });

            button.on('mouseup, mouseleave, blur', function(e){
                input.attr('type', 'password').focus();
                //e.preventDefault();


//                input.show().focus();
//                wrapper.remove();
//
//                that._trigger("onPasswordHide", null, that.element);
            });

            if (!input.attr("disabled")) input.on('click', function(){$(this).focus();});
        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    });
})( jQuery );


(function( $ ) {
    $.widget("metro.inputTransform", {

        version: "1.0.0",

        options: {
            transformType: "text"
        },

        _create: function(){
            var that = this,
                element = this.element,
                inputType;


            var checkTransform = element.parent().hasClass("input-control");
            if (checkTransform) return;

            inputType = element.get(0).tagName.toLowerCase();

            if (inputType == "textarea") {
                this.options.transformType = "textarea";
            } else if (inputType == "select") {
                this.options.transformType = "select";
            } else {
                if (element.data('transformType') != undefined) {
                    this.options.transformType = element.data('transformType');
                } else {
                    this.options.transformType = element.attr("type");
                }
            }

            var control = undefined;

            switch (this.options.transformType) {
                case "password": control = this._createInputPassword(); break;
                case "file": control = this._createInputFile(); break;
                case "checkbox": control = this._createInputCheckbox(); break;
                case "radio": control = this._createInputRadio(); break;
                case "switch": control = this._createInputSwitch(); break;
                case "select": control = this._createInputSelect(); break;
                case "textarea": control = this._createInputTextarea(); break;
                case "search": control = this._createInputSearch(); break;
                case "email": control = this._createInputEmail(); break;
                case "tel": control = this._createInputTel(); break;
                default: control = this._createInputText();
            }

            control.inputControl();
        },

        _createInputTextarea: function(){
            var element = this.element;

            var wrapper = $("<div/>").addClass("input-control").addClass("textarea");
            var clone = element.clone(true);
            var parent = element.parent();

            clone.appendTo(wrapper);
            wrapper.insertBefore(element);

            element.remove();

            return wrapper;
        },

        _createInputSelect: function(){
            var element = this.element;

            var wrapper = $("<div/>").addClass("input-control").addClass("select");
            var clone = element.clone(true);
            var parent = element.parent();

            clone.val(element.val()).appendTo(wrapper);
            wrapper.insertBefore(element);

            element.remove();

            return wrapper;
        },

        _createInputSwitch: function(){
            var element = this.element;

            var wrapper = $("<div/>").addClass("input-control").addClass("switch");
            var label  = $("<label/>");
            var button = $("<span/>").addClass("check");
            var clone = element.clone(true);
            var parent = element.parent();
            var caption = $("<span/>").addClass("caption").html( element.data('caption') != undefined ? element.data('caption') : "" );

            label.appendTo(wrapper);
            clone.appendTo(label);
            button.appendTo(label);
            caption.appendTo(label);

            wrapper.insertBefore(element);
            element.remove();

            return wrapper;
        },

        _createInputCheckbox: function(){
            var element = this.element;

            var wrapper = $("<div/>").addClass("input-control").addClass("checkbox");
            var label  = $("<label/>");
            var button = $("<span/>").addClass("check");
            var clone = element.clone(true);
            var parent = element.parent();
            var caption = $("<span/>").addClass("caption").html( element.data('caption') != undefined ? element.data('caption') : "" );

            label.appendTo(wrapper);
            clone.appendTo(label);
            button.appendTo(label);
            caption.appendTo(label);

            wrapper.insertBefore(element);
            element.remove();

            return wrapper;
        },

        _createInputRadio: function(){
            var element = this.element;

            var wrapper = $("<div/>").addClass("input-control").addClass("radio");
            var label  = $("<label/>");
            var button = $("<span/>").addClass("check");
            var clone = element.clone(true);
            var parent = element.parent();
            var caption = $("<span/>").addClass("caption").html( element.data('caption') != undefined ? element.data('caption') : "" );

            label.appendTo(wrapper);
            clone.appendTo(label);
            button.appendTo(label);
            caption.appendTo(label);

            wrapper.insertBefore(element);
            element.remove();

            return wrapper;
        },

        _createInputSearch: function(){
            var element = this.element;

            var wrapper = $("<div/>").addClass("input-control").addClass("text");
            var button = $("<button/>").addClass("btn-search");
            var clone = element.clone(true);
            var parent = element.parent();

            clone.appendTo(wrapper);
            button.appendTo(wrapper);

            wrapper.insertBefore(element);
            element.remove();

            return wrapper;
        },

        _createInputTel: function(){
            var element = this.element;

            var wrapper = $("<div/>").addClass("input-control").addClass("tel");
            var button = $("<button/>").addClass("btn-clear");
            var clone = element.clone(true);
            var parent = element.parent();

            clone.appendTo(wrapper);
            button.appendTo(wrapper);

            wrapper.insertBefore(element);
            element.remove();

            return wrapper;
        },

        _createInputEmail: function(){
            var element = this.element;

            var wrapper = $("<div/>").addClass("input-control").addClass("email");
            var button = $("<button/>").addClass("btn-clear");
            var clone = element.clone(true);
            var parent = element.parent();

            clone.appendTo(wrapper);
            button.appendTo(wrapper);

            wrapper.insertBefore(element);
            element.remove();

            return wrapper;
        },

        _createInputText: function(){
            var element = this.element;

            var wrapper = $("<div/>").addClass("input-control").addClass("text");
            var button = $("<button/>").addClass("btn-clear");
            var clone = element.clone(true);
            var parent = element.parent();

            clone.appendTo(wrapper);
            button.appendTo(wrapper);

            wrapper.insertBefore(element);
            element.remove();

            return wrapper;
        },

        _createInputPassword: function(){
            var element = this.element;

            var wrapper = $("<div/>").addClass("input-control").addClass("password");
            var button = $("<button/>").addClass("btn-reveal");
            var clone = element.clone(true);
            var parent = element.parent();

            clone.appendTo(wrapper);
            button.appendTo(wrapper);

            wrapper.insertBefore(element);
            element.remove();

            return wrapper;
        },

        _createInputFile: function(){
            var element = this.element;

            var wrapper = $("<div/>").addClass("input-control").addClass("file");
            var button = $("<button/>").addClass("btn-file");
            var clone = element.clone(true);
            var parent = element.parent();

            clone.appendTo(wrapper);
            button.appendTo(wrapper);

            wrapper.insertBefore(element);
            element.remove();

            return wrapper;
        },

        _destroy: function(){},

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

