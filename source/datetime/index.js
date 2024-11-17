/** @format */

import { Datetime, datetime, info } from "@olton/datetime";

Datetime.info = info;

globalThis.Datetime = Datetime;
globalThis.datetime = datetime;

(function () {
    "use strict";

    const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    var getLocale = Datetime.getLocale;

    Datetime.getLocale = function (locale) {
        var data;

        if (!Metro) {
            locale = "en";
            return getLocale.call(this, locale);
        }

        if (!Metro.locales[locale]) {
            locale = "en";
        }

        data = Metro.locales[locale];

        const months = MONTHS.map(function (el, i) {
            return data[el];
        });
        const monthsShort = MONTHS.map(function (el, i) {
            return data[`${el}_short`];
        });
        const weekdays = DAYS.map(function (el, i) {
            return data[el];
        });
        const weekdaysShort = DAYS.map(function (el, i) {
            return data[`${el}_short`];
        });
        const weekdaysMin = DAYS.map(function (el, i) {
            return data[`${el}_short_2`];
        });

        return {
            months,
            monthsShort,
            weekdays,
            weekdaysShort,
            weekdaysMin,
            weekStart: data.weekStart,
        };
    };
})();
