/**
 * Slider - jQuery plugin for MetroUiCss framework
 *
 * there is "change" event triggering when marker moving
 * and "changed" event when stop moving
 *
 * you may use this code to handle events:

$(window).ready(function(){
    $('.slider').on('change', function(e, val){
        console.log('change to ' + val);
    }).on('changed', function(e, val){
        console.log('changed to ' + val);
    });
});

 * and this, to retrieve value

$('.slider').data('value')

 *
 */

(function($) {

    $.slider = function(element, options) {

        // default settings
        var defaults = {
            // start value of slider
            initValue: 0,
            // accuracy
            accuracy: 1
        };

        var plugin = this;
        plugin.settings = {};

        var $element = $(element); // reference to the jQuery version of DOM element

        var complete, // complete part element
            marker, // marker element
            currentValuePerc, // current percents count
            sliderLength,
            sliderOffset,
            sliderStart,
            sliderEnd,
            percentPerPixel,
            markerSize,
            vertical = false;

        // initialization
        plugin.init = function () {

            plugin.settings = $.extend({}, defaults, options);

            // create inside elements
            complete = $('<div class="complete"></div>');
            marker = $('<div class="marker"></div>');

            complete.appendTo($element);
            marker.appendTo($element);

            vertical = $element.hasClass('vertical');

            initGeometry();

            // start value
            currentValuePerc = correctValuePerc(plugin.settings.initValue);
            placeMarkerByPerc(currentValuePerc);

            // init marker handler
            marker.on('mousedown', function (e) {
                e.preventDefault();
                startMoveMarker();
            });

            $element.on('click', function (event) {
                initGeometry();
                movingMarker(event);
                $element.trigger('changed', [currentValuePerc]);
            });

        };

        /**
         * correct percents using "accuracy" parameter
         */
        var correctValuePerc = function (value) {
            var accuracy = plugin.settings.accuracy;
            if (accuracy === 0) {
                return value;
            }
            if (value === 100) {
                return 100;
            }
            value = Math.floor(value / accuracy) * accuracy + Math.round(value % accuracy / accuracy) * accuracy;
            if (value > 100) {
                return 100;
            }
            return value;
        };

        /**
         * convert pixels to percents
         */
        var pixToPerc = function (valuePix) {
            var valuePerc;
            valuePerc = valuePix * percentPerPixel;
            return correctValuePerc(valuePerc);
        };

        /**
         * convert percents to pixels
         */
        var percToPix = function (value) {
            if (percentPerPixel === 0) {
                return 0;
            }
            return value / percentPerPixel;
        };

        /**
         * place marker
         */
        var placeMarkerByPerc = function (valuePerc) {
            var size, size2;

            if (vertical) {
                size = percToPix(valuePerc) + markerSize;
                size2 = sliderLength - size;
                marker.css('top', size2);
                complete.css('height', size);
            } else {
                size = percToPix(valuePerc);
                marker.css('left', size);
                complete.css('width', size);
            }

        };

        /**
         * when mousedown on marker
         */
        var startMoveMarker = function () {
            // register event handlers
            $(document).on('mousemove.sliderMarker', function (event) {
                movingMarker(event);
            });
            $(document).on('mouseup.sliderMarker', function () {
                $(document).off('mousemove.sliderMarker');
                $(document).off('mouseup.sliderMarker');
                $element.data('value', currentValuePerc);
                $element.trigger('changed', [currentValuePerc]);
            });

            initGeometry();
        };

        /**
         * some geometry slider parameters
         */
        var initGeometry = function () {
            if (vertical) {
                sliderLength = $element.height(); // slider element length
                sliderOffset = $element.offset().top; // offset relative to document edge
                markerSize = marker.height();
            } else {
                sliderLength = $element.width();
                sliderOffset = $element.offset().left;
                markerSize = marker.width();

            }

            percentPerPixel = 100 / (sliderLength - markerSize); // it depends on slider element size
            sliderStart = markerSize / 2;
            sliderEnd = sliderLength - markerSize / 2;
        };

        /**
         * moving marker
         */
        var movingMarker = function (event) {
            var cursorPos,
                percents,
                valuePix;

            // cursor position relative to slider start point
            if (vertical) {
                cursorPos = event.pageY - sliderOffset;
            } else {
                cursorPos = event.pageX - sliderOffset;
            }

            // if outside
            if (cursorPos < sliderStart) {
                cursorPos = sliderStart;
            } else if (cursorPos > sliderEnd) {
                cursorPos = sliderEnd;
            }

            // get pixels count
            if (vertical) {
                valuePix = sliderLength - cursorPos - markerSize / 2;
            } else {
                valuePix = cursorPos - markerSize / 2;
            }

            // convert to percent
            percents = pixToPerc(valuePix);

            // place marker
            placeMarkerByPerc(percents);

            currentValuePerc = percents;

            $element.trigger('change', [currentValuePerc]);
        };


        plugin.init();

    };

    $.fn.slider = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('slider')) {
                var plugin = new $.slider(this, options);
                $(this).data('slider', plugin);
            }
        });
    };


})(jQuery);


$(window).ready(function(){
    var allsliders = $('[data-role=slider], .slider');
    allsliders.each(function (index, slider) {
        var params = {};
        $slider = $(slider);
        params.initValue        = $slider.data('paramInitValue');
        params.accuracy       = $slider.data('paramAccuracy');

        $slider.slider(params);
    });
});