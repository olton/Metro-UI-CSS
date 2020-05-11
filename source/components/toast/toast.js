/* global Metro, Utils, METRO_TIMEOUT, METRO_ANIMATION_DURATION */
var ToastDefaultConfig = {
    callback: Metro.noop,
    timeout: METRO_TIMEOUT,
    distance: 20,
    showTop: false,
    clsToast: ""
};

Metro.toastSetup = function(options){
    ToastDefaultConfig = $.extend({}, ToastDefaultConfig, options);
};

if (typeof window["metroToastSetup"] !== undefined) {
    Metro.toastSetup(window["metroToastSetup"]);
}

var Toast = {
    create: function(message, callback, timeout, cls, options){
        var o = $.extend({}, ToastDefaultConfig, options);
        var toast = $("<div>").addClass("toast").html(message).appendTo($("body"));
        var width = toast.outerWidth();

        toast.hide();

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
        });
        toast.addClass(o.clsToast);
        toast.addClass(cls);
        toast.fadeIn(METRO_ANIMATION_DURATION);

        setTimeout(function(){
            toast.fadeOut(METRO_ANIMATION_DURATION, function(){
                toast.remove();
                Utils.exec(callback, null, toast[0]);
            });
        }, timeout);
    }
};

Metro['toast'] = Toast;