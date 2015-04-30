(function( $ ) {
    "use strict";

    $.widget("metro.accordion", {

        version: "3.0.0",

        options: {
            closeAny: false,
            speed: 'fast',
            onFrameOpen: function(frame){return true;},
            onFrameOpened: function(frame){},
            onFrameClose: function(frame){return true;},
            onFrameClosed: function(frame){}
        },

        init: function(){
            var that = this, element = this.element;

            element.on('click', '.heading', function(e){
                var frame = $(this).parent();

                if (frame.hasClass('disabled')) {return false;}

                if  (!frame.hasClass('active')) {
                    that._openFrame(frame);
                } else {
                    that._closeFrame(frame);
                }

                e.preventDefault();
                e.stopPropagation();
            });
        },

        _closeAllFrames: function(){
            var that = this;
            var frames = this.element.children('.frame.active');
            $.each(frames, function(){
                that._closeFrame($(this));
            });
        },

        _openFrame: function(frame){
            var o = this.options;
            var content = frame.children('.content');

            if (typeof o.onFrameOpen === 'string') {
                if (!window[o.onFrameOpen](frame)) {return false;}
            } else {
                if (!o.onFrameOpen(frame)) {return false;}
            }

            if (o.closeAny) {this._closeAllFrames();}

            content.slideDown(o.speed);
            frame.addClass('active');

            if (typeof o.onFrameOpened === 'string') {
                window[o.onFrameOpened](frame);
            } else {
                o.onFrameOpened(frame);
            }
        },

        _closeFrame: function(frame){
            var o = this.options;
            var content = frame.children('.content');

            if (typeof o.onFrameClose === 'string') {
                if (!window[o.onFrameClose](frame)) {return false;}
            } else {
                if (!o.onFrameClose(frame)) {return false;}
            }

            content.slideUp(o.speed,function(){
                frame.removeClass("active");
            });

            if (typeof o.onFrameClosed === 'string') {
                window[o.onFrameClosed](frame);
            } else {
                o.onFrameClosed(frame);
            }
        },

        _create: function(){
            var that = this, o = this.options, element = this.element;

            this._setOptionsData();

            that.init();
            element.data('accordion', this);

        },

        _setOptionsData: function(){
            var o = this.options;

            $.each(this.element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = $.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    });
})( jQuery );