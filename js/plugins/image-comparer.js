var ImageCompare = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        width: "100%",
        height: "auto",
        onResize: Metro.noop,
        onSliderMove: Metro.noop,
        onImageCompareCreate: Metro.noop
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

        Utils.exec(o.onImageCompareCreate, [element], element[0]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var container, container_overlay, slider;
        var images, element_width, element_height;

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", Utils.elementId("image-compare"));
        }

        element.addClass("image-compare").css({
            width: o.width
        });

        element_width = element.width();

        switch (o.height) {
            case "16/9": element_height = Utils.aspectRatioH(element_width, o.height); break;
            case "21/9": element_height = Utils.aspectRatioH(element_width, o.height); break;
            case "4/3": element_height = Utils.aspectRatioH(element_width, o.height); break;
            case "auto": element_height = Utils.aspectRatioH(element_width, "16/9"); break;
            default: element_height = o.height;
        }

        element.css({
            height: element_height
        });

        container = $("<div>").addClass("image-container").appendTo(element);
        container_overlay = $("<div>").addClass("image-container-overlay").appendTo(element).css({
            width: element_width / 2
        });

        slider = $("<div>").addClass("image-slider").appendTo(element);
        slider.css({
            top: element_height / 2 - slider.height() / 2,
            left: element_width / 2 - slider.width() / 2
        });

        images = element.find("img");

        $.each(images, function(i, v){
            var img = $("<div>").addClass("image-wrapper");
            img.css({
                width: element_width,
                height: element_height,
                backgroundImage: "url("+this.src+")"
            });
            img.appendTo(i === 0 ? container : container_overlay);
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        var overlay = element.find(".image-container-overlay");
        var slider = element.find(".image-slider");

        slider.on(Metro.events.start, function(e){
            var w = element.width();
            $(document).on(Metro.events.move + "-" + element.attr("id"), function(e){
                var x = Utils.getCursorPositionX(element, e), left_pos;
                if (x < 0) x = 0;
                if (x > w) x = w;
                overlay.css({
                    width: x
                });
                left_pos = x - slider.width() / 2;
                slider.css({
                    left: left_pos
                });
                Utils.exec(o.onSliderMove, [x, left_pos, slider[0]], element[0]);
            });
            $(document).on(Metro.events.stop + "-" + element.attr("id"), function(){
                $(document).off(Metro.events.move + "-" + element.attr("id"));
                $(document).off(Metro.events.stop + "-" + element.attr("id"));
            })
        });

        $(window).on(Metro.events.resize+"-"+element.attr("id"), function(){
            var element_width = element.width(), element_height;

            if (o.width !== "100%") {
                return ;
            }

            switch (o.height) {
                case "16/9": element_height = Utils.aspectRatioH(element_width, o.height); break;
                case "21/9": element_height = Utils.aspectRatioH(element_width, o.height); break;
                case "4/3": element_height = Utils.aspectRatioH(element_width, o.height); break;
                case "auto": element_height = Utils.aspectRatioH(element_width, "16/9"); break;
                default: element_height = o.height;
            }

            element.css({
                height: element_height
            });

            $.each(element.find(".image-wrapper"), function(){
                $(this).css({
                    width: element_width,
                    height: element_height
                })
            });

            element.find(".image-container-overlay").css({
                width: element_width / 2
            });

            slider.css({
                top: element_height / 2 - slider.height() / 2,
                left: element_width / 2 - slider.width() / 2
            });

            Utils.exec(o.onResize, [element_width, element_height], element[0]);
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.start);
        $(window).off(Metro.events.resize+"-"+element.attr("id"));
    }
};

Metro.plugin('imagecompare', ImageCompare);