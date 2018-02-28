var dispatch = $.event.dispatch || $.event.handle;
var special = jQuery.event.special,
    uid1 = 'D' + (+new Date()),
    uid2 = 'D' + (+new Date() + 1);

special.scrollstart = {
    setup: function(data) {
        var _data = $.extend({
            latency: special.scrollstop.latency
        }, data);

        var timer,
            handler = function(evt) {
                var _self = this;

                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                } else {
                    evt.type = 'scrollstart';
                    dispatch.apply(_self, arguments);
                }

                timer = setTimeout(function() {
                    timer = null;
                }, _data.latency);
            };

        $(this).on('scroll', handler).data(uid1, handler);
    },
    teardown: function() {
        $(this).off('scroll', $(this).data(uid1));
    }
};

special.scrollstop = {
    latency: 250,
    setup: function(data) {
        var _data = $.extend({
            latency: special.scrollstop.latency
        }, data);

        var timer,
            handler = function(evt) {
                var _self = this,
                    _args = arguments;

                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }

                timer = setTimeout(function() {
                    timer = null;
                    evt.type = 'scrollstop';
                    dispatch.apply(_self, _args);
                }, _data.latency);
            };

        $(this).on('scroll', handler).data(uid2, handler);
    },
    teardown: function() {
        $(this).off('scroll', $(this).data(uid2));
    }
};
