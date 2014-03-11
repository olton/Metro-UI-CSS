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
            width: null,
            height: null,
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

        _create: function () {
            // Init private vars
            this._lastSlideCount = null;
            this._interval = 0;
            this._slideIndex = null;

            this._createSetSize();
            this._createControls();
            this._createMarkers();
            this._createAutoLogic();
        },

        _createSetSize: function () {
            // Set width and height if provided
            if (this.options.width !== null)
                this.element.css('width', this.options.width);
            if (this.options.height !== null)
                this.element.css('height', this.options.height);
        },

        _createControls: function () {
            var controls = this._controls();

            if (this.options.controls !== false) {
                controls.filter('.left, .right').on('click', this, this._controlsClick);
                if (this.options.controls === 'hover') {
                    controls.hide();
                    this.element.on('mouseenter', this, this._controlsMouseEnter);
                    this.element.on('mouseleave', this._controlsMouseLeave);
                }
            }
            else {
                controls.hide();
            }
        },

        _controlsClick: function (evt) {
            var move = -1;
            if ($(this).hasClass('right')) move = 1;
            evt.data.slideIndex(evt.data._slideIndex + move);
        },

        _controlsMouseLeave: function () {
            $(this).find('.controls').fadeOut(100);
        },

        _controlsMouseEnter: function (evt) {
            if (evt.data._lastSlideCount > 0)
                $(this).find('.controls').fadeIn(100);
        },

        _createMarkers: function () {
            if (this.options.markers &&
                this.options.markers.show === true) {
                this.element.on('click', '.markers li', this, this._markerHandler);
            }
        },

        _markerHandler: function (evt) {
            evt.data.slideIndex(evt.data._markers().find('li').index(this));
            return true;
        },

        _createAutoLogic: function () {
            if (this.options.stop) {
                this.element
                    .on('mouseenter', this, this._autoMouseEnter)
                    .on('mouseleave', this, this._autoMouseLeave);
            }
            if (this.options.auto) {
                this._autoStart();
            }
        },

        _autoMouseEnter: function (evt) {
            clearInterval(evt.data._interval);
        },
        _autoMouseLeave: function (evt) {
            if (evt.data.options.auto) {
                evt.data._autoStart();
            }
        },

        _init: function () {
            var slides = this._slides();
            // return on no changes
            if (slides.length === this._lastSlideCount)
                return;

            this._lastSlideCount = slides.length;

            // Hide items on 0 slides
            if (slides.length === 0) {
                this._markers().hide();
                this._controls().hide();
                return;
            }

            // Refresh Markers
            if (this.options.markers
                && this.options.markers.show) {
                this._markers().show();
                this._initMarkers();
            }

            if (this.options.controls === true) {
                this._controls().show();
            }

            // Refresh slide
            slides.hide();
            this._initSlideIndex();
        },

        _initSlideIndex: function () {
            var newIndex = this._slideIndex || this.options.slideIndex || 0;
            if (newIndex == 'auto')
                if (this.options.direction == 'left') {
                    newIndex = slides.length - 1;
                }
                else {
                    newIndex = 0;
                };
            // load initial slide
            this.slideIndex(newIndex);
        },

        slideIndex: function (index) {
            if (index !== undefined) {
                this._slideIndex = this._slideToSlide(index);
                if (index === this._slideIndex) return;
                this.element.trigger('slidechange', this._slideIndex);
            }
            else
                return this._slideIndex;
        },

        _markers: function () {
            return $(this.element).find('.markers');
        },

        _slides: function () {
            return $(this.element).find('.slide');
        },

        _controls: function () {
            return $(this.element).find('.controls');
        },

        _autoStart: function () {
            var that = this;
            this._interval = setInterval(function () {
                if (that.options.direction == 'left') {
                    that.slideIndex(that._slideIndex - 1);
                } else {
                    that.slideIndex(that._slideIndex + 1);
                }
            }, that.options.period);
        },

        _slideToSlide: function (newIndex) {
            var slides = this._slides(),
                oldIndex = this._slideIndex,
                slideCount = slides.length,
                newIndexMod = ((newIndex % slideCount) + slideCount) % slideCount;
            // re init automatically if slides have changed
            if (slideCount !== this._lastSlideCount) {
                this._init();
            }
            newIndexMod = ((newIndex % slideCount) + slideCount) % slideCount;

            var markers = this._markers().find('li');
            // Select active marker if there are markers available
            if (newIndexMod <= markers.length) {
                markers.removeClass('active');
                markers.eq(newIndexMod).addClass('active');
            }

            // No slides or index hasn't changed
            if (slideCount === 0) {
                return null;
            }
            // Show slide if there is only one
            if (slideCount === 1) {
                slides.css('left', 0);
                slides.show();
                return 0;
            }
            // First time showing on create
            if (oldIndex === null || newIndexMod === oldIndex) {
                slides.eq(newIndexMod)
                    .css('left', 0)
                    .show();
                return newIndexMod;
            }
            var outPosition = 0;

            // If slideIndex is out of bounds continue to scroll cyclically
            if (newIndex > this._slideIndex) {
                outPosition = -this.element.width();
            } else {
                outPosition = this.element.width();
            }

            var nextSlide = slides.eq(newIndexMod);
            var currentSlide = slides.eq(oldIndex);
            // Apply effects
            switch (this.options.effect) {
                case 'switch': this._effectSwitch(currentSlide, nextSlide, outPosition); break;
                case 'slowdown': this._effectSlowdown(currentSlide, nextSlide, this.options.duration, outPosition); break;
                case 'fade': this._effectFade(currentSlide, nextSlide, this.options.duration), outPosition; break;
                default: this._effectSlide(currentSlide, nextSlide, this.options.duration, outPosition);
            }

            return newIndexMod;
        },

        _initMarkers: function () {
            var slides = this._slides(),
                markerContainer = this._markers();
            if (markerContainer.length > 0) {
                this._initUpdateMarkers(slides, markerContainer);
            }
            else {
                this._initCreateMarkers(slides);
            }
        },

        _initCreateMarkers: function (slides) {
            var markerContainer = $('<div class="markers ' + this.options.markers.type + '" />');
            var ul = $('<ul></ul>').appendTo(markerContainer);

            for (var i = 0; i < slides.length; i++) {
                ul.append('<li><a href="javascript:void(0)"></a></li>');
            }
            markerContainer.appendTo(this.element);

            switch (this.options.markers.position) {
                case 'top-left': {
                    markerContainer.css({
                        left: '10px',
                        right: 'auto',
                        bottom: 'auto',
                        top: '10px'
                    });
                    break;
                }
                case 'top-right': {
                    markerContainer.css({
                        left: 'auto',
                        right: '10px',
                        bottom: 'auto',
                        top: '0px'
                    });
                    break;
                }
                case 'top-center': {
                    markerContainer.css({
                        left: this.element.width() / 2 - markerContainer.width() / 2,
                        right: 'auto',
                        bottom: 'auto',
                        top: '0px'
                    });
                    break;
                }
                case 'bottom-left': {
                    markerContainer.css({
                        left: '10px',
                        right: 'auto'
                    });
                    break;
                }
                case 'bottom-right': {
                    markerContainer.css({
                        right: '10px',
                        left: 'auto'
                    });
                    break;
                }
                case 'bottom-center': {
                    markerContainer.css({
                        left: this.element.width() / 2 - markerContainer.width() / 2,
                        right: 'auto'
                    });
                    break;
                }
            }
        },

        _initUpdateMarkers: function (slides, markerContainer) {
            var markers = markerContainer.find('li');
            var markersLength = markers.length;
            var slidesLength = slides.length;
            var list = markerContainer.find('ul');

            while (markersLength > slidesLength) {
                markers.eq(0).remove();
                markersLength -= 1;
            }

            while (markersLength < slidesLength) {
                list.append('<li><a href="javascript:void(0)"></a></li>');
                markersLength += 1;
            }
        },

        _effectSwitch: function (currentSlide, nextSlide) {
            currentSlide
                .hide();
            nextSlide
                .css({ left: 0 })
                .show();
        },

        _effectSlide: function (currentSlide, nextSlide, duration, outPosition) {
            currentSlide
                .animate(
                { left: outPosition },
                duration,
                'swing',
                function () { $(this).hide(); });
            nextSlide
                .css('left', outPosition * -1)
                .show()
                .animate({ left: 0 }, duration);
        },

        _effectSlowdown: function (currentSlide, nextSlide, duration, outPosition) {
            $.easing.doubleSqrt = function (t) {
                return Math.sqrt(Math.sqrt(t));
            };

            currentSlide
                .animate(
                { left: outPosition },
                duration,
                'doubleSqrt',
                function () { $(this).hide() }
                );

            nextSlide
                .css('left', outPosition * -1)
                .show()
                .animate(
                { left: 0 }, duration,
                'doubleSqrt'
                );
        },

        _effectFade: function (currentSlide, nextSlide, duration) {
            currentSlide
                .fadeOut(duration);
            nextSlide
                .css({ left: 0 })
                .fadeIn(duration);
        },

        _destroy: function () {
            this._controls().off('click', this._controlsClick);
            this.element.off('mouseenter', this._controlsMouseEnter);
            this.element.off('mouseleave', _controlsMouseLeave);
            this.element.off('click', '.markers li', this._markerHandler);
            this.element.off('mouseenter', this._autoMouseEnter)
            this.element.off('mouseleave', this._autoMouseLeave);
        },

        slideCount: function () { return this._lastSlideCount; }
    });
})(jQuery);
