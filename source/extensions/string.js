/* global Datetime, datetime */

(function() {
    'use strict';

    String.prototype.toArray = function(delimiter, type, format, locale){
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
                case "date": result = !format ? datetime(s) : Datetime.from(s, format, locale || 'en-US'); break;
                default: result = s.trim();
            }

            return result;
        });
    };

    String.prototype.capitalize = function(){
        var str = this;
        return str.substr(0, 1).toUpperCase() + str.substr(1)
    }
}());