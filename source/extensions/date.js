/* global Metro, METRO_WEEK_START */
(function(Metro) {
    'use strict';
    Date.prototype.getWeek = function (dowOffset) {
        var nYear, nday, newYear, day, daynum, weeknum;

        dowOffset = typeof dowOffset === "undefined" || isNaN(dowOffset) ? METRO_WEEK_START : typeof dowOffset === 'number' ? parseInt(dowOffset) : 0;
        newYear = new Date(this.getFullYear(),0,1);
        day = newYear.getDay() - dowOffset;
        day = (day >= 0 ? day : day + 7);
        daynum = Math.floor((this.getTime() - newYear.getTime() -
            (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;

        if(day < 4) {
            weeknum = Math.floor((daynum+day-1)/7) + 1;
            if(weeknum > 52) {
                nYear = new Date(this.getFullYear() + 1,0,1);
                nday = nYear.getDay() - dowOffset;
                nday = nday >= 0 ? nday : nday + 7;
                weeknum = nday < 4 ? 1 : 53;
            }
        }
        else {
            weeknum = Math.floor((daynum+day-1)/7);
        }
        return weeknum;
    };

    Date.prototype.getYear = function(){
        return this.getFullYear().toString().substr(-2);
    };

    Date.prototype.format = function(format, locale){

        if (locale === undefined) {
            locale = "en-US";
        }

        var cal = (Metro.locales !== undefined && Metro.locales[locale] !== undefined ? Metro.locales[locale] : Metro.locales["en-US"])['calendar'];

        var date = this;
        var nDay = date.getDay(),
            nDate = date.getDate(),
            nMonth = date.getMonth(),
            nYear = date.getFullYear(),
            nHour = date.getHours(),
            aDays = cal['days'],
            aMonths = cal['months'],
            aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
            isLeapYear = function() {
                return (nYear%4===0 && nYear%100!==0) || nYear%400===0;
            },
            getThursday = function() {
                var target = new Date(date);
                target.setDate(nDate - ((nDay+6)%7) + 3);
                return target;
            },
            zeroPad = function(nNum, nPad) {
                return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
            };
        return format.replace(/(%[a-z])/gi, function(sMatch) {
            return {
                '%a': aDays[nDay].slice(0,3),
                '%A': aDays[nDay],
                '%b': aMonths[nMonth].slice(0,3),
                '%B': aMonths[nMonth],
                '%c': date.toUTCString(),
                '%C': Math.floor(nYear/100),
                '%d': zeroPad(nDate, 2),
                'dd': zeroPad(nDate, 2),
                '%e': nDate,
                '%F': date.toISOString().slice(0,10),
                '%G': getThursday().getFullYear(),
                '%g': ('' + getThursday().getFullYear()).slice(2),
                '%H': zeroPad(nHour, 2),
                // 'HH': zeroPad(nHour, 2),
                '%I': zeroPad((nHour+11)%12 + 1, 2),
                '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth>1 && isLeapYear()) ? 1 : 0), 3),
                '%k': '' + nHour,
                '%l': (nHour+11)%12 + 1,
                '%m': zeroPad(nMonth + 1, 2),
                // 'mm': zeroPad(nMonth + 1, 2),
                '%M': zeroPad(date.getMinutes(), 2),
                // 'MM': zeroPad(date.getMinutes(), 2),
                '%p': (nHour<12) ? 'AM' : 'PM',
                '%P': (nHour<12) ? 'am' : 'pm',
                '%s': Math.round(date.getTime()/1000),
                // 'ss': Math.round(date.getTime()/1000),
                '%S': zeroPad(date.getSeconds(), 2),
                // 'SS': zeroPad(date.getSeconds(), 2),
                '%u': nDay || 7,
                '%V': (function() {
                    var target = getThursday(),
                        n1stThu = target.valueOf();
                    target.setMonth(0, 1);
                    var nJan1 = target.getDay();
                    if (nJan1!==4) target.setMonth(0, 1 + ((4-nJan1)+7)%7);
                    return zeroPad(1 + Math.ceil((n1stThu-target)/604800000), 2);
                })(),
                '%w': '' + nDay,
                '%x': date.toLocaleDateString(),
                '%X': date.toLocaleTimeString(),
                '%y': ('' + nYear).slice(2),
                // 'yy': ('' + nYear).slice(2),
                '%Y': nYear,
                // 'YYYY': nYear,
                '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
                '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
            }[sMatch] || sMatch;
        });
    };

    Date.prototype.addHours = function(n) {
        this.setTime(this.getTime() + (n*60*60*1000));
        return this;
    };

    Date.prototype.addDays = function(n) {
        this.setDate(this.getDate() + (n));
        return this;
    };

    Date.prototype.addMonths = function(n) {
        this.setMonth(this.getMonth() + (n));
        return this;
    };

    Date.prototype.addYears = function(n) {
        this.setFullYear(this.getFullYear() + (n));
        return this;
    };
}(Metro));