(function( $ ) {
    $.widget("metro.carousel", {

        version: "1.0.0",

        options: {
            auto: true,
            period: 2000,
            duration: 500,
            effect: 'slowdown', // slide, fade, switch, slowdown
            direction: 'left',
            markers: {
                show: true,
                type: 'default',
                position: 'left' //bottom-left, bottom-right, bottom-center, top-left, top-right, top-center
            },
            controls: true,
            stop: true,
            width: '100%',
            height: 300
        },

        _slides: {},
        _currentIndex: 0,
        _interval: 0,
        _outPosition: 0,

        _create: function(){
            var that = this,
                carousel = this.element,
                controls = carousel.find('.controls');

            carousel.css({
                'width': this.options.width,
                'height': this.options.height
            });

            this._slides = carousel.find('.slide');

            if (this._slides.length <= 1) return;

            if (this.options.markers !== false && this.options.markers.show && this._slides.length > 1) {
                this._markers(that);
            }

            if (this.options.controls && this._slides.length > 1) {
                carousel.find('.controls.left').on('click', function(){
                    that._slideTo('prior');
                });
                carousel.find('.controls.right').on('click', function(){
                    that._slideTo('next');
                });
            } else {
                controls.hide();
            }

            if (this.options.stop) {
                carousel
                    .on('mouseenter', function(){
                        clearInterval(that._interval);
                    })
                    .on('mouseleave', function(){
                        if (that.options.auto) that._autoStart(), that.options.period;
                    })
            }

            if (this.options.auto) {
                this._autoStart();
            }
        },

        _autoStart: function(){
            var that = this;
            this._interval = setInterval(function(){
                if (that.options.direction == 'left') {
                    that._slideTo('next')
                } else {
                    that._slideTo('prior')
                }
            }, this.options.period);
        },

        _slideTo: function(direction){
            var
                currentSlide = this._slides[this._currentIndex],
                nextSlide;

            if (direction == undefined) direction = 'next';

            if (direction === 'prior') {
                this._currentIndex -= 1;
                if (this._currentIndex < 0) this._currentIndex = this._slides.length - 1;

                this._outPosition = this.element.width();

            } else if (direction === 'next') {
                this._currentIndex += 1;
                if (this._currentIndex >= this._slides.length) this._currentIndex = 0;

                this._outPosition = -this.element.width();

            }

            nextSlide = this._slides[this._currentIndex];

            switch (this.options.effect) {
                case 'switch': this._effectSwitch(currentSlide, nextSlide); break;
                case 'slowdown': this._effectSlowdown(currentSlide, nextSlide, this.options.duration); break;
                case 'fade': this._effectFade(currentSlide, nextSlide, this.options.duration); break;
                default: this._effectSlide(currentSlide, nextSlide, this.options.duration);
            }

            var carousel = this.element, that = this;
            carousel.find('.markers ul li a').each(function(){
                var index = $(this).data('num');
                if (index === that._currentIndex) {
                    $(this).parent().addClass('active');
                } else {
                    $(this).parent().removeClass('active');
                }
            });
        },

        _slideToSlide: function(slideIndex){
            var
                currentSlide = this._slides[this._currentIndex],
                nextSlide = this._slides[slideIndex];

            if (slideIndex > this._currentIndex) {
                this._outPosition = -this.element.width();
            } else {
                this._outPosition = this.element.width();
            }

            switch (this.options.effect) {
                case 'switch' : this._effectSwitch(currentSlide, nextSlide); break;
                case 'slowdown': this._effectSlowdown(currentSlide, nextSlide, this.options.duration); break;
                case 'fade': this._effectFade(currentSlide, nextSlide, this.options.duration); break;
                default : this._effectSlide(currentSlide, nextSlide, this.options.duration);
            }

            this._currentIndex = slideIndex;
        },

        _markers: function (that) {
            var div, ul, li, i, markers;

            div = $('<div class="markers '+this.options.markers.type+'" />');
            ul = $('<ul></ul>').appendTo(div);

            for (i = 0; i < this._slides.length; i++) {
                li = $('<li><a href="javascript:void(0)" data-num="' + i + '"></a></li>');
                if (i === 0) {
                    li.addClass('active');
                }
                li.appendTo(ul);
            }


            ul.find('li a').removeClass('active').on('click', function () {
                var $this = $(this),
                    index = $this.data('num');

                ul.find('li').removeClass('active');
                $this.parent().addClass('active');

                if (index == that._currentIndex) {
                    return true;
                }

                that._slideToSlide(index);
                return true;
            });

            div.appendTo(this.element);

            switch (this.options.markers.position) {
                case 'top-left' : {
                    div.css({
                        left: '10px',
                        right: 'auto',
                        bottom: 'auto',
                        top: '10px'
                    });
                    break;
                }
                case 'top-right' : {
                    div.css({
                        left: 'auto',
                        right: '10px',
                        bottom: 'auto',
                        top: '0px'
                    });
                    break;
                }
                case 'top-center' : {
                    div.css({
                        left: this.element.width()/2 - div.width()/2,
                        right: 'auto',
                        bottom: 'auto',
                        top: '0px'
                    });
                    break;
                }
                case 'bottom-left' : {
                    div.css({
                        left: '10px',
                        right: 'auto'
                    });
                    break;
                }
                case 'bottom-right' : {
                    div.css({
                        right: '10px',
                        left: 'auto'
                    });
                    break;
                }
                case 'bottom-center' : {
                    div.css({
                        left: this.element.width()/2 - div.width()/2,
                        right: 'auto'
                    });
                    break;
                }
            }
        },


        _effectSwitch: function(currentSlide, nextSlide){
            $(currentSlide)
                .hide();
            $(nextSlide)
                .css({left: 0})
                .show();
        },

        _effectSlide: function(currentSlide, nextSlide, duration){
            $(currentSlide)
                .animate({left: this._outPosition}, duration);
            $(nextSlide)
                .css('left', this._outPosition * -1)
                .show()
                .animate({left: 0}, duration);
        },

        _effectSlowdown: function(currentSlide, nextSlide, duration){
            var options = {
                'duration': duration,
                'easing': 'doubleSqrt'
            };
            $.easing.doubleSqrt = function(t) {
                return Math.sqrt(Math.sqrt(t));
            };

            $(currentSlide)
                .animate({left: this._outPosition}, options);


            //$(nextSlide).find('.subslide').hide();
            $(nextSlide)
                .css('left', this._outPosition * -1)
                .show()
                .animate({left: 0}, options);

            //setTimeout(function(){
            //    $(nextSlide).find('.subslide').fadeIn();
            //}, 500);

        },

        _effectFade: function(currentSlide, nextSlide, duration){
            $(currentSlide)
                .fadeOut(duration);
            $(nextSlide)
                .css({left: 0})
                .fadeIn(duration);
        },


        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    });
})( jQuery );

$(function () {
    $('[data-role=carousel]').carousel();
});

function reinitCarousels(){
    $('[data-role=carousel]').carousel();
}