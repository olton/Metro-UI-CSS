(function() {
    'use strict';

    if (typeof Array.shuffle !== "function") {
        Array.prototype.shuffle = function () {
            var currentIndex = this.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = this[currentIndex];
                this[currentIndex] = this[randomIndex];
                this[randomIndex] = temporaryValue;
            }

            return this;
        };
    }

    if (typeof Array.clone !== "function") {
        Array.prototype.clone = function () {
            return this.slice(0);
        };
    }

    if (typeof Array.unique !== "function") {
        Array.prototype.unique = function () {
            var a = this.concat();
            for (var i = 0; i < a.length; ++i) {
                for (var j = i + 1; j < a.length; ++j) {
                    if (a[i] === a[j])
                        a.splice(j--, 1);
                }
            }

            return a;
        };
    }

    if (typeof Array.from !== "function") {
        Array.prototype.from = function(val) {
            var i, a = [];

            if (val.length === undefined && typeof val === "object") {
                return Object.values(val);
            }

            if (val.length !== undefined) {
                for(i = 0; i < val.length; i++) {
                    a.push(val[i]);
                }
                return a;
            }

            throw new Error("Value can not be converted to array");
        };
    }

    if (typeof Array.contains !== "function") {
        Array.prototype.contains = function(val, from){
            return this.indexOf(val, from) > -1;
        }
    }

    if (typeof Array.includes !== "function") {
        Array.prototype.includes = function(val, from){
            return this.indexOf(val, from) > -1;
        }
    }
}());