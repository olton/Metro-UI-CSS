/* global Metro */
(function(Metro, $) {
    'use strict';

    String.prototype.camelCase = function(){
        return $.camelCase(this);
    };

    String.prototype.dashedName = function(){
        return $.dashedName(this);
    };

    String.prototype.shuffle = function(){
        var _shuffle = function (a) {
            var currentIndex = a.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = a[currentIndex];
                a[currentIndex] = a[randomIndex];
                a[randomIndex] = temporaryValue;
            }

            return a;
        };

        return _shuffle(this.split("")).join("");
    }

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    String.prototype.contains = function() {
        return !!~String.prototype.indexOf.apply(this, arguments);
    };

    if (typeof String.includes !== "function") {
        String.prototype.includes = function(){
            return !!~String.prototype.indexOf.apply(this, arguments);
        }
    }

    String.prototype.toDate = function(format, locale) {
        var result;
        var normalized, normalizedFormat, formatItems, dateItems, checkValue;
        var monthIndex, dayIndex, yearIndex, hourIndex, minutesIndex, secondsIndex;
        var year, month, day, hour, minute, second;
        var parsedMonth;

        locale = locale || "en-US";

        var monthNameToNumber = function(month){
            var d, months, index, i;
            var Locales = Metro.locales;

            if (typeof month === "undefined" || month === null) {
                return -1;
            }

            month = month.substr(0, 3);

            if (
                locale !== undefined
                && locale !== "en-US"
                && Locales !== undefined
                && Locales[locale] !== undefined
                && Locales[locale]['calendar'] !== undefined
                && Locales[locale]['calendar']['months'] !== undefined
            ) {
                months = Locales[locale]['calendar']['months'];
                for(i = 12; i < months.length; i++) {
                    if (months[i].toLowerCase() === month.toLowerCase()) {
                        index = i - 12;
                        break;
                    }
                }
                month = Locales["en-US"]['calendar']['months'][index];
            }

            d = Date.parse(month + " 1, 1972");
            if(!isNaN(d)){
                return new Date(d).getMonth() + 1;
            }
            return -1;
        };

        if (format === undefined || format === null || format === "") {
            return new Date(this);
        }

        /* eslint-disable-next-line */
        normalized      = this.replace(/[\/,.:\s]/g, '-');
        /* eslint-disable-next-line */
        normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9%]/g, '-');
        formatItems     = normalizedFormat.split('-');
        dateItems       = normalized.split('-');
        checkValue      = normalized.replace(/-/g,"");

        if (checkValue.trim() === "") {
            return "Invalid Date";
        }

        monthIndex  = formatItems.indexOf("mm") > -1 ? formatItems.indexOf("mm") : formatItems.indexOf("%m");
        dayIndex    = formatItems.indexOf("dd") > -1 ? formatItems.indexOf("dd") : formatItems.indexOf("%d");
        yearIndex   = formatItems.indexOf("yyyy") > -1 ? formatItems.indexOf("yyyy") : formatItems.indexOf("yy") > -1 ? formatItems.indexOf("yy") : formatItems.indexOf("%y");
        hourIndex     = formatItems.indexOf("hh") > -1 ? formatItems.indexOf("hh") : formatItems.indexOf("%h");
        minutesIndex  = formatItems.indexOf("ii") > -1 ? formatItems.indexOf("ii") : formatItems.indexOf("mi") > -1 ? formatItems.indexOf("mi") : formatItems.indexOf("%i");
        secondsIndex  = formatItems.indexOf("ss") > -1 ? formatItems.indexOf("ss") : formatItems.indexOf("%s");

        if (monthIndex > -1 && dateItems[monthIndex] !== "") {
            if (isNaN(parseInt(dateItems[monthIndex]))) {
                dateItems[monthIndex] = monthNameToNumber(dateItems[monthIndex]);
                if (dateItems[monthIndex] === -1) {
                    return "Invalid Date";
                }
            } else {
                parsedMonth = parseInt(dateItems[monthIndex]);
                if (parsedMonth < 1 || parsedMonth > 12) {
                    return "Invalid Date";
                }
            }
        } else {
            return "Invalid Date";
        }

        year  = yearIndex >-1 && dateItems[yearIndex] !== "" ? dateItems[yearIndex] : null;
        month = monthIndex >-1 && dateItems[monthIndex] !== "" ? dateItems[monthIndex] : null;
        day   = dayIndex >-1 && dateItems[dayIndex] !== "" ? dateItems[dayIndex] : null;

        hour    = hourIndex >-1 && dateItems[hourIndex] !== "" ? dateItems[hourIndex] : null;
        minute  = minutesIndex>-1 && dateItems[minutesIndex] !== "" ? dateItems[minutesIndex] : null;
        second  = secondsIndex>-1 && dateItems[secondsIndex] !== "" ? dateItems[secondsIndex] : null;

        result = new Date(year,month-1,day,hour,minute,second);

        return result;
    };

    String.prototype.toArray = function(delimiter, type, format){
        var str = this;
        var a;

        type = type || "string";
        delimiter = delimiter || ",";
        format = format === undefined || format === null ? false : format;

        a = (""+str).split(delimiter);

        return a.map(function(s){
            var result;

            switch (type) {
                case "int":
                case "integer": result = isNaN(s) ? s.trim() : parseInt(s); break;
                case "number":
                case "float": result = isNaN(s) ? s : parseFloat(s); break;
                case "date": result = !format ? new Date(s) : s.toDate(format); break;
                default: result = s.trim();
            }

            return result;
        });
    };
}(Metro, m4q));