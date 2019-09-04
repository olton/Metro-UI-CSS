var MaterialTabsDefaultConfig = {
    deep: false,
    fixedTabs: false,

    clsComponent: "",
    clsTab: "",
    clsTabActive: "",
    clsMarker: "",

    onBeforeTabOpen: Metro.noop_true,
    onTabOpen: Metro.noop,
    onTabsScroll: Metro.noop,
    onTabsCreate: Metro.noop
};

Metro.materialTabsSetup = function (options) {
    MaterialTabsDefaultConfig = $.extend({}, MaterialTabsDefaultConfig, options);
};

if (typeof window.metroMaterialTabsSetup !== undefined) {
    Metro.materialTabsSetup(window.metroMaterialTabsSetup);
}

var MaterialTabs = {
    init: function( options, elem ) {
        this.options = $.extend( {}, MaterialTabsDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.marker = null;
        this.scroll = 0;
        this.scrollDir = "left";

        this._setOptionsFromDOM();
        this._create();

        return this;
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

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onTabsCreate, null, element[0]);
        element.fire("tabscreate");
    },

    _applyColor: function(to, color, option){

        to = $(to);

        if (Utils.isValue(color)) {
            if (Utils.isColor(color)) {
                to.css(option, color);
            } else {
                to.addClass(color);
            }
        }
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var tabs = element.find("li"), active_tab = element.find("li.active");

        element.addClass("tabs-material").addClass(o.clsComponent);
        tabs.addClass(o.clsTab);

        if (o.deep === true) {
            element.addClass("deep");
        }

        if (o.fixedTabs === true) {
            element.addClass("fixed-tabs");
        }

        this.marker = element.find(".tab-marker");

        if (this.marker.length === 0) {
            this.marker = $("<span>").addClass("tab-marker").addClass(o.clsMarker).appendTo(element);
        }

        this.openTab(active_tab.length === 0 ? tabs[0] : active_tab[0]);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var tabs = element.find("li");

        element.on(Metro.events.click, "li", function(e){
            var tab = $(this);
            var active_tab = element.find("li.active");
            var tab_next = tabs.index(tab) > tabs.index(active_tab);
            var target = tab.children("a").attr("href");

            if (Utils.isValue(target) && target[0] === "#") {
                if (tab.hasClass("active")) return;
                if (tab.hasClass("disabled")) return;
                if (Utils.exec(o.onBeforeTabOpen, [tab, target, tab_next], this) === false) return;
                if (!Utils.isValue(target)) return;
                that.openTab(tab, tab_next);
                e.preventDefault();
            }
        });

        element.on(Metro.events.scroll, function(){
            var oldScroll = this.scroll;

            this.scrollDir = this.scroll < element[0].scrollLeft ? "left" : "right";
            this.scroll = element[0].scrollLeft;

            Utils.exec(o.onTabsScroll, [element[0].scrollLeft, oldScroll, this.scrollDir], element[0]);

            element.fire("tabsscroll", {
                scrollLeft: element[0].scrollLeft,
                oldScroll: oldScroll,
                scrollDir: that.scrollDir
            });

        });
    },

    openTab: function(tab, tab_next){
        var element = this.element, o = this.options;
        var tabs = element.find("li"), element_scroll = element.scrollLeft();
        var magic = 32, shift, width = element.width(), tab_width, target, tab_left;

        tab = $(tab);

        $.each(tabs, function(){
            var target = $(this).find("a").attr("href");
            if (!Utils.isValue(target)) return;
            if (target[0] === "#" && target.length > 1) {
                $(target).hide();
            }
        });

        tab_left = tab.position().left;
        tab_width = tab.width();
        shift = tab.position().left + tab.width();

        tabs.removeClass("active").removeClass(o.clsTabActive);
        tab.addClass("active").addClass(o.clsTabActive);

        if (shift + magic > width) {
            element.animate({
                scrollLeft: element_scroll + (shift - width) + (tab_width / 2)
            });
        }

        if (tab_left - magic < 0) {
            element.animate({
                scrollLeft: tab_left + element_scroll - (tab_width / 2)
            });
        }

        this.marker.animate({
            left: tab_left + element_scroll,
            width: tab.width()
        });

        target = tab.find("a").attr("href");
        if (Utils.isValue(target)) {
            if (target[0] === "#" && target.length > 1) {
                $(target).show();
            }
        }

        Utils.exec(o.onTabOpen, [tab[0], target, tab_next], element[0]);
        element.fire("tabopen", {
            tab: tab[0],
            target: target,
            tab_next: tab_next
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('materialtabs', MaterialTabs);