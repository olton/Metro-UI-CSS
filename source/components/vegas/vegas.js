/**
 * Component Vegas based on Vegas by Jay Salvat (http://jaysalvat.com/)
 * Original code https://github.com/jaysalvat/vegas
 * Copyright 2018 Jay Salvat
 * Adaptation for Metro 4 by Serhii Pimenov,
 * Copyright 2020 Serhii Pimenov
 */

var VegasDefaultConfig = {
    duration: 4000,
    animationDuration: null,
    transitionDuration: null,
    transition: "fade",
    animation: null,
    slides: [],
    shuffle: false,
    align: "center",
    valign: "center",
    loop: true,
    autoplay: true,
    mute: true,
    cover: true,
    preload: true,
    timer: true,
    overlay: true,
    overlayNum: 2,
    color: null,
    volume: 1,
    onPlay: Metro.noop,
    onPause: Metro.noop,
    onSlide: Metro.noop,
    onWalk: Metro.noop,
    onVegasCreate: Metro.noop
};

Metro.vegasSetup = function (options) {
    VegasDefaultConfig = $.extend({}, VegasDefaultConfig, options);
};

if (typeof window["metroVegasSetup"] !== undefined) {
    Metro.vegasSetup(window["metroVegasSetup"]);
}

var Vegas = $.extend({}, Plugin, {

    videoCache: {},

    init: function( options, elem ) {

        this.elem  = elem;
        this.element = $(elem);
        this.options = $.extend( {}, VegasDefaultConfig, options );

        this._setOptionsFromDOM();

        this.transitions = [
            "fade", "fade2",
            "slideLeft", "slideLeft2",
            "slideRight", "slideRight2",
            "slideUp", "slideUp2",
            "slideDown", "slideDown2",
            "zoomIn", "zoomIn2",
            "zoomOut", "zoomOut2",
            "swirlLeft", "swirlLeft2",
            "swirlRight", "swirlRight2"
        ];
        this.animations = [
            "kenburns",
            "kenburnsUp",
            "kenburnsDown",
            "kenburnsRight",
            "kenburnsLeft",
            "kenburnsUpLeft",
            "kenburnsUpRight",
            "kenburnsDownLeft",
            "kenburnsDownRight"
        ];

        this.support = {
            objectFit:  'objectFit'  in document.body.style,
            video: !/(Android|webOS|Phone|iPad|iPod|BlackBerry|Windows Phone)/i.test(navigator.userAgent)
        }

        this.slide = 0;
        this.current = 0;
        this.slides = Utils.isObject(this.options.slides) || [];
        this.total = this.slides.length;
        this.noshow = this.total < 2;
        this.timer = null;
        this.overlay = null;
        this.first = true;
        this.timeout = false;
        this.paused = !this.options.autoplay || this.noshow;
        this.ended = false;

        if (this.options.shuffle) {
            this.slides.shuffle();
        }

        if (this.options.preload) {
            this._preload();
        }

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
        var that = this, element = this.element, o = this.options;

        Metro.checkRuntime(element, "vegas");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onVegasCreate, null,element[0]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var isBody = element[0].tagName === 'BODY';
        var wrapper;

        if (!isBody) {
            element.css('height', element.css('height'));

            wrapper = $('<div class="vegas-wrapper">')
                .css('overflow', element.css('overflow'))
                .css('padding',  element.css('padding'));

            // Some browsers don't compute padding shorthand
            if (!element.css('padding')) {
                wrapper
                    .css('padding-top',    element.css('padding-top'))
                    .css('padding-bottom', element.css('padding-bottom'))
                    .css('padding-left',   element.css('padding-left'))
                    .css('padding-right',  element.css('padding-right'));
            }

            element.children().appendTo(wrapper);
            element.clear();
        }

        element.addClass("vegas-container");

        if (!isBody) {
            element.append(wrapper);
        }

        if (o.timer) {
            this.timer = $('<div class="vegas-timer"><div class="vegas-timer-progress">');
            element.append(this.timer);
        }

        if (o.overlay) {
            this.overlay = $('<div class="vegas-overlay">').addClass('overlay'+o.overlayNum);
            element.append(this.overlay);
        }

        setTimeout(function(){
            Utils.exec(o.onPlay, null, element[0]);
            that._goto(that.slide);
        },1)
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

    },

    _preload: function(){
        var that = this, element = this.element, o = this.options;
        var img, i, video;

        for (i = 0; i < this.slides.length; i++) {

            var obj = this.slides[i];

            if (obj.src) {
                img = new Image();
                img.src = this.slides[i].src;
            }

            if (obj.video) {
                if (obj.video instanceof Array) {
                    this._video(obj.video);
                } else {
                    this._video(obj.video.src);
                }
            }
        }
    },

    _slideShow: function () {
        var that = this, o = this.options;

        if (this.total > 1 && !this.ended && !this.paused && !this.noshow) {
            this.timeout = setTimeout(function () {
                that.next();
            }, o.duration);
        }
    },

    _timer: function (state) {
        var that = this, o = this.options;

        clearTimeout(this.timeout);

        if (!this.timer) {
            return;
        }

        this.timer
            .removeClass('vegas-timer-running')
            .find('div')
            .css('transition-duration', '0ms');

        if (this.ended || this.paused || this.noshow) {
            return;
        }

        if (state) {
            setTimeout(function () {
                that.timer
                    .addClass('vegas-timer-running')
                    .find('div')
                    .css('transition-duration', +o.duration - 100 + 'ms');
            }, 100);
        }
    },

    _fadeSoundIn: function(video, duration){
        var o = this.options;

        $.animate({
            el: video,
            draw: {
                volume: +o.volume
            },
            dur: duration
        })
    },

    _fadeSoundOut: function(video, duration){
        var o = this.options;

        $.animate({
            el: video,
            draw: {
                volume: 0
            },
            dur: duration
        })
    },

    _video: function(sources){
        var video, source;
        var cacheKey = sources.toString();

        if (Vegas.videoCache[cacheKey]) {
            return Vegas.videoCache[cacheKey];
        }

        if (!sources instanceof Array) {
            sources = [sources];
        }

        video = document.createElement("video");
        video.preload = true;

        sources.forEach(function(src){
            source = document.createElement("source");
            source.src = src;
            video.appendChild(source);
        });

        Vegas.videoCache[cacheKey] = video;

        return video;
    },

    _image: function(){},

    _goto: function(n){
        var that = this, element = this.element, o = this.options;

        if (typeof this.slides[n] === 'undefined') {
            n = 0;
        }

        this.slide = n;

        var $slide, $inner, video, img, $video, $img;
        var slides = element.children(".vegas-slide");
        var obj = this.slides[n];
        var cover = o.cover;
        var transition, animation;
        var transitionDuration, animationDuration;

        if (this.first) {
            this.first = false;
        }

        if (cover !== 'repeat') {
            if (cover === true) {
                cover = 'cover';
            } else if (cover === false) {
                cover = 'contain';
            }
        }

        if (o.transition === 'random') {
            transition = $.random(this.transitions);
        } else {
            transition = o.transition ? o.transition : this.transitions[0];
        }

        if (o.animation === 'random') {
            animation = $.random(this.animations);
        } else {
            animation = o.animation ? o.animation : this.animations[0];
        }

        if (!o.transitionDuration) {
            transitionDuration = +o.duration;
        } else if (o.transitionDuration === 'auto' || +o.transitionDuration > +o.duration) {
            transitionDuration = +o.duration;
        } else {
            transitionDuration = +o.transitionDuration;
        }

        if (!o.animationDuration) {
            animationDuration = +o.duration;
        } else if (o.animationDuration === 'auto' || +o.animationDuration > +o.duration) {
            animationDuration = +o.duration;
        } else {
            animationDuration = +o.animationDuration;
        }

        $slide = $("<div>").addClass("vegas-slide").addClass('vegas-transition-' + transition);

        if (this.support.video && obj.video) {
            video = obj.video instanceof Array ? this._video(obj.video) : this._video(obj.video.src);
            video.loop = obj.video.loop ? obj.video.loop : o.loop;
            video.muted = obj.video.mute ? obj.video.mute : o.mute;

            if (!video.muted) {
                this._fadeSoundIn(video, transitionDuration);
            } else {
                video.pause();
            }

            $video = $(video)
                .addClass('vegas-video')
                .css('background-color', o.color || '#000000');

            if (this.support.objectFit) {
                $video
                    .css('object-position', o.align + ' ' + o.valign)
                    .css('object-fit', cover)
                    .css('width',  '100%')
                    .css('height', '100%');
            } else if (cover === 'contain') {
                $video
                    .css('width',  '100%')
                    .css('height', '100%');
            }

            $slide.append($video);
        } else {
            img = new Image();
            $inner = $("<div>").addClass('vegas-slide-inner')
                .css({
                    backgroundImage: 'url("'+obj.src+'")',
                    backgroundColor: o.color || '#000000',
                    backgroundPosition: o.align + ' ' + o.valign
                });

            if (cover === 'repeat') {
                $inner.css('background-repeat', 'repeat');
            } else {
                $inner.css('background-size', cover);
            }

            if (animation) {
                $inner
                    .addClass('vegas-animation-' + animation)
                    .css('animation-duration',  animationDuration + 'ms');
            }

            $slide.append($inner);
        }

        if (slides.length) {
            slides.eq(slides.length - 1).after($slide);
        } else {
            element.prepend($slide);
        }

        slides
            .css('transition', 'all 0ms')
            .each(function(){
                this.className  = 'vegas-slide';

                if (this.tagName === 'VIDEO') {
                    this.className += ' vegas-video';
                }

                if (transition) {
                    this.className += ' vegas-transition-' + transition;
                    this.className += ' vegas-transition-' + transition + '-in';
                }
            }
        );

        this._timer(false);

        function go(){
            that._timer(true);
            setTimeout(function () {
                slides
                    .css('transition', 'all ' + transitionDuration + 'ms')
                    .addClass('vegas-transition-' + transition + '-out');

                slides.each(function () {
                    var video = slides.find('video').get(0);

                    if (video) {
                        video.volume = 1;
                        that._fadeSoundOut(video, transitionDuration);
                    }
                });

                $slide
                    .css('transition', 'all ' + transitionDuration + 'ms')
                    .addClass('vegas-transition-' + transition + '-in');

                for (var i = 0; i < slides.length - 1; i++) {
                    slides.eq(i).remove();
                }

                that._slideShow();
            }, 100);
        }

        if (video) {
            if (video.readyState === 4) {
                video.currentTime = 0;
            }

            video.play();
            go();
        } else {
            img.src = obj.src;

            if (img.complete) {
                go();
            } else {
                img.onload = go;
            }
        }
    },

    _end: function(){
        this.ended = this.options.autoplay;
        this._timer(false);
    },

    play: function(){
        if (this.paused) {
            this.paused = false;
            this.next();
        }
    },

    pause: function(){
        this._timer(false);
        this.paused = true;
    },

    toggle: function(){
        this.paused ? this.play() : this.pause();
    },

    playing: function(){
        return !this.paused && !this.noshow;
    },

    current: function (advanced) {
        if (advanced) {
            return {
                slide: this.slide,
                data:  this.slides[this.slide]
            };
        }
        return this.slide;
    },

    jump: function(n){
        var that = this, element = this.element, o = this.options;

        if (o.video) return;

        if (n <= 0 || n > this.slides.length || n === this.slide + 1) {
            return this;
        }

        this.slide = n - 1;
        this._goto(this.slide);
    },

    next: function(){
        var that = this, element = this.element, o = this.options;

        this.slide++;

        if (this.slide >= this.slides.length) {
            if (!o.loop) {
                return this._end();
            }

            this.slide = 0;
        }

        this._goto(this.slide);
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;

        this.slide--;

        if (this.slide < 0) {
            if (!o.loop) {
                this.slide++;
                return this._end();
            }

            this.slide = this.slides.length - 1;
        }

        this._goto(this.slide);
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
});

Metro.plugin('vegas', Vegas);