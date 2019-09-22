var Storage = function(type){
    return new Storage.init(type);
};

Storage.prototype = {
    setKey: function(key){
        this.key = key
    },

    getKey: function(){
        return this.key;
    },

    setItem: function(key, value){
        this.storage.setItem(this.key + ":" + key, JSON.stringify(value));
    },

    getItem: function(key, default_value, reviver){
        var result, value;

        value = this.storage.getItem(this.key + ":" + key);

        try {
            result = JSON.parse(value, reviver);
        } catch (e) {
            result = null;
        }
        return Utils.nvl(result, default_value);
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
        this.storage.removeItem(this.key + ":" + key)
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
        return JSON.stringify(this.storage).length / divider;
    }
};

Storage.init = function(type){

    this.key = "";
    this.storage = type ? type : window.localStorage;

    return this;
};

Storage.init.prototype = Storage.prototype;

Metro['storage'] = Storage(window.localStorage);
Metro['session'] = Storage(window.sessionStorage);
