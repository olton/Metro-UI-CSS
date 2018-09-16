var Video = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.fullscreen = false;
        this.preloader = null;
        this.player = null;
        this.video = elem;
        this.stream = null;
        this.volume = null;
        this.volumeBackup = 0;
        this.muted = false;
        this.fullScreenInterval = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        src: null,

        poster: "",
        logo: "",
        logoHeight: 32,
        logoWidth: "auto",
        logoTarget: "",

        volume: .5,
        loop: false,
        autoplay: false,

        fullScreenMode: Metro.fullScreenMode.DESKTOP,
        aspectRatio: Metro.aspectRatio.HD,

        controlsHide: 3000,

        showLoop: true,
        showPlay: true,
        showStop: true,
        showMute: true,
        showFull: true,
        showStream: true,
        showVolume: true,
        showInfo: true,

        loopIcon: "<span class='default-icon-loop'></span>",
        stopIcon: "<span class='default-icon-stop'></span>",
        playIcon: "<span class='default-icon-play'></span>",
        pauseIcon: "<span class='default-icon-pause'></span>",
        muteIcon: "<span class='default-icon-mute'></span>",
        volumeLowIcon: "<span class='default-icon-low-volume'></span>",
        volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
        volumeHighIcon: "<span class='default-icon-high-volume'></span>",
        screenMoreIcon: "<span class='default-icon-enlarge'></span>",
        screenLessIcon: "<span class='default-icon-shrink'></span>",

        onPlay: Metro.noop,
        onPause: Metro.noop,
        onStop: Metro.noop,
        onEnd: Metro.noop,
        onMetadata: Metro.noop,
        onTime: Metro.noop,
        onVideoCreate: Metro.noop
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
        var that = this, element = this.element, o = this.options, video = this.video;

        if (Metro.fullScreenEnabled === false) {
            o.fullScreenMode = Metro.fullScreenMode.WINDOW;
        }

        this._createPlayer();
        this._createControls();
        this._createEvents();
        this._setAspectRatio();

        if (o.autoplay === true) {
            this.play();
        }

        Utils.exec(o.onVideoCreate, [element, this.player], element[0]);
    },

    _createPlayer: function(){
        var that = this, element = this.element, o = this.options, video = this.video;

        var prev = element.prev();
        var parent = element.parent();
        var player = $("<div>").addClass("media-player video-player " + element[0].className);
        var preloader = $("<div>").addClass("preloader").appendTo(player);
        var logo = $("<a>").attr("href", o.logoTarget).addClass("logo").appendTo(player);

        if (prev.length === 0) {
            parent.prepend(player);
        } else {
            player.insertAfter(prev);
        }

        element.appendTo(player);

        $.each(['muted', 'autoplay', 'controls', 'height', 'width', 'loop', 'poster', 'preload'], function(){
            element.removeAttr(this);
        });

        element.attr("preload", "auto");

        if (o.poster !== "") {
            element.attr("poster", o.poster);
        }

        video.volume = o.volume;

        preloader.activity({
            type: "cycle",
            style: "color"
        });

        preloader.hide(0);

        this.preloader = preloader;

        if (o.logo !== "") {
            $("<img>")
                .css({
                    height: o.logoHeight,
                    width: o.logoWidth
                })
                .attr("src", o.logo).appendTo(logo);
        }

        if (o.src !== null) {
            this._setSource(o.src);
        }

        element[0].className = "";

        this.player = player;
    },

    _setSource: function(src){
        var element = this.element;

        element.find("source").remove();
        element.removeAttr("src");
        if (Array.isArray(src)) {
            $.each(src, function(){
                var item = this;
                if (item.src === undefined) return ;
                $("<source>").attr('src', item.src).attr('type', item.type !== undefined ? item.type : '').appendTo(element);
            });
        } else {
            element.attr("src", src);
        }
    },

    _createControls: function(){
        var that = this, element = this.element, o = this.options, video = this.elem, player = this.player;

        var controls = $("<div>").addClass("controls").addClass(o.clsControls).insertAfter(element);

        var stream = $("<div>").addClass("stream").appendTo(controls);
        var streamSlider = $("<input>").addClass("stream-slider ultra-thin cycle-marker").appendTo(stream);

        var volume = $("<div>").addClass("volume").appendTo(controls);
        var volumeSlider = $("<input>").addClass("volume-slider ultra-thin cycle-marker").appendTo(volume);

        var infoBox = $("<div>").addClass("info-box").appendTo(controls);

        if (o.showInfo !== true) {
            infoBox.hide();
        }

        streamSlider.slider({
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            clsComplete: "bg-cyan",
            hint: true,
            onStart: function(){
                if (!video.paused) video.pause();
            },
            onStop: function(val){
                if (video.seekable.length > 0) {
                    video.currentTime = (that.duration * val / 100).toFixed(0);
                }
                if (video.paused && video.currentTime > 0) {
                    video.play();
                }
            }
        });

        this.stream = streamSlider;

        if (o.showStream !== true) {
            stream.hide();
        }

        volumeSlider.slider({
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            hint: true,
            value: o.volume * 100,
            onChangeValue: function(val){
                video.volume = val / 100;
            }
        });

        this.volume = volumeSlider;

        if (o.showVolume !== true) {
            volume.hide();
        }

        var loop, play, stop, mute, full;

        if (o.showLoop === true) loop = $("<button>").attr("type", "button").addClass("button square loop").html(o.loopIcon).appendTo(controls);
        if (o.showPlay === true) play = $("<button>").attr("type", "button").addClass("button square play").html(o.playIcon).appendTo(controls);
        if (o.showStop === true) stop = $("<button>").attr("type", "button").addClass("button square stop").html(o.stopIcon).appendTo(controls);
        if (o.showMute === true) mute = $("<button>").attr("type", "button").addClass("button square mute").html(o.muteIcon).appendTo(controls);
        if (o.showFull === true) full = $("<button>").attr("type", "button").addClass("button square full").html(o.screenMoreIcon).appendTo(controls);

        if (o.loop === true) {
            loop.addClass("active");
            element.attr("loop", "loop");
        }

        this._setVolume();

        if (o.muted) {
            that.volumeBackup = video.volume;
            that.volume.data('slider').val(0);
            video.volume = 0;
        }

        infoBox.html("00:00 / 00:00");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options, video = this.elem, player = this.player;

        element.on("loadstart", function(){
            that.preloader.fadeIn();
        });

        element.on("loadedmetadata", function(){
            that.duration = video.duration.toFixed(0);
            that._setInfo(0, that.duration);
            Utils.exec(o.onMetadata, [video, player], element[0]);
        });

        element.on("canplay", function(){
            that._setBuffer();
            that.preloader.fadeOut();
        });

        element.on("progress", function(){
            that._setBuffer();
        });

        element.on("timeupdate", function(){
            var position = Math.round(video.currentTime * 100 / that.duration);
            that._setInfo(video.currentTime, that.duration);
            that.stream.data('slider').val(position);
            Utils.exec(o.onTime, [video.currentTime, that.duration, video, player], element[0]);
        });

        element.on("waiting", function(){
            that.preloader.fadeIn();
        });

        element.on("loadeddata", function(){

        });

        element.on("play", function(){
            player.find(".play").html(o.pauseIcon);
            Utils.exec(o.onPlay, [video, player], element[0]);
            that._onMouse();
        });

        element.on("pause", function(){
            player.find(".play").html(o.playIcon);
            Utils.exec(o.onPause, [video, player], element[0]);
            that._offMouse();
        });

        element.on("stop", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onStop, [video, player], element[0]);
            that._offMouse();
        });

        element.on("ended", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onEnd, [video, player], element[0]);
            that._offMouse();
        });

        element.on("volumechange", function(){
            that._setVolume();
        });

        player.on(Metro.events.click, ".play", function(e){
            if (video.paused) {
                that.play();
            } else {
                that.pause();
            }
        });

        player.on(Metro.events.click, ".stop", function(e){
            that.stop();
        });

        player.on(Metro.events.click, ".mute", function(e){
            that._toggleMute();
        });

        player.on(Metro.events.click, ".loop", function(){
            that._toggleLoop();
        });

        player.on(Metro.events.click, ".full", function(e){
            that.fullscreen = !that.fullscreen;
            player.find(".full").html(that.fullscreen === true ? o.screenLessIcon : o.screenMoreIcon);
            if (o.fullScreenMode === Metro.fullScreenMode.WINDOW) {
                if (that.fullscreen === true) {
                    player.addClass("full-screen");
                } else {
                    player.removeClass("full-screen");
                }
            } else {
                if (that.fullscreen === true) {

                    Metro.requestFullScreen(video);

                    if (that.fullScreenInterval === false) that.fullScreenInterval = setInterval(function(){
                        if (Metro.inFullScreen() === false) {
                            that.fullscreen = false;
                            clearInterval(that.fullScreenInterval);
                            that.fullScreenInterval = false;
                            player.find(".full").html(o.screenMoreIcon);
                        }

                    }, 1000);
                } else {
                    Metro.exitFullScreen();
                }
            }

            if (that.fullscreen === true) {
                $(document).on(Metro.events.keyup + "_video", function(e){
                    if (e.keyCode === 27) {
                        player.find(".full").click();
                    }
                });
            } else {
                $(document).off(Metro.events.keyup + "_video");
            }
        });

        $(window).resize(function(){
            that._setAspectRatio();
        });
    },

    _onMouse: function(){
        var player = this.player, o = this.options;

        if (o.controlsHide > 0) {
            player.on(Metro.events.enter, function(){
                player.find(".controls").fadeIn();
            });

            player.on(Metro.events.leave, function(){
                setTimeout(function(){
                    player.find(".controls").fadeOut();
                }, o.controlsHide);
            });
        }
    },

    _offMouse: function(){
        this.player.off(Metro.events.enter);
        this.player.off(Metro.events.leave);
        this.player.find(".controls").fadeIn();
    },

    _toggleLoop: function(){
        var loop = this.player.find(".loop");
        if (loop.length === 0) return ;
        loop.toggleClass("active");
        if (loop.hasClass("active")) {
            this.element.attr("loop", "loop");
        } else {
            this.element.removeAttr("loop");
        }
    },

    _toggleMute: function(){
        this.muted = !this.muted;
        if (this.muted === false) {
            this.video.volume = this.volumeBackup;
            this.volume.data('slider').val(this.volumeBackup * 100);
        } else {
            this.volumeBackup = this.video.volume;
            this.volume.data('slider').val(0);
            this.video.volume = 0;
        }
    },

    _setInfo: function(a, b){
        this.player.find(".info-box").html(Utils.secondsToFormattedString(Math.round(a)) + " / " + Utils.secondsToFormattedString(Math.round(b)));
    },

    _setBuffer: function(){
        var buffer = this.video.buffered.length ? Math.round(Math.floor(this.video.buffered.end(0)) / Math.floor(this.video.duration) * 100) : 0;
        this.stream.data('slider').buff(buffer);
    },

    _setVolume: function(){
        var video = this.video, player = this.player, o = this.options;

        var volumeButton = player.find(".mute");
        var volume = video.volume * 100;
        if (volume > 1 && volume < 30) {
            volumeButton.html(o.volumeLowIcon);
        } else if (volume >= 30 && volume < 60) {
            volumeButton.html(o.volumeMediumIcon);
        } else if (volume >= 60 && volume <= 100) {
            volumeButton.html(o.volumeHighIcon);
        } else {
            volumeButton.html(o.muteIcon);
        }
    },

    _setAspectRatio: function(){
        var player = this.player, o = this.options;
        var width = player.outerWidth();
        var height;

        switch (o.aspectRatio) {
            case Metro.aspectRatio.SD: height = Utils.aspectRatioH(width, "4/3"); break;
            case Metro.aspectRatio.CINEMA: height = Utils.aspectRatioH(width, "21/9"); break;
            default: height = Utils.aspectRatioH(width, "16/9");
        }

        player.outerHeight(height);
    },

    aspectRatio: function(ratio){
        this.options.aspectRatio = ratio;
        this._setAspectRatio();
    },

    play: function(src){
        if (src !== undefined) {
            this._setSource(src);
        }

        if (this.element.attr("src") === undefined && this.element.find("source").length === 0) {
            return ;
        }

        this.video.play();
    },

    pause: function(){
        this.video.pause();
    },

    resume: function(){
        if (this.video.paused) {
            this.play();
        }
    },

    stop: function(){
        this.video.pause();
        this.video.currentTime = 0;
        this.stream.data('slider').val(0);
        this._offMouse();
    },

    volume: function(v){
        if (v === undefined) {
            return this.video.volume;
        }

        if (v > 1) {
            v /= 100;
        }

        this.video.volume = v;
        this.volume.data('slider').val(v*100);
    },

    loop: function(){
        this._toggleLoop();
    },

    mute: function(){
        this._toggleMute();
    },

    changeAspectRatio: function(){
        this.options.aspectRatio = this.element.attr("data-aspect-ratio");
        this._setAspectRatio();
    },

    changeSource: function(){
        var src = JSON.parse(this.element.attr('data-src'));
        this.play(src);
    },

    changeVolume: function(){
        var volume = this.element.attr("data-volume");
        this.volume(volume);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-aspect-ratio": this.changeAspectRatio(); break;
            case "data-src": this.changeSource(); break;
            case "data-volume": this.changeVolume(); break;
        }
    }
};

Metro.plugin('video', Video);