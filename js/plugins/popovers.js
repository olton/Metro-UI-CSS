var Popover = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.popover = null;
        this.popovered = false;
        this.size = {
            width: 0,
            height: 0
        };

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        popoverText: "",
        popoverHide: 3000,
        popoverTimeout: 100,
        popoverOffset: 10,
        popoverTrigger: Metro.popoverEvents.HOVER,
        popoverPosition: Metro.position.TOP,
        hideOnLeave: false,
        closeButton: true,
        clsPopover: "",
        clsPopoverContent: "",
        onPopoverShow: Metro.noop,
        onPopoverHide: Metro.noop,
        onPopoverCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){

        this._createEvents();

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var event;

        switch (o.popoverTrigger) {
            case Metro.popoverEvents.CLICK: event = Metro.events.click; break;
            case Metro.popoverEvents.FOCUS: event = Metro.events.focus; break;
            default: event = Metro.events.enter;
        }

        element.on(event, function(){
            if (that.popover !== null || that.popovered === true) {
                return ;
            }
            setTimeout(function(){
                that.createPopover();

                Utils.exec(o.onPopoverShow, [that.popover], element[0]);

                if (o.popoverHide > 0) {
                    setTimeout(function(){
                        that.removePopover();
                    }, o.popoverHide);
                }
            }, o.popoverTimeout);
        });

        if (o.hideOnLeave === true) {
            element.on(Metro.events.leave, function(){
                that.removePopover();
            });
        }

        $(window).on(Metro.events.scroll, function(){
            if (that.popover !== null) that.setPosition();
        });

    },

    setPosition: function(){
        var popover = this.popover, size = this.size, o = this.options, element = this.element;

        if (o.popoverPosition === Metro.position.BOTTOM) {
            popover.addClass('bottom');
            popover.css({
                top: element.offset().top - $(window).scrollTop() + element.outerHeight() + o.popoverOffset,
                left: element.offset().left + element.outerWidth()/2 - size.width/2  - $(window).scrollLeft()
            });
        } else if (o.popoverPosition === Metro.position.RIGHT) {
            popover.addClass('right');
            popover.css({
                top: element.offset().top + element.outerHeight()/2 - size.height/2 - $(window).scrollTop(),
                left: element.offset().left + element.outerWidth() - $(window).scrollLeft() + o.popoverOffset
            });
        } else if (o.popoverPosition === Metro.position.LEFT) {
            popover.addClass('left');
            popover.css({
                top: element.offset().top + element.outerHeight()/2 - size.height/2 - $(window).scrollTop(),
                left: element.offset().left - size.width - $(window).scrollLeft() - o.popoverOffset
            });
        } else {
            popover.addClass('top');
            popover.css({
                top: element.offset().top - $(window).scrollTop() - size.height - o.popoverOffset,
                left: element.offset().left + element.outerWidth()/2 - size.width/2  - $(window).scrollLeft()
            });
        }
    },

    createPopover: function(){
        var that = this, elem = this.elem, element = this.element, o = this.options;
        var popover;
        var neb_pos;
        var id = Utils.elementId("popover");
        var closeButton;

        if (this.popovered) {
            return ;
        }

        popover = $("<div>").addClass("popover neb").addClass(o.clsPopover);
        popover.attr("id", id);

        $("<div>").addClass("popover-content").addClass(o.clsPopoverContent).html(o.popoverText).appendTo(popover);

        if (o.popoverHide === 0 && o.closeButton === true) {
            closeButton = $("<button>").addClass("button square small popover-close-button bg-white").html("&times;").appendTo(popover);
            closeButton.on(Metro.events.click, function(){
                that.removePopover();
            });
        }

        switch (o.popoverPosition) {
            case Metro.position.TOP: neb_pos = "neb-s"; break;
            case Metro.position.BOTTOM: neb_pos = "neb-n"; break;
            case Metro.position.RIGHT: neb_pos = "neb-w"; break;
            case Metro.position.LEFT: neb_pos = "neb-e"; break;
        }

        popover.addClass(neb_pos);

        if (o.closeButton !== true) {
            popover.on(Metro.events.click, function(){
                that.removePopover();
            });
        }

        this.popover = popover;
        this.size = Utils.hiddenElementSize(popover);

        if (elem.tagName === 'TD' || elem.tagName === 'TH') {
            var wrp = $("<div/>").css("display", "inline-block").html(element.html());
            element.html(wrp);
            element = wrp;
        }

        this.setPosition();

        popover.appendTo($('body'));

        this.popovered = true;

        Utils.exec(o.onPopoverCreate, [popover], element[0]);
    },

    removePopover: function(){
        var that = this;
        var timeout = this.options.onPopoverHide === Metro.noop ? 0 : 300;
        var popover = this.popover;

        if (!this.popovered) {
            return ;
        }

        Utils.exec(this.options.onPopoverHide, [popover], this.elem);

        setTimeout(function(){
            popover.hide(0, function(){
                popover.remove();
                that.popover = null;
                that.popovered = false;
            });
        }, timeout);
    },

    show: function(){
        var that = this, element = this.element, o = this.options;

        if (this.popovered === true) {
            return ;
        }

        setTimeout(function(){
            that.createPopover();

            Utils.exec(o.onPopoverShow, [that.popover], element[0]);

            if (o.popoverHide > 0) {
                setTimeout(function(){
                    that.removePopover();
                }, o.popoverHide);
            }
        }, o.popoverTimeout);
    },

    hide: function(){
        this.removePopover();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeText = function(){
            o.popoverText = element.attr("data-popover-text");
            this.popover.find(".popover-content").html(o.popoverText);
            that.setPosition();
        };

        var changePosition = function(){
            o.popoverPosition = element.attr("data-popover-position");
            that.setPosition();
        };

        switch (attributeName) {
            case "data-popover-text": changeText(); break;
            case "data-popover-position": changePosition(); break;
        }
    }
};

Metro.plugin('popover', Popover);