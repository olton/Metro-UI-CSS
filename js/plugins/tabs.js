var Tabs = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._targets = [];

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onTabsCreate, [this.element]);

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
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("tabs tabs-wrapper " + element[0].className);
        var expandButton, expandTitle;

        element[0].className = "";

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);

        element.data('expanded', false);

        expandTitle = $("<div>").addClass("expand-title"); container.prepend(expandTitle);
        expandButton = $("<span>").addClass("expand-button").html("<span></span>"); container.append(expandButton);

        container.on(Metro.events.click, ".expand-button, .expand-title", function(){
            if (element.data('expanded') === false) {
                element.addClass("expand");
                element.data('expanded', true);
            } else {
                element.removeClass("expand");
                element.data('expanded', false);
            }
        });

        element.on(Metro.events.click, "a", function(e){
            var link = $(this);
            var tab = link.parent("li");

            if (element.data('expanded') === true) {
                element.removeClass("expand");
                element.data('expanded', false);
            }
            if (Utils.exec(o.onBeforeTab, [tab, element]) === true) that._open(tab);
            e.preventDefault();
        });

        this._open();
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