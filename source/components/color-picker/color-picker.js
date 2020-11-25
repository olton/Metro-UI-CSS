/* global Metro */
(function(Metro, $) {
    'use strict';

    var Utils = Metro.utils;
    var ColorPickerDefaultConfig = {
        duration: 100,
        prepend: "",
        append: "",
        clearButton: false,
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        pickerButtonIcon: "<span class='default-icon-equalizer'></span>",
        defaultValue: "rgba(0, 0, 0, 0)",
        copyInlineStyles: false,
        clsPickerButton: "",
        clsClearButton: "",
        onColorSelected: Metro.noop,
        onColorPickerCreate: Metro.noop
    };

    Metro.colorPickerSetup = function (options) {
        ColorPickerDefaultConfig = $.extend({}, ColorPickerDefaultConfig, options);
    };

    if (typeof window["metroColorPickerSetup"] !== undefined) {
        Metro.colorPickerSetup(window["metroColorPickerSetup"]);
    }

    Metro.Component('color-picker', {
        init: function( options, elem ) {
            this._super(elem, options, $.extend({}, Metro.defaults.ColorSelectorDefaultConfig, {
                showUserColors: false,
                showValues: ""
            }, ColorPickerDefaultConfig), {
                value: null,
                picker: null,
                colorSelector: null,
                colorSelectorBox: null,
                colorExample: null,
                inputInterval: null,
                isOpen: false
            });
            return this;
        },

        _create: function(){
            var element = this.element, o = this.options;
            var current = element.val();

            if (!Metro.pluginExists("color-selector")) {
                throw new Error("Color selector component required!");
            }

            this.value = Metro.colors.isColor(current) ? current : Metro.colors.isColor(o.defaultValue) ? o.defaultValue : "rgba(0,0,0,0)";

            this._createStructure();
            this._createEvents();

            this._fireEvent('color-picker-create');
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            var picker = element.wrap( $("<div>").addClass("color-picker").addClass(element[0].className) );
            var buttons, colorExample, colorSelector, colorSelectorBox;

            colorExample = $("<div>").addClass("color-example-box").insertBefore(element);

            buttons = $("<div>").addClass("buttons").appendTo(picker);

            buttons.append(
                $("<button>")
                    .addClass("button color-picker-button")
                    .addClass(o.clsPickerButton)
                    .attr("tabindex", -1)
                    .attr("type", "button")
                    .html(o.pickerButtonIcon)
            );

            if (o.clearButton === true && !element[0].readOnly) {
                buttons.append(
                    $("<button>")
                        .addClass("button input-clear-button")
                        .addClass(o.clsClearButton)
                        .attr("tabindex", -1)
                        .attr("type", "button")
                        .html(o.clearButtonIcon)
                );
            }

            if (Utils.isValue(o.prepend)) {
                picker.prepend($("<div>").addClass("prepend").addClass(o.clsPrepend).html(o.prepend));
            }

            if (Utils.isValue(o.append)) {
                picker.append($("<div>").html(o.append).addClass("append").addClass(o.clsAppend));
            }

            colorSelectorBox = $("<div>").addClass("color-selector-box").appendTo(picker);
            colorSelector = $("<div>").appendTo(colorSelectorBox);

            this.picker = picker;
            this.colorExample = colorExample;
            this.colorSelector = colorSelector;
            this.colorSelectorBox = colorSelectorBox;

            Metro.makePlugin(colorSelector, 'color-selector', {
                defaultSwatches: o.defaultSwatches,
                userColors: o.userColors,
                returnValueType: o.returnValueType,
                returnAsString: o.returnAsString,
                showValues: o.showValues,
                showAsString: o.showAsString,
                showUserColors: o.showUserColors,
                target: o.target,
                controller: element,
                locale: o.locale,
                addUserColorTitle: o.addUserColorTitle,
                userColorsTitle: o.userColorsTitle,
                hslMode: o.hslMode,
                showAlphaChannel: o.showAlphaChannel,
                inputThreshold: o.inputThreshold,
                initColor: this.value,
                readonlyInput: o.readonlyInput,
                clsSelector: o.clsSelector,
                clsSwatches: o.clsSwatches,
                clsSwatch: o.clsSwatch,
                clsValue: o.clsValue,
                clsLabel: o.clsLabel,
                clsInput: o.clsInput,
                clsUserColorButton: o.clsUserColorButton,
                clsUserColors: o.clsUserColors,
                clsUserColorsTitle: o.clsUserColorsTitle,
                clsUserColor: o.clsUserColor,
                onColor: o.onColor,
                onColorSelectorCreate: o.onColorSelectorCreate
            });

            Metro.makePlugin(colorSelectorBox, 'dropdown', {
                dropFilter: ".color-picker",
                duration: o.duration,
                toggleElement: [picker],
                checkDropUp: true,
                onDrop: function(){
                    Metro.getPlugin(colorSelector, 'color-selector').val(that.value);
                }
            });

            element[0].className = '';

            if (o.copyInlineStyles === true) {
                $.each(Utils.getInlineStyles(element), function(key, value){
                    picker.css(key, value);
                });
            }

            this._setColor();
        },

        _clearInputInterval: function(){
            clearInterval(this.inputInterval);
            this.inputInterval = false;
        },

        _setColor: function(){
            var colorExample = this.colorExample;
            var color = this.value;

            if (this.value.indexOf("cmyk") !== -1 || this.value.indexOf("hsv") !== -1) {
                color = Metro.colors.toHEX(this.value);
            }

            colorExample.css({
                backgroundColor: color
            });
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            var picker = this.picker,
                colorSelector = this.colorSelector,
                colorSelectorBox = this.colorSelector;

            picker.on(Metro.events.click, ".input-clear-button", function(e){
                e.preventDefault();
                e.stopPropagation();
                element.val(o.defaultValue).trigger("change");
                Metro.getPlugin(colorSelector, 'color-selector').val(o.defaultValue);
            });

            element.on(Metro.events.inputchange, function(){
                that.value = this.value;
                that._setColor();
            });

            colorSelectorBox.on(Metro.events.click, function(e){
                e.stopPropagation();
            })
        },

        val: function(v){
            if (arguments.length === 0 || !Utils.isValue(v)) {
                return this.value;
            }

            if (!Metro.colors.isColor(v)) {
                return ;
            }

            this.value = v;
            this.element.val(v).trigger("change");
            this._setColor();
        },

        // changeAttribute: function(attr, newValue){
        // },

        destroy: function(){
            this.element.remove();
        }
    });

    $(document).on(Metro.events.click, function(){
        $(".color-picker").removeClass("open");
    });

}(Metro, m4q));
