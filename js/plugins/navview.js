var NavigationView = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.pane = null;
        this.content = null;
        this.paneToggle = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        compact: "md",
        expanded: "lg",
        toggle: null,
        activeState: false,
        onMenuItemClick: Metro.noop,
        onNavViewCreate: Metro.noop
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
        var element = this.element, o = this.options;

        this._createView();
        this._createEvents();

        Utils.exec(o.onNavViewCreate, [element]);
    },

    _calcMenuHeight: function(){
        var element = this.element, pane, menu;
        var elements_height = 0;

        pane = element.children(".navview-pane");
        if (pane.length === 0) {
            return;
        }

        menu = pane.children(".navview-menu");

        if (menu.length === 0) {
            return ;
        }

        $.each(menu.prevAll(), function(){
            elements_height += $(this).outerHeight(true);
        });
        $.each(menu.nextAll(), function(){
            elements_height += $(this).outerHeight(true);
        });
        menu.css({
            height: "calc(100% - "+(elements_height + 20)+"px)"
        });
    },

    _createView: function(){
        var that = this, element = this.element, o = this.options;
        var pane, content, toggle;

        element
            .addClass("navview")
            .addClass(o.compact !== false ? "compact-"+o.compact : "")
            .addClass(o.expanded !== false ? "expanded-"+o.expanded : "");

        pane = element.children(".navview-pane");
        content = element.children(".navview-content");
        toggle = $(o.toggle);

        this._calcMenuHeight();

        this.pane = pane.length > 0 ? pane : null;
        this.content = content.length > 0 ? content : null;
        this.paneToggle = toggle.length > 0 ? toggle : null;

        setTimeout(function(){
            if (that.pane.width() === 48) {
                element.addClass("js-compact");
            } else {
                element.removeClass("js-compact");
            }
        }, 200);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".pull-button, .holder", function(){
            that.pullClick(this);
        });

        element.on(Metro.events.click, ".navview-menu li", function(){
            if (o.activeState === true) {
                element.find(".navview-menu li").removeClass("active");
                $(this).toggleClass("active");
            }
        });

        element.on(Metro.events.click, ".navview-menu li > a", function(e){
            Utils.exec(o.onMenuItemClick, null, this);
        });

        if (this.paneToggle !== null) {
            this.paneToggle.on(Metro.events.click, function(){
                that.pane.toggleClass("open");
            })
        }

        $(window).on(Metro.events.resize+ "-navview", function(){

            element.removeClass("expand");
            that.pane.removeClass("open");

            if ($(this).width() <= Metro.media_sizes[String(o.compact).toUpperCase()]) {
                element.removeClass("compacted");
            }

            that._calcMenuHeight();

            element.removeClass("js-compact");

            setTimeout(function(){
                if (that.pane.width() === 48) {
                    element.addClass("js-compact");
                }
            }, 200);

        })
    },

    pullClick: function(el){
        var that = this, element = this.element;
        var pane = this.pane;
        var pane_compact = pane.width() < 280;
        var input;

        var target = $(el);

        if (target && target.hasClass("holder")) {
            input = target.parent().find("input");
            setTimeout(function(){
                input.focus();
            }, 200);
        }

        if (that.pane.hasClass("open")) {
            that.close();
        } else

        if ((pane_compact || element.hasClass("expand")) && !element.hasClass("compacted")) {
            element.toggleClass("expand");
        } else

        if (element.hasClass("compacted") || !pane_compact) {
            element.toggleClass("compacted");
        }

        setTimeout(function(){
            if (that.pane.width() === 48) {
                element.addClass("js-compact");
            } else {
                element.removeClass("js-compact");
            }
        }, 200);

        return true;
    },

    open: function(){
        this.pane.addClass("open");
    },

    close: function(){
        this.pane.removeClass("open");
    },

    toggle: function(){
        var pane = this.pane;
        pane.hasClass("open") ? pane.removeClass("open") : pane.addClass("open");
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('navview', NavigationView);