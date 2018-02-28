var Animation = {

    duration: METRO_ANIMATION_DURATION,
    func: "swing",

    switch: function(current, next){
        current.hide();
        next.css({top: 0, left: 0}).show();
    },

    slideUp: function(current, next, duration, func){
        var h = current.parent().outerHeight(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            top: -h
        }, duration, func);

        next.css({
            top: h,
            left: 0,
            zIndex: 2
        }).animate({
            top: 0
        }, duration, func);
    },

    slideDown: function(current, next, duration, func){
        var h = current.parent().outerHeight(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            top: h
        }, duration, func);

        next.css({
            left: 0,
            top: -h,
            zIndex: 2
        }).animate({
            top: 0
        }, duration, func);
    },

    slideLeft: function(current, next, duration, func){
        var w = current.parent().outerWidth(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            left: -w
        }, duration, func);

        next.css({
            left: w,
            zIndex: 2
        }).animate({
            left: 0
        }, duration, func);
    },

    slideRight: function(current, next, duration, func){
        var w = current.parent().outerWidth(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            left: w
        }, duration, func);

        next.css({
            left: -w,
            zIndex: 2
        }).animate({
            left: 0
        }, duration, func);
    },

    fade: function(current, next, duration){
        if (duration === undefined) {duration = this.duration;}
        current.animate({
            opacity: 0
        }, duration);
        next.css({
            top: 0,
            left: 0
        }).animate({
            opacity: 1
        }, duration);
    }

};

Metro['animation'] = Animation;