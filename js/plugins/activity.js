var Activity = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onActivityCreate, [this.element]);

        return this;
    },

    options: {
        type: "ring",
        style: "light",
        size: 64,
        radius: 20,
        onActivityCreate: Metro.noop
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
        var i, wrap;

        element
            .html('')
            .addClass(o.style + "-style")
            .addClass("activity-" + o.type);

        function _metro(){
            for(i = 0; i < 5 ; i++) {
                $("<div/>").addClass('circle').appendTo(element);
            }
        }

        function _square(){
            for(i = 0; i < 4 ; i++) {
                $("<div/>").addClass('square').appendTo(element);
            }
        }

        function _cycle(){
            $("<div/>").addClass('cycle').appendTo(element);
        }

        function _ring(){
            for(i = 0; i < 5 ; i++) {
                wrap = $("<div/>").addClass('wrap').appendTo(element);
                $("<div/>").addClass('circle').appendTo(wrap);
            }
        }

        function _simple(){
            $('<svg class="circular"><circle class="path" cx="'+o.size/2+'" cy="'+o.size/2+'" r="'+o.radius+'" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>').appendTo(element);
        }

        switch (o.type) {
            case 'metro': _metro(); break;
            case 'square': _square(); break;
            case 'cycle': _cycle(); break;
            case 'simple': _simple(); break;
            default: _ring();
        }
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        element.html('')
            .removeClass(o.style + "-style")
            .removeClass("activity-" + o.type);
    }
};

Metro.plugin('activity', Activity);

Metro['activity'] = {
    open: function(options){

        var activity = '<div data-role="activity" data-type="'+( options.type ? options.type : 'cycle' )+'" data-style="'+( options.style ? options.style : 'color' )+'"></div>';
        var text = options.text ? '<div class="text-center">'+options.text+'</div>' : '';

        return Metro.dialog.create({
            content: activity + text,
            defaultAction: false,
            clsContent: "d-flex flex-column flex-justify-center flex-align-center bg-transparent no-shadow w-auto",
            clsDialog: "no-border no-shadow bg-transparent global-dialog",
            autoHide: options.autoHide ? options.autoHide : 0,
            overlayClickClose: options.overlayClickClose === true,
            overlayColor: options.overlayColor?options.overlayColor:'#000000',
            overlayAlpha: options.overlayAlpha?options.overlayAlpha:.5,
            clsOverlay: "global-overlay"
        })
    },

    close: function(a){
        Metro.dialog.close(a);
    }
};