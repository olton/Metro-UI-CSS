/* global Metro, Component, Utils */
var ActivityDefaultConfig = {
    activityDeferred: 0,
    type: "ring",
    style: "light",
    size: 64,
    radius: 20,
    onActivityCreate: Metro.noop
};

Metro.activitySetup = function(options){
    ActivityDefaultConfig = $.extend({}, ActivityDefaultConfig, options);
};

if (typeof window["metroActivitySetup"] !== undefined) {
    Metro.activitySetup(window["metroActivitySetup"]);
}

Component('activity', {
    init: function( options, elem ) {
        this._super(elem, options, ActivityDefaultConfig);

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;
        var i, wrap;

        Metro.checkRuntime(element, this.name);

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

        Utils.exec(this.options.onActivityCreate, [this.element]);
        element.fire("activitycreate");
    },

    /*eslint-disable-next-line*/
    changeAttribute: function(attributeName){
    },

    destroy: function(){
        return this.element;
    }
});

Metro.activity = {
    open: function(options){
        var o = options || {};
        var activity = '<div data-role="activity" data-type="'+( o.type ? o.type : 'cycle' )+'" data-style="'+( o.style ? o.style : 'color' )+'"></div>';
        var text = o.text ? '<div class="text-center">'+o.text+'</div>' : '';

        return Metro.dialog.create({
            content: activity + text,
            defaultAction: false,
            clsContent: "d-flex flex-column flex-justify-center flex-align-center bg-transparent no-shadow w-auto",
            clsDialog: "no-border no-shadow bg-transparent global-dialog",
            autoHide: o.autoHide ? o.autoHide : 0,
            overlayClickClose: o.overlayClickClose === true,
            overlayColor: o.overlayColor ? o.overlayColor : '#000000',
            overlayAlpha: o.overlayAlpha ? o.overlayAlpha : 0.5,
            clsOverlay: "global-overlay"
        });
    },

    close: function(a){
        Metro.dialog.close(a);
    }
};