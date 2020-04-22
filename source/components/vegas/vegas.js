var VegasDefaultConfig = {
    duration: 4000,
    effect: "fade",
    images: null,
    videos: null,
    slides: null,
    shuffle: false,
    align: "center",
    valign: "center",
    loop: true,
    autoplay: true,
    mute: true,
    cover: true,
    preload: true,
    onVegasCreate: Metro.noop
};

Metro.vegasSetup = function (options) {
    VegasDefaultConfig = $.extend({}, VegasDefaultConfig, options);
};

if (typeof window["metroVegasSetup"] !== undefined) {
    Metro.vegasSetup(window["metroVegasSetup"]);
}

var Vegas = {
    init: function( options, elem ) {
        var that = this;

        this.options = $.extend( {}, VegasDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.effects = [
            "fade", "slideLeft", "slideRight",
            "slideUp", "slideDown", "zoomIn", "zoomOut",
            "swirlLeft", "swirlRight",
            "kenburns", "kenburnsUp", "kenburnsDown", "kenburnsRight",
            "kenburnsLeft", "kernburnsUpLeft", "kernburnsUpRight", "kernburnsDownLeft", "kernburnsDownRight"
        ];
        this.support = {
            objectFit:  'objectFit'  in document.body.style,
            video: !/(Android|webOS|Phone|iPad|iPod|BlackBerry|Windows Phone)/i.test(navigator.userAgent)
        }

        this.slides = [];
        this.slide = 0;
        this.current = 0;

        this._setOptionsFromDOM();

        ['images', 'videos'].forEach(function(el){
            that[el] = $.isArrayLike(that.options.images) ? that.options.images : Utils.strToArray(that.options.images, ",");
        })

        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

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
        var slide;

        element.addClass("vegas");

        if (this.images.length || this.videos.length) {

            slide = $("<div>").addClass("vegas__slide").append

        }

        if (o.video === true) {
            var video = $("<video>").addClass("vegas__video").appendTo(element);
            $.each(this.src, function(){
                $("<source>").attr("src", this).appendTo(video);
            })
            if (this.support.objectFit) {
                video.css({
                    objectPosition: o.align + " " + o.valign,
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                })
            } else if (o.cover === true) {
                video.css({
                    width: '100%',
                    height: '100%'
                })
            }
            video[0].loop = o.loop;
            video[0].autoplay = o.autoplay;
            video[0].mute = o.mute;
        } else {
            $.each(this.src, function(){
                var slide = $("<div>").addClass("vegas__slide").appendTo(element);
                var inner = $("<div>").addClass("vegas__slide-inner")
                    .css({
                        backgroundImage: 'url("'+this+'")',
                        backgroundPosition: o.align + " " + o.valign,
                        backgroundSize: o.cover === true ? 'cover' : 'auto',
                        backgroundRepeat: o.cover !== true ? 'repeat' : 'auto'
                    }).appendTo(slide);

                that.slides.push(slide[0]);
            })
        }

        if (o.preload) {
            this._preload();
        }

        that.play();
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

    },

    _preload: function(){
        var that = this, element = this.element, o = this.options;
        var img, i, video;

        if (o.video) {
            video = $("<video>")[0];
            video.preload = true;

            for(i = 0; i < this.src.length; i++) {
                $("<source>").attr('src', this.src[i]).appendTo($(video));
            }
        } else {
            for(i = 0; i < this.src.length; i++) {
                img = new Image();
                img.src = this.src[i];
            }
        }

    },

    _go: function(){
        var that = this, element = this.element, o = this.options;
        var effect = 'vegas-effect-' + o.effect, effectIn = effect + 'In', effectOut = effect + 'out';

        var current = this.slides[this.current];
        var next = this.slides[this.slide];

        current.css('transition-duration', o.duration + 'ms').addClass(effectOut);
        next.css('transition-duration', o.duration + 'ms').addClass(effectIn);
    },

    _end: function(){

    },

    // animation apply to inner
    // transition apply to slide
    play: function(){
        var that = this, element = this.element, o = this.options;
        var effect = 'vegas-effect-' + o.effect, effectIn = effect + '-in', effectOut = effect + '-out';

        $.each(this.slides, function(){
            var slide = $(this);
            slide.addClass(effect);
        })

        $(this.slides[this.current])
            .css('transition-duration', o.duration + 'ms')
            .addClass(effectIn);
    },

    pause: function(){

    },

    jump: function(n){
        var that = this, element = this.element, o = this.options;

        if (o.video) return;

        if (n <= 0 || n > this.slides.length || n === this.slide + 1) {
            return this;
        }

        this.slide = n - 1;
        this._go();
    },

    next: function(){
        var that = this, element = this.element, o = this.options;

        if (o.video) return;

        this.slide++;

        if (this.slide >= this.slides.length) {
            if (o.loop) {
                return this._end();
            }

            this.slide = 0;
        }

        this._go();
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;

        if (o.video) return;

        this.slide--;

        if (this.slide < 0) {
            if (!o.loop) {
                this.slide++;
                return this._end();
            }

            this.slide = this.slides.length - 1;
        }

        this._go();
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('vegas', Vegas);