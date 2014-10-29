// DatePicker

(function( $ ) {
    $.widget("metro.datepicker", {

        version: "1.0.0",

        options: {
            format: "dd.mm.yyyy",
            date: undefined,
            effect: 'none',
            position: 'bottom',
            locale: $.Metro.currentLocale,
            weekStart: (METRO_WEEK_START != undefined ? METRO_WEEK_START : 0), // 0 - Sunday, 1 - Monday
            otherDays: false,
            selected: function(d, d0){},
            _calendar: undefined
        },


        _create: function(){
            var that = this,
                element = this.element,
                input = element.children("input"),
                button = element.children("button.btn-date");

            if (element.data('date') != undefined) this.options.date = element.data('date');
            if (element.data('format') != undefined) this.options.format = element.data('format');
            if (element.data('effect') != undefined) this.options.effect = element.data('effect');
            if (element.data('position') != undefined) this.options.position = element.data('position');
            if (element.data('locale') != undefined) this.options.locale = element.data('locale');
            if (element.data('weekStart') != undefined) this.options.weekStart = element.data('weekStart');
            if (element.data('otherDays') != undefined) this.options.otherDays = element.data('otherDays');

            this._createCalendar(element, this.options.date);

            input.attr('readonly', true);
            button.attr('type', 'button');

            button.on('click', function(e){
                e.stopPropagation();
                if (that.options._calendar.css('display') == 'none') {
                    that._show();
                } else {
                    that._hide();
                }
            });

            element.on('click', function(e){
                e.stopPropagation();
                if (that.options._calendar.css('display') == 'none') {
                    that._show();
                } else {
                    that._hide();
                }
            });

            $('html').on('click', function(e){
                $(".calendar-dropdown").hide();
            })
        },

        _createCalendar: function(to, curDate){
            var _calendar, that = this;

            _calendar = $("<div/>").css({
                position: 'absolute'
                , display: 'none'
                , 'max-width': 260
                , 'z-index': 1000

            }).addClass('calendar calendar-dropdown').appendTo(to);

            if (that.options.date != undefined) {
                _calendar.data('date', that.options.date);
            }

            _calendar.calendar({
                multiSelect: false,
                format: that.options.format,
                buttons: false,
                locale: that.options.locale,
                otherDays: that.options.otherDays,
                weekStart: that.options.weekStart,
                click: function(d, d0){
                    //console.log(d, d0);
                    _calendar.calendar('setDate', d0);
                    to.children("input[type=text]").val(d);
                    that.options.selected(d, d0);
                    that._hide();
                }
            });

            if (curDate != undefined) {
                _calendar.calendar('setDate', curDate);
                to.children("input[type=text]").val(_calendar.calendar('getDate'));
            }

            // Set position
            switch (this.options.position) {
                case 'top': _calendar.css({top: (0-_calendar.height()), left: 0}); break;
                default: _calendar.css({top: '100%', left: 0});
            }

            this.options._calendar = _calendar;
        },

        _show: function(){
            if (this.options.effect == 'slide') {
                $(".calendar-dropdown").slideUp('fast');
                this.options._calendar.slideDown('fast');
            } else if (this.options.effect == 'fade') {
                $(".calendar-dropdown").fadeOut('fast');
                this.options._calendar.fadeIn('fast');
            } else {
                $(".calendar-dropdown").hide();
                this.options._calendar.show();
            }
        },
        _hide: function(){
            if (this.options.effect == 'slide') {
                this.options._calendar.slideUp('fast');
            } else if (this.options.effect == 'fade') {
                this.options._calendar.fadeOut('fast');
            } else {
                this.options._calendar.hide();
            }
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );


