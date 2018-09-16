var Audio = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.preloader = null;
        this.player = null;
        this.audio = elem;
        this.stream = null;
        this.volume = null;
        this.volumeBackup = 0;
        this.muted = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        playlist: null,
        src: null,

        volume: .5,
        loop: false,
        autoplay: false,

        showLoop: true,
        showPlay: true,
        showStop: true,
        showMute: true,
        showFull: true,
        showStream: true,
        showVolume: true,
        showInfo: true,

        showPlaylist: true,
        showNext: true,
        showPrev: true,
        showFirst: true,
        showLast: true,
        showForward: true,
        showBackward: true,
        showShuffle: true,
        showRandom: true,

        loopIcon: "<span class='default-icon-loop'></span>",
        stopIcon: "<span class='default-icon-stop'></span>",
        playIcon: "<span class='default-icon-play'></span>",
        pauseIcon: "<span class='default-icon-pause'></span>",
        muteIcon: "<span class='default-icon-mute'></span>",
        volumeLowIcon: "<span class='default-icon-low-volume'></span>",
        volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
        volumeHighIcon: "<span class='default-icon-high-volume'></span>",

        playlistIcon: "<span class='default-icon-playlist'></span>",
        nextIcon: "<span class='default-icon-next'></span>",
        prevIcon: "<span class='default-icon-prev'></span>",
        firstIcon: "<span class='default-icon-first'></span>",
        lastIcon: "<span class='default-icon-last'></span>",
        forwardIcon: "<span class='default-icon-forward'></span>",
        backwardIcon: "<span class='default-icon-backward'></span>",
        shuffleIcon: "<span class='default-icon-shuffle'></span>",
        randomIcon: "<span class='default-icon-random'></span>",

        onPlay: Metro.noop,
        onPause: Metro.noop,
        onStop: Metro.noop,
        onEnd: Metro.noop,
        onMetadata: Metro.noop,
        onTime: Metro.noop,
        onAudioCreate: Metro.noop
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
        var that = this, element = this.element, o = this.options, audio = this.audio;

        this._createPlayer();
        this._createControls();
        this._createEvents();

        if (o.autoplay === true) {
            this.play();
        }

        Utils.exec(o.onAudioCreate, [element, this.player], element[0]);
    },

    _createPlayer: function(){
        var that = this, element = this.element, o = this.options, audio = this.audio;

        var prev = element.prev();
        var parent = element.parent();
        var player = $("<div>").addClass("media-player audio-player " + element[0].className);

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

        audio.volume = o.volume;

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
        var that = this, element = this.element, o = this.options, audio = this.elem, player = this.player;

        var controls = $("<div>").addClass("controls").addClass(o.clsControls).insertAfter(element);


        var stream = $("<div>").addClass("stream").appendTo(controls);
        var streamSlider = $("<input>").addClass("stream-slider ultra-thin cycle-marker").appendTo(stream);
        var preloader = $("<div>").addClass("load-audio").appendTo(stream);

        var volume = $("<div>").addClass("volume").appendTo(controls);
        var volumeSlider = $("<input>").addClass("volume-slider ultra-thin cycle-marker").appendTo(volume);

        var infoBox = $("<div>").addClass("info-box").appendTo(controls);

        if (o.showInfo !== true) {
            infoBox.hide();
        }

        preloader.activity({
            type: "metro",
            style: "color"
        });

        preloader.hide(0);

        this.preloader = preloader;

        streamSlider.slider({
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            clsComplete: "bg-cyan",
            hint: true,
            onStart: function(){
                if (!audio.paused) audio.pause();
            },
            onStop: function(val){
                if (audio.seekable.length > 0) {
                    audio.currentTime = (that.duration * val / 100).toFixed(0);
                }
                if (audio.paused && audio.currentTime > 0) {
                    audio.play();
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
                audio.volume = val / 100;
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

        if (o.loop === true) {
            loop.addClass("active");
            element.attr("loop", "loop");
        }

        this._setVolume();

        if (o.muted) {
            that.volumeBackup = audio.volume;
            that.volume.data('slider').val(0);
            audio.volume = 0;
        }

        infoBox.html("00:00 / 00:00");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options, audio = this.elem, player = this.player;

        element.on("loadstart", function(){
            that.preloader.fadeIn();
        });

        element.on("loadedmetadata", function(){
            that.duration = audio.duration.toFixed(0);
            that._setInfo(0, that.duration);
            Utils.exec(o.onMetadata, [audio, player], element[0]);
        });

        element.on("canplay", function(){
            that._setBuffer();
            that.preloader.fadeOut();
        });

        element.on("progress", function(){
            that._setBuffer();
        });

        element.on("timeupdate", function(){
            var position = Math.round(audio.currentTime * 100 / that.duration);
            that._setInfo(audio.currentTime, that.duration);
            that.stream.data('slider').val(position);
            Utils.exec(o.onTime, [audio.currentTime, that.duration, audio, player], element[0]);
        });

        element.on("waiting", function(){
            that.preloader.fadeIn();
        });

        element.on("loadeddata", function(){

        });

        element.on("play", function(){
            player.find(".play").html(o.pauseIcon);
            Utils.exec(o.onPlay, [audio, player], element[0]);
        });

        element.on("pause", function(){
            player.find(".play").html(o.playIcon);
            Utils.exec(o.onPause, [audio, player], element[0]);
        });

        element.on("stop", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onStop, [audio, player], element[0]);
        });

        element.on("ended", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onEnd, [audio, player], element[0]);
        });

        element.on("volumechange", function(){
            that._setVolume();
        });

        player.on(Metro.events.click, ".play", function(){
            if (audio.paused) {
                that.play();
            } else {
                that.pause();
            }
        });

        player.on(Metro.events.click, ".stop", function(){
            that.stop();
        });

        player.on(Metro.events.click, ".mute", function(){
            that._toggleMute();
        });

        player.on(Metro.events.click, ".loop", function(){
            that._toggleLoop();
        });
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
            this.audio.volume = this.volumeBackup;
            this.volume.data('slider').val(this.volumeBackup * 100);
        } else {
            this.volumeBackup = this.audio.volume;
            this.volume.data('slider').val(0);
            this.audio.volume = 0;
        }
    },

    _setInfo: function(a, b){
        this.player.find(".info-box").html(Utils.secondsToFormattedString(Math.round(a)) + " / " + Utils.secondsToFormattedString(Math.round(b)));
    },

    _setBuffer: function(){
        var buffer = this.audio.buffered.length ? Math.round(Math.floor(this.audio.buffered.end(0)) / Math.floor(this.audio.duration) * 100) : 0;
        this.stream.data('slider').buff(buffer);
    },

    _setVolume: function(){
        var audio = this.audio, player = this.player, o = this.options;

        var volumeButton = player.find(".mute");
        var volume = audio.volume * 100;
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

    play: function(src){
        if (src !== undefined) {
            this._setSource(src);
        }

        if (this.element.attr("src") === undefined && this.element.find("source").length === 0) {
            return ;
        }

        this.audio.play();
    },

    pause: function(){
        this.audio.pause();
    },

    resume: function(){
        if (this.audio.paused) {
            this.play();
        }
    },

    stop: function(){
        this.audio.pause();
        this.audio.currentTime = 0;
        this.stream.data('slider').val(0);
    },

    volume: function(v){
        if (v === undefined) {
            return this.audio.volume;
        }

        if (v > 1) {
            v /= 100;
        }

        this.audio.volume = v;
        this.volume.data('slider').val(v*100);
    },

    loop: function(){
        this._toggleLoop();
    },

    mute: function(){
        this._toggleMute();
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
            case "data-src": this.changeSource(); break;
            case "data-volume": this.changeVolume(); break;
        }
    },

    destroy: function(){
        var element = this.element, player = this.player;

        element.off("loadstart");
        element.off("loadedmetadata");
        element.off("canplay");
        element.off("progress");
        element.off("timeupdate");
        element.off("waiting");
        element.off("loadeddata");
        element.off("play");
        element.off("pause");
        element.off("stop");
        element.off("ended");
        element.off("volumechange");
        player.off(Metro.events.click, ".play");
        player.off(Metro.events.click, ".stop");
        player.off(Metro.events.click, ".mute");
        player.off(Metro.events.click, ".loop");

        Metro.destroyPlugin(this.stream, "slider");
        Metro.destroyPlugin(this.volume, "slider");

        element.insertBefore(player);
        player.html("").remove();
    }
};

Metro.plugin('audio', Audio);