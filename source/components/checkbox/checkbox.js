/* global Metro, Utils, Component */
var CheckboxDefaultConfig = {
    checkboxDeferred: 0,
    transition: true,
    style: 1,
    caption: "",
    captionPosition: "right",
    indeterminate: false,
    clsCheckbox: "",
    clsCheck: "",
    clsCaption: "",
    onCheckboxCreate: Metro.noop
};

Metro.checkboxSetup = function (options) {
    CheckboxDefaultConfig = $.extend({}, CheckboxDefaultConfig, options);
};

if (typeof window["metroCheckboxSetup"] !== undefined) {
    Metro.checkboxSetup(window["metroCheckboxSetup"]);
}

Component('checkbox', {
    init: function( options, elem ) {
        this._super(elem, options, CheckboxDefaultConfig);

        this.origin = {
            className: ""
        };

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        Metro.checkRuntime(this.element, this.name);
        this._createStructure();
        this._createEvents();
        Utils.exec(this.options.onCheckboxCreate, null, this.element[0]);
        this.element.fire("checkboxcreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var checkbox = $("<label>").addClass("checkbox " + element[0].className).addClass(o.style === 2 ? "style2" : "");
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        if (element.attr('id') === undefined) {
            element.attr('id', Utils.elementId("checkbox"));
        }

        if (element.attr("readonly") !== undefined) {
            element.on("click", function(e){
                e.preventDefault();
            })
        }

        checkbox.attr('for', element.attr('id'));

        element.attr("type", "checkbox");

        checkbox.insertBefore(element);

        element.appendTo(checkbox);
        check.appendTo(checkbox);
        caption.appendTo(checkbox);

        if (o.transition === true) {
            checkbox.addClass("transition-on");
        }

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

    _createEvents: function(){
        var element = this.element, check = element.siblings(".check");

        element.on("focus", function(){
            check.addClass("focused");
        });

        element.on("blur", function(){
            check.removeClass("focused");
        });
    },

    indeterminate: function(v){
        if (Utils.isNull(v)) {
            v = true;
        }
        this.element[0].indeterminate = v;
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
        var element = this.element, o = this.options;
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
        var element = this.element;
        element.off("focus");
        element.off("blur");
        return element;
    }
});
