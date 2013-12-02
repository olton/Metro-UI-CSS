(function( $ ) {
    $.widget("metro.streamer", {

        version: "1.0.0",

        options: {
            scrollBar: false,
            meter: {
                start: 9,
                stop: 19,
                interval: 20
            },
            slideToGroup: 1,
            slideToTime: "10:20",
            slideSleep: 1000,
            slideSpeed: 1000,
            onClick: function(event){},
            onLongClick: function(event){}
        },

        _create: function(){
            var that = this, element = this.element, o = this.options,
                streams = element.find(".stream"),
                events = element.find(".event"),
                events_container = element.find(".events"),
                events_area = element.find(".events-area"),
                groups = element.find(".event-group"),
                event_streams = element.find(".event-stream");


            if (element.data('scrollBar') != undefined) o.scrollBar = element.data('scrollBar');
            if (element.data('meterStart') != undefined) o.meter.start = parseInt(element.data('meterStart'));
            if (element.data('meterStop') != undefined) o.meter.stop = parseInt(element.data('meterStop'));
            if (element.data('meterInterval') != undefined) o.meter.interval = element.data('meterInterval');
            if (element.data('slideToGroup') != undefined) o.slideToGroup = parseInt(element.data('slideToGroup'));
            if (element.data('slideSleep') != undefined) o.slideSleep = parseInt(element.data('slideSleep'));
            if (element.data('slideSpeed') != undefined) o.slideSpeed = parseInt(element.data('slideSpeed'));

            element.data('streamSelect', -1);

            var meter = $("<ul/>").addClass("meter");
            var i, j, m, start = o.meter.start, stop = o.meter.stop, interval = o.meter.interval;

            var _intervals = [];
            for (i = start; i<stop; i++) {
                for (j = 0; j < 60; j+=interval) {
                    m = (i<10?"0"+i:i)+":"+(j<10?"0"+j:j);
                    $("<li/>").addClass("js-interval-"+ m.replace(":", "-")).html("<em>"+m+"</em>").appendTo(meter);
                    _intervals.push(m);
                }
            }
            element.data("intervals", _intervals);
            meter.insertBefore(element.find(".events-grid"));

            //console.log(element.data("intervals"));

            // Re-Calc all event-stream width and set background for time
            element.find(".event-stream").each(function(i, s){
                var event_stream_width = 0;
                var events = $(s).find(".event");

                events.each(function(i, el){
                    event_stream_width += $(el).outerWidth();
                });

                $(s).css({
                    width: (event_stream_width + ( (events.length-1) * 2 ) + 1)
                });

                $(s).find(".time").css("background-color", $(streams[i]).css('background-color'));
            });

            // Set scrollbar
            events_container.css({
                'overflow-x': (o.scrollBar ? 'scroll' : 'hidden')
            });

            // Set streamer height
            element.css({
                height: element.find(".streams").outerHeight() + (o.scrollBar ? 20 : 0)
            });

            // Re-Calc events-area width
            var events_area_width = 0;
            groups.each(function(i, el){
                events_area_width += $(el).outerWidth();
            });
            events_area_width += ( (groups.length-1) * 2 ) + 10;
            events_area.css('width', events_area_width);

            events.each(function(i, el){
                addTouchEvents(el);
            });

            events.mousedown(function(e){
                if (e.altKey) {
                    $(this).toggleClass("selected");
                }
            });

            element.mousewheel(function(event, delta){
                var scroll_value = delta * 50;
                events_container.scrollLeft(events_container.scrollLeft() - scroll_value);
                return false;
            });

            streams.each(function(i, s){
                $(s).mousedown(function(e){
                    if (element.data('streamSelect') == i) {
                        events.removeClass('event-disable');
                        element.data('streamSelect', -1);
                    } else {
                        element.data('streamSelect', i);
                        events.addClass('event-disable');
                        $(event_streams[i]).find(".event").removeClass("event-disable");
                    }
                });
            });

            events.on('click', function(e){
                e.preventDefault();
                o.onClick($(this));
            });

            events.on('longclick', function(e){
                $(this).toggleClass("selected");
                e.preventDefault();
                o.onLongClick($(this));
            });

            element.find(".js-go-previous-time").on('click', function(e){
                var next_index = element.data("intervals").indexOf(element.data("current-time"));
                if (next_index == 0) {
                    return;
                }
                next_index--;
                var new_time = element.data("intervals")[next_index];
                that.slideToTime(new_time, 0, o.slideSpeed);
            });

            element.find(".js-go-next-time").on('click', function(e){
                var next_index = element.data("intervals").indexOf(element.data("current-time"));
                if (next_index == element.data("intervals").length - 1) {
                    return;
                }
                next_index++;
                var new_time = element.data("intervals")[next_index];
                that.slideToTime(new_time, 0, o.slideSpeed);
            });

            element.find(".js-show-all-streams").on("click", function(e){
                element.find(".event").removeClass("event-disable");
                element.data('streamSelect', -1);
                e.preventDefault();
            });


            element.find(".js-schedule-mode").on("click", function(e){
                $(this).toggleClass("inverse");
                element.data("schedule-mode", $(this).hasClass("inverse"));
                e.preventDefault();
            });

            if (o.slideToTime) {
                this.slideToTime(o.slideToTime, o.slideSleep, o.slideSpeed);
            } else {
                this.slideToGroup(o.slideToGroup, o.slideSleep, o.slideSpeed);
            }

        },

        slideToTime: function(time, sleep, speed){
            var that = this, element = this.element,
                interval = element.find(".meter li.js-interval-"+time.replace(":", "-"))[0],
                streams_width = element.find(".streams").outerWidth() + 2;

            setTimeout(function(){
                element.find(".events").animate({
                    scrollLeft: "+="+ (interval.offsetLeft - streams_width)
                }, speed, function(){
                    that._afterSlide();
                });
            }, sleep);

            element.data("current-time", time);
        },

        slideToGroup: function(group, sleep, speed){
            var that = this, element = this.element, groups = element.find(".event-group"), streams_width = element.find(".streams").outerWidth() + 2;

            setTimeout(function(){
                element.find(".events").animate({
                    scrollLeft: "+="+ (groups[group-1].offsetLeft - streams_width)
                }, speed, function(){
                    that._afterSlide();
                });
            }, sleep);
        },

        _afterSlide: function(){

        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

$(function () {
    $('[data-role=streamer]').streamer();
});

function reinitStreamers(){
    $('[data-role=streamer]').streamer();
}