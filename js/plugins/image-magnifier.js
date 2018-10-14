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
        lensSize: 100,
        lensType: "square", // square, circle
        magnifierZoom: 2,
        magnifierMode: "glass", // glass, zoom
        magnifierZoomElement: null,

        clsMagnifier: "",
        clsLens: "",
        clsZoom: "",

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
            element.attr("id", Utils.elementId("image-magnifier"));
        }

        element.addClass("image-magnifier").css({
            width: o.width
        }).addClass(o.clsMagnifier);

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

        var x = element_width / 2 - o.lensSize / 2;
        var y = element_height / 2 - o.lensSize / 2;

        if (o.magnifierMode === "glass") {

            magnifier = $("<div>").addClass("image-magnifier-glass").appendTo(element);
            magnifier.css({
                width: o.lensSize,
                height: o.lensSize,
                borderRadius: o.lensType !== "circle" ? 0 : "50%",
                top: y,
                left: x,
                backgroundImage: "url(" + image[0].src + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "-" + ((x * o.magnifierZoom) - o.lensSize / 4 + 4) + "px -" + ((y * o.magnifierZoom) - o.lensSize / 4 + 4) + "px",
                backgroundSize: (image[0].width * o.magnifierZoom) + "px " + (image[0].height * o.magnifierZoom) + "px"
            }).addClass(o.clsLens);

        } else {

            magnifier = $("<div>").addClass("image-magnifier-glass").appendTo(element);
            magnifier.css({
                width: o.lensSize,
                height: o.lensSize,
                borderRadius: 0,
                borderWidth: 1,
                top: y,
                left: x
            }).addClass(o.clsLens);

            if (!Utils.isValue(o.magnifierZoomElement) || $(o.magnifierZoomElement).length === 0) {
                this.zoomElement = $("<div>").insertAfter(element);
            } else {
                this.zoomElement = $(o.magnifierZoomElement);
            }

            var zoom_element_width = magnifier[0].offsetWidth * o.magnifierZoom;
            var zoom_element_height = magnifier[0].offsetHeight * o.magnifierZoom;
            var cx = zoom_element_width / o.lensSize;
            var cy = zoom_element_height / o.lensSize;

            this.zoomElement.css({
                width: zoom_element_width,
                height: zoom_element_height,
                backgroundImage: "url(" + image[0].src + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "-" + (x * cx) + "px -" + (y * cy) + "px",
                backgroundSize: (image[0].width * cx) + "px " + (image[0].height * cy) + "px"
            }).addClass(o.clsZoom);
        }
    },

    _createEvents: function(){
        var element = this.element, o = this.options;
        var glass = element.find(".image-magnifier-glass");
        var glass_size = glass[0].offsetWidth / 2;
        var image = element.find("img")[0];
        var zoomElement = this.zoomElement;
        var cx, cy;

        if (o.magnifierMode !== "glass") {
            cx = zoomElement[0].offsetWidth / glass_size / 2;
            cy = zoomElement[0].offsetHeight / glass_size / 2;

            zoomElement.css({
                backgroundSize: (image.width * cx) + "px " + (image.height * cy) + "px"
            });
        }

        var lens_move = function(pos){
            var x, y;
            var magic = 4, zoom = parseInt(o.magnifierZoom);

            if (o.magnifierMode === "glass") {

                x = pos.x;
                y = pos.y;

                if (x > image.width - (glass_size / zoom)) {
                    x = image.width - (glass_size / zoom);
                }
                if (x < glass_size / zoom) {
                    x = glass_size / zoom;
                }
                if (y > image.height - (glass_size / zoom)) {
                    y = image.height - (glass_size / zoom);
                }
                if (y < glass_size / zoom) {
                    y = glass_size / zoom;
                }

                glass.css({
                    top: y - glass_size,
                    left: x - glass_size,
                    backgroundPosition: "-" + ((x * zoom) - glass_size + magic) + "px -" + ((y * zoom) - glass_size + magic) + "px"
                });
            } else {

                x = pos.x - (glass_size);
                y = pos.y - (glass_size);

                if (x > image.width - glass_size * 2) {x = image.width - glass_size * 2;}
                if (x < 0) {x = 0;}
                if (y > image.height - glass_size * 2) {y = image.height - glass_size * 2;}
                if (y < 0) {y = 0;}

                glass.css({
                    top: y,
                    left: x
                });

                zoomElement.css({
                    backgroundPosition: "-" + (x * cx) + "px -" + (y * cy) + "px"
                });
            }
        };

        element.on(Metro.events.move, function(e){
            var pos = Utils.getCursorPosition(image, e);

            lens_move(pos);

            Utils.exec(o.onMagnifierMove, [pos, glass, zoomElement], element[0]);

            e.preventDefault();
        });

        element.on(Metro.events.leave, function(){
            var x = element.width() / 2 - o.lensSize / 2;
            var y = element.height() / 2 - o.lensSize / 2;

            glass.animate({
                top: y, left: x
            });

            lens_move({
                x: x + o.lensSize / 2, y: y + o.lensSize / 2
            });
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('imagemagnifier', ImageMagnifier);