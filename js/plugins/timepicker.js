var TimePicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.picker = null;
        this.isOpen = false;
        this.value = [];
        this.locale = Metro.locales[METRO_LOCALE]['calendar'];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        hoursStep: 1,
        minutesStep: 1,
        secondsStep: 1,
        value: null,
        locale: METRO_LOCALE,
        distance: 3,
        hours: true,
        minutes: true,
        seconds: true,
        showLabels: true,
        scrollSpeed: 5,
        copyInlineStyles: true,
        clsPicker: "",
        clsPart: "",
        clsHours: "",
        clsMinutes: "",
        clsSeconds: "",
        okButtonIcon: "<span class='default-icon-check'></span>",
        cancelButtonIcon: "<span class='default-icon-cross'></span>",
        onSet: Metro.noop,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onScroll: Metro.noop,
        onTimePickerCreate: Metro.noop
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
        var picker = this.picker;
        var i;

        if (o.distance < 1) {
            o.distance = 1;
        }

        if (o.hoursStep < 1) {o.hoursStep = 1;}
        if (o.hoursStep > 23) {o.hoursStep = 23;}

        if (o.minutesStep < 1) {o.minutesStep = 1;}
        if (o.minutesStep > 59) {o.minutesStep = 59;}

        if (o.secondsStep < 1) {o.secondsStep = 1;}
        if (o.secondsStep > 59) {o.secondsStep = 59;}

        if (element.val() === "" && (!Utils.isValue(o.value))) {
            o.value = (new Date()).format("%H:%M:%S");
        }

        this.value = Utils.strToArray(element.val() !== "" ? element.val() : String(o.value), ":");

        for(i = 0; i < 3; i++) {
            if (this.value[i] === undefined || this.value[i] === null) {
                this.value[i] = 0;
            } else {
                this.value[i] = parseInt(this.value[i]);
            }
        }

        this._normalizeValue();

        if (Metro.locales[o.locale] === undefined) {
            o.locale = METRO_LOCALE;
        }

        this.locale = Metro.locales[o.locale]['calendar'];

        this._createStructure();
        this._createEvents();
        this._set();

        Utils.exec(o.onTimePickerCreate, [element, picker]);
    },

    _normalizeValue: function(){
        var o = this.options;

        if (o.hoursStep > 1) {
            this.value[0] = Utils.nearest(this.value[0], o.hoursStep, true);
        }
        if (o.minutesStep > 1) {
            this.value[1] = Utils.nearest(this.value[1], o.minutesStep, true);
        }
        if (o.minutesStep > 1) {
            this.value[2] = Utils.nearest(this.value[2], o.secondsStep, true);
        }
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var picker, hours, minutes, seconds, ampm, select, i;
        var timeWrapper, selectWrapper, selectBlock, actionBlock;

        var prev = element.prev();
        var parent = element.parent();
        var id = Utils.elementId("time-picker");

        picker = $("<div>").attr("id", id).addClass("wheel-picker time-picker " + element[0].className).addClass(o.clsPicker);

        if (prev.length === 0) {
            parent.prepend(picker);
        } else {
            picker.insertAfter(prev);
        }

        element.attr("readonly", true).appendTo(picker);


        timeWrapper = $("<div>").addClass("time-wrapper").appendTo(picker);

        if (o.hours === true) {
            hours = $("<div>").attr("data-title", this.locale['time']['hours']).addClass("hours").addClass(o.clsPart).addClass(o.clsHours).appendTo(timeWrapper);
        }
        if (o.minutes === true) {
            minutes = $("<div>").attr("data-title", this.locale['time']['minutes']).addClass("minutes").addClass(o.clsPart).addClass(o.clsMinutes).appendTo(timeWrapper);
        }
        if (o.seconds === true) {
            seconds = $("<div>").attr("data-title", this.locale['time']['seconds']).addClass("seconds").addClass(o.clsPart).addClass(o.clsSeconds).appendTo(timeWrapper);
        }

        selectWrapper = $("<div>").addClass("select-wrapper").appendTo(picker);

        selectBlock = $("<div>").addClass("select-block").appendTo(selectWrapper);
        if (o.hours === true) {
            hours = $("<ul>").addClass("sel-hours").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(hours);
            for (i = 0; i < 24; i = i + o.hoursStep) {
                $("<li>").addClass("js-hours-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(hours);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(hours);
        }
        if (o.minutes === true) {
            minutes = $("<ul>").addClass("sel-minutes").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(minutes);
            for (i = 0; i < 60; i = i + o.minutesStep) {
                $("<li>").addClass("js-minutes-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(minutes);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(minutes);
        }
        if (o.seconds === true) {
            seconds = $("<ul>").addClass("sel-seconds").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(seconds);
            for (i = 0; i < 60; i = i + o.secondsStep) {
                $("<li>").addClass("js-seconds-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(seconds);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(seconds);
        }

        selectBlock.height((o.distance * 2 + 1) * 40);

        actionBlock = $("<div>").addClass("action-block").appendTo(selectWrapper);
        $("<button>").attr("type", "button").addClass("button action-ok").html(o.okButtonIcon).appendTo(actionBlock);
        $("<button>").attr("type", "button").addClass("button action-cancel").html(o.cancelButtonIcon).appendTo(actionBlock);


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                picker.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (o.showLabels === true) {
            picker.addClass("show-labels");
        }

        this.picker = picker;
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var picker = this.picker;

        picker.on(Metro.events.start, ".select-block ul", function(e){

            if (e.changedTouches) {
                return ;
            }

            var target = this;
            var pageY = Utils.pageXY(e).y;

            $(document).on(Metro.events.move + "-picker", function(e){

                target.scrollTop -= o.scrollSpeed * (pageY  > Utils.pageXY(e).y ? -1 : 1);

                pageY = Utils.pageXY(e).y;
            });

            $(document).on(Metro.events.stop + "-picker", function(e){
                $(document).off(Metro.events.move + "-picker");
                $(document).off(Metro.events.stop + "-picker");
            });
        });

        picker.on(Metro.events.click, function(e){
            if (that.isOpen === false) that.open();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-ok", function(e){
            var h, m, s, a;
            var sh = picker.find(".sel-hours li.active"),
                sm = picker.find(".sel-minutes li.active"),
                ss = picker.find(".sel-seconds li.active");

            h = sh.length === 0 ? 0 : sh.data("value");
            m = sm.length === 0 ? 0 : sm.data("value");
            s = ss.length === 0 ? 0 : ss.data("value");

            that.value = [h, m, s];
            that._normalizeValue();
            that._set();

            that.close();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-cancel", function(e){
            that.close();
            e.stopPropagation();
        });

        this._addScrollEvents();
    },

    _addScrollEvents: function(){
        var picker = this.picker, o = this.options;
        var lists = ['hours', 'minutes', 'seconds'];

        $.each(lists, function(){
            var list_name = this;
            var list = picker.find(".sel-" + list_name);

            if (list.length === 0) return ;

            list.on(Metro.events.scrollStart, function(){
                list.find(".active").removeClass("active");
            });

            list.on(Metro.events.scrollStop, {latency: 50}, function(){
                var target = Math.round((Math.ceil(list.scrollTop() + 40) / 40)) ;
                var target_element = list.find("li").eq(target + o.distance - 1);
                var scroll_to = target_element.position().top - (o.distance * 40) + list.scrollTop();

                list.animate({
                    scrollTop: scroll_to
                }, 100, function(){
                    target_element.addClass("active");
                    Utils.exec(o.onScroll, [target_element, list, picker]);
                });
            });
        });
    },

    _removeScrollEvents: function(){
        var picker = this.picker;
        var lists = ['hours', 'minutes', 'seconds'];
        $.each(lists, function(){
            picker.find(".sel-" + this).off("scrollstart scrollstop");
        });
    },

    _set: function(){
        var that = this, element = this.element, o = this.options;
        var picker = this.picker;
        var h = "00", m = "00", s = "00";

        if (o.hours === true) {
            h = parseInt(this.value[0]);
            if (h < 10) {
                h = "0"+h;
            }
            picker.find(".hours").html(h);
        }
        if (o.minutes === true) {
            m = parseInt(this.value[1]);
            if (m < 10) {
                m = "0"+m;
            }
            picker.find(".minutes").html(m);
        }
        if (o.seconds === true) {
            s = parseInt(this.value[2]);
            if (s < 10) {
                s = "0"+s;
            }
            picker.find(".seconds").html(s);
        }

        element.val([h, m, s].join(":")).trigger("change");

        Utils.exec(o.onSet, [this.value, element.val(), element, picker]);
    },

    open: function(){
        var that  = this, element = this.element, o = this.options;
        var picker = this.picker;
        var h, m, s;
        var h_list, m_list, s_list;
        var items = picker.find("li");
        var select_wrapper = picker.find(".select-wrapper");
        var select_wrapper_in_viewport, select_wrapper_rect;
        var h_item, m_item, s_item;

        select_wrapper.parent().removeClass("for-top for-bottom");
        select_wrapper.show();
        items.removeClass("active");

        select_wrapper_in_viewport = Utils.inViewport(select_wrapper);
        select_wrapper_rect = Utils.rect(select_wrapper);

        if (!select_wrapper_in_viewport && select_wrapper_rect.top > 0) {
            select_wrapper.parent().addClass("for-bottom");
        }

        if (!select_wrapper_in_viewport && select_wrapper_rect.top < 0) {
            select_wrapper.parent().addClass("for-top");
        }

        var animateList = function(list, item){
            list.scrollTop(0).animate({
                scrollTop: item.position().top - (o.distance * 40) + list.scrollTop()
            }, 100);
        };

        if (o.hours === true) {
            h = parseInt(this.value[0]);
            h_list = picker.find(".sel-hours");
            h_item = h_list.find("li.js-hours-" + h).addClass("active");
            animateList(h_list, h_item);
        }
        if (o.minutes === true) {
            m = parseInt(this.value[1]);
            m_list = picker.find(".sel-minutes");
            m_item = m_list.find("li.js-minutes-" + m).addClass("active");
            animateList(m_list, m_item);
        }
        if (o.seconds === true) {
            s = parseInt(this.value[2]);
            s_list = picker.find(".sel-seconds");
            s_item = s_list.find("li.js-seconds-" + s).addClass("active");
            animateList(s_list, s_item);
        }

        this.isOpen = true;

        Utils.exec(o.onOpen, [this.value, element, picker]);
    },

    close: function(){
        var picker = this.picker, o = this.options, element = this.element;
        picker.find(".select-wrapper").hide();
        this.isOpen = false;
        Utils.exec(o.onClose, [this.value, element, picker]);
    },

    _convert: function(t){
        var result;

        if (Array.isArray(t)) {
            result = t;
        } else if (typeof  t.getMonth === 'function') {
            result = [t.getHours(), t.getMinutes(), t.getSeconds()];
        } else if (Utils.isObject(t)) {
            result = [t.h, t.m, t.s];
        } else {
            result = Utils.strToArray(t, ":");
        }

        return result;
    },

    val: function(t){
        if (t === undefined) {
            return this.element.val();
        }
        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    time: function(t){
        if (t === undefined) {
            return {
                h: this.value[0],
                m: this.value[1],
                s: this.value[2]
            }
        }

        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    date: function(t){
        if (t === undefined || typeof t.getMonth !== 'function') {
            var ret = new Date();
            ret.setHours(this.value[0]);
            ret.setMinutes(this.value[1]);
            ret.setSeconds(this.value[2]);
            ret.setMilliseconds(0);
            return ret;
        }

        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element;

        var changeValueAttribute = function(){
            that.val(element.attr("data-value"));
        };

        switch (attributeName) {
            case "data-value": changeValueAttribute(); break;
        }
    }
};

Metro.plugin('timepicker', TimePicker);

$(document).on(Metro.events.click, function(e){
    $.each($(".time-picker"), function(){
        $(this).find("input").data("timepicker").close();
    });
});
