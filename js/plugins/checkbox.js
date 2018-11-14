var Checkbox = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            className: ""
        };

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onCheckboxCreate, [this.element]);

        return this;
    },
    options: {
        style: 1,
        caption: "",
        captionPosition: "right",
        indeterminate: false,
        clsCheckbox: "",
        clsCheck: "",
        clsCaption: "",
        onCheckboxCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

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
        var prev = element.prev();
        var parent = element.parent();
        var checkbox = $("<label>").addClass("checkbox " + element[0].className).addClass(o.style === 2 ? "style2" : "");
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        if (element.attr('id') === undefined) {
            element.attr('id', Utils.elementId("checkbox"));
        }

        checkbox.attr('for', element.attr('id'));

        element.attr("type", "checkbox");
        element.appendTo(checkbox);

        if (prev.length === 0) {
            parent.prepend(checkbox);
        } else {
            checkbox.insertAfter(prev);
        }

        check.appendTo(checkbox);
        caption.appendTo(checkbox);

        if (o.captionPosition === 'left') {
            checkbox.addClass("caption-left");
        }

        this.origin.className = element[0].className;
        element[0].className = '';

        checkbox.addClass(o.clsCheckbox);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (o.indeterminate) {
            element[0].indeterminate = true;
        }

        if (element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
    },

    indeterminate: function(){
        this.element[0].indeterminate = true;
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;
        var parent = element.parent();

        var changeStyle = function(){
            var new_style = parseInt(element.attr("data-style"));

            if (!Utils.isInt(new_style)) return;

            o.style = new_style;
            parent.removeClass("style1 style2").addClass("style"+new_style);
        };

        var indeterminateState = function(){
            element[0].indeterminate = JSON.parse(element.attr("data-indeterminate")) === true;
        };

        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'data-indeterminate': indeterminateState(); break;
            case 'data-style': changeStyle(); break;
        }
    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;
        var parent = element.parent();

        element[0].className = this.origin.className;
        element.insertBefore(parent);

        parent.remove();
    }
};

Metro.plugin('checkbox', Checkbox);