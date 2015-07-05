// TODO - add color bar parts

(function ( $ ) {

    "use strict";

    $.widget( "metro.progressBar" , {

        version: "3.0.0",

        options: {
            color: 'default',
            colors: false,
            value: 0
        },

        colorsDim: {},

        _create: function () {
            var that = this, element = this.element, o = this.options;
            var bar = element.children('.bar:last-child');

            $.each(element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = $.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            if (bar.length === 0) {
                bar = $('<div/>').addClass('bar').appendTo(element);
            }

            if (o.colors) {
                var p = 0;
                $.each(o.colors, function(c,v){
                    that.colorsDim[c] = [p,v];
                    p = v + 1;
                });
            }

            this.progress(o.value);
            this.color(o.color);

            element.data('progressBar', this);

        },

        color: function(value){
            var element = this.element, o = this.options;
            var bar = element.children('.bar:last-child');
            var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);

            if (isOk) {
                bar.css({
                    'background-color': value
                });
            } else {
                bar.removeClass(function(index, css){
                    return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
                }).addClass(value);
            }

            o.color = value;
        },

        progress: function(value){
            if (value !== undefined) {
                var element = this.element, o = this.options, colors = this.colorsDim;
                var bar = element.children('.bar:last-child');
                var that = this, gradient = [];

                if (parseInt(value) < 0) {
                    return;
                }


                if (o.colors) {

                    $.each(colors, function (c, v) {
                        if (value >= v[0] && value <= v[1]) {
                            that.color(c);
                            return true;
                        }
                    });
                    //$.each(o.colors, function(c, v){
                    //    gradient.push(c + " " + v + "%");
                    //});
                    //console.log(gradient.join(","));
                    //
                    //bar.css({
                    //    'background': "linear-gradient(to right, " + gradient.join(",") + ")"
                    //});
                }

                o.value = value;

                bar.animate({
                    width: o.value + '%'
                }, 100);
            } else {
                return this.options.value;
            }
        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });
})( jQuery );