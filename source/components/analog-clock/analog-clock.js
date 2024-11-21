(function(Metro, $) {
    'use strict';

    var AnalogClockDefaultConfig = {
        icon: null,
        onAnalogClockCreate: Metro.noop
    };

    Metro.analogClockSetup = function (options) {
        AnalogClockDefaultConfig = $.extend({}, AnalogClockDefaultConfig, options);
    };

    if (typeof window["metroAnalogClockSetup"] !== undefined) {
        Metro.analogClockSetup(window["metroAnalogClockSetup"]);
    }

    Metro.Component('analog-clock', {
        init: function( options, elem ) {
            this._super(elem, options, AnalogClockDefaultConfig, {
                // define instance vars here
            });
            return this;
        },

        _create: function(){
            var that = this, element = this.element, o = this.options;

            this._createStructure();
            this._createEvents();

            this._fireEvent('analog-clock-create');
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            const now = datetime()
            
            element.addClass("analog-clock");
            
            for (let i = 1; i <= 12; i++) {
                element.append(`<label style="--i: ${i}"><span>${i}</span></label>`);
            }
            
            element.append(`
                <div class="hands">
                    <div class="hour"></div>                
                    <div class="minute"></div>                
                    <div class="second"></div>                
                </div>
                  
            `)
            
            element.append(`
                <div class="day-month">
                    <div class="day">${now.format("DD", this.locale)}</div>
                    <div class="month">${now.format("MMM", this.locale)}</div>
                </div>
            `);
            
            if (o.icon) {
                element.append(`<div class="icon">${o.icon}</div>`)
            }
            
            this._updateTime()
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;

        },

        _updateTime: function(){
            const element = this.element;
            
            const secondHand = element.find(".second")[0]
            const minuteHand = element.find(".minute")[0]
            const hourHand = element.find(".hour")[0]
                
            const updateTime = () => {
                let date = new Date(),
                    sec = (date.getSeconds() / 60) * 360,
                    min = (date.getMinutes() / 60) * 360,
                    hr = (date.getHours() / 12) * 360;

                secondHand.style.transform = `rotate(${sec}deg)`;
                minuteHand.style.transform = `rotate(${min}deg)`;
                hourHand.style.transform = `rotate(${hr}deg)`;
            };

            updateTime();
            
            setInterval(updateTime, 1000);
        },
        
        changeAttribute: function(attr, newValue){
        },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));