var Storage = {
    key: "METRO:APP",

    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );

        return this;
    },

    nvl: function(data, other){
        return data === undefined || data === null ? other : data;
    },

    setKey: function(key){
        this.key = key;
    },

    getKey: function(){
        return this.key;
    },

    setItem: function(key, value){
        window.localStorage.setItem(this.key + ":" + key, JSON.stringify(value));
    },

    getItem: function(key, default_value, reviver){
        var result, value;

        value = this.nvl(window.localStorage.getItem(this.key + ":" + key), default_value);

        try {
            result = JSON.parse(value, reviver);
        } catch (e) {
            result = null;
        }
        return result;
    },

    getItemPart: function(key, sub_key, default_value, reviver){
        var i;
        var val = this.getItem(key, default_value, reviver);

        sub_key = sub_key.split("->");
        for(i = 0; i < sub_key.length; i++) {
            val = val[sub_key[i]];
        }
        return val;
    },

    delItem: function(key){
        window.localStorage.removeItem(this.key + ":" + key)
    },

    size: function(unit){
        var divider;
        switch (unit) {
            case 'm':
            case 'M': {
                divider = 1024 * 1024;
                break;
            }
            case 'k':
            case 'K': {
                divider = 1024;
                break;
            }
            default: divider = 1;
        }
        return JSON.stringify(window.localStorage).length / divider;
    }
};

Metro['storage'] = Storage.init();