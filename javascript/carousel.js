/**
 * Carousel - jQuery plugin for MetroUiCss framework
 */

(function($) {
    var pluginName = 'Carousel',
        initAllSelector = '[data-role=carousel], .carousel',
        paramKeys = ['Auto', 'Period', 'Duration', 'Effect', 'Direction', 'Markers', 'Arrows', 'Stop'];

    $[pluginName] = function(element, options) {
        if (!element) {
            return $()[pluginName]({initAll: true});
        }

        // default settings
        var defaults = {
            // auto slide change
            auto: true,
            // slide change period
            period: 6000,
            // animation duration
            duration: 1000,
            // animation effect (fade, slide, switch, slowdown)
            effect: 'slide',
            // animation direction (left, right) for some kinds of animation effect
            direction: 'left',
            // markers below the carousel
            markers: 'on',
            // prev and next arrows
            arrows: 'on',
            // stop sliding when cursor over the carousel
            stop: 'on'
        };

        var plugin = this;
        // plugin settings
        plugin.settings = {};

        var $element = $(element); // reference to the jQuery version of DOM element

        var slides, // all slides DOM objects
            currentSlideIndex, // index of current slide
            slideInPosition, // slide start position before it's appear
            slideOutPosition, // slide position after it's disappear
            parentWidth,
            parentHeight,
            animationInProgress,
            autoSlideTimer,
            markers,
            stopAutoSlide = false;

        // initialization
        plugin.init = function () {

            plugin.settings = $.extend({}, defaults, options);

            slides = $element.find('.slides:first-child > .slide');

            // if only one slide
            if (slides.length <= 1) {
                return;
            }

            currentSlideIndex = 0;

            // parent block dimensions
            parentWidth = $element.innerWidth();
            parentHeight = $element.innerHeight();
            // slides positions, used for some kinds of animation
            slideInPosition = getSlideInPosition();
            slideOutPosition = getSlideOutPosition();

            // prepare slide elements
            slides.each(function (index, slide) {
                $slide = $(slide);
                // each slide must have position:absolute
                // if not, set it
                if ($slide.css('position') !== 'absolute') {
                    $slide.css('position', 'absolute');
                }
                // disappear all slides, except first
                if (index !== 0) {
                    $slide.hide();
                }
            });

            if (plugin.settings.arrows === 'on') {
                // prev next buttons handlers
                $element.find('span.control.left').on('click', function(){
                    changeSlide('left');
                    startAutoSlide();
                });
                $element.find('span.control.right').on('click', function(){
                    changeSlide('right');
                    startAutoSlide();
                });
            } else {
                $element.find('span.control').hide();
            }

            // markers
            if (plugin.settings.markers === 'on') {
                insertMarkers();
            }

            // enable auto slide
            if (plugin.settings.auto === true) {
                startAutoSlide();

                // stop sliding when cursor over the carousel
                if (plugin.settings.stop === 'on') {
                    $element.on('mouseenter', function () {
                        stopAutoSlide = true;
                    });
                    $element.on('mouseleave', function () {
                        stopAutoSlide = false;
                        startAutoSlide();
                    });
                }
            }

            // u can use same code:
            // $('#carusel').trigger('changeSlide', [{direction: 'left', effect: 'fade', index: 1}])
            // any option not required
            $element.on('changeSlide', function(event, options){
                options = options || {};
                changeSlide(options.direction, options.effect, options.index);
            });
        };

        /**
         * returns start position for appearing slide {left: xxx}
         */
        var getSlideInPosition = function () {
            var pos;
            if (plugin.settings.direction === 'left') {
                pos = {
                    'left': parentWidth
                }
            } else if (plugin.settings.direction === 'right') {
                pos = {
                    'left': -parentWidth
                }
            }
            return pos;
        };

        /**
         * returns end position of disappearing slide {left: xxx}
         */
        var getSlideOutPosition = function () {
            var pos;
            if (plugin.settings.direction === 'left') {
                pos = {
                    'left': -parentWidth
                }
            } else if (plugin.settings.direction === 'right') {
                pos = {
                    'left': parentWidth
                }
            }
            return pos;
        };

        /**
         * start or restart auto change
         */
        var startAutoSlide = function () {
            clearInterval(autoSlideTimer);
            // start slide changer timer
            autoSlideTimer = setInterval(function () {
                if (stopAutoSlide) {
                    return;
                }
                changeSlide();
            }, plugin.settings.period);
        };

        /**
         * inserts markers below the carousel
         */
        var insertMarkers = function () {
            var div, ul, li, i;

            div = $('<div class="markers"></div>');
            ul = $('<ul></ul>').appendTo(div);

            for (i = 0; i < slides.length; i++) {
                li = $('<li><a href="javascript:void(0)" data-num="' + i + '"></a></li>');
                if (i === 0) {
                    li.addClass('active');
                }
                li.appendTo(ul);
            }

            markers = ul.find('li');

            ul.find('li a').on('click', function () {
                var $this = $(this),
                    index;

                // index of appearing slide
                index = $this.data('num');
                if (index === currentSlideIndex) {
                    return;
                }

                changeSlide(undefined, 'switch', index);
                startAutoSlide();
            });

            div.appendTo($element);
        };

        /**
         * changes slide to next
         */
        var changeSlide = function(direction, effect, slideIndex) {

            var outSlide, // disappearin slide element
                inSlide, // appearing slide element
                nextSlideIndex,
                delta = 1,
                slideDirection = 1;

            effect = effect || plugin.settings.effect;
            // correct slide direction, used for 'slide' and 'slowdown' effects
            if ((effect === 'slide' || effect === 'slowdown') && typeof direction !== 'undefined' && direction !== plugin.settings.direction) {
                slideDirection = -1;
            }
            if (direction === 'left') {
                delta = -1;
            }

            outSlide = $(slides[currentSlideIndex]);

            nextSlideIndex = (typeof slideIndex !== 'undefined' && slideIndex !== currentSlideIndex) ? slideIndex : currentSlideIndex + delta;
            if (nextSlideIndex >= slides.length) {
                nextSlideIndex = 0;
            }
            if (nextSlideIndex < 0) {
                nextSlideIndex = slides.length - 1;
            }

            inSlide = $(slides[nextSlideIndex]);

            if (animationInProgress === true) {
                return;
            }

            // switch effect is quickly, no need to wait
            if (effect !== 'switch') {
                // when animation in progress no other animation occur
                animationInProgress = true;
                setTimeout(function () {
                    animationInProgress = false;
                }, plugin.settings.duration)
            }

            // change slide with selected effect
            switch (effect) {
                case 'switch':
                    changeSlideSwitch(outSlide, inSlide);
                    break;
                case 'slide':
                    changeSlideSlide(outSlide, inSlide, slideDirection);
                    break;
                case 'fade':
                    changeSlideFade(outSlide, inSlide);
                    break;
                case 'slowdown':
                    changeSlideSlowdown(outSlide, inSlide, slideDirection);
                    break;
            }

            currentSlideIndex = nextSlideIndex;

            // switch marker
            if (plugin.settings.markers === 'on') {
                markers.removeClass('active');
                $(markers.get(currentSlideIndex)).addClass('active');
            }

        };
        /**
         * switch effect
         */
        var changeSlideSwitch = function (outSlide, inSlide) {
            inSlide.show().css({'left': 0});
            outSlide.hide();
        };
        /**
         * slide effect
         */
        var changeSlideSlide = function (outSlide, inSlide, slideDirection) {
            var unmovedPosition = {'left': 0},
                duration = plugin.settings.duration;

            if (slideDirection !== -1) {
                inSlide.css(slideInPosition);
                inSlide.show();
                outSlide.animate(slideOutPosition, duration);
                inSlide.animate(unmovedPosition, duration);
            } else {
                inSlide.css(slideOutPosition);
                inSlide.show();
                outSlide.animate(slideInPosition, duration);
                inSlide.animate(unmovedPosition, duration);
            }
        };
        /**
         * slowdown slide effect (custom easing 'doubleSqrt')
         */
        var changeSlideSlowdown = function (outSlide, inSlide, slideDirection) {
            var unmovedPosition = {'left': 0},
                options;

            options = {
                'duration': plugin.settings.duration,
                'easing': 'doubleSqrt'
            };

            if (slideDirection !== -1) {
                inSlide.css(slideInPosition);
                inSlide.show();
                outSlide.animate(slideOutPosition, options);
                inSlide.animate(unmovedPosition, options);
            } else {
                inSlide.css(slideOutPosition);
                inSlide.show();
                outSlide.animate(slideInPosition, options);
                inSlide.animate(unmovedPosition, options);
            }
        };
        /**
         * fade effect
         */
        var changeSlideFade = function (outSlide, inSlide) {
            inSlide.hide();
            inSlide.css({
                left: 0,
                top: 0
            });
            inSlide.fadeIn(plugin.settings.duration);
            outSlide.fadeOut(plugin.settings.duration);
        };

        plugin.init();

    };

    // easing effect for jquery animation
    $.easing.doubleSqrt = function(t, millisecondsSince, startValue, endValue, totalDuration) {
        var res = Math.sqrt(Math.sqrt(t));
        return res;
    };

    $.fn[pluginName] = function(options) {
        var elements = options && options.initAll ? $(initAllSelector) : this;
        return elements.each(function() {
            var that = $(this),
                params = {},
                plugin;
            if (undefined == that.data(pluginName)) {
                $.each(paramKeys, function(index, key){
                    params[key[0].toLowerCase() + key.slice(1)] = that.data('param' + key);
                });
                plugin = new $[pluginName](this, params);
                that.data(pluginName, plugin);
            }
        });
    };
    // autoinit
    $(function(){
        $()[pluginName]({initAll: true});
    });

})(jQuery);