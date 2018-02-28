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
        caption: "",
        captionPosition: "right",
        disabled: false,
        clsElement: "",
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
        var container = $("<label>").addClass("checkbox " + element[0].className);
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        if (element.attr('id') === undefined) {
            element.attr('id', Utils.uniqueId());
        }

        container.attr('for', element.attr('id'));

        element.attr("type", "checkbox");
        element.appendTo(container);

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        check.appendTo(container);

        if (o.captionPosition === 'left') {
            caption.insertBefore(check);
        } else {
            caption.insertAfter(check);
        }

        this.origin.className = element[0].className;
        element[0].className = '';

        container.addClass(o.clsElement);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (element.attr("indeterminate") !== undefined) {
            element[0].indeterminate = true;
        }

        if (o.disabled === true && element.is(':disabled')) {
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
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    toggleIndeterminate: function(){
        this.element[0].indeterminate = this.element.attr("indeterminate") !== undefined;
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'indeterminate': this.toggleIndeterminate(); break;
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