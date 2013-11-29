(function( $ ) {
    $.widget("metro.times", {

        version: "1.0.0",

        options: {
            style: {
                background: "bg-dark",
                foreground: "fg-white",
                divider: "fg-dark"
            },
            blink: true,
            alarm: {
                h: 0,
                m: 0,
                s: 0
            },
            ontick: function(h, m, s){},
            onalarm: function(){}
        },

        wrappers: {},

        _interval: 0,

        _create: function(){
            var that = this, element = this.element;

            $.each(['Hours','Minutes','Seconds'],function(){
                $('<span class="count'+this+'">').html(
                    '<span class="digit-wrapper">\
                        <span class="digit">0</span>\
                    </span>\
                    <span class="digit-wrapper">\
                        <span class="digit">0</span>\
                    </span>'
                ).appendTo(element);

                if(this!="Seconds"){
                    element.append('<span class="divider"></span>');
                }
            });

            this.wrappers = this.element.find('.digit-wrapper');

            if (element.data('blink') != undefined) {
                this.options.blink = element.data('blick');
            }

            if (element.data('styleBackground') != undefined) {
                this.options.style.background = element.data('styleBackground');
            }

            if (element.data('styleForeground') != undefined) {
                this.options.style.foreground = element.data('styleForeground');
            }

            if (element.data('styleDivider') != undefined) {
                this.options.style.divider = element.data('styleDivider');
            }

            if (this.options.style.background != "default") {
                this.element.find(".digit").addClass(this.options.style.background);
            }

            if (this.options.style.foreground != "default") {
                this.element.find(".digit").addClass(this.options.style.foreground);
            }

            if (this.options.style.divider != "default") {
                this.element.find(".divider").addClass(this.options.style.divider);
            }

            if (element.data('alarm') != undefined) {
                var _alarm = element.data('alarm').split(":");
                this.options.alarm.h = _alarm[0] != undefined ? _alarm[0] : 0;
                this.options.alarm.m = _alarm[1] != undefined ? _alarm[1] : 0;
                this.options.alarm.s = _alarm[2] != undefined ? _alarm[2] : 0;
            }

            if (element.data('onalarm') != undefined) {
            }

            setTimeout( function(){
                that.tick()
            }, 1000);
        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        },


        tick: function(){
            var that = this;

            this._interval = setInterval(function(){
                var _date = new Date();

                var h, m, s;

                h = _date.getHours();
                that.updateDuo(0, 1, h);

                m = _date.getMinutes();
                that.updateDuo(2, 3, m);

                s = _date.getSeconds();
                that.updateDuo(4, 5, s);

                // Calling an optional user supplied callback
                that.options.ontick(h, m, s);

                that.blinkDivider();

                var alarm = that.options.alarm;

                if (alarm) {
                    if (
                        (alarm.h != undefined && alarm.h == h)
                            && (alarm.m != undefined && alarm.m == m)
                            && (alarm.s != undefined && alarm.s == s)
                        ) {

                        that.options.onalarm();
                        that._trigger('alarm');
                    }
                }

                // Scheduling another call of this function in 1s
            }, 1000);
        },

        blinkDivider: function(){
            if (this.options.blink)
                this.element.find(".divider").toggleClass("no-visible");
        },

        updateDuo: function(minor, major, value){
            this.switchDigit(this.wrappers.eq(minor),Math.floor(value/10)%10);
            this.switchDigit(this.wrappers.eq(major),value%10);
        },

        switchDigit: function(wrapper, number){
            var digit = wrapper.find('.digit');

            if(digit.is(':animated')){
                return false;
            }

            if(wrapper.data('digit') == number){
                // We are already showing this number
                return false;
            }

            wrapper.data('digit', number);

            var replacement = $('<span>',{
                'class':'digit',
                css:{
                    top:'-2.1em',
                    opacity:0
                },
                html:number
            });

            replacement.addClass(this.options.style.background);
            replacement.addClass(this.options.style.foreground);

            digit
                .before(replacement)
                .removeClass('static')
                .animate({top:'2.5em',opacity:0},'fast',function(){
                    digit.remove();
                });

            replacement
                .delay(100)
                .animate({top:0,opacity:1},'fast');

            return true;
        }
    });
})( jQuery );

$(function () {
    $('[data-role=times]').times();
});

function reinitTimes(){
    $('[data-role=times]').times();
}