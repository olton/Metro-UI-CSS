var Donut = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = 0;
        this.animation_change_interval = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onDonutCreate, [this.element]);

        return this;
    },

    options: {
        size: 100,
        radius: 50,
        hole: .8,
        value: 0,
        background: "#ffffff",
        color: "",
        stroke: "#d1d8e7",
        fill: "#49649f",
        fontSize: 24,
        total: 100,
        cap: "%",
        showText: true,
        showValue: false,
        animate: 0,
        onChange: Metro.noop,
        onDonutCreate: Metro.noop
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
        var html = "";
        var r = o.radius  * (1 - (1 - o.hole) / 2);
        var width = o.radius * (1 - o.hole);
        var circumference = 2 * Math.PI * r;
        var strokeDasharray = ((o.value * circumference) / o.total) + ' ' + circumference;
        var transform = 'rotate(-90 ' + o.radius + ',' + o.radius + ')';
        var fontSize = r * o.hole * 0.6;

        element.addClass("donut");

        element.css({
            width: o.size,
            height: o.size,
            background: o.background
        });

        html += "<svg>";
        html += "   <circle class='donut-back' r='"+(r)+"px' cx='"+(o.radius)+"px' cy='"+(o.radius)+"px' transform='"+(transform)+"' fill='none' stroke='"+(o.stroke)+"' stroke-width='"+(width)+"'/>";
        html += "   <circle class='donut-fill' r='"+(r)+"px' cx='"+(o.radius)+"px' cy='"+(o.radius)+"px' transform='"+(transform)+"' fill='none' stroke='"+(o.fill)+"' stroke-width='"+(width)+"'/>";
        if (o.showText === true) html += "   <text   class='donut-title' x='"+(o.radius)+"px' y='"+(o.radius)+"px' dy='"+(fontSize/3)+"px' text-anchor='middle' fill='"+(o.color !== "" ? o.color: o.fill)+"' font-size='"+(fontSize)+"px'>0"+(o.cap)+"</text>";
        html += "</svg>";

        element.html(html);

        this.val(o.value);
    },

    _setValue: function(v){
        var that = this, element = this.element, o = this.options;

        var fill = element.find(".donut-fill");
        var title = element.find(".donut-title");
        var r = o.radius  * (1 - (1 - o.hole) / 2);
        var circumference = 2 * Math.PI * r;
        // var title_value = (o.showValue ? o.value : Math.round(((v * 1000 / o.total) / 10)))+(o.cap);
        var title_value = (o.showValue ? v : Utils.percent(o.total, v, true))  + (o.cap);
        var fill_value = ((v * circumference) / o.total) + ' ' + circumference;

        fill.attr("stroke-dasharray", fill_value);
        title.html(title_value);
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return this.value
        }

        if (parseInt(v) < 0 || parseInt(v) > o.total) {
            return false;
        }

        if (o.animate > 0 && !document.hidden) {
            var inc = v > that.value;
            var i = that.value + (inc ? -1 : 1);

            clearInterval(that.animation_change_interval);
            this.animation_change_interval = setInterval(function(){
                if (inc) {
                    that._setValue(++i);
                    if (i >= v) {
                        clearInterval(that.animation_change_interval);
                    }
                } else {
                    that._setValue(--i);
                    if (i <= v) {
                        clearInterval(that.animation_change_interval);
                    }
                }
            }, o.animate);
        } else {
            clearInterval(that.animation_change_interval);
            this._setValue(v);
        }

        this.value = v;
        //element.attr("data-value", v);
        Utils.exec(o.onChange, [this.value, element]);
    },

    changeValue: function(){
        this.val(this.element.attr("data-value"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.changeValue(); break;
        }
    },

    destroy: function(){
        this.element.removeClass("donut").html("");
    }
};

Metro.plugin('donut', Donut);