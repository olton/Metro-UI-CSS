var Toast = {

    options: {
        callback: Metro.noop,
        timeout: METRO_TIMEOUT,
        distance: 20,
        showTop: false,
        clsToast: ""
    },

    create: function(message, callback, timeout, cls, options){
        var o = options || Toast.options;
        var toast = $("<div>").addClass("toast").html(message).appendTo($("body")).hide();
        var width = toast.outerWidth();
        var timer = null;

        timeout = timeout || o.timeout;
        callback = callback || o.callback;
        cls = cls || o.clsToast;

        if (o.showTop === true) {
            toast.addClass("show-top").css({
                top: o.distance
            });
        } else {
            toast.css({
                bottom: o.distance
            })
        }

        toast.css({
            'left': '50%',
            'margin-left': -(width / 2)
        }).addClass(o.clsToast).addClass(cls).fadeIn(METRO_ANIMATION_DURATION);

        timer = setTimeout(function(){
            timer = null;
            toast.fadeOut(METRO_ANIMATION_DURATION, function(){
                toast.remove();
                Utils.callback(callback);
            });
        }, timeout);
    }
};

Metro['toast'] = Toast;