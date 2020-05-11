/* global Metro, METRO_ANIMATION_DURATION */

var FrameAnimation = {

    duration: METRO_ANIMATION_DURATION,
    func: "linear",

    switch: function(current, next){
        current.hide();
        next.css({top: 0, left: 0}).show();
    },

    slideUp: function(current, next, duration, func){
        var h = current.parent().outerHeight(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}

        current
            .css("z-index", 1)
            .animate({
                draw: {
                    top: -h,
                    opacity: 0
                },
                dur: duration,
                ease: func
            });

        next
            .css({
                top: h,
                left: 0,
                zIndex: 2
            })
            .animate({
                draw: {
                    top: 0,
                    opacity: 1
                },
                dur: duration,
                ease: func
            });
    },

    slideDown: function(current, next, duration, func){
        var h = current.parent().outerHeight(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}

        current
            .css("z-index", 1)
            .animate({
                draw: {
                    top: h,
                    opacity: 0
                },
                dur: duration,
                ease: func
            });

        next
            .css({
                left: 0,
                top: -h,
                zIndex: 2
            })
            .animate({
                draw: {
                    top: 0,
                    opacity: 1
                },
                dur: duration,
                ease: func
            });
    },

    slideLeft: function(current, next, duration, func){
        var w = current.parent().outerWidth(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current
            .css("z-index", 1)
            .animate({
                draw: {
                    left: -w,
                    opacity: 0
                },
                dur: duration,
                ease: func
            });

        next
            .css({
                left: w,
                zIndex: 2
            })
            .animate({
                draw: {
                    left: 0,
                    opacity: 1
                },
                dur: duration,
                ease: func
            });
    },

    slideRight: function(current, next, duration, func){
        var w = current.parent().outerWidth(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}

        current
            .css("z-index", 1)
            .animate({
                draw: {
                    left:  w,
                    opacity: 0
                },
                dur: duration,
                ease: func
            });

        next
            .css({
                left: -w,
                zIndex: 2
            })
            .animate({
                draw: {
                    left: 0,
                    opacity: 1
                },
                dur: duration,
                ease: func
            });
    },

    fade: function(current, next, duration){
        if (duration === undefined) {duration = this.duration;}

        current
            .animate({
                draw: {
                    opacity: 0
                },
                dur: duration
            });

        next
            .css({
                top: 0,
                left: 0,
                opacity: 0
            })
            .animate({
                draw: {
                    opacity: 1
                },
                dur: duration
            });
    }
};

Metro.animation = FrameAnimation;