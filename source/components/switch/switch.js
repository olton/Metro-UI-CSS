var SwitchDefaultConfig = {
    material: false,
    transition: true,
    caption: "",
    captionPosition: "right",
    clsSwitch: "",
    clsCheck: "",
    clsCaption: "",
    onSwitchCreate: Metro.noop
};

Metro.switchSetup = function (options) {
    SwitchDefaultConfig = $.extend({}, SwitchDefaultConfig, options);
};

if (typeof window["metroSwitchSetup"] !== undefined) {
    Metro.switchSetup(window["metroSwitchSetup"]);
}

var Switch = {
    init: function( options, elem ) {
        this.options = $.extend( {}, SwitchDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
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
        var element = this.element, o = this.options;
        var container = $("<label>").addClass((o.material === true ? " switch-material " : " switch ") + element[0].className);
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        Metro.checkRuntime(element, "switch");

        element.attr("type", "checkbox");

        if (element.attr("readonly") !== undefined) {
            element.on("click", function(e){
                e.preventDefault();
            })
        }

        container.insertBefore(element);
        element.appendTo(container);
        check.appendTo(container);
        caption.appendTo(container);

        if (o.transition === true) {
            container.addClass("transition-on");
        }

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

        Utils.exec(o.onSwitchCreate, null, element[0]);
        element.fire("switchcreate");
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
        return this.element;
    }
};

Metro.plugin('switch', Switch);