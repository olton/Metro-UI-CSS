var RippleDefaultConfig = {
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

var Ripple = {
    init: function( options, elem ) {
        this.options = $.extend( {}, RippleDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

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

        var target = o.rippleTarget === 'default' ? null : o.rippleTarget;

        Metro.checkRuntime(element, "ripple");

        element.on(Metro.events.click, target, function(e){
            var el = $(this);
            var timer = null;

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
            var x = e.pageX - el.offset().left - ripple.width()/2;
            var y = e.pageY - el.offset().top - ripple.height()/2;

            // Add the ripples CSS and start the animation
            ripple.css({
                background: Utils.hex2rgba(o.rippleColor, o.rippleAlpha),
                width: size,
                height: size,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
            timer = setTimeout(function(){
                timer = null;
                $(".ripple").remove();
            }, 400);
        });

        Utils.exec(o.onRippleCreate, null, element[0]);
        element.fire("ripplecreate");
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element, o = this.options;
        var target = o.rippleTarget === 'default' ? null : o.rippleTarget;
        element.off(Metro.events.click, target);
    }
};

Metro.plugin('ripple', Ripple);