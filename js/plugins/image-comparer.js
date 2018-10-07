var ImageComparer = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        width: 300,
        height: 200,
        onImageComparerCreate: Metro.noop
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

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onImageComparerCreate, [element], element[0]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var container, container_overlay, slider;
        var images;

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", Utils.elementId("image-comparer"));
        }

        element.addClass("image-comparer").css({
            width: o.width,
            height: o.height
        });

        container = $("<div>").addClass("image-container").appendTo(element);
        container_overlay = $("<div>").addClass("image-container-overlay").appendTo(element).css({
            width: o.width / 2
        });

        slider = $("<div>").addClass("image-slider").appendTo(element);
        slider.css({
            top: element.height() / 2 - slider.height() / 2,
            left: element.width() / 2 - slider.width() / 2
        });

        images = $("img");

        $.each(images, function(i, v){
            var img = $("<div>").addClass("image-wrapper");
            img.css({
                width: o.width,
                height: o.height,
                backgroundImage: "url("+this.src+")"
            });
            img.appendTo(i === 0 ? container : container_overlay);
            $(this).hide();
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var w = element.width();
        var overlay = element.find(".image-container-overlay");
        var slider = element.find(".image-slider");
        var slider_width = slider.width();

        var getCursorPosition = function(e){
            var a = Utils.rect(element);
            return e.pageX - a.left - window.pageXOffset;
        };

        element.on(Metro.events.start, ".image-slider", function(e){
            e.preventDefault();
            $(window).on(Metro.events.move + "-" + element.attr("id"), function(e){
                var x = getCursorPosition(e);
                if (x < 0) x = 0;
                if (x > w) x = w;
                overlay.css({
                    width: x
                });
                slider.css({
                    left: x - slider_width / 2
                });
            });
            $(window).on(Metro.events.stop + "-" + element.attr("id"), function(){
                $(window).off(Metro.events.move + "-" + element.attr("id"));
                $(window).off(Metro.events.stop + "-" + element.attr("id"));
            })
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('imagecomparer', ImageComparer);