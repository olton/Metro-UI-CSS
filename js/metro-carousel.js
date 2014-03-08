(function ($) {
    $.widget("metro.carousel", {
        version: "1.0.0",

        options: {
            auto: true,
            period: 2000,
            duration: 500,
            effect: 'slowdown', // slide, fade, switch, slowdown
            direction: 'right',
            markers: {
                show: true,
                type: 'default',
                position: 'left' //bottom-left, bottom-right, bottom-center, top-left, top-right, top-center
            },
            controls: true,
            stop: true,
            width: '100%',
            height: 300,
            slideIndex: 'auto' // if direction is left, start at end, otherwise starts at 0
        },
        _getCreateOptions: function () {
            var options = {};
            var element = this.element;
            if (element.data('auto') != undefined) options.auto = element.data('auto');
            if (element.data('period') != undefined) options.period = element.data('period');
            if (element.data('duration') != undefined) options.duration = element.data('duration');
            if (element.data('effect') != undefined) options.effect = element.data('effect');
            if (element.data('direction') != undefined) options.direction = element.data('direction');
            if (element.data('width') != undefined) options.width = element.data('width');
            if (element.data('height') != undefined) options.height = element.data('height');
            if (element.data('stop') != undefined) options.stop = element.data('stop');
            if (element.data('controls') != undefined) options.controls = element.data('controls');
            if (element.data('markersShow') != undefined) options.markers.show = element.data('markersShow');
            if (element.data('markersType') != undefined) options.markers.type = element.data('markersType');
            if (element.data('markersPosition') != undefined) options.markers.position = element.data('markersPosition');
            if (element.data('slideIndex') != undefined) options.slideIndex = element.data('slideIndex');
            return options;
        },
        slideIndex: function (index) {
            if (index !== undefined) {
                this._slideIndex = this._slideToSlide(index);
            }
            else
                return this._slideIndex;
        },
        _slideIndex: null,
        _markersStore: null,
        _slides: {},
        _interval: 0,
        _create: function () {
            var carousel = this.element,
                controls = carousel.find('.controls');

            carousel.css({
                'width': this.options.width,
                'height': this.options.height
            });

            this._slides = carousel.find('.slide');
            this._slides.hide();

            if (this._slides.length <= 1) return;

            if (this.options.markers !== false && this.options.markers.show && this._slides.length > 1) {
                this._markers(this.options);
            }

            if (this.options.controls && this._slides.length > 1) {
                carousel.find('.controls.left').on('click', this, function (evt) {
                    evt.data.slideIndex(evt.data.slideIndex() - 1);
                });
                carousel.find('.controls.right').on('click', this, function (evt) {
                    evt.data.slideIndex(evt.data.slideIndex() + 1);
                });
            } else {
                controls.hide();
            }

            if (this.options.stop) {
                carousel
                    .on('mouseenter', this, function (evt) {
                        clearInterval(evt.data._interval);
                    })
                    .on('mouseleave', this, function (evt) {
                        if (evt.data.options.auto) {
                            evt.data._autoStart();
                        }
                    })
            }

            if (this.options.auto) {
                this._autoStart();
            }

            // load initial slide
            this.slideIndex(this.options.slideIndex);
        },

        _autoStart: function () {
            var that = this;
            this._interval = setInterval(function () {
                if (that.options.direction == 'left') {
                    that.slideIndex(that.slideIndex() - 1);
                } else {
                    that.slideIndex(that.slideIndex() + 1);
                }
            }, that.options.period);
        },

        _slideToSlide: function (newIndex) {
            // No slides or index hasn't changed
            if (this._slides.length < 1 || newIndex === this.slideIndex()) return;

            if (newIndex == 'auto')
                if (this.options.direction == 'left') {
                    newIndex = this._slides.length - 1;
                }
                else {
                    newIndex = 0;
                }

            var outPosition = 0;
            // don't calculate transition for null, it will just be a show()
            if (this.slideIndex() !== null)
                // If slideIndex is out of bounds continue to scroll cyclically
                if (newIndex > this.slideIndex()) {
                    outPosition = -this.element.width();
                } else {
                    outPosition = this.element.width();
                }

            // Bring slideIndex back into bounds
            var len = this._slides.length;
            newIndex = ((newIndex % len) + len) % len;

            var nextSlide = this._slides.eq(newIndex);

            if (this.slideIndex() !== null) {
                var currentSlide = this._slides[this.slideIndex()];
                // Apply effects
                switch (this.options.effect) {
                    case 'switch': this._effectSwitch(currentSlide, nextSlide, outPosition); break;
                    case 'slowdown': this._effectSlowdown(currentSlide, nextSlide, this.options.duration, outPosition); break;
                    case 'fade': this._effectFade(currentSlide, nextSlide, this.options.duration), outPosition; break;
                    default: this._effectSlide(currentSlide, nextSlide, this.options.duration, outPosition);
                }
            }
            else {
                nextSlide.show();
            }

            // Select active marker if there are markers available
            if (this._markersStore !== null) {
                this._markersStore.removeClass('active');
                this._markersStore.eq(newIndex).addClass('active');
            }

            return newIndex;
        },

        _markers: function () {
            var div, ul, li;

            div = $('<div class="markers ' + this.options.markers.type + '" />');
            ul = $('<ul></ul>').appendTo(div);

            for (var i = 0; i < this._slides.length; i++) {
                li = $('<li><a href="javascript:void(0)"></a></li>');
                li.appendTo(ul);
            }

            this._markersStore = ul.children();

            ul.on('click', 'li', this, function (evt) {
                evt.data.slideIndex(evt.data._markersStore.index(this));
                return true;
            });

            div.appendTo(this.element);

            switch (this.options.markers.position) {
                case 'top-left': {
                    div.css({
                        left: '10px',
                        right: 'auto',
                        bottom: 'auto',
                        top: '10px'
                    });
                    break;
                }
                case 'top-right': {
                    div.css({
                        left: 'auto',
                        right: '10px',
                        bottom: 'auto',
                        top: '0px'
                    });
                    break;
                }
                case 'top-center': {
                    div.css({
                        left: this.element.width() / 2 - div.width() / 2,
                        right: 'auto',
                        bottom: 'auto',
                        top: '0px'
                    });
                    break;
                }
                case 'bottom-left': {
                    div.css({
                        left: '10px',
                        right: 'auto'
                    });
                    break;
                }
                case 'bottom-right': {
                    div.css({
                        right: '10px',
                        left: 'auto'
                    });
                    break;
                }
                case 'bottom-center': {
                    div.css({
                        left: this.element.width() / 2 - div.width() / 2,
                        right: 'auto'
                    });
                    break;
                }
            }
        },

        _effectSwitch: function (currentSlide, nextSlide) {
            $(currentSlide)
                .hide();
            $(nextSlide)
                .css({ left: 0 })
                .show();
        },

        _effectSlide: function (currentSlide, nextSlide, duration, outPosition) {
            $(currentSlide)
                .animate(
                { left: outPosition },
                duration,
                'swing',
                function () { $(this).hide(); });
            $(nextSlide)
                .css('left', outPosition * -1)
                .show()
                .animate({ left: 0 }, duration);
        },

        _effectSlowdown: function (currentSlide, nextSlide, duration, outPosition) {
            $.easing.doubleSqrt = function (t) {
                return Math.sqrt(Math.sqrt(t));
            };

            $(currentSlide)
                .animate(
                { left: outPosition },
                duration,
                'doubleSqrt',
                function () { $(this).hide() }
                );

            $(nextSlide)
                .css('left', outPosition * -1)
                .show()
                .animate(
                { left: 0 }, duration,
                'doubleSqrt'
                );
        },

        _effectFade: function (currentSlide, nextSlide, duration) {
            $(currentSlide)
                .fadeOut(duration);
            $(nextSlide)
                .css({ left: 0 })
                .fadeIn(duration);
        },

        _destroy: function () {

        },

        _setOption: function (key, value) {
            this._super(key, value);
        },
        pageCount: function () { return this._slides.length; }
    });
})(jQuery);
