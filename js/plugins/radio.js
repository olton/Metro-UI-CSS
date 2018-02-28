var Radio = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onRadioCreate, [this.element]);

        return this;
    },
    options: {
        caption: "",
        captionPosition: "right",
        disabled: false,
        clsElement: "",
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
        var container = $("<label>").addClass("radio " + element[0].className);
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        element.attr("type", "radio");

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        check.appendTo(container);

        if (o.captionPosition === 'left') {
            caption.insertBefore(check);
        } else {
            caption.insertAfter(check);
        }

        element[0].className = '';

        container.addClass(o.clsElement);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (o.disabled === true && element.is(':disabled')) {
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
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    }
};

Metro.plugin('radio', Radio);