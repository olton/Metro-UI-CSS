/* global Metro, METRO_TIMEOUT, METRO_ANIMATION_DURATION */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
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
        create: function(message, /*callback, timeout, cls, */options){
            var o, toast, width;
            var args = Array.from(arguments);
            var timeout, callback, cls;

            if (!$.isPlainObject(options)) {
                options = args[4];
                callback = args[1];
                timeout = args[2];
                cls = args[3];
            }

            o = $.extend({}, ToastDefaultConfig, options);

            toast = $("<div>").addClass("toast").html(message).appendTo($("body"));
            width = toast.outerWidth();
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

            toast
                .css({
                    'left': '50%',
                    'margin-left': -(width / 2)
                })
                .addClass(o.clsToast)
                .addClass(cls)
                .fadeIn(METRO_ANIMATION_DURATION, function(){
                    setTimeout(function(){
                        Toast.remove(toast, callback);
                    }, timeout);
                });
        },

        remove: function(toast, cb){
            if (!toast) return ;

            toast.fadeOut(METRO_ANIMATION_DURATION, function(){
                toast.remove();
                Utils.exec(cb, null, toast[0]);
            });
        }
    };

    Metro['toast'] = Toast;
    Metro['createToast'] = Toast.create;
}(Metro, m4q));