$.widget( "metro.fitImage" , {

    version: "3.0.0",

    options: {
        shadow: false,
        overlay: false,
        type: 'default',
        frameColor: 'default',
        format: 'hd' // 'sd'
    },

    _create: function () {
        var element = this.element, o = this.options;
        var parent = element.parent();
        var i_w, i_h, p_w, p_h;
        var div, src = element.attr('src');

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });

        $("<img/>")
            .attr('src', src)
            .load(function(){
                i_w = this.width;
                i_h = this.height;
            }).remove();

        var image_container = $("<div/>").addClass('image-container').css('width', '100%').appendTo(parent);
        var image_frame = $("<div/>").addClass('frame').appendTo(image_container);

        p_w = image_frame.innerWidth();
        p_h = image_frame.innerHeight();

        switch (o.format) {
            case 'sd': p_h = 3 * p_w / 4; break;
            case 'square': p_h = p_w; break;
            case 'cycle': p_h = p_w; break;
            case 'fill-h': p_h = "100%"; image_container.css('height', '100%'); break;
            case 'fill': p_h = "100%"; image_container.css('height', '100%'); break;
            default: p_h = 9 * p_w / 16;
        }

        div = $("<div/>").css({
            'width': '100%',
            'height': p_h,
            'background-image': 'url('+src+')',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'border-radius': o.format === 'cycle' ? '50%' : '0'
        });

        $(window).on('resize', function(){
            var p_w = image_frame.innerWidth();
            var p_h = image_frame.innerHeight();

            switch (o.format) {
                case 'sd': p_h = 3 * p_w / 4; break;
                case 'square': p_h = p_w; break;
                case 'cycle': p_h = p_w; break;
                case 'fill-h': p_h = "100%"; image_container.css('height', '100%'); break;
                case 'fill': p_h = "100%"; image_container.css('height', '100%'); break;
                default: p_h = 9 * p_w / 16;
            }

            div.css({
                'height': p_h
            });
        });

        if (o.frameColor !== 'default') {
            if (o.frameColor.isUrl()) {
                image_frame.css('background-color', o.frameColor);
            } else {
                image_frame.addClass(o.frameColor);
            }
        }
        if (o.overlay !== false) {
            var overlay = $("<div/>").addClass('image-overlay').html(o.overlay).appendTo(image_container);
        }
        if (o.shadow !== false) {
            image_container.addClass('block-shadow');
        }
        div.appendTo(image_frame);

        switch (o.type) {
            case 'diamond': {
                image_container.addClass('diamond'); div.addClass('image-replacer'); break;
            }
            case 'bordered': {
                image_container.addClass('bordered'); break;
            }
            case 'polaroid': {
                image_container.addClass('polaroid'); break;
            }
            case 'handing': {
                image_container.addClass('handing'); break;
            }
            case 'handing-ani': {
                image_container.addClass('handing ani'); break;
            }
            case 'handing-ani-hover': {
                image_container.addClass('handing ani-hover'); break;
            }
        }

        image_container.addClass('image-format-'+ o.format);
        //element.css('display', 'none');
        element.remove();

    },

    _destroy: function () {
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});
