var ImageMagnifier = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.zoomElement = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        width: "100%",
        height: "auto",
        magnifierSize: 100,
        magnifierType: "square", // square, circle
        magnifierZoom: 2,
        onMagnifierMove: Metro.noop,
        onImageMagnifierCreate: Metro.noop
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

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onCreate, [element]);
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var magnifier, element_width, element_height;
        var image = element.find("img");

        if (image.length === 0) {
            throw new Error("Image not defined");
        }

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", Utils.elementId("image-comparer"));
        }

        element.addClass("image-magnifier").css({
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

        magnifier = $("<div>").addClass("image-magnifier").appendTo(element);
        magnifier.css({
            width: o.magnifierSize,
            height: o.magnifierSize,
            borderRadius: o.magnifierType !== "circle" ? 0 : "50%",
            top: element_height / 2 - o.magnifierSize / 2,
            left: element_width / 2 - o.magnifierSize / 2,
            backgroundImage: "url("+image[0].src+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: (image[0].width * o.magnifierZoom) + "px " + (image[0].height * o.magnifierZoom) + "px"
        });
    },

    _createEvents: function(){
        var element = this.element, o = this.options;
        var magnifier = element.find(".image-magnifier");
        var magnifier_size = element.find(".image-magnifier")[0].offsetWidth / 2;
        var image = element.find("img")[0];

        element.on(Metro.events.move, function(e){
            var x, y, pos = Utils.getCursorPosition(image, e);
            var magic = 4, zoom = parseInt(o.magnifierZoom);

            x = pos.x;
            y = pos.y;

            if (x > image.width - (magnifier_size / zoom)) {x = image.width - (magnifier_size / zoom);}
            if (x < magnifier_size / zoom) {x = magnifier_size / zoom;}
            if (y > image.height - (magnifier_size / zoom)) {y = image.height - (magnifier_size / zoom);}
            if (y < magnifier_size / zoom) {y = magnifier_size / zoom;}

            magnifier.css({
                top: y - magnifier_size,
                left: x - magnifier_size,
                backgroundPosition: "-" + ((x * zoom) - magnifier_size + magic) + "px -" + ((y * zoom) - magnifier_size + magic) + "px"
            });

            Utils.exec(o.onMagnifierMove, [pos, magnifier], element[0]);

            e.preventDefault();
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('imagemagnifier', ImageMagnifier);