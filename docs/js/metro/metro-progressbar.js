(function( $ ) {
    $.widget("metro.progressbar", {

        version: "1.0.1",

        options: {
            value: 0,
            color: "bg-cyan",
            animate: false,
			max: 100,
            onchange: function(val){}
        },

        _create: function(){
            var that = this,
                element = this.element,
				o = this.options;

            if (element.data('value') != undefined) {
                this.value(element.data('value')+'%');
            }

            if (element.data('color') != undefined) {
                o.color = element.data('color');
            }

            if (element.data('animate') != undefined) {
                o.animate = element.data('animate');
            }
			
			if (element.data('max') != undefined) {
                o.max = element.data('max');
            }
			o.max = o.max < 0 ? 0 : o.max;
			o.max = o.max > 100 ? 100 : o.max;

            this._showBar();
        },

        _showBar: function(newVal){
			//Default parameters
			newVal = newVal || this.options.value;
            
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
				bar.css('width', this.value() + '%').animate({ width: newVal + '%' });
            } else {
                bar.css('width', newVal + '%');
            }

            this.options.onchange(this.value());
        },

        value: function(val){
            if (val != undefined) {
				var parsedVal = parseInt(val);
				parsedVal = parsedVal > this.max ? this.max : parsedVal;
				parsedVal = parsedVal < 0 ? 0 : parsedVal;
				this._showBar(parsedVal);
                this.options.value = parsedVal;
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

