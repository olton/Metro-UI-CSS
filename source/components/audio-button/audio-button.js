var AudioButtonDefaultConfig = {
    audioSrc: "",
    onAudioButtonCreate: Metro.noop
};

Metro.audioButtonSetup = function (options) {
    AudioButtonDefaultConfig = $.extend({}, AudioButtonDefaultConfig, options);
};

if (typeof window["metroAudioButtonSetup"] !== undefined) {
    Metro.audioButtonSetup(window["metroAudioButtonSetup"]);
}

var AudioButton = {
    init: function( options, elem ) {
        this.options = $.extend( {}, AudioButtonDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.audio = null;
        this.canPlay = false;
        this.id = Utils.elementId("audioButton")

        this._setOptionsFromDOM();
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
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "audio-button");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onAudioButtonCreate, null, element[0]);
    },

    _createStructure: function(){
        var o = this.options;
        console.log(Audio);
        this.audio = new Audio(o.audioSrc);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var audio = this.audio;

        audio.addEventListener('loadeddata', function(){
            that.canPlay = true;
        });

        element.on(Metro.events.click, function(){
            if (o.audioSrc !== "" && that.audio.duration && that.canPlay)
                audio.play();
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
};

Metro.plugin('audio-button', AudioButton);