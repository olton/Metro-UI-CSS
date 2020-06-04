(function() {
    'use strict';

    if ( typeof Object.create !== 'function' ) {
        Object.create = function (o) {
            function F() {}
            F.prototype = o;
            return new F();
        };
    }

    if (typeof Object.values !== 'function') {
        Object.values = function(obj) {
            return Object.keys(obj).map(function(e) {
                return obj[e]
            });
        }
    }
}());