(function( $ ) {
    $.widget("metro.livetile", {

        version: "1.0.0",

        options: {
            effect: 'slideLeft',
            period: 4000,
            duration: 700,
            easing: 'doubleSqrt'
        },

        _frames: {},
        _currentIndex: 0,
        _interval: 0,
        _outPosition: 0,
        _size: {},

        _create: function(){
            var that = this,
                element = this.element;

            if (element.data('effect') != undefined) {this.options.effect = element.data('effect');}
            if (element.data('direction') != undefined) {this.options.direction = element.data('direction');}
            if (element.data('period') != undefined) {this.options.period = element.data('period');}
            if (element.data('duration') != undefined) {this.options.duration = element.data('duration');}
            if (element.data('easing') != undefined) {this.options.easing = element.data('easing');}

            //this._frames = element.children(".tile-content, .event-content");
            this._frames = element.children("[class*='-content']");
            //console.log(this._frames);

            if (this._frames.length <= 1) return;

            $.easing.doubleSqrt = function(t) {return Math.sqrt(Math.sqrt(t));};

            this._size = {
                'width': element.width(),
                'height': element.height()
            };

            this._start();
        },

        _start: function(){
            var that = this;
            this._interval = setInterval(function(){
                that._animate();
            }, this.options.period);
        },

        _animate: function(){
            var currentFrame = this._frames[this._currentIndex], nextFrame;
            this._currentIndex += 1;
            if (this._currentIndex >= this._frames.length) this._currentIndex = 0;
            nextFrame = this._frames[this._currentIndex];

            switch (this.options.effect) {
                case 'slideLeft': this._effectSlideLeft(currentFrame, nextFrame); break;
                case 'slideRight': this._effectSlideRight(currentFrame, nextFrame); break;
                case 'slideDown': this._effectSlideDown(currentFrame, nextFrame); break;
                case 'slideUpDown': this._effectSlideUpDown(currentFrame, nextFrame); break;
                case 'slideLeftRight': this._effectSlideLeftRight(currentFrame, nextFrame); break;
                default: this._effectSlideUp(currentFrame, nextFrame);
            }
        },

        _effectSlideLeftRight: function(currentFrame, nextFrame){
            if (this._currentIndex % 2 == 0)
                this._effectSlideLeft(currentFrame, nextFrame);
            else
                this._effectSlideRight(currentFrame, nextFrame);
        },

        _effectSlideUpDown: function(currentFrame, nextFrame){
            if (this._currentIndex % 2 == 0)
                this._effectSlideUp(currentFrame, nextFrame);
            else
                this._effectSlideDown(currentFrame, nextFrame);
        },

        _effectSlideUp: function(currentFrame, nextFrame){
            var _out = this._size.height;
            var options = {
                'duration': this.options.duration,
                'easing': this.options.easing
            };

            $(currentFrame)
                .animate({top: -_out}, options);
            $(nextFrame)
                .css({top: _out})
                .show()
                .animate({top: 0}, options);
        },

        _effectSlideDown: function(currentFrame, nextFrame){
            var _out = this._size.height;
            var options = {
                'duration': this.options.duration,
                'easing': this.options.easing
            };

            $(currentFrame)
                .animate({top: _out}, options);
            $(nextFrame)
                .css({top: -_out})
                .show()
                .animate({top: 0}, options);
        },

        _effectSlideLeft: function(currentFrame, nextFrame){
            var _out = this._size.width;
            var options = {
                'duration': this.options.duration,
                'easing': this.options.easing
            };

            $(currentFrame)
                .animate({left: _out * -1}, options);
            $(nextFrame)
                .css({left: _out})
                .show()
                .animate({left: 0}, options);
        },

        _effectSlideRight: function(currentFrame, nextFrame){
            var _out = this._size.width;
            var options = {
                'duration': this.options.duration,
                'easing': this.options.easing
            };

            $(currentFrame)
                .animate({left: _out}, options);
            $(nextFrame)
                .css({left: -_out})
                .show()
                .animate({left: 0}, options);
        },

        _destroy: function(){},

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

$(function () {
    $('[data-role=live-tile], [data-role=live]').livetile();
});

function reinitLives(){
    $('[data-role=live-tile], [data-role=live]').livetile();
}