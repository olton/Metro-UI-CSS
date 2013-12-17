(function( $ ) {
    $.widget("metro.progressbar", {

        version: "1.0.0",

        options: {
            value: 0,
            color: "bg-cyan",
            animate: false,
            onchange: function(val){}
        },

        _create: function(){
            var that = this,
                element = this.element;

            if (element.data('value') != undefined) {
                this.value(element.data('value')+'%');
            }

            if (element.data('color') != undefined) {
                this.options.color = element.data('color');
            }

            if (element.data('animate') != undefined) {
                this.options.animate = element.data('animate');
            }

            this._showBar();
        },

        _showBar: function(){
            var element = this.element;

            element.html('');

            var bar = $("<div />");
            bar.addClass("bar");
            if (this.options.color.indexOf("bg-")+1)
                bar.addClass(this.options.color);
            else {
                bar.css('background', this.options.color);
            }
            bar.appendTo(element);
            if (this.options.animate) {
                bar.animate({width: this.value()+'%'});
            } else {
                bar.css('width', this.value()+'%');
            }

            this.options.onchange(this.value());
        },

        value: function(val){
            if (val != undefined) {
                this.options.value = parseInt(val);
                this._showBar();
            } else {
                return parseInt(this.options.value);
            }
        },

        color: function(color){
            this.options.color = color;

            if (this.options.color.indexOf("bg-")+1)
                this.element.find(".bar").addClass(this.options.color);
            else {
                this.element.find(".bar").css('background', this.options.color);
            }
            this._showBar();
        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

