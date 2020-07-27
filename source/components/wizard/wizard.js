/* global Metro */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var WizardDefaultConfig = {
        wizardDeferred: 0,
        start: 1,
        finish: 0,
        iconHelp: "<span class='default-icon-help'></span>",
        iconPrev: "<span class='default-icon-left-arrow'></span>",
        iconNext: "<span class='default-icon-right-arrow'></span>",
        iconFinish: "<span class='default-icon-check'></span>",

        buttonMode: "cycle", // default, cycle, square
        buttonOutline: true,
        duration: 300,

        clsWizard: "",
        clsActions: "",
        clsHelp: "",
        clsPrev: "",
        clsNext: "",
        clsFinish: "",

        onPage: Metro.noop,
        onNextPage: Metro.noop,
        onPrevPage: Metro.noop,
        onFirstPage: Metro.noop,
        onLastPage: Metro.noop,
        onFinishPage: Metro.noop,
        onHelpClick: Metro.noop,
        onPrevClick: Metro.noop,
        onNextClick: Metro.noop,
        onFinishClick: Metro.noop,
        onBeforePrev: Metro.noop_true,
        onBeforeNext: Metro.noop_true,
        onWizardCreate: Metro.noop
    };

    Metro.wizardSetup = function (options) {
        WizardDefaultConfig = $.extend({}, WizardDefaultConfig, options);
    };

    if (typeof window["metroWizardSetup"] !== undefined) {
        Metro.wizardSetup(window["metroWizardSetup"]);
    }

    Metro.Component('wizard', {
        init: function( options, elem ) {
            this._super(elem, options, WizardDefaultConfig, {
                id: Utils.elementId('wizard')
            });

            return this;
        },

        _create: function(){
            var element = this.element;

            this._createWizard();
            this._createEvents();

            this._fireEvent("wizard-create", {
                element: element
            });
        },

        _createWizard: function(){
            var element = this.element, o = this.options;
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
            var element = this.element;
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
            var that = this, element = this.element;

            element.on(Metro.events.click, ".wizard-btn-help", function(){
                var pages = element.children("section");
                var page = pages.get(that.current - 1);

                that._fireEvent("help-click", {
                    index: that.current,
                    page: page
                });
            });

            element.on(Metro.events.click, ".wizard-btn-prev", function(){
                that.prev();
                var pages = element.children("section");
                var page = pages.get(that.current - 1);

                that._fireEvent("prev-click", {
                    index: that.current,
                    page: page
                });
            });

            element.on(Metro.events.click, ".wizard-btn-next", function(){
                that.next();
                var pages = element.children("section");
                var page = pages.get(that.current - 1);

                that._fireEvent("next-click", {
                    index: that.current,
                    page: page
                });
            });

            element.on(Metro.events.click, ".wizard-btn-finish", function(){
                var pages = element.children("section");
                var page = pages.get(that.current - 1);

                that._fireEvent("finish-click", {
                    index: that.current,
                    page: page
                });
            });

            element.on(Metro.events.click, ".complete", function(){
                var index = $(this).index() + 1;
                that.toPage(index);
            });

            $(window).on(Metro.events.resize, function(){
                that._setHeight();
            }, {ns: this.id});
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

            page = $(element.children("section").get(this.current - 1));

            this._fireEvent("next-page", {
                index: that.current,
                page: page[0]
            });
        },

        prev: function(){
            var that = this, element = this.element, o = this.options;
            var page = $(element.children("section").get(this.current - 1));

            if (this.current - 1 === 0 || Utils.exec(o.onBeforePrev, [this.current, page, element]) === false) {
                return ;
            }

            this.current--;

            this.toPage(this.current);

            page = $(element.children("section").get(this.current - 1));

            this._fireEvent("prev-page", {
                index: that.current,
                page: page[0]
            });
        },

        last: function(){
            var that = this, element = this.element;
            var page;

            this.toPage(element.children("section").length);

            page = $(element.children("section").get(this.current - 1));

            this._fireEvent("last-page", {
                index: that.current,
                page: page[0]
            });
        },

        first: function(){
            var that = this, element = this.element;
            var page;

            this.toPage(1);

            page = $(element.children("section").get(0));

            this._fireEvent("first-page", {
                index: that.current,
                page: page[0]
            });
        },

        toPage: function(page){
            var element = this.element, o = this.options;
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
                draw: {
                    left: element.children("section.complete").length * border_size + 41
                },
                dur: o.duration
            });

            if (
                (this.current === sections.length) || (o.finish > 0 && this.current >= o.finish)
            ) {
                finish.removeClass("disabled");
            }

            if (parseInt(o.finish) > 0 && this.current === parseInt(o.finish)) {

                this._fireEvent("finish-page", {
                    index: this.current,
                    page: target[0]
                });
            }

            if (this.current < sections.length) {
                next.removeClass("disabled");
            }

            if (this.current > 1) {
                prev.removeClass("disabled");
            }

            this._fireEvent("page", {
                index: this.current,
                page: target[0]
            });
        },

        changeAttribute: function(){
        },

        destroy: function(){
            var element = this.element;

            element.off(Metro.events.click, ".wizard-btn-help");
            element.off(Metro.events.click, ".wizard-btn-prev");
            element.off(Metro.events.click, ".wizard-btn-next");
            element.off(Metro.events.click, ".wizard-btn-finish");
            element.off(Metro.events.click, ".complete");
            $(window).off(Metro.events.resize,{ns: this.id});

            return element;
        }
    });
}(Metro, m4q));