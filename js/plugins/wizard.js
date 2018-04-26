var Wizard = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        start: 1,
        finish: 0,
        iconHelp: "<span class='default-icon-help'></span>",
        iconPrev: "<span class='default-icon-left-arrow'></span>",
        iconNext: "<span class='default-icon-right-arrow'></span>",
        iconFinish: "<span class='default-icon-check'></span>",

        buttonMode: "cycle", // default, cycle, square
        buttonOutline: true,

        clsWizard: "",
        clsActions: "",
        clsHelp: "",
        clsPrev: "",
        clsNext: "",
        clsFinish: "",

        onPage: Metro.noop,
        onHelpClick: Metro.noop,
        onPrevClick: Metro.noop,
        onNextClick: Metro.noop,
        onFinishClick: Metro.noop,
        onBeforePrev: Metro.noop_true,
        onBeforeNext: Metro.noop_true,
        onWizardCreate: Metro.noop
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

        this._createWizard();
        this._createEvents();

        Utils.exec(o.onWizardCreate, [element]);
    },

    _createWizard: function(){
        var that = this, element = this.element, o = this.options;
        var bar;

        element.addClass("wizard").addClass(o.view).addClass(o.clsWizard);

        bar = $("<div>").addClass("action-bar").addClass(o.clsActions).appendTo(element);

        var buttonMode = o.buttonMode === "button" ? "" : o.buttonMode;
        if (o.buttonOutline === true) {
            buttonMode += " outline";
        }

        if (o.iconHelp !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-help").addClass(buttonMode).addClass(o.clsHelp).html(Utils.isTag(o.iconHelp) ? o.iconHelp : $("<img>").attr('src', o.iconHelp)).appendTo(bar);
        if (o.iconPrev !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-prev").addClass(buttonMode).addClass(o.clsPrev).html(Utils.isTag(o.iconPrev) ? o.iconPrev : $("<img>").attr('src', o.iconPrev)).appendTo(bar);
        if (o.iconNext !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-next").addClass(buttonMode).addClass(o.clsNext).html(Utils.isTag(o.iconNext) ? o.iconNext : $("<img>").attr('src', o.iconNext)).appendTo(bar);
        if (o.iconFinish !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-finish").addClass(buttonMode).addClass(o.clsFinish).html(Utils.isTag(o.iconFinish) ? o.iconFinish : $("<img>").attr('src', o.iconFinish)).appendTo(bar);

        this.toPage(o.start);

        this._setHeight();
    },

    _setHeight: function(){
        var that = this, element = this.element, o = this.options;
        var pages = element.children("section");
        var max_height = 0;

        pages.children(".page-content").css("max-height", "none");

        $.each(pages, function(){
            var h = $(this).height();
            if (max_height < parseInt(h)) {
                max_height = h;
            }
        });

        element.height(max_height);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".wizard-btn-help", function(){
            var pages = element.children("section");
            var page = pages.get(that.current - 1);
            Utils.exec(o.onHelpClick, [that.current, page, element])
        });

        element.on(Metro.events.click, ".wizard-btn-prev", function(){
            that.prev();
            Utils.exec(o.onPrevClick, [that.current, element])
        });

        element.on(Metro.events.click, ".wizard-btn-next", function(){
            that.next();
            Utils.exec(o.onNextClick, [that.current, element])
        });

        element.on(Metro.events.click, ".wizard-btn-finish", function(){
            Utils.exec(o.onFinishClick, [that.current, element])
        });

        element.on(Metro.events.click, ".complete", function(){
            var index = $(this).index() + 1;
            that.toPage(index);
        });

        $(window).on(Metro.events.resize, function(){
            that._setHeight();
        });
    },

    next: function(){
        var that = this, element = this.element, o = this.options;
        var pages = element.children("section");
        var page = $(element.children("section").get(this.current - 1));

        if (this.current + 1 > pages.length || Utils.exec(o.onBeforeNext, [this.current, page, element]) === false) {
            return ;
        }

        this.current++;

        this.toPage(this.current);
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;
        var page = $(element.children("section").get(this.current - 1));

        if (this.current - 1 === 0 || Utils.exec(o.onBeforePrev, [this.current, page, element]) === false) {
            return ;
        }

        this.current--;

        this.toPage(this.current);
    },

    last: function(){
        var that = this, element = this.element, o = this.options;

        this.toPage(element.children("section").length);
    },

    first: function(){
        this.toPage(1);
    },

    toPage: function(page){
        var that = this, element = this.element, o = this.options;
        var target = $(element.children("section").get(page - 1));
        var sections = element.children("section");
        var actions = element.find(".action-bar");

        if (target.length === 0) {
            return ;
        }

        var finish = element.find(".wizard-btn-finish").addClass("disabled");
        var next = element.find(".wizard-btn-next").addClass("disabled");
        var prev = element.find(".wizard-btn-prev").addClass("disabled");

        this.current = page;

        element.children("section")
            .removeClass("complete current")
            .removeClass(o.clsCurrent)
            .removeClass(o.clsComplete);

        target.addClass("current").addClass(o.clsCurrent);
        target.prevAll().addClass("complete").addClass(o.clsComplete);

        var border_size = element.children("section.complete").length === 0 ? 0 : parseInt(Utils.getStyleOne(element.children("section.complete")[0], "border-left-width"));

        actions.animate({
            left: element.children("section.complete").length * border_size + 41
        });

        if (
            (this.current === sections.length) || (o.finish > 0 && this.current >= o.finish)
        ) {
            finish.removeClass("disabled");
        }

        if (this.current < sections.length) {
            next.removeClass("disabled");
        }

        if (this.current > 1) {
            prev.removeClass("disabled");
        }

        element.trigger("onpage", [this.current, target, element]);
        Utils.exec(o.onPage, [this.current, target, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('wizard', Wizard);