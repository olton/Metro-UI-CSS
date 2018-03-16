var RibbonMenu = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['buttongroup'],

    options: {
        onStatic: Metro.noop,
        onBeforeTab: Metro.noop_true,
        onTab: Metro.noop,
        onRibbonMenuCreate: Metro.noop
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

        Utils.exec(o.onRibbonMenuCreate, [element]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass("ribbon-menu");

        var tabs = element.find(".tabs-holder li:not(.static)");
        var active_tab = element.find(".tabs-holder li.active");
        if (active_tab.length > 0) {
            this.open($(active_tab[0]));
        } else {
            if (tabs.length > 0) {
                this.open($(tabs[0]));
            }
        }

        var fluentGroups = element.find(".ribbon-toggle-group");
        $.each(fluentGroups, function(){
            var g = $(this);
            g.buttongroup({
                clsActive: "active"
            });

            var gw = 0;
            var btns = g.find(".ribbon-icon-button");
            $.each(btns, function(){
                var b = $(this);
                var w = b.outerWidth(true);
                if (w > gw) gw = w;
            });

            g.css("width", Math.ceil(gw * btns.length / 3) + 4);
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".tabs-holder li a", function(e){
            var link = $(this);
            var tab = $(this).parent("li");

            if (tab.hasClass("static")) {
                if (o.onStatic === Metro.noop && link.attr("href") !== undefined) {
                    document.location.href = link.attr("href");
                } else {
                    Utils.exec(o.onStatic, [tab, element]);
                }
            } else {
                if (Utils.exec(o.onBeforeTab, [tab, element]) === true) {
                    that.open(tab);
                }
            }
            e.preventDefault();
        })
    },

    open: function(tab){
        var that = this, element = this.element, o = this.options;
        var tabs = element.find(".tabs-holder li");
        var sections = element.find(".content-holder .section");
        var target = tab.children("a").attr("href");
        var target_section = target !== "#" ? element.find(target) : null;

        tabs.removeClass("active");
        tab.addClass("active");

        sections.removeClass("active");
        if (target_section) target_section.addClass("active");

        Utils.exec(o.onTab, [tab, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('ribbonmenu', RibbonMenu);