/* global Metro */

Metro.cookie = {
    getCookies: function(){
        var a = document.cookie.split(";");
        var o = {};
        $.each(a, function(){
            var i = this.split('=');
            o[i[0]] = i[1];
        });
        return o;
    },

    getCookie: function(name){
        var cookieName = encodeURIComponent(name) + "=";
        var cookies = document.cookie.split(";");
        var i, cookie;

        for(i = 0; i < cookies.length; i++) {
            cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    },

    setCookie: function(name, value, duration, path){
        var date, expires = '';

        if (duration) {
            date = new Date();
            date.setTime(date.getTime()+(duration));
            expires = '; expires=' + date.toUTCString();
        }

        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=' + (path || '/');
    },

    delCookie: function(name){
        this.setCookie(name, false, -1);
    }
}