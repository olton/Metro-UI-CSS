/* global Metro */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var DonutDefaultConfig = {
        donutDeferred: 0,
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
    };

    Metro.donutSetup = function (options) {
        DonutDefaultConfig = $.extend({}, DonutDefaultConfig, options);
    };

    if (typeof window["metroDonutSetup"] !== undefined) {
        Metro.donutSetup(window["metroDonutSetup"]);
    }

    Metro.Component('donut', {
        init: function( options, elem ) {
            this._super(elem, options, DonutDefaultConfig, {
                value: 0,
                animation_change_interval: null
            });

            return this;
        },

        _create: function(){
            var element = this.element, o = this.options;
            var html = "";
            var r = o.radius  * (1 - (1 - o.hole) / 2);
            var width = o.radius * (1 - o.hole);
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

            this._fireEvent("donut-create", {
                element: element
            });
        },

        _setValue: function(v){
            var element = this.element, o = this.options;

            var fill = element.find(".donut-fill");
            var title = element.find(".donut-title");
            var r = o.radius  * (1 - (1 - o.hole) / 2);
            var circumference = Math.round(2 * Math.PI * r);
            var title_value = (o.showValue ? v : Utils.percent(o.total, v, true))/*  + (o.cap)*/;
            var fill_value = Math.round(((+v * circumference) / o.total));// + ' ' + circumference;

            var sda = fill.attr("stroke-dasharray");
            if (typeof sda === "undefined") {
                sda = 0;
            } else {
                sda = +sda.split(" ")[0];
            }
            var delta = fill_value - sda;

            fill.animate({
                draw: function(t, p){
                    $(this).attr("stroke-dasharray", (sda + delta * p ) + ' ' + circumference);
                },
                dur: o.animate
            })
            title.animate({
                draw: {
                    innerHTML: title_value
                },
                dur: o.animate,
                onFrame: function(){
                    this.innerHTML += o.cap;
                }
            });
        },

        val: function(v){
            var o = this.options;

            if (v === undefined) {
                return this.value
            }

            if (parseInt(v) < 0 || parseInt(v) > o.total) {
                return false;
            }

            this._setValue(v);

            this.value = v;

            this._fireEvent("change", {
                value: this.value
            });
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
            return this.element;
        }
    });
}(Metro, m4q));