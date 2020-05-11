/* global Metro, Utils, Component */
var CollapseDefaultConfig = {
    collapseDeferred: 0,
    collapsed: false,
    toggleElement: false,
    duration: 100,
    onExpand: Metro.noop,
    onCollapse: Metro.noop,
    onCollapseCreate: Metro.noop
};

Metro.collapseSetup = function (options) {
    CollapseDefaultConfig = $.extend({}, CollapseDefaultConfig, options);
};

if (typeof window["metroCollapseSetup"] !== undefined) {
    Metro.collapseSetup(window["metroCollapseSetup"]);
}

Component('collapse', {
    init: function( options, elem ) {
        this._super(elem, options, CollapseDefaultConfig);

        this.toggle = null;

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var toggle;

        Metro.checkRuntime(element, this.name);

        toggle = o.toggleElement !== false ? $(o.toggleElement) : element.siblings('.collapse-toggle').length > 0 ? element.siblings('.collapse-toggle') : element.siblings('a:nth-child(1)');

        if (o.collapsed === true || element.attr("collapsed") === true) {
            element.hide(0);
        }

        toggle.on(Metro.events.click, function(e){
            if (element.css('display') === 'block' && !element.hasClass('keep-open')) {
                that._close(element);
            } else {
                that._open(element);
            }

            if (["INPUT"].indexOf(e.target.tagName) === -1) {
                e.preventDefault();
            }
            e.stopPropagation();
        });

        this.toggle = toggle;

        Utils.exec(this.options.onCollapseCreate, [this.element]);
        element.fire("collapsecreate");
    },

    _close: function(el, immediate){
        var elem = $(el);
        var dropdown  = Metro.getPlugin(elem[0], "collapse");
        var options = dropdown.options;
        var func = immediate ? 'show' : 'slideUp';
        var dur = immediate ? 0 : options.duration;

        this.toggle.removeClass("active-toggle");

        elem[func](dur, function(){
            el.trigger("onCollapse", null, el);
            el.data("collapsed", true);
            el.addClass("collapsed");
            Utils.exec(options.onCollapse, null, elem[0]);
            elem.fire("collapse");
        });
    },

    _open: function(el, immediate){
        var elem = $(el);
        var dropdown  = Metro.getPlugin(elem[0], "collapse");
        var options = dropdown.options;
        var func = immediate ? 'show' : 'slideDown';
        var dur = immediate ? 0 : options.duration;

        this.toggle.addClass("active-toggle");

        elem[func](dur, function(){
            el.trigger("onExpand", null, el);
            el.data("collapsed", false);
            el.removeClass("collapsed");
            Utils.exec(options.onExpand, null, elem[0]);
            elem.fire("expand");
        });
    },

    collapse: function(immediate){
        this._close(this.element, immediate);
    },

    expand: function(immediate){
        this._open(this.element, immediate);
    },

    close: function(immediate){
        this._close(this.element, immediate);
    },

    open: function(immediate){
        this._open(this.element, immediate);
    },

    isCollapsed: function(){
        return this.element.data("collapsed");
    },

    toggleState: function(){
        var element = this.element;
        if (element.attr("collapsed") === true || element.data("collapsed") === true) {
            this.collapse();
        } else {
            this.expand();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "collapsed":
            case "data-collapsed": this.toggleState(); break;
        }
    },

    destroy: function(){
        this.toggle.off(Metro.events.click);
        return this.element;
    }
});
