/**
 * jQuery plugin for input elements for Metro UI CSS framework
 */
(function($) {

    $.Input = function(element, options) {

        var defaults = {
        };

        var plugin = this;
        plugin.settings = {};
        var $element = $(element);

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

            if ($element.hasClass('text')) {
                initTextInput();
            } else if ($element.hasClass('password')) {
                initPasswordInput();
            }
        };

        /**
         * initialize text input element behavior
         */
        var initTextInput = function () {
            var helper,
                $helper,
                input;
            helper = $element.children('.helper').get(0);

            if (!helper) {
                return;
            }

            $helper = $(helper);

            // clear text when clock on helper
            $helper.on('click', function () {
                input = $element.children('input');
                input.attr('value', '');
                input.focus();
            });
        };

        /**
         * initialize password input element behavior
         */
        var initPasswordInput = function () {
            var helper,
                $helper,
                password,
                text;
            helper = $element.children('.helper').get(0);
            if (!helper) {
                return;
            }

            text = $('<input type="text" />');
            password = $element.children('input');
            $helper = $(helper);

            // insert text element and hode password element when push helper
            $helper.on('mousedown', function () {
                password.hide();
                text.insertAfter(password);
                text.attr('value', password.attr('value'));
            });

            // return password and remove text element
            $helper.on('mouseup, mouseout', function () {
                text.detach();
                password.show();
                password.focus();
            });
        };

        plugin.init();

    };

    $.fn.Input = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('Input')) {
                var plugin = new $.Input(this, options);
                $(this).data('Input', plugin);
            }
        });
    }

})(jQuery);

$(function(){
    var allInputs = $('.input-control');
    allInputs.each(function (index, input) {
        var params = {};
        $input = $(input);

        $input.Input(params);
    });
});