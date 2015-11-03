$.widget( "metro.audio" , {

    version: "3.0.14",

    options: {
        src: false,
        volume: .5,
        muted: false,
        loop: false,
        preload: false,
        autoplay: false,

        loopButton: "<span class='mif-loop'></span>",
        stopButton: "<span class='mif-stop'></span>",
        playButton: "<span class='mif-play'></span>",
        pauseButton: "<span class='mif-pause'></span>",
        muteButton: "<span class='mif-volume-mute'></span>",
        shuffleButton: "<span class='mif-shuffle'></span>",

        volumeLowButton: "<span class='mif-volume-low'></span>",
        volumeMediumButton: "<span class='mif-volume-medium'></span>",
        volumeHighButton: "<span class='mif-volume-high'></span>"

    },

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        this._createPlayer();
        this._addControls();
        this._addEvents();

        element.data('audio', this);
    },

    _createPlayer: function(){
        var that = this, element = this.element, o = this.options;
        var audio = element.find("audio");

        element.addClass("audio-player");

        if (audio.length == 0) {
            audio = $("<audio>").appendTo(element);
        }

        $.each(['autoplay', 'controls', 'muted', 'loop', 'preload'], function(){
            audio.removeAttr(this);
        });

        if (o.src) {
            audio.attr(src, o.src);
        }

        if (o.loop) {
            audio.attr("loop", "loop");
        }

        if (o.preload) {
            audio.attr("preload", "auto");
        }

        if (o.autoplay) {
            audio.attr("autoplay", "autoplay");
        }

        audio[0].volume = o.volume;
        audio[0].muted = o.muted;

        element.data('muted', false);
        element.data('duration', 0);
        element.data('played', false);
    },

    _addControls: function(){
        var that = this, element = this.element, o = this.options;
        var controls, play_button, loop_button, stop_button, volume_button, volume_slider, stream_slider, info_box, stream_wrapper, volume_wrapper, shufle_button;
        var audio = element.find('audio'), audio_obj = audio[0];

        controls = $("<div>").addClass("controls").appendTo(element);

        stream_wrapper = $("<div/>").addClass('stream-wrapper').appendTo(controls);
        stream_slider = $("<div/>").addClass('slider stream-slider').appendTo(stream_wrapper);
        stream_slider.slider({
            showHint: true,
            animate: false,
            markerColor: 'bg-red',
            completeColor: 'bg-cyan',
            onStartChange: function(){
                audio_obj.pause();
            },
            onChanged: function(value, slider){
                if (audio_obj.seekable.length > 0)
                    audio_obj.currentTime = (element.data('duration') * value / 100).toFixed(0);

                if (element.data('played') && audio_obj.currentTime >= 0) {
                    audio_obj.play();
                }
            }
        });
        stream_slider.data('slider').value(0);

        loop_button = $("<button/>").addClass("square-button control-element loop").html(o.loopButton).appendTo(controls);
        loop_button.on("click", function(){
            loop_button.toggleClass('active');
            if (loop_button.hasClass('active')) {
                audio.attr("loop", "loop");
            } else {
                audio.removeAttr("loop");
            }
        });

        play_button = $("<button/>").addClass("square-button control-element play").html(o.playButton).appendTo(controls);
        play_button.on("click", function(){
            that._play();
        });

        stop_button = $("<button/>").addClass("square-button control-element stop").html(o.stopButton).appendTo(controls);
        stop_button.attr("disabled", true);
        stop_button.on("click", function(){
            that._stop();
        });

        info_box = $("<div/>").addClass('control-element info-box').appendTo(controls);
        info_box.html("00:00 / 00:00");

        var volume_container = $("<div/>").addClass("place-right").appendTo(controls);

        volume_button = $("<button/>").addClass("square-button control-element volume").html(o.volumeLowButton).appendTo(volume_container);
        volume_button.on("click", function(){
            element.data('muted', !element.data('muted'));

            audio_obj.muted = element.data('muted');

            if (element.data('muted')) {
                volume_button.html(o.muteButton);
            } else {
                that._setupVolumeButton();
            }
        });

        this._setupVolumeButton();

        volume_wrapper = $("<div/>").addClass('control-element volume-wrapper').appendTo(volume_container);
        volume_slider = $("<div/>").addClass('slider volume-slider').appendTo(volume_wrapper);
        volume_slider.slider({
            showHint: true,
            animate: false,
            markerColor: 'bg-red',
            completeColor: 'bg-green',
            onChange: function(value, slider){
                audio_obj.volume = value/100;
                that._setupVolumeButton();
            }
        });
        volume_slider.data('slider').value(audio_obj.volume * 100);

    },

    _setupVolumeButton: function(){
        var that = this, element = this.element, o = this.options;
        var audio = element.find("audio"), audio_obj = audio[0];
        var controls = element.find('.controls'), volume_button = controls.find('.volume');

        var current_volume = audio_obj.volume;
        if (current_volume > 0 && current_volume < 0.3) {
            volume_button.html(o.volumeLowButton);
        } else if (current_volume >= 0.3 && current_volume < 0.6) {
            volume_button.html(o.volumeMediumButton);
        } else if (current_volume >= 0.6 && current_volume <= 1) {
            volume_button.html(o.volumeHighButton);
        } else {
            volume_button.html(o.muteButton);
        }
    },

    _addEvents: function(){
        var that = this, element = this.element, o = this.options;
        var audio = element.find("audio"), audio_obj = audio[0];
        var controls = element.find(".controls");
        var info_box = element.find(".info-box");

        audio.on('loadedmetadata', function(){
            element.data('duration', audio_obj.duration.toFixed(0));
            info_box.html("00:00" + " / " + secondsToFormattedString(element.data('duration')) );
        });

        audio.on("canplay", function(){
            //preloader.hide();
            var buffered = audio_obj.buffered.length ? Math.round(Math.floor(audio_obj.buffered.end(0)) / Math.floor(audio_obj.duration) * 100) : 0;
            that._setBufferSize(buffered);
        });

        audio.on('progress', function(){
            var buffered = audio_obj.buffered.length ? Math.round(Math.floor(audio_obj.buffered.end(0)) / Math.floor(audio_obj.duration) * 100) : 0;
            that._setBufferSize(buffered);
        });

        audio.on("timeupdate", function(){
            that._setInfoData();
            that._setStreamSliderPosition();
        });

        audio.on("waiting", function(){
            //preloader.show();
        });

        audio.on("loadeddata", function(){
            //preloader.hide();
        });

        audio.on('ended', function(){
            that._stop();
        });
    },

    _setInfoData: function(){
        var that = this, element = this.element, element_obj = element[0], o = this.options;
        var audio = element.find("audio"), audio_obj = audio[0];
        var info_box = element.find(".controls .info-box");
        var currentTime = Math.round(audio_obj.currentTime);

        info_box.html(secondsToFormattedString(currentTime) + " / " + secondsToFormattedString(element.data('duration')));
    },

    _setStreamSliderPosition: function(){
        var that = this, element = this.element, element_obj = element[0], o = this.options;
        var audio = element.find("audio"), audio_obj = audio[0];
        var slider = element.find(".stream-slider").data("slider");
        var value = Math.round(audio_obj.currentTime * 100 / element.data('duration'));
        slider.value(value);
    },


    _setBufferSize: function(value){
        var that = this, element = this.element, element_obj = element[0], o = this.options;
        var audio = element.find("audio"), audio_obj = audio[0];
        var slider = element.find(".stream-slider").data("slider");
        slider.buffer(Math.round(value));
    },

    _play: function(){
        var that = this, element = this.element, element_obj = element[0], o = this.options;
        var audio = element.find("audio"), audio_obj = audio[0];
        var play_button = element.find(".controls .play");
        var stop_button = element.find(".controls .stop");

        if (audio_obj.paused) {
            play_button.html(o.pauseButton);
            audio_obj.play();
            stop_button.removeAttr("disabled");
            element.data('played', true);
            element.trigger('play');
        } else {
            play_button.html(o.playButton);
            audio_obj.pause();
            element.data('played', false);
            element.trigger('pause');
        }
    },

    _stop: function(){
        var that = this, element = this.element, element_obj = element[0], o = this.options;
        var audio = element.find("audio"), audio_obj = audio[0];
        var stop_button = element.find(".controls .stop");
        var play_button = element.find(".controls .play");

        audio_obj.pause();
        audio_obj.currentTime = 0;
        play_button.html(o.playButton);
        stop_button.attr("disabled", "disabled");
        element.data('played', false);
        element.find(".stream-slider").data('slider').value(0);
        element.trigger('stop');
    },


    play: function(file, type){
        var that = this, element = this.element, element_obj = element[0], o = this.options;
        var audio = element.find("audio"), audio_obj = audio[0], source;

        this._stop();

        audio.find("source").remove();
        source = $("source").attr("src", file);
        if (type != undefined) {
            source.attr("type", type);
        }
        source.appendTo(audio);

        this._play();
    },

    pause: function(){
        var that = this, element = this.element, element_obj = element[0], o = this.options;
        var audio = element.find("audio"), audio_obj = audio[0], play_button = element.find(".play");

        play_button.html(o.playButton);
        audio_obj.pause();
        element.data('played', false);
        element.trigger('pause');
    },

    resume: function(){
        var that = this, element = this.element, element_obj = element[0], o = this.options;
        var audio = element.find("audio"), audio_obj = audio[0], play_button = element.find(".play"), stop_button = element.find(".stop");

        play_button.html(o.pauseButton);
        audio_obj.play();
        stop_button.removeAttr("disabled");
        element.data('played', true);
        element.trigger('play');
    },

    stop: function(){
        this._stop();
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _destroy: function () {
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});
