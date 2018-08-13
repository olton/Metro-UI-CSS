var Sidebar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.toggle_element = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        shift: null,
        staticShift: null,
        toggle: null,
        duration: METRO_ANIMATION_DURATION,
        static: null,
        menuItemClick: true,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onToggle: Metro.noop,
        onStaticSet: Metro.noop,
        onStaticLoss: Metro.noop,
        onSidebarCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

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
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();
        $(window).resize();
        this._checkStatic();

        Utils.exec(o.onSidebarCreate, [element], element[0]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var header = element.find(".sidebar-header");
        var sheet = Metro.sheet;

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("sidebar"));
        }

        element.addClass("sidebar");

        if (o.toggle !== null && $(o.toggle).length > 0) {
            this.toggle_element = $(o.toggle);
        }

        if (header.length > 0) {
            if (header.data("image") !== undefined) {
                header.css({
                    backgroundImage: "url("+header.data("image")+")"
                });
            }
        }

        if (o.static !== null) {
            if (o.staticShift !== null) {
                Utils.addCssRule(sheet, "@media screen and " + Metro.media_queries[o.static.toUpperCase()], o.staticShift + "{margin-left: 280px; width: calc(100% - 280px);}");
            }
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var toggle = this.toggle_element;

        if (toggle !== null) {
            toggle.on(Metro.events.click, function(e){
                that.toggle();
            });
        }

        if (o.static !== null && ["fs", "sm", "md", "lg", "xl", "xxl"].indexOf(o.static)) {
            $(window).on(Metro.events.resize + "_" + element.attr("id"), function(){
                that._checkStatic();
            });
        }

        if (o.menuItemClick === true) {
            element.on(Metro.events.click, ".sidebar-menu li > a", function(){
                that.close();
            });
        }
    },

    _checkStatic: function(){
        var element = this.element, o = this.options;
        if (Utils.mediaExist(o.static) && !element.hasClass("static")) {
            element.addClass("static");
            element.data("opened", false).removeClass('open');
            if (o.shift !== null) {
                $.each(o.shift.split(","), function(){
                    $(this).css({left: 0}, o.duration);
                });
            }
            Utils.exec(o.onStaticSet, [element], element[0]);
        }
        if (!Utils.mediaExist(o.static)) {
            element.removeClass("static");
            Utils.exec(o.onStaticLoss, [element], element[0]);
        }
    },

    isOpen: function(){
        return this.element.data("opened") === true;
    },

    open: function(){
        var that = this, element = this.element, o = this.options;

        if (element.hasClass("static")) {
            return ;
        }

        element.data("opened", true).addClass('open');

        if (o.shift !== null) {
            $.each(o.shift.split(","), function(){
                $(this).animate({left: element.outerWidth()}, o.duration);
            });
        }

        Utils.exec(o.onOpen, [element], element[0]);
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        if (element.hasClass("static")) {
            return ;
        }

        element.data("opened", false).removeClass('open');

        if (o.shift !== null) {
            $.each(o.shift.split(","), function(){
                $(this).animate({left: 0}, o.duration);
            });
        }

        Utils.exec(o.onClose, [element], element[0]);
    },

    toggle: function(){
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
        Utils.exec(this.options.onToggle, [this.element], this.element[0]);
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('sidebar', Sidebar);

Metro['sidebar'] = {
    isSidebar: function(el){
        return Utils.isMetroObject(el, "sidebar");
    },

    open: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        $(el).data("sidebar").open();
    },

    close: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        $(el).data("sidebar").close();
    },

    toggle: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        $(el).data("sidebar").toggle();
    },

    isOpen: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        return $(el).data("sidebar").isOpen();
    }
};