var Radio = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            className: ""
        };

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onRadioCreate, [this.element]);

        return this;
    },
    options: {
        style: 1,
        caption: "",
        captionPosition: "right",
        clsRadio: "",
        clsCheck: "",
        clsCaption: "",
        onRadioCreate: Metro.noop
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
        var radio = $("<label>").addClass("radio " + element[0].className).addClass(o.style === 2 ? "style2" : "");
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        element.attr("type", "radio");

        if (prev.length === 0) {
            parent.prepend(radio);
        } else {
            radio.insertAfter(prev);
        }

        element.appendTo(radio);
        check.appendTo(radio);
        caption.appendTo(radio);

        if (o.captionPosition === 'left') {
            radio.addClass("caption-left");
        }

        this.origin.className = element[0].className;
        element[0].className = '';

        radio.addClass(o.clsRadio);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
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

        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'data-style': changeStyle(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var parent = element.parent();
        element[0].className = this.origin.className;
        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('radio', Radio);