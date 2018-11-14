var Switch = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onSwitchCreate, [this.element]);

        return this;
    },
    options: {
        material: false,
        caption: "",
        captionPosition: "right",
        clsSwitch: "",
        clsCheck: "",
        clsCaption: "",
        onSwitchCreate: Metro.noop
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
        var container = $("<label>").addClass((o.material === true ? " switch-material " : " switch ") + element[0].className);
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        element.attr("type", "checkbox");

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        check.appendTo(container);
        caption.appendTo(container);

        if (o.captionPosition === 'left') {
            container.addClass("caption-left");
        }

        element[0].className = '';

        container.addClass(o.clsSwitch);
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
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    }
};

Metro.plugin('switch', Switch);