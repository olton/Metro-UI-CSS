/* global Metro, Utils */

var cookieDisclaimerDefaults = {
    name: 'cookies_accepted',
    template: null,
    templateTarget: null,
    acceptButton: '.cookie-accept-button',
    cancelButton: '.cookie-cancel-button',
    message: 'Our website uses cookies to monitor traffic on our website and ensure that we can provide our customers with the best online experience possible. Please read our <a href="/cookies">cookie policy</a> to view more details on the cookies we use.',
    duration: 30,
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
        } else if (this.options.templateTarget) {
            this.create($(this.options.templateTarget));
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
            cookie.setCookie(o.name, true, o.duration*24*60*60*1000);
            Utils.exec(o.onAccept);
            wrapper.remove();
        });

        wrapper.on(Metro.events.click, o.cancelButton, function(){
            Utils.exec(o.onDecline);
            wrapper.remove();
        });
    }
}