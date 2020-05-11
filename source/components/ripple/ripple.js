/* global Metro, Utils, Component */
var RippleDefaultConfig = {
    rippleDeferred: 0,
    rippleColor: "#fff",
    rippleAlpha: .4,
    rippleTarget: "default",
    onRippleCreate: Metro.noop
};

Metro.rippleSetup = function (options) {
    RippleDefaultConfig = $.extend({}, RippleDefaultConfig, options);
};

if (typeof window["metroRippleSetup"] !== undefined) {
    Metro.rippleSetup(window["metroRippleSetup"]);
}

var getRipple = function(target, color, alpha, event){
    var el = target ? $(target) : this.element;
    var rect = el[0].getBoundingClientRect();
    var x, y;

    if (!Utils.isValue(color)) {
        color = "#fff";
    }

    if (!Utils.isValue(alpha)) {
        alpha = .4;
    }

    if (el.css('position') === 'static') {
        el.css('position', 'relative');
    }

    el.css({
        overflow: 'hidden'
    });

    $(".ripple").remove();

    var size = Math.max(el.outerWidth(), el.outerHeight());

    // Add the element
    var ripple = $("<span class='ripple'></span>").css({
        width: size,
        height: size
    });

    el.prepend(ripple);

    // Get the center of the element
    if (event) {
        x = event.pageX - el.offset().left - ripple.width()/2;
        y = event.pageY - el.offset().top - ripple.height()/2;
    } else {
        x = rect.x - el.offset().left;
        y = rect.y - el.offset().top;
    }

    ripple.css({
        background: Utils.hex2rgba(color, alpha),
        width: size,
        height: size,
        top: y + 'px',
        left: x + 'px'
    }).addClass("rippleEffect");

    setTimeout(function(){
        ripple.remove();
    }, 400);
};

Component('ripple', {
    init: function( options, elem ) {
        this._super(elem, options, RippleDefaultConfig);

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;
        var target = o.rippleTarget === 'default' ? null : o.rippleTarget;

        Metro.checkRuntime(element, this.name);

        element.on(Metro.events.click, target, function(e){
            getRipple(this, o.rippleColor, o.rippleAlpha, e);
        });

        Utils.exec(o.onRippleCreate, null, element[0]);
        element.fire("ripplecreate");
    },

    changeAttribute: function(attributeName){
        var element = this.element, o = this.options;

        function changeColor(){
            var color = element.attr("data-ripple-color");
            if (!Utils.isColor(color)) {
                return;
            }
            o.rippleColor = color;
        }

        function changeAlpha(){
            var alpha = +element.attr("data-ripple-alpha");
            if (isNaN(alpha)) {
                return;
            }
            o.rippleColor = alpha;
        }

        switch (attributeName) {
            case "data-ripple-color": changeColor(); break;
            case "data-ripple-alpha": changeAlpha(); break;
        }
    },

    destroy: function(){
        var element = this.element, o = this.options;
        var target = o.rippleTarget === 'default' ? null : o.rippleTarget;
        element.off(Metro.events.click, target);
    }
});

Metro.ripple = getRipple;