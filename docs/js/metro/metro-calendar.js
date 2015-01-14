// Calendar

(function( $ ) {
    $.widget("metro.calendar", {

        version: "1.0.0",

        options: {
            format: "yyyy-mm-dd",
            multiSelect: false,
            startMode: 'day', //year, month, day
            weekStart: (METRO_WEEK_START != undefined ? METRO_WEEK_START : 0), // 0 - Sunday, 1 - Monday
            otherDays: false,
            date: new Date(),
            buttons: true,
            locale: $.Metro.currentLocale,
            getDates: function(d){},
            click: function(d, d0){},
            _storage: []
        },

        _year: 0,
        _month: 0,
        _day: 0,
        _today: new Date(),
        _event: '',

        _mode: 'day', // day, month, year
        _distance: 0,

        _events: [],

        _create: function(){
            var element = this.element;

            if (element.data('multiSelect') != undefined) this.options.multiSelect = element.data("multiSelect");
            if (element.data('format') != undefined) this.options.format = element.data("format");
            if (element.data('date') != undefined) this.options.date = new Date(element.data("date"));
            if (element.data('locale') != undefined) this.options.locale = element.data("locale");
            if (element.data('startMode') != undefined) this.options.startMode = element.data('startMode');
            if (element.data('weekStart') != undefined) this.options.weekStart = element.data('weekStart');
            if (element.data('otherDays') != undefined) this.options.otherDays = element.data('otherDays');

            this._year = this.options.date.getFullYear();
            this._distance = parseInt(this.options.date.getFullYear())-4;
            this._month = this.options.date.getMonth();
            this._day = this.options.date.getDate();
            this._mode = this.options.startMode;

            element.data("_storage", []);

            this._renderCalendar();
        },

        _renderMonth: function(){
            var year = this._year,
                month = this._month,
                day = this._day,
                event = this._event,
                feb = 28;

            if (month == 1) {
                if ((year%100!=0) && (year%4==0) || (year%400==0)) {
                    feb = 29;
                }
            }

            var totalDays = ["31", ""+feb+"","31","30","31","30","31","31","30","31","30","31"];
            var daysInMonth = totalDays[month];
            var first_week_day = new Date(year, month, 1).getDay();

            var table, tr, td, i;

            this.element.html("");

            table = $("<table/>").addClass("bordered");

            // Add calendar header
            tr = $("<tr/>");

            $("<td/>").addClass("text-center").html("<a class='btn-previous-year' href='#'><i class='icon-previous'></i></a>").appendTo(tr);
            $("<td/>").addClass("text-center").html("<a class='btn-previous-month' href='#'><i class='icon-arrow-left-4'></i></a>").appendTo(tr);

            $("<td/>").attr("colspan", 3).addClass("text-center").html("<a class='btn-select-month' href='#'>"+ $.Metro.Locale[this.options.locale].months[month]+' '+year+"</a>").appendTo(tr);

            $("<td/>").addClass("text-center").html("<a class='btn-next-month' href='#'><i class='icon-arrow-right-4'></i></a>").appendTo(tr);
            $("<td/>").addClass("text-center").html("<a class='btn-next-year' href='#'><i class='icon-next'></i></a>").appendTo(tr);

            tr.addClass("calendar-header").appendTo(table);

            // Add day names
            var j;
            tr = $("<tr/>");
            for(i = 0; i < 7; i++) {
                if (!this.options.weekStart)
                    td = $("<td/>").addClass("text-center day-of-week").html($.Metro.Locale[this.options.locale].days[i+7]).appendTo(tr);
                else {
                    j = i + 1;
                    if (j == 7) j = 0;
                    td = $("<td/>").addClass("text-center day-of-week").html($.Metro.Locale[this.options.locale].days[j+7]).appendTo(tr);

                }
            }
            tr.addClass("calendar-subheader").appendTo(table);

            // Add empty days for previos month
            var prevMonth = this._month - 1; if (prevMonth < 0) prevMonth = 11; var daysInPrevMonth = totalDays[prevMonth];
            var _first_week_day = ((this.options.weekStart) ? first_week_day + 6 : first_week_day)%7;
            var htmlPrevDay = "";
            tr = $("<tr/>");
            for(i = 0; i < _first_week_day; i++) {
                if (this.options.otherDays) htmlPrevDay = daysInPrevMonth - (_first_week_day - i - 1);
                td = $("<td/>").addClass("empty").html("<small class='other-day'>"+htmlPrevDay+"</small>").appendTo(tr);
            }

            var week_day = ((this.options.weekStart) ? first_week_day + 6 : first_week_day)%7;
            //console.log(week_day, week_day%7);

            for (i = 1; i <= daysInMonth; i++) {
                //console.log(week_day, week_day%7);

                week_day %= 7;

                if (week_day == 0) {
                    tr.appendTo(table);
                    tr = $("<tr/>");
                }

                td = $("<td/>").addClass("text-center day").html("<a href='#'>"+i+"</a>");
                if (year == this._today.getFullYear() && month == this._today.getMonth() && this._today.getDate() == i) {
                    td.addClass("today");
                }

                var d = (new Date(this._year, this._month, i)).format('yyyy-mm-dd');
                if (this.element.data('_storage').indexOf(d)>=0) {
                    td.find("a").addClass("selected");
                }

                td.appendTo(tr);
                week_day++;
            }

            // next month other days
            var htmlOtherDays = "";
            for (i = week_day+1; i<=7; i++){
                if (this.options.otherDays) htmlOtherDays = i - week_day;
                td = $("<td/>").addClass("empty").html("<small class='other-day'>"+htmlOtherDays+"</small>").appendTo(tr);
            }

            tr.appendTo(table);

            if (this.options.buttons) {
                tr = $("<tr/>").addClass("calendar-actions");
                td = $("<td/>").attr('colspan', 7).addClass("text-left").html("" +
                    "<button class='button calendar-btn-today small success'>"+$.Metro.Locale[this.options.locale].buttons[0]+
                    "</button>&nbsp;<button class='button calendar-btn-clear small warning'>"+$.Metro.Locale[this.options.locale].buttons[1]+"</button>");
                td.appendTo(tr);
                tr.appendTo(table);
            }

            table.appendTo(this.element);

            this.options.getDates(this.element.data('_storage'));
        },

        _renderMonths: function(){
            var table, tr, td, i, j;

            this.element.html("");

            table = $("<table/>").addClass("bordered");

            // Add calendar header
            tr = $("<tr/>");

            $("<td/>").addClass("text-center").html("<a class='btn-previous-year' href='#'><i class='icon-arrow-left-4'></i></a>").appendTo(tr);
            $("<td/>").attr("colspan", 2).addClass("text-center").html("<a class='btn-select-year' href='#'>"+this._year+"</a>").appendTo(tr);
            $("<td/>").addClass("text-center").html("<a class='btn-next-year' href='#'><i class='icon-arrow-right-4'></i></a>").appendTo(tr);

            tr.addClass("calendar-header").appendTo(table);

            tr = $("<tr/>");
            j = 0;
            for (i=0;i<12;i++) {

                //td = $("<td/>").addClass("text-center month").html("<a href='#' data-month='"+i+"'>"+this.options.monthsShort[i]+"</a>");
                td = $("<td/>").addClass("text-center month").html("<a href='#' data-month='"+i+"'>"+$.Metro.Locale[this.options.locale].months[i+12]+"</a>");

                if (this._month == i && (new Date()).getFullYear() == this._year) {
                    td.addClass("today");
                }

                td.appendTo(tr);
                if ((j+1) % 4 == 0) {
                    tr.appendTo(table);
                    tr = $("<tr/>");
                }
                j+=1;
            }

            table.appendTo(this.element);
        },

        _renderYears: function(){
            var table, tr, td, i, j;

            this.element.html("");

            table = $("<table/>").addClass("bordered");

            // Add calendar header
            tr = $("<tr/>");

            $("<td/>").addClass("text-center").html("<a class='btn-previous-year' href='#'><i class='icon-arrow-left-4'></i></a>").appendTo(tr);
            $("<td/>").attr("colspan", 2).addClass("text-center").html( (this._distance)+"-"+(this._distance+11) ).appendTo(tr);
            $("<td/>").addClass("text-center").html("<a class='btn-next-year' href='#'><i class='icon-arrow-right-4'></i></a>").appendTo(tr);

            tr.addClass("calendar-header").appendTo(table);

            tr = $("<tr/>");

            j = 0;
            for (i=this._distance;i<this._distance+12;i++) {
                td = $("<td/>").addClass("text-center year").html("<a href='#' data-year='"+i+"'>"+i+"</a>");
                if ((new Date()).getFullYear() == i) {
                    td.addClass("today");
                }
                td.appendTo(tr);
                if ((j+1) % 4 == 0) {
                    tr.appendTo(table);
                    tr = $("<tr/>");
                }
                j+=1;
            }

            table.appendTo(this.element);
        },

        _renderCalendar: function(){
            switch (this._mode) {
                case 'year': this._renderYears(); break;
                case 'month': this._renderMonths(); break;
                default: this._renderMonth();
            }
            this._initButtons();
        },

        _initButtons: function(){
            // Add actions
            var that = this, table = this.element.find('table');

            if (this._mode == 'day') {
                table.find('.btn-select-month').on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    that._mode = 'month';
                    that._renderCalendar();
                });
                table.find('.btn-previous-month').on('click', function(e){
                    that._event = 'eventPrevious';
                    e.preventDefault();
                    e.stopPropagation();
                    that._month -= 1;
                    if (that._month < 0) {
                        that._year -= 1;
                        that._month = 11;
                    }
                    that._renderCalendar();
                });
                table.find('.btn-next-month').on('click', function(e){
                    that._event = 'eventNext';
                    e.preventDefault();
                    e.stopPropagation();
                    that._month += 1;
                    if (that._month == 12) {
                        that._year += 1;
                        that._month = 0;
                    }
                    that._renderCalendar();
                });
                table.find('.btn-previous-year').on('click', function(e){
                    that._event = 'eventPrevious';
                    e.preventDefault();
                    e.stopPropagation();
                    that._year -= 1;
                    that._renderCalendar();
                });
                table.find('.btn-next-year').on('click', function(e){
                    that._event = 'eventNext';
                    e.preventDefault();
                    e.stopPropagation();
                    that._year += 1;
                    that._renderCalendar();
                });
                table.find('.calendar-btn-today').on('click', function(e){
                    that._event = 'eventNext';
                    e.preventDefault();
                    e.stopPropagation();
                    that.options.date = new Date();
                    that._year = that.options.date.getFullYear();
                    that._month = that.options.date.getMonth();
                    that._day = that.options.date.getDate();
                    that._renderCalendar();
                });
                table.find('.calendar-btn-clear').on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    that.options.date = new Date();
                    that._year = that.options.date.getFullYear();
                    that._month = that.options.date.getMonth();
                    that._day = that.options.date.getDate();
                    that.element.data('_storage', []);
                    that._renderCalendar();
                });
                table.find('.day a').on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    var d = (new Date(that._year, that._month, parseInt($(this).html()))).format(that.options.format,null);
                    var d0 = (new Date(that._year, that._month, parseInt($(this).html())));

                    if (that.options.multiSelect) {
                        $(this).toggleClass("selected");

                        if ($(this).hasClass("selected")) {
                            that._addDate(d);
                        } else {
                            that._removeDate(d);
                        }
                    } else {
                        table.find('.day a').removeClass('selected');
                        $(this).addClass("selected");
                        that.element.data('_storage', []);
                        that._addDate(d);
                    }
                    that.options.getDates(that.element.data('_storage'));
                    that.options.click(d, d0);
                });
            } else if (this._mode == 'month') {
                table.find('.month a').on('click', function(e){
                    that._event = 'eventNext';
                    e.preventDefault();
                    e.stopPropagation();
                    that._month = parseInt($(this).data('month'));
                    that._mode = 'day';
                    that._renderCalendar();
                });
                table.find('.btn-previous-year').on('click', function(e){
                    that._event = 'eventPrevious';
                    e.preventDefault();
                    e.stopPropagation();
                    that._year -= 1;
                    that._renderCalendar();
                });
                table.find('.btn-next-year').on('click', function(e){
                    that._event = 'eventNext';
                    e.preventDefault();
                    e.stopPropagation();
                    that._year += 1;
                    that._renderCalendar();
                });
                table.find('.btn-select-year').on('click', function(e){
                    that._event = 'eventNext';
                    e.preventDefault();
                    e.stopPropagation();
                    that._mode = 'year';
                    that._renderCalendar();
                });
            } else {
                table.find('.year a').on('click', function(e){
                    that._event = 'eventNext';
                    e.preventDefault();
                    e.stopPropagation();
                    that._year = parseInt($(this).data('year'));
                    that._mode = 'month';
                    that._renderCalendar();
                });
                table.find('.btn-previous-year').on('click', function(e){
                    that._event = 'eventPrevious';
                    e.preventDefault();
                    e.stopPropagation();
                    that._distance -= 10;
                    that._renderCalendar();
                });
                table.find('.btn-next-year').on('click', function(e){
                    that._event = 'eventNext';
                    e.preventDefault();
                    e.stopPropagation();
                    that._distance += 10;
                    that._renderCalendar();
                });
            }
        },

        _addDate: function(d){
            var index = this.element.data('_storage').indexOf(d);
            if (index < 0) this.element.data('_storage').push(d);
        },

        _removeDate: function(d){
            var index = this.element.data('_storage').indexOf(d);
            this.element.data('_storage').splice(index, 1);
        },

        setDate: function(d){
            var r;
            d = new Date(d);
            r = (new Date(d.getFullYear()+"/"+ (d.getMonth()+1)+"/"+ d.getDate())).format('yyyy-mm-dd');
            this._addDate(r);
            this._renderCalendar();
        },

        getDate: function(index){
            return new Date(index != undefined ? this.element.data('_storage')[index] : this.element.data('_storage')[0]).format(this.options.format);
        },

        getDates: function(){
            return this.element.data('_storage');
        },

        unsetDate: function(d){
            var r;
            d = new Date(d);
            r = (new Date(d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+ d.getDate())).format('yyyy-mm-dd');
            this._removeDate(r);
            this._renderCalendar();
        },

        _destroy: function(){},

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );



