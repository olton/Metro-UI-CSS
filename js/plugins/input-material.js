var MaterialInput = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.history = [];
        this.historyIndex = -1;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onInputCreate, [this.element], this.elem);

        return this;
    },

    options: {

        label: "",
        informer: "",
        icon: "",

        permanentLabel: false,

        clsComponent: "",
        clsInput: "",
        clsLabel: "",
        clsInformer: "",
        clsIcon: "",
        clsLine: "",

        onInputCreate: Metro.noop
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
        this._createStructure();
        this._createEvents();
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("input-material " + element[0].className);

        element[0].className = "";

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);

        if (Utils.isValue(o.label)) {
            $("<span>").html(o.label).addClass("label").addClass(o.clsLabel).insertAfter(element);
        }
        if (Utils.isValue(o.informer)) {
            $("<span>").html(o.informer).addClass("informer").addClass(o.clsInformer).insertAfter(element);
        }
        if (Utils.isValue(o.icon)) {
            container.addClass("with-icon");
            $("<span>").html(o.icon).addClass("icon").addClass(o.clsIcon).insertAfter(element);
        }

        container.append($("<hr>").addClass(o.clsLine));

        if (o.permanentLabel === true) {
            container.addClass("permanent-label");
        }

        container.addClass(o.clsComponent);
        element.addClass(o.clsInput);

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.closest(".input");

    },

    clear: function(){
        this.element.val('');
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
    },

    destroy: function(){
        var element = this.element;
        var parent = element.parent();

        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('materialinput', MaterialInput);