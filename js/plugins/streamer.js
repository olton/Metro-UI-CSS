var Streamer = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.data = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        duration: METRO_ANIMATION_DURATION,
        defaultClosedIcon: "",
        defaultOpenIcon: "",
        changeUri: true,
        encodeLink: true,
        closed: false,
        chromeNotice: false,
        startFrom: null,
        slideToStart: true,
        startSlideSleep: 1000,
        source: null,
        data: null,
        eventClick: "select",
        selectGlobal: true,
        streamSelect: false,
        excludeSelectElement: null,
        excludeClickElement: null,
        excludeElement: null,
        excludeSelectClass: "",
        excludeClickClass: "",
        excludeClass: "",
        onStreamClick: Metro.noop,
        onStreamSelect: Metro.noop,
        onEventClick: Metro.noop,
        onEventSelect: Metro.noop,
        onStreamerCreate: Metro.noop
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

        element.addClass("streamer");

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("streamer"));
        }

        if (o.source === null && o.data === null) {
            return false;
        }

        $("<div>").addClass("streams").appendTo(element);
        $("<div>").addClass("events-area").appendTo(element);

        if (o.source !== null) {
            $.get(o.source, function(data){
                that.data = data;
                that.build();
            });
        } else {
            this.data = o.data;
            this.build();
        }

        this._createEvents();

        if (o.chromeNotice === true && Utils.detectChrome() === true && Utils.isTouchDevice() === false) {
            $("<p>").addClass("text-small text-muted").html("*) In Chrome browser please press and hold Shift and turn the mouse wheel.").insertAfter(element);
        }
    },

    build: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var streams = element.find(".streams").html("");
        var events_area = element.find(".events-area").html("");
        var timeline = $("<ul>").addClass("streamer-timeline").html("").appendTo(events_area);
        var streamer_events = $("<div>").addClass("streamer-events").appendTo(events_area);
        var event_group_main = $("<div>").addClass("event-group").appendTo(streamer_events);
        var StreamerIDS = Utils.getURIParameter(null, "StreamerIDS");

        if (StreamerIDS !== null && o.encodeLink === true) {
            StreamerIDS = atob(StreamerIDS);
        }

        var StreamerIDS_i = StreamerIDS ? StreamerIDS.split("|")[0] : null;
        var StreamerIDS_a = StreamerIDS ? StreamerIDS.split("|")[1].split(",") : [];

        if (data.actions !== undefined) {
            var actions = $("<div>").addClass("streamer-actions").appendTo(streams);
            $.each(data.actions, function(){
                var item = this;
                var button = $("<button>").addClass("streamer-action").addClass(item.cls).html(item.html);
                if (item.onclick !== undefined) button.on(Metro.events.click, function(){
                    Utils.exec(item.onclick, [element]);
                });
                button.appendTo(actions);
            });
        }

        // Create timeline

        timeline.html("");

        if (data.timeline === undefined) {
            data.timeline = {
                start: "09:00",
                stop: "18:00",
                step: 20
            }
        }

        var start = new Date(), stop = new Date();
        var start_time_array = data.timeline.start ? data.timeline.start.split(":") : [9,0];
        var stop_time_array = data.timeline.stop ? data.timeline.stop.split(":") : [18,0];
        var step = data.timeline.step ? parseInt(data.timeline.step) * 60 : 1200;

        start.setHours(start_time_array[0]);
        start.setMinutes(start_time_array[1]);
        start.setSeconds(0);

        stop.setHours(stop_time_array[0]);
        stop.setMinutes(stop_time_array[1]);
        stop.setSeconds(0);

        for (var i = start.getTime()/1000; i <= stop.getTime()/1000; i += step) {
            var t = new Date(i * 1000);
            var h = t.getHours(), m = t.getMinutes();
            var v = (h < 10 ? "0"+h : h) + ":" + (m < 10 ? "0"+m : m);

            var li = $("<li>").data("time", v).addClass("js-time-point-" + v.replace(":", "-")).html("<em>"+v+"</em>").appendTo(timeline);
        }

        // -- End timeline creator

        if (data.streams !== undefined) {
            $.each(data.streams, function(stream_index){
                var stream_item = this;
                var stream = $("<div>").addClass("stream").addClass(this.cls).appendTo(streams);
                stream
                    .addClass(stream_item.cls)
                    .data("one", false)
                    .data("data", stream_item.data);

                $("<div>").addClass("stream-title").html(stream_item.title).appendTo(stream);
                $("<div>").addClass("stream-secondary").html(stream_item.secondary).appendTo(stream);
                $(stream_item.icon).addClass("stream-icon").appendTo(stream);

                var bg = Utils.computedRgbToHex(Utils.getStyleOne(stream, "background-color"));
                var fg = Utils.computedRgbToHex(Utils.getStyleOne(stream, "color"));

                var stream_events = $("<div>").addClass("stream-events")
                    .data("background-color", bg)
                    .data("text-color", fg)
                    .appendTo(event_group_main);

                if (stream_item.events !== undefined) {
                    $.each(stream_item.events, function(event_index){
                        var event_item = this;
                        var _icon;
                        var sid = stream_index+":"+event_index;
                        var custom_html = event_item.custom !== undefined ? event_item.custom : "";
                        var custom_html_open = event_item.custom_open !== undefined ? event_item.custom_open : "";
                        var custom_html_close = event_item.custom_close !== undefined ? event_item.custom_close : "";
                        var event = $("<div>")
                            .data("origin", event_item)
                            .data("sid", sid)
                            .data("data", event_item.data)
                            .data("time", event_item.time)
                            .data("target", event_item.target)
                            .addClass("stream-event")
                            .addClass("size-"+event_item.size+"x")
                            .addClass(event_item.cls)
                            .appendTo(stream_events);


                        var left = timeline.find(".js-time-point-"+this.time.replace(":", "-"))[0].offsetLeft - stream.outerWidth();

                        event.css({
                            position: "absolute",
                            left: left
                        });


                        var slide = $("<div>").addClass("stream-event-slide").appendTo(event);
                        var slide_logo = $("<div>").addClass("slide-logo").appendTo(slide);
                        var slide_data = $("<div>").addClass("slide-data").appendTo(slide);

                        if (event_item.icon !== undefined) {
                            if (Utils.isTag(event_item.icon)) {
                                $(event_item.icon).addClass("icon").appendTo(slide_logo);
                            } else {
                                $("<img>").addClass("icon").attr("src", event_item.icon).appendTo(slide_logo);
                            }
                        }

                        $("<span>").addClass("time").css({
                            backgroundColor: bg,
                            color: fg
                        }).html(event_item.time).appendTo(slide_logo);

                        $("<div>").addClass("title").html(event_item.title).appendTo(slide_data);
                        $("<div>").addClass("subtitle").html(event_item.subtitle).appendTo(slide_data);
                        $("<div>").addClass("desc").html(event_item.desc).appendTo(slide_data);

                        if (o.closed === false && (element.attr("id") === StreamerIDS_i && StreamerIDS_a.indexOf(sid) !== -1) || event_item.selected === true || parseInt(event_item.selected) === 1) {
                            event.addClass("selected");
                        }

                        if (o.closed === true || event_item.closed === true || parseInt(event_item.closed) === 1) {
                            _icon = event_item.closedIcon !== undefined ? Utils.isTag(event_item.closedIcon) ? event_item.closedIcon : "<span>"+event_item.closedIcon+"</span>" : Utils.isTag(o.defaultClosedIcon) ? o.defaultClosedIcon : "<span>"+o.defaultClosedIcon+"</span>";
                            $(_icon).addClass("state-icon").addClass(event_item.clsClosedIcon).appendTo(slide);
                            event
                                .data("closed", true)
                                .data("target", event_item.target);
                            event.append(custom_html_open);
                        } else {
                            _icon = event_item.openIcon !== undefined ? Utils.isTag(event_item.openIcon) ? event_item.openIcon : "<span>"+event_item.openIcon+"</span>"  : Utils.isTag(o.defaultOpenIcon) ? o.defaultOpenIcon : "<span>"+o.defaultOpenIcon+"</span>";
                            $(_icon).addClass("state-icon").addClass(event_item.clsOpenIcon).appendTo(slide);
                            event
                                .data("closed", false);
                            event.append(custom_html_close);
                        }

                        event.append(custom_html);
                    });

                    var last_child = stream_events.find(".stream-event:last-child");
                    if (last_child.length > 0) stream_events.outerWidth(last_child[0].offsetLeft + last_child.outerWidth());
                }
            });
        }

        if (data.global !== undefined) {
            $.each(['before', 'after'], function(){
                var global_item = this;
                if (data.global[global_item] !== undefined) {
                    $.each(data.global[global_item], function(){
                        var event_item = this;
                        var group = $("<div>").addClass("event-group").addClass("size-"+event_item.size+"x");
                        var events = $("<div>").addClass("stream-events global-stream").appendTo(group);
                        var event = $("<div>").addClass("stream-event").appendTo(events);
                        event
                            .addClass("global-event")
                            .addClass(event_item.cls)
                            .data("time", event_item.time)
                            .data("origin", event_item)
                            .data("data", event_item.data);

                        $("<div>").addClass("event-title").html(event_item.title).appendTo(event);
                        $("<div>").addClass("event-subtitle").html(event_item.subtitle).appendTo(event);
                        $("<div>").addClass("event-html").html(event_item.html).appendTo(event);

                        var left, t = timeline.find(".js-time-point-"+this.time.replace(":", "-"));

                        if (t.length > 0) left = t[0].offsetLeft - streams.find(".stream").outerWidth();
                        group.css({
                            position: "absolute",
                            left: left,
                            height: "100%"
                        }).appendTo(streamer_events);
                    });
                }
            });
        }

        element.data("stream", -1);

        if (o.startFrom !== null && o.slideToStart === true) {
            setTimeout(function(){
                that.slideTo(o.startFrom);
            }, o.startSlideSleep);
        }

        Utils.exec(o.onStreamerCreate, [element]);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".stream-event", function(e){
            var event = $(this);

            if (o.excludeClass !== "" && event.hasClass(o.excludeClass)) {
                return ;
            }

            if (o.excludeElement !== null && $(e.target).is(o.excludeElement)) {
                return ;
            }

            if (o.closed === false && event.data("closed") !== true && o.eventClick === 'select') {

                if (o.excludeSelectClass !== "" && event.hasClass(o.excludeSelectClass)) {

                } else {
                    if (o.excludeSelectElement !== null && $(e.target).is(o.excludeSelectElement)) {

                    } else {
                        if (event.hasClass("global-event")) {
                            if (o.selectGlobal === true) {
                                event.toggleClass("selected");
                            }
                        } else {
                            event.toggleClass("selected");
                        }
                        if (o.changeUri === true) {
                            that._changeURI();
                        }
                        Utils.exec(o.onEventSelect, [event, event.hasClass("selected")]);
                    }
                }
            } else {
                if (o.excludeClickClass !== "" && event.hasClass(o.excludeClickClass)) {

                } else {

                    if (o.excludeClickElement !== null && $(e.target).is(o.excludeClickElement)) {

                    } else {

                        Utils.exec(o.onEventClick, [event]);

                        if (o.closed === true || event.data("closed") === true) {
                            var target = event.data("target");
                            if (target) {
                                window.location.href = target;
                            }
                        }

                    }
                }
            }
        });

        element.on(Metro.events.click, ".stream", function(e){
            var stream = $(this);
            var index = stream.index();

            if (o.streamSelect === false) {
                return;
            }

            if (element.data("stream") === index) {
                element.find(".stream-event").removeClass("disabled");
                element.data("stream", -1);
            } else {
                element.data("stream", index);
                element.find(".stream-event").addClass("disabled");
                that.enableStream(stream);
                Utils.exec(o.onStreamSelect, [stream]);
            }

            Utils.exec(o.onStreamClick, [stream]);
        });

        if (Utils.isTouchDevice() !== true) {
            element.on(Metro.events.mousewheel, ".events-area", function(e) {
                var acrollable = $(this);

                if (e.deltaY === undefined || e.deltaFactor === undefined) {
                    return ;
                }

                if (e.deltaFactor > 1) {
                    var scroll = acrollable.scrollLeft() - ( e.deltaY * 30 );
                    acrollable.scrollLeft(scroll);
                    e.preventDefault();
                }
            });
        }

        if (Utils.isTouchDevice() === true) {
            element.on(Metro.events.click, ".stream", function(){
                var stream = $(this);
                stream.toggleClass("focused");
                $.each(element.find(".stream"), function () {
                    if ($(this).is(stream)) return ;
                    $(this).removeClass("focused");
                })
            })
        }
    },

    _changeURI: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var link = this.getLink();
        history.pushState({}, document.title, link);
    },

    slideTo: function(time){
        var that = this, element = this.element, o = this.options, data = this.data;
        var target;
        if (time === undefined) {
            target = $(element.find(".streamer-timeline li")[0]);
        } else {
            target = $(element.find(".streamer-timeline .js-time-point-" + time.replace(":", "-"))[0]);
        }

        element.find(".events-area").animate({
            scrollLeft: target[0].offsetLeft - element.find(".streams .stream").outerWidth()
        }, o.duration);
    },

    enableStream: function(stream){
        var that = this, element = this.element, o = this.options, data = this.data;
        var index = stream.index();
        stream.removeClass("disabled").data("streamDisabled", false);
        element.find(".stream-events").eq(index).find(".stream-event").removeClass("disabled");
    },

    disableStream: function(stream){
        var that = this, element = this.element, o = this.options, data = this.data;
        var index = stream.index();
        stream.addClass("disabled").data("streamDisabled", true);
        element.find(".stream-events").eq(index).find(".stream-event").addClass("disabled");
    },

    toggleStream: function(stream){
        if (stream.data("streamDisabled") === true) {
            this.enableStream(stream);
        } else {
            this.disableStream(stream);
        }
    },

    getLink: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var events = element.find(".stream-event");
        var a = [];
        var link;
        var origin = window.location.href;

        $.each(events, function(){
            var event = $(this);
            if (event.data("sid") === undefined || !event.hasClass("selected")) {
                return;
            }

            a.push(event.data("sid"));
        });

        link = element.attr("id") + "|" + a.join(",");

        if (o.encodeLink === true) {
            link = btoa(link);
        }

        return Utils.updateURIParameter(origin, "StreamerIDS", link);
    },

    getTimes: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var times = element.find(".streamer-timeline > li");
        var result = [];
        $.each(times, function(){
            result.push($(this).data("time"));
        });
        return result;
    },

    getEvents: function(event_type, include_global){
        var that = this, element = this.element, o = this.options, data = this.data;
        var items, events = [];

        switch (event_type) {
            case "selected": items = element.find(".stream-event.selected"); break;
            case "non-selected": items = element.find(".stream-event:not(.selected)"); break;
            default: items = element.find(".stream-event");
        }

        $.each(items, function(){
            var item = $(this);
            var origin;

            if (include_global !== true && item.parent().hasClass("global-stream")) return ;

            origin = item.data("origin");

            events.push(origin);
        });

        return events;
    },

    source: function(s){
        if (s === undefined) {
            return this.options.source;
        }

        this.options.source = s;
        this.changeSource();
    },

    data: function(s){
        if (s === undefined) {
            return this.options.source;
        }

        this.options.data = s;
        this.changeData();
    },

    getStreamerData: function(){
        return this.data;
    },

    toggleEvent: function(event){
        var that = this, element = this.element, o = this.options, data = this.data;
        event = $(event);

        if (event.hasClass("global-event") && o.selectGlobal !== true) {
            return ;
        }

        if (event.hasClass("selected")) {
            this.selectEvent(event, false);
        } else {
            this.selectEvent(event, true);
        }
    },

    selectEvent: function(event, state){
        var that = this, element = this.element, o = this.options, data = this.data;
        if (state === undefined) {
            state = true;
        }
        event = $(event);

        if (event.hasClass("global-event") && o.selectGlobal !== true) {
            return ;
        }

        if (state === true) event.addClass("selected"); else event.removeClass("selected");

        if (o.changeUri === true) {
            that._changeURI();
        }
        Utils.exec(o.onEventSelect, [event, state]);
    },

    changeSource: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var new_source = element.attr("data-source");

        if (String(new_source).trim() === "") {
            return ;
        }

        o.source = new_source;

        $.get(o.source, function(data){
            that.data = data;
            that.build();
        });

        element.trigger("sourcechanged");
    },

    changeData: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var new_data = element.attr("data-data");

        if (String(new_data).trim() === "") {
            return ;
        }

        o.data = new_data;

        this.data = JSON.parse(o.data);
        this.build();

        element.trigger("datachanged");
    },

    changeStreamSelectOption: function(){
        var that = this, element = this.element, o = this.options, data = this.data;

        o.streamSelect = element.attr("data-stream-select").toLowerCase() === "true";
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-source': this.changeSource(); break;
            case 'data-data': this.changeData(); break;
            case 'data-stream-select': this.changeStreamSelectOption(); break;
        }
    }
};

Metro.plugin('streamer', Streamer);