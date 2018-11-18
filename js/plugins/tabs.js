var Tabs = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._targets = [];

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onTabsCreate, [this.element], this.elem);

        return this;
    },

    options: {
        expand: false,
        expandPoint: null,
        tabsPosition: "top",
        tabsType: "default",

        clsTabs: "",
        clsTabsList: "",
        clsTabsListItem: "",
        clsTabsListItemActive: "",

        onTab: Metro.noop,
        onBeforeTab: Metro.noop_true,
        onTabsCreate: Metro.noop
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
        var tab = element.find(".active").length > 0 ? $(element.find(".active")[0]) : undefined;

        this._createStructure();
        this._createEvents();
        this._open(tab);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var right_parent = parent.hasClass("tabs");
        var container = right_parent ? parent : $("<div>").addClass("tabs tabs-wrapper");
        var expandTitle, hamburger;

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", Utils.elementId("tabs"));
        }

        container.addClass(o.tabsPosition.replace(["-", "_", "+"], " "));

        element.addClass("tabs-list");
        if (o.tabsType !== "default") {
            element.addClass("tabs-"+o.tabsType);
        }
        if (!right_parent) {
            container.insertBefore(element);
            element.appendTo(container);
        }

        element.data('expanded', false);

        expandTitle = $("<div>").addClass("expand-title"); container.prepend(expandTitle);
        hamburger = container.find(".hamburger");
        if (hamburger.length === 0) {
            hamburger = $("<button>").attr("type", "button").addClass("hamburger menu-down").appendTo(container);
            for(var i = 0; i < 3; i++) {
                $("<span>").addClass("line").appendTo(hamburger);
            }

            if (Colors.isLight(Utils.computedRgbToHex(Utils.getStyleOne(container, "background-color"))) === true) {
                hamburger.addClass("dark");
            }
        }

        container.addClass(o.clsTabs);
        element.addClass(o.clsTabsList);
        element.children("li").addClass(o.clsTabsListItem);

        if (o.expand === true && !o.tabsPosition.contains("vertical")) {
            container.addClass("tabs-expand");
        } else {
            if (Utils.isValue(o.expandPoint) && Utils.mediaExist(o.expandPoint) && !o.tabsPosition.contains("vertical")) {
                container.addClass("tabs-expand");
            }
        }

        if (o.tabsPosition.contains("vertical")) {
            container.addClass("tabs-expand");
        }

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.parent();

        $(window).on(Metro.events.resize+"-"+element.attr("id"), function(){

            if (o.tabsPosition.contains("vertical")) {
                return ;
            }

            if (o.expand === true && !o.tabsPosition.contains("vertical")) {
                container.addClass("tabs-expand");
            } else {
                if (Utils.isValue(o.expandPoint) && Utils.mediaExist(o.expandPoint) && !o.tabsPosition.contains("vertical")) {
                    if (!container.hasClass("tabs-expand")) container.addClass("tabs-expand");
                } else {
                    if (container.hasClass("tabs-expand")) container.removeClass("tabs-expand");
                }
            }
        });

        container.on(Metro.events.click, ".hamburger, .expand-title", function(){
            if (element.data('expanded') === false) {
                element.addClass("expand");
                element.data('expanded', true);
                container.find(".hamburger").addClass("active");
            } else {
                element.removeClass("expand");
                element.data('expanded', false);
                container.find(".hamburger").removeClass("active");
            }
        });

        element.on(Metro.events.click, "a", function(e){
            var link = $(this);
            var href = link.attr("href").trim();
            var tab = link.parent("li");

            if (tab.hasClass("active")) {
                e.preventDefault();
            }

            if (element.data('expanded') === true) {
                element.removeClass("expand");
                element.data('expanded', false);
                container.find(".hamburger").removeClass("active");
            }

            if (Utils.exec(o.onBeforeTab, [tab, element], tab[0]) !== true) {
                return false;
            }

            if (Utils.isValue(href) && href[0] === "#") {
                that._open(tab);
                e.preventDefault();
            }
        });
    },

    _collectTargets: function(){
        var that = this, element = this.element;
        var tabs = element.find("li");

        $.each(tabs, function(){
            var target = $(this).find("a").attr("href").trim();
            if (target.length > 1 && target[0] === "#") {
                that._targets.push(target);
            }
        });
    },

    _open: function(tab){
        var that = this, element = this.element, o = this.options;
        var tabs = element.find("li");
        var expandTitle = element.siblings(".expand-title");


        if (tabs.length === 0) {
            return;
        }

        this._collectTargets();

        if (tab === undefined) {
            tab = $(tabs[0]);
        }

        var target = tab.find("a").attr("href");

        if (target === undefined) {
            return;
        }

        tabs.removeClass("active");
        if (tab.parent().hasClass("d-menu")) {
            tab.parent().parent().addClass("active");
        } else {
            tab.addClass("active");
        }

        $.each(this._targets, function(){
            var t = $(this);
            if (t.length > 0) t.hide();
        });

        if (target !== "#" && target[0] === "#") {
            $(target).show();
        }

        expandTitle.html(tab.find("a").html());

        tab.addClass(o.clsTabsListItemActive);

        Utils.exec(o.onTab, [tab, element], tab[0]);
    },

    next: function(){
        var that = this, element = this.element, o = this.options;
        var next, active_tab = element.find("li.active");

        next = active_tab.next("li");
        if (next.length > 0) {
            this._open(next);
        }
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;
        var next, active_tab = element.find("li.active");

        next = active_tab.prev("li");
        if (next.length > 0) {
            this._open(next);
        }
    },

    open: function(tab){
        var that = this, element = this.element, o = this.options;
        var tabs = element.find("li");

        if (!Utils.isValue(tab)) {
            tab = 1;
        }

        if (Utils.isInt(tab)) {
            if (Utils.isValue(tabs[tab-1])) this._open($(tabs[tab-1]));
        } else {
            this._open($(tab));
        }
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('tabs', Tabs);