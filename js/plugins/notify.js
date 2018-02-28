var Notify = {

    options: {
        container: null,
        width: 220,
        timeout: METRO_TIMEOUT,
        duration: METRO_ANIMATION_DURATION,
        distance: "100vh",
        animation: "swing"
    },

    notifies: [],

    setup: function(options){
        var body = $("body"), container;
        this.options = $.extend({}, this.options, options);

        if (this.options.container === null) {
            container = $("<div>").addClass("notify-container");
            body.prepend(container);
            this.options.container = container;
        }

        return this;
    },

    reset: function(){
        var reset_options = {
            width: 220,
            timeout: METRO_TIMEOUT,
            duration: METRO_ANIMATION_DURATION,
            distance: "100vh",
            animation: "swing"
        };
        this.options = $.extend({}, this.options, reset_options);
    },

    create: function(message, title, options){
        var notify, that = this, o = this.options;
        var m, t;

        if (message === undefined || message.trim() === '') {
            return false;
        }

        notify = $("<div>").addClass("notify");
        notify.css({
            width: o.width
        });

        if (title) {
            t = $("<div>").addClass("notify-title").html(title);
            notify.prepend(t);
        }
        m = $("<div>").addClass("notify-message").html(message);
        m.appendTo(notify);

        // Set options
        /*
        * keepOpen, cls, width, callback
        * */
        if (options !== undefined) {
            if (options.cls !== undefined) {
                notify.addClass(options.cls);
            }
            if (options.width !== undefined) {
                notify.css({
                    width: options.width
                });
            }
        }

        notify.on(Metro.events.click, function(){
            that.kill($(this));
        });

        // Show
        notify.hide(function(){
            notify.appendTo(o.container);

            notify.css({
                marginTop: o.distance
            }).fadeIn(100, function(){
                notify.animate({
                    marginTop: ".25rem"
                }, o.duration, o.animation, function(){
                    if (options !== undefined && options.keepOpen === true) {
                    } else {
                        setTimeout(function(){
                            that.kill(notify, (options !== undefined && options.onClose !== undefined ? options.onClose : undefined));
                        }, o.timeout);
                    }
                    if (options !== undefined && options.onShow !== undefined) Utils.callback(options.onShow);
                });
            });
        });
    },

    kill: function(notify, callback){
        notify.fadeOut('slow', function(){
            notify.remove();
            Utils.callback(callback);
        });
    },

    killAll: function(){
        var that = this;
        var notifies = $(".notify");
        $.each(notifies, function(){
            that.kill($(this));
        });
    }
};

Metro['notify'] = Notify.setup();