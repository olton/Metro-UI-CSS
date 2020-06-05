/* global Metro */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var cookieDisclaimerDefaults = {
        name: 'cookies_accepted',
        template: null,
        templateSource: null,
        acceptButton: '.cookie-accept-button',
        cancelButton: '.cookie-cancel-button',
        message: 'Our website uses cookies to monitor traffic on our website and ensure that we can provide our customers with the best online experience possible.',
        duration: "30days",
        clsContainer: "",
        clsMessage: "",
        clsButtons: "",
        clsAcceptButton: "alert",
        clsCancelButton: "",
        onAccept: Metro.noop,
        onDecline: Metro.noop
    };

    Metro.cookieDisclaimer = {
        init: function(options){
            var that = this, cookie = Metro.cookie;

            this.options = $.extend({}, cookieDisclaimerDefaults, options);
            this.disclaimer = $("<div>");

            if (cookie.getCookie(this.options.name)) {
                return ;
            }

            if (this.options.template) {
                $.get(this.options.template).then(function(response){
                    that.create(response);
                });
            } else if (this.options.templateSource) {
                this.create($(this.options.templateSource));
            } else {
                this.create();
            }
        },

        create: function(html){
            var cookie = Metro.cookie;
            var o = this.options, wrapper = this.disclaimer, buttons;

            wrapper
                .addClass("cookie-disclaimer-block")
                .addClass(o.clsContainer);

            if (!html) {
                buttons = $("<div>")
                    .addClass("cookie-disclaimer-actions")
                    .addClass(o.clsButtons)
                    .append( $('<button>').addClass('button cookie-accept-button').addClass(o.clsAcceptButton).html('Accept') )
                    .append( $('<button>').addClass('button cookie-cancel-button').addClass(o.clsCancelButton).html('Cancel') );

                wrapper
                    .html( $("<div>").addClass(o.clsMessage).html(o.message) )
                    .append( $("<hr>").addClass('thin') )
                    .append(buttons);

            } else if (html instanceof $) {
                wrapper.append(html);
            } else {
                wrapper.html(html);
            }

            wrapper.appendTo($('body'));

            wrapper.on(Metro.events.click, o.acceptButton, function(){
                var dur = 0;
                var durations = (""+o.duration).toArray(" ");

                $.each(durations, function(){
                    var d = ""+this;
                    if (d.includes("day")) {
                        dur += parseInt(d)*24*60*60*1000;
                    } else
                    if (d.includes("hour")) {
                        dur += parseInt(d)*60*60*1000;
                    } else
                    if (d.includes("min")) {
                        dur += parseInt(d)*60*1000;
                    } else
                    if (d.includes("sec")) {
                        dur += parseInt(d)*1000;
                    } else {
                        dur += parseInt(d);
                    }
                })

                cookie.setCookie(o.name, true, dur);
                Utils.exec(o.onAccept);
                wrapper.remove();
            });

            wrapper.on(Metro.events.click, o.cancelButton, function(){
                Utils.exec(o.onDecline);
                wrapper.remove();
            });
        }
    };
}(Metro, m4q));