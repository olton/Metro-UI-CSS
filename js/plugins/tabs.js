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
        var container = $("<div>").addClass("tabs tabs-wrapper " + element[0].className);
        var expandTitle, hamburger;

        element[0].className = "";

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);

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

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.parent();

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
            var tab = link.parent("li");

            if (element.data('expanded') === true) {
                element.removeClass("expand");
                element.data('expanded', false);
                container.find(".hamburger").removeClass("active");
            }
            if (Utils.exec(o.onBeforeTab, [tab, element], tab[0]) === true) that._open(tab);
            e.preventDefault();
        });
    },

    _collectTargets: function(){
        var that = this, element = this.element;
        var tabs = element.find("li");

        $.each(tabs, function(){
            var target = $(this).find("a").attr("href");
            if (target && target !== "#") {
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
            $(this).hide();
        });

        if (target !== "#") {
            $(target).show();
        }

        expandTitle.html(tab.find("a").html());

        Utils.exec(o.onTab, [tab, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('tabs', Tabs);