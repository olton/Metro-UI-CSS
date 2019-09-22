var RibbonMenuDefaultConfig = {
    onStatic: Metro.noop,
    onBeforeTab: Metro.noop_true,
    onTab: Metro.noop,
    onRibbonMenuCreate: Metro.noop
};

Metro.ribbonMenuSetup = function (options) {
    RibbonMenuDefaultConfig = $.extend({}, RibbonMenuDefaultConfig, options);
};

if (typeof window["metroRibbonMenuSetup"] !== undefined) {
    Metro.ribbonMenuSetup(window["metroRibbonMenuSetup"]);
}

var RibbonMenu = {
    init: function( options, elem ) {
        this.options = $.extend( {}, RibbonMenuDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['buttongroup'],

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

        Metro.checkRuntime(element, "ribbonmenu");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onRibbonMenuCreate, null, element[0]);
        element.fire("ribbonmenucreate");
    },

    _createStructure: function(){
        var element = this.element;

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

            g.css("width", gw * Math.ceil(btns.length / 3) + 4);
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
                    Utils.exec(o.onStatic, [tab[0]], element[0]);
                    element.fire("static", {
                        tab: tab[0]
                    });
                }
            } else {
                if (Utils.exec(o.onBeforeTab, [tab[0]], element[0]) === true) {
                    that.open(tab[0]);
                }
            }
            e.preventDefault();
        })
    },

    open: function(tab){
        var element = this.element, o = this.options;
        var $tab = $(tab);
        var tabs = element.find(".tabs-holder li");
        var sections = element.find(".content-holder .section");
        var target = $tab.children("a").attr("href");
        var target_section = target !== "#" ? element.find(target) : null;

        tabs.removeClass("active");
        $tab.addClass("active");

        sections.removeClass("active");
        if (target_section) target_section.addClass("active");

        Utils.exec(o.onTab, [$tab[0]], element[0]);
        element.fire("tab", {
            tab: $tab[0]
        });
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;
        element.off(Metro.events.click, ".tabs-holder li a");
        return element;
    }
};

Metro.plugin('ribbonmenu', RibbonMenu);