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
        magnifierMode: "glass", // glass, zoom
        magnifierZoomElement: null,
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

        var x = element_width / 2 - o.magnifierSize / 2;
        var y = element_height / 2 - o.magnifierSize / 2;

        if (o.magnifierMode === "glass") {

            magnifier = $("<div>").addClass("image-magnifier-glass").appendTo(element);
            magnifier.css({
                width: o.magnifierSize,
                height: o.magnifierSize,
                borderRadius: o.magnifierType !== "circle" ? 0 : "50%",
                top: y,
                left: x,
                backgroundImage: "url(" + image[0].src + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: (image[0].width * o.magnifierZoom) + "px " + (image[0].height * o.magnifierZoom) + "px"
            });

        } else {

            magnifier = $("<div>").addClass("image-magnifier-glass").appendTo(element);
            magnifier.css({
                width: o.magnifierSize,
                height: o.magnifierSize,
                borderRadius: 0,
                borderWidth: 1,
                top: y,
                left: x
            });

            if (!Utils.isValue(o.magnifierZoomElement) || $(o.magnifierZoomElement).length === 0) {
                this.zoomElement = $("<div>").insertAfter(element);
            } else {
                this.zoomElement = $(o.magnifierZoomElement);
            }

            var zoom_element_width = magnifier[0].offsetWidth * o.magnifierZoom;
            var zoom_element_height = magnifier[0].offsetHeight * o.magnifierZoom;
            var cx = zoom_element_width / o.magnifierSize;
            var cy = zoom_element_height / o.magnifierSize;

            console.log(cx, cy);

            this.zoomElement.css({
                width: zoom_element_width,
                height: zoom_element_height,
                backgroundImage: "url(" + image[0].src + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "-" + (x * cx) + "px -" + (y * cy) + "px",
                backgroundSize: (image[0].width * cx) + "px " + (image[0].height * cy) + "px"
            });
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var magnifier = element.find(".image-magnifier-glass");
        var magnifier_size = magnifier[0].offsetWidth / 2;
        var image = element.find("img")[0];
        var zoomElement = this.zoomElement;
        var cx, cy;

        if (o.magnifierMode !== "glass") {
            cx = zoomElement[0].offsetWidth / magnifier_size / 2;
            cy = zoomElement[0].offsetHeight / magnifier_size / 2;

            console.log(cx, cy);

            zoomElement.css({
                backgroundSize: (image.width * cx) + "px " + (image.height * cy) + "px"
            });
        }

        element.on(Metro.events.move, function(e){
            var x, y, pos = Utils.getCursorPosition(image, e);
            var magic = 4, zoom = parseInt(o.magnifierZoom);

            if (o.magnifierMode === "glass") {

                x = pos.x;
                y = pos.y;

                if (x > image.width - (magnifier_size / zoom)) {
                    x = image.width - (magnifier_size / zoom);
                }
                if (x < magnifier_size / zoom) {
                    x = magnifier_size / zoom;
                }
                if (y > image.height - (magnifier_size / zoom)) {
                    y = image.height - (magnifier_size / zoom);
                }
                if (y < magnifier_size / zoom) {
                    y = magnifier_size / zoom;
                }

                magnifier.css({
                    top: y - magnifier_size,
                    left: x - magnifier_size,
                    backgroundPosition: "-" + ((x * zoom) - magnifier_size + magic) + "px -" + ((y * zoom) - magnifier_size + magic) + "px"
                });
            } else {

                x = pos.x - (magnifier_size);
                y = pos.y - (magnifier_size);

                if (x > image.width - magnifier_size * 2) {x = image.width - magnifier_size * 2;}
                if (x < 0) {x = 0;}
                if (y > image.height - magnifier_size * 2) {y = image.height - magnifier_size * 2;}
                if (y < 0) {y = 0;}

                magnifier.css({
                    top: y,
                    left: x
                });

                zoomElement.css({
                    backgroundPosition: "-" + (x * cx) + "px -" + (y * cy) + "px"
                });
            }

            Utils.exec(o.onMagnifierMove, [pos, magnifier], element[0]);

            e.preventDefault();
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('imagemagnifier', ImageMagnifier);