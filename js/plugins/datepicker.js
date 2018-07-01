var DatePicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.picker = null;
        this.isOpen = false;
        this.value = new Date();
        this.locale = Metro.locales[METRO_LOCALE]['calendar'];
        this.offset = (new Date()).getTimezoneOffset() / 60 + 1;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        gmt: 0,
        format: "%Y-%m-%d",
        locale: METRO_LOCALE,
        value: null,
        distance: 3,
        month: true,
        day: true,
        year: true,
        minYear: null,
        maxYear: null,
        scrollSpeed: 5,
        copyInlineStyles: true,
        clsPicker: "",
        clsPart: "",
        clsMonth: "",
        clsDay: "",
        clsYear: "",
        okButtonIcon: "<span class='default-icon-check'></span>",
        cancelButtonIcon: "<span class='default-icon-cross'></span>",
        onSet: Metro.noop,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onScroll: Metro.noop,
        onDatePickerCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

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
        var element = this.element, o = this.options;

        if (o.distance < 1) {
            o.distance = 1;
        }

        if (o.value !== null && Utils.isDate(o.value)) {
            this.value = (new Date(o.value)).addHours(this.offset);
        }

        if (Metro.locales[o.locale] === undefined) {
            o.locale = METRO_LOCALE;
        }

        this.locale = Metro.locales[o.locale]['calendar'];

        if (o.minYear === null) {
            o.minYear = (new Date()).getFullYear() - 100;
        }

        if (o.maxYear === null) {
            o.maxYear = (new Date()).getFullYear() + 100;
        }

        this._createStructure();
        this._createEvents();
        this._set();

        Utils.exec(o.onDatePickerCreate, [element]);
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var picker, month, day, year, i, j;
        var dateWrapper, selectWrapper, selectBlock, actionBlock;

        var prev = element.prev();
        var parent = element.parent();
        var id = Utils.elementId("date-picker");

        picker = $("<div>").attr("id", id).addClass("wheel-picker date-picker " + element[0].className).addClass(o.clsPicker);

        if (prev.length === 0) {
            parent.prepend(picker);
        } else {
            picker.insertAfter(prev);
        }

        element.appendTo(picker);


        dateWrapper = $("<div>").addClass("date-wrapper").appendTo(picker);

        if (o.month === true) {
            month = $("<div>").addClass("month").addClass(o.clsPart).addClass(o.clsMonth).appendTo(dateWrapper);
        }
        if (o.day === true) {
            day = $("<div>").addClass("day").addClass(o.clsPart).addClass(o.clsDay).appendTo(dateWrapper);
        }
        if (o.year === true) {
            year = $("<div>").addClass("year").addClass(o.clsPart).addClass(o.clsYear).appendTo(dateWrapper);
        }

        selectWrapper = $("<div>").addClass("select-wrapper").appendTo(picker);

        selectBlock = $("<div>").addClass("select-block").appendTo(selectWrapper);

        if (o.month === true) {
            month = $("<ul>").addClass("sel-month").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(month);
            for (i = 0; i < 12; i++) {
                $("<li>").addClass("js-month-"+i+" js-month-real-"+this.locale['months'][i].toLowerCase()).html(this.locale['months'][i]).data("value", i).appendTo(month);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(month);
        }

        if (o.day === true) {
            day = $("<ul>").addClass("sel-day").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(day);
            for (i = 0; i < 31; i++) {
                $("<li>").addClass("js-day-"+i+" js-day-real-"+(i+1)).html(i + 1).data("value", i + 1).appendTo(day);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(day);
        }

        if (o.year === true) {
            year = $("<ul>").addClass("sel-year").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(year);
            for (i = o.minYear, j = 0; i <= o.maxYear; i++, j++) {
                $("<li>").addClass("js-year-"+ j + " js-year-real-" + i).html(i).data("value", i).appendTo(year);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(year);
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

        this.picker = picker;
    },

    _createEvents: function(){
        var that = this, o = this.options;
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

            $(document).on(Metro.events.stop + "-picker", function(){
                $(document).off(Metro.events.move + "-picker");
                $(document).off(Metro.events.stop + "-picker");
            });
        });

        picker.on(Metro.events.click, function(e){
            if (that.isOpen === false) that.open();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-ok", function(e){
            var m, d, y;
            var sm = picker.find(".sel-month li.active"),
                sd = picker.find(".sel-day li.active"),
                sy = picker.find(".sel-year li.active");

            m = sm.length === 0 ? that.value.getMonth() : sm.data("value");
            d = sd.length === 0 ? that.value.getDate() : sd.data("value");
            y = sy.length === 0 ? that.value.getFullYear() : sy.data("value");

            that.value = new Date(y, m, d);
            that._correct();
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
        var lists = ['month', 'day', 'year'];
        $.each(lists, function(){
            var list_name = this;
            var list = picker.find(".sel-" + list_name);

            if (list.length === 0) return ;

            list.on(Metro.events.scrollStart, function(){
                list.find(".active").removeClass("active");
            });
            list.on(Metro.events.scrollStop, {latency: 50}, function(){
                var target = Math.round((Math.ceil(list.scrollTop()) / 40));
                var target_element = list.find(".js-"+list_name+"-"+target);
                var scroll_to = target_element.position().top - (o.distance * 40) + list.scrollTop() - 1;

                list.animate({
                    scrollTop: scroll_to
                }, 100, function(){
                    target_element.addClass("active");
                    Utils.exec(o.onScroll, [target_element, list, picker], list[0]);
                });
            });
        });
    },

    _removeScrollEvents: function(){
        var picker = this.picker;
        var lists = ['month', 'day', 'year'];
        $.each(lists, function(){
            picker.find(".sel-" + this).off("scrollstart scrollstop");
        });
    },

    _correct: function(){
        var m = this.value.getMonth(),
            d = this.value.getDate(),
            y = this.value.getFullYear();

        this.value = new Date(y, m, d);
    },

    _set: function(){
        var element = this.element, o = this.options;
        var picker = this.picker;
        var m = this.locale['months'][this.value.getMonth()],
            d = this.value.getDate(),
            y = this.value.getFullYear();

        if (o.month === true) {
            picker.find(".month").html(m);
        }
        if (o.day === true) {
            picker.find(".day").html(d);
        }
        if (o.year === true) {
            picker.find(".year").html(y);
        }

        element.val(this.value.format(o.format, o.locale)).trigger("change");

        Utils.exec(o.onSet, [this.value, element.val(), element, picker], element[0]);

    },

    open: function(){
        var element = this.element, o = this.options;
        var picker = this.picker;
        var m = this.value.getMonth(), d = this.value.getDate() - 1, y = this.value.getFullYear();
        var m_list, d_list, y_list;
        var select_wrapper = picker.find(".select-wrapper");
        var select_wrapper_in_viewport, select_wrapper_rect;

        select_wrapper.parent().removeClass("for-top for-bottom");
        select_wrapper.show();
        picker.find("li").removeClass("active");

        select_wrapper_in_viewport = Utils.inViewport(select_wrapper);
        select_wrapper_rect = Utils.rect(select_wrapper);

        if (!select_wrapper_in_viewport && select_wrapper_rect.top > 0) {
            select_wrapper.parent().addClass("for-bottom");
        }

        if (!select_wrapper_in_viewport && select_wrapper_rect.top < 0) {
            select_wrapper.parent().addClass("for-top");
        }

        if (o.month === true) {
            m_list = picker.find(".sel-month");
            m_list.scrollTop(0).animate({
                scrollTop: m_list.find("li.js-month-" + m).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }
        if (o.day === true) {
            d_list = picker.find(".sel-day");
            d_list.scrollTop(0).animate({
                scrollTop: d_list.find("li.js-day-" + d).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }
        if (o.year === true) {
            y_list = picker.find(".sel-year");
            y_list.scrollTop(0).animate({
                scrollTop: y_list.find("li.js-year-real-" + y).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }

        this.isOpen = true;

        Utils.exec(o.onOpen, [this.value, element, picker], element[0]);
    },

    close: function(){
        var picker = this.picker, o = this.options, element = this.element;
        picker.find(".select-wrapper").hide();
        this.isOpen = false;
        Utils.exec(o.onClose, [this.value, element, picker], element[0]);
    },

    val: function(t){
        if (t === undefined) {
            return this.element.val();
        }
        if (Utils.isDate(t) === false) {
            return false;
        }
        this.value = (new Date(t)).addHours(this.offset);
        this._set();
    },

    date: function(t){
        if (t === undefined) {
            return this.value;
        }

        try {
            this.value = new Date(t.format("%Y-%m-%d"));
            this._set();
        } catch (e) {
            return false;
        }
    },

    changeValueAttribute: function(){
        this.val(this.element.attr("data-value"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.changeValueAttribute(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var picker = this.picker;
        var parent = element.parent();

        this._removeScrollEvents();

        picker.off(Metro.events.start, ".select-block ul");
        picker.off(Metro.events.click);
        picker.off(Metro.events.click, ".action-ok");
        picker.off(Metro.events.click, ".action-cancel");

        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('datepicker', DatePicker);

$(document).on(Metro.events.click, function(){
    $.each($(".date-picker"), function(){
        $(this).find("input").data("datepicker").close();
    });
});