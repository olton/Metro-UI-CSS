var Carousel = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.height = 0;
        this.width = 0;
        this.slides = [];
        this.current = null;
        this.currentIndex = null;
        this.dir = this.options.direction;
        this.interval = null;
        this.isAnimate = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        autoStart: false,
        width: "100%",
        height: "16/9", // 3/4, 21/9
        effect: "slide", // slide, fade, switch, slowdown, custom
        effectFunc: "linear",
        direction: "left", //left, right
        duration: METRO_ANIMATION_DURATION,
        period: 5000,
        stopOnMouse: true,

        controls: true,
        bullets: true,
        bulletStyle: "square", // square, circle, rect, diamond
        controlsOnMouse: false,
        controlsOutside: false,
        bulletsPosition: "default", // default, left, right

        controlPrev: '&#x23F4',
        controlNext: '&#x23F5',
        clsCarousel: "",
        clsSlides: "",
        clsSlide: "",
        clsControls: "",
        clsControlNext: "",
        clsControlPrev: "",
        clsBullets: "",
        clsBullet: "",
        clsBulletOn: "",
        clsThumbOn: "",

        onStop: Metro.noop,
        onStart: Metro.noop,
        onPlay: Metro.noop,
        onSlideClick: Metro.noop,
        onBulletClick: Metro.noop,
        onThumbClick: Metro.noop,
        onMouseEnter: Metro.noop,
        onMouseLeave: Metro.noop,
        onNextClick: Metro.noop,
        onPrevClick: Metro.noop,
        onSlideShow: Metro.noop,
        onSlideHide: Metro.noop,
        onCarouselCreate: Metro.noop
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
        var slides = element.find(".slide");
        var slides_container = element.find(".slides");
        var maxHeight = 0;
        var id = Utils.elementId("carousel");

        if (element.attr("id") === undefined) {
            element.attr("id", id);
        }

        element.addClass("carousel").addClass(o.clsCarousel);
        if (o.controlsOutside === true) {
            element.addClass("controls-outside");
        }

        if (slides_container.length === 0) {
            slides_container = $("<div>").addClass("slides").appendTo(element);
            slides.appendTo(slides_container);
        }

        slides.addClass(o.clsSlides);

        if (slides.length === 0) {
            Utils.exec(this.options.onCarouselCreate, [this.element]);
            return ;
        }

        this._createSlides();
        this._createControls();
        this._createBullets();
        this._createEvents();
        this._resize();

        if (o.controlsOnMouse === true) {
            element.find("[class*=carousel-switch]").hide();
            element.find(".carousel-bullets").hide();
        }

        if (o.autoStart === true) {
            this._start();
        }

        Utils.exec(this.options.onCarouselCreate, [this.element]);
    },

    _start: function(){
        var that = this, element = this.element, o = this.options;
        var period = o.period;
        var current = this.slides[this.currentIndex];

        if (current.data("period") !== undefined) {
            period = current.data("period");
        }

        if (this.slides.length <= 1) {
            return ;
        }

        this.interval = setTimeout(function run() {
            var t = o.direction === 'left' ? 'next' : 'prior';
            that._slideTo(t, true);
        }, period);
        Utils.exec(o.onStart, [element]);
    },

    _stop: function(){
        clearInterval(this.interval);
        this.interval = false;
    },

    _resize: function(){
        var that = this, element = this.element, o = this.options;
        var width = element.outerWidth();
        var height;
        var medias = [];

        if (["16/9", "21/9", "4/3"].indexOf(o.height) > -1) {
            height = Utils.aspectRatioH(width, o.height);
        } else {
            if (String(o.height).indexOf("@") > -1) {
                medias = Utils.strToArray(o.height.substr(1), "|");
                $.each(medias, function(){
                    var media = Utils.strToArray(this, ",");
                    if (window.matchMedia(media[0]).matches) {
                        if (["16/9", "21/9", "4/3"].indexOf(media[1]) > -1) {
                            height = Utils.aspectRatioH(width, media[1]);
                        } else {
                            height = parseInt(media[1]);
                        }
                    }
                });
            } else {
                height = parseInt(o.height);
            }
        }

        element.css({
            height: height
        });
    },

    _createSlides: function(){
        var that = this, element = this.element, o = this.options;
        var slides = element.find(".slide");

        $.each(slides, function(i){
            var slide = $(this);
            if (slide.data("cover") !== undefined) {
                slide.css({
                    backgroundImage: "url("+slide.data('cover')+")",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                });
            }

            if (i !== 0) {
                switch (o.effect) {
                    case "switch":
                    case "slide":
                        slide.css("left", "100%");
                        break;
                    case "slide-v":
                        slide.css("top", "100%");
                        break;
                    case "fade":
                        slide.css("opacity", "0");
                        break;
                }
            }

            slide.addClass(o.clsSlide);

            that.slides.push(slide);
        });

        this.currentIndex = 0;
        this.current = this.slides[this.currentIndex];
    },

    _createControls: function(){
        var element = this.element, o = this.options;
        var next, prev;

        if (o.controls === false) {
            return ;
        }

        next = $('<span/>').addClass('carousel-switch-next').addClass(o.clsControls).addClass(o.clsControlNext).html(">");
        prev = $('<span/>').addClass('carousel-switch-prev').addClass(o.clsControls).addClass(o.clsControlPrev).html("<");

        if (o.controlNext) {
            next.html(o.controlNext);
        }

        if (o.controlPrev) {
            prev.html(o.controlPrev);
        }

        next.appendTo(element);
        prev.appendTo(element);
    },

    _createBullets: function(){
        var element = this.element, o = this.options;
        var bullets, i;

        if (o.bullets === false) {
            return ;
        }

        bullets = $('<div>').addClass("carousel-bullets").addClass("bullet-style-"+o.bulletStyle).addClass(o.clsBullets);
        if (o.bulletsPosition === 'default' || o.bulletsPosition === 'center') {
            bullets.addClass("flex-justify-center");
        } else if (o.bulletsPosition === 'left') {
            bullets.addClass("flex-justify-start");
        } else {
            bullets.addClass("flex-justify-end");
        }

        for (i = 0; i < this.slides.length; i++) {
            var bullet = $('<span>').addClass("carousel-bullet").addClass(o.clsBullet).data("slide", i);
            if (i === 0) {
                bullet.addClass('bullet-on').addClass(o.clsBulletOn);
            }
            bullet.appendTo(bullets);
        }

        bullets.appendTo(element);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".carousel-bullet", function(e){
            var bullet = $(this);
            if (that.isAnimate === false) {
                that._slideToSlide(bullet.data('slide'));
                Utils.exec(o.onBulletClick, [bullet,  element, e])
            }
        });

        element.on(Metro.events.click, ".carousel-switch-next", function(e){
            if (that.isAnimate === false) {
                that._slideTo("next", false);
                Utils.exec(o.onNextClick, [element, e])
            }
        });

        element.on(Metro.events.click, ".carousel-switch-prev", function(e){
            if (that.isAnimate === false) {
                that._slideTo("prev", false);
                Utils.exec(o.onPrevClick, [element, e])
            }
        });

        if (o.stopOnMouse === true && o.autoStart === true) {
            element.on(Metro.events.enter, function (e) {
                if (o.controlsOnMouse === true) {
                    element.find("[class*=carousel-switch]").fadeIn();
                    element.find(".carousel-bullets").fadeIn();
                }
                that._stop();
                Utils.exec(o.onMouseEnter, [element, e])
            });
            element.on(Metro.events.leave, function (e) {
                if (o.controlsOnMouse === true) {
                    element.find("[class*=carousel-switch]").fadeOut();
                    element.find(".carousel-bullets").fadeOut();
                }
                that._start();
                Utils.exec(o.onMouseLeave, [element, e])
            });
        }

        if (o.controlsOnMouse === true) {
            element.on(Metro.events.enter, function () {
                element.find("[class*=carousel-switch]").fadeIn();
                element.find(".carousel-bullets").fadeIn();
            });
            element.on(Metro.events.leave, function () {
                element.find("[class*=carousel-switch]").fadeOut();
                element.find(".carousel-bullets").fadeOut();
            });
        }

        element.on(Metro.events.click, ".slide", function(e){
            var slide = $(this);
            Utils.exec(o.onSlideClick, [slide, element, e])
        });

        $(window).on(Metro.events.resize + "-" + element.attr("id"), function(){
            that._resize();
        });
    },

    _slideToSlide: function(index){
        var element = this.element, o = this.options;
        var current, next, to;

        if (this.slides[index] === undefined) {
            return ;
        }

        if (this.currentIndex === index) {
            return ;
        }

        to = index > this.currentIndex ? "next" : "prev";
        current = this.slides[this.currentIndex];
        next = this.slides[index];

        this.currentIndex = index;

        this._effect(current, next, o.effect, to);

        element.find(".carousel-bullet").removeClass("bullet-on").removeClass(o.clsBulletOn);
        element.find(".carousel-bullet:nth-child("+(this.currentIndex+1)+")").addClass("bullet-on").addClass(o.clsBulletOn);
    },

    _slideTo: function(to, interval){
        var that = this, element = this.element, o = this.options;
        var current, next;

        if (to === undefined) {
            to = "next";
        }

        current = this.slides[this.currentIndex];

        if (to === "next") {
            this.currentIndex++;
            if (this.currentIndex >= this.slides.length) {
                this.currentIndex = 0;
            }
        } else {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.slides.length - 1;
            }
        }

        next = this.slides[this.currentIndex];

        this._effect(current, next, o.effect, to, interval);

        element.find(".carousel-bullet").removeClass("bullet-on").removeClass(o.clsBulletOn);
        element.find(".carousel-bullet:nth-child("+(this.currentIndex+1)+")").addClass("bullet-on").addClass(o.clsBulletOn);

    },

    _effect: function(current, next, effect, to, interval){
        var that = this, element = this.element, o = this.options;
        var duration = o.duration;
        var func, effectFunc = o.effectFunc;
        var period = o.period;

        if (next.data('duration') !== undefined) {
            duration = next.data('duration');
        }

        if (next.data('effectFunc') !== undefined) {
            effectFunc = next.data('effectFunc');
        }

        if (effect === 'switch') {
            duration = 0;
        }

        current.stop(true, true);
        next.stop(true, true);
        this.isAnimate = true;

        setTimeout(function(){that.isAnimate = false;}, duration);

        if (effect === 'slide') {
            func = to === 'next' ? 'slideLeft': 'slideRight';
        }

        if (effect === 'slide-v') {
            func = to === 'next' ? 'slideUp': 'slideDown';
        }

        switch (effect) {
            case 'slide': Animation[func](current, next, duration, effectFunc); break;
            case 'slide-v': Animation[func](current, next, duration, effectFunc); break;
            case 'fade': Animation['fade'](current, next, duration, effectFunc); break;
            default: Animation['switch'](current, next);
        }

        setTimeout(function(){
            Utils.exec(o.onSlideShow, [next[0]], element[0]);
        }, duration);

        setTimeout(function(){
            Utils.exec(o.onSlideHide, [current[0]], element[0]);
        }, duration);

        if (interval === true) {

            if (next.data('period') !== undefined) {
                period = next.data('period');
            }

            this.interval = setTimeout(function run() {
                var t = o.direction === 'left' ? 'next' : 'prior';
                that._slideTo(t, true);
            }, period);
        }
    },

    toSlide: function(index){
        this._slideToSlide(index);
    },

    next: function(){
        this._slideTo("next");
    },

    prev: function(){
        this._slideTo("prev");
    },

    stop: function () {
        clearInterval(this.interval);
        Utils.exec(this.options.onStop, [this.element])
    },

    play: function(){
        this._start();
        Utils.exec(this.options.onPlay, [this.element])
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        element.off(Metro.events.click, ".carousel-bullet");
        element.off(Metro.events.click, ".carousel-switch-next");
        element.off(Metro.events.click, ".carousel-switch-prev");

        if (o.stopOnMouse === true && o.autoStart === true) {
            element.off(Metro.events.enter);
            element.off(Metro.events.leave);
        }

        if (o.controlsOnMouse === true) {
            element.off(Metro.events.enter);
            element.off(Metro.events.leave);
        }

        element.off(Metro.events.click, ".slide");
        $(window).off(Metro.events.resize + "-" + element.attr("id"));

        element.removeClass("carousel").removeClass(o.clsCarousel);
        if (o.controlsOutside === true) {
            element.removeClass("controls-outside");
        }
    }
};

Metro.plugin('carousel', Carousel);