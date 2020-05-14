/* global Metro, Utils, Component */
var AudioButtonDefaultConfig = {
    audioSrc: "",
    onAudioStart: Metro.noop,
    onAudioEnd: Metro.noop,
    onAudioButtonCreate: Metro.noop
};

Metro.audioButtonSetup = function (options) {
    AudioButtonDefaultConfig = $.extend({}, AudioButtonDefaultConfig, options);
};

if (typeof window["metroAudioButtonSetup"] !== undefined) {
    Metro.audioButtonSetup(window["metroAudioButtonSetup"]);
}

Component('audio-button', {
    init: function( options, elem ) {

        this._super(elem, options, AudioButtonDefaultConfig);

        this.audio = null;
        this.canPlay = false;
        this.id = Utils.elementId("audioButton");

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, this.name);

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onAudioButtonCreate, null, element[0]);
        element.fire('audiobuttoncreate');
    },

    _createStructure: function(){
        var o = this.options;
        this.audio = new Audio(o.audioSrc);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var audio = this.audio;

        audio.addEventListener('loadeddata', function(){
            that.canPlay = true;
        });

        audio.addEventListener('ended', function(){
            Utils.exec(o.onAudioEnd, [o.audioSrc, audio], element[0]);
            element.fire("audioend", {
                src: o.audioSrc,
                audio: audio
            });
        })

        element.on(Metro.events.click, function(){
            if (o.audioSrc !== "" && that.audio.duration && that.canPlay) {
                Utils.exec(o.onAudioStart, [o.audioSrc, audio], element[0]);
                element.fire("audiostart", {
                    src: o.audioSrc,
                    audio: audio
                });
                audio.pause();
                audio.currentTime = 0;
                audio.play();
            }
        }, {ns: this.id});
    },

    changeAttribute: function(attributeName){
        var element = this.element, o = this.options;
        var audio = this.audio;

        var changeSrc = function(){
            var src = element.attr('data-audio-src');
            if (src && src.trim() !== "") {
                o.audioSrc = src;
                audio.src = src;
            }
        }

        if (attributeName === 'data-audio-src') {
            changeSrc();
        }
    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.click, {ns: this.id});
    }
});

Metro["playSound"] = function(src, cb){
    var audio = new Audio(src);

    audio.addEventListener('loadeddata', function(){
        audio.play();
    });

    audio.addEventListener('ended', function(){
        Utils.exec(cb, [src], null);
    })
}