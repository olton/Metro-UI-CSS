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
            eventClick: function(event){}
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
            if (element.data('meterStart') != undefined) o.meter.start = element.data('meterStart');
            if (element.data('meterStop') != undefined) o.meter.stop = element.data('meterStop');
            if (element.data('meterInterval') != undefined) o.meter.interval = element.data('meterInterval');
            if (element.data('slideToGroup') != undefined) o.slideToGroup = element.data('slideToGroup');

            element.data('streamSelect', -1);

            var meter = $("<ul/>").addClass("meter");
            var i, j, m, start = o.meter.start, stop = o.meter.stop, interval = o.meter.interval;

            for (i = start; i<stop; i++) {
                for (j = 0; j < 60; j+=interval) {
                    m = (i<10?"0"+i:i)+":"+(j<10?"0"+j:j);
                    $("<li/>").html("<em>"+m+"</em>").appendTo(meter);
                }
            }
            meter.insertBefore(element.find(".events-grid"));

            //console.log(meter);


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
                o.eventClick($(this));
            });

            this.slideToGroup(o.slideToGroup);
        },

        slideToTime: function(time){

        },

        slideToGroup: function(group){
            var that = this, element = this.element, groups = element.find(".event-group"), streams_width = element.find(".streams").outerWidth() + 2;

            setTimeout(function(){
                element.find(".events").animate({
                    scrollLeft: "+="+ (groups[group-1].offsetLeft - streams_width)
                }, 1000, function(){
                    that._afterSlide();
                });
            }, 1000);
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
