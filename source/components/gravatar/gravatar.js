/* global Metro, Utils, Component */
var GravatarDefaultConfig = {
    gravatarDeferred: 0,
    email: "",
    size: 80,
    default: "mp",
    onGravatarCreate: Metro.noop
};

Metro.gravatarSetup = function (options) {
    GravatarDefaultConfig = $.extend({}, GravatarDefaultConfig, options);
};

if (typeof window["metroGravatarSetup"] !== undefined) {
    Metro.gravatarSetup(window["metroGravatarSetup"]);
}

Component('gravatar', {
    init: function( options, elem ) {
        this._super(elem, options, GravatarDefaultConfig);

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        Metro.checkRuntime(this.element, this.name);
        this.get();
    },

    getImage: function(email, size, def, is_jquery_object){
        var image = $("<img>");
        image.attr("src", this.getImageSrc(email, size));
        return is_jquery_object === true ? image : image[0];
    },

    getImageSrc: function(email, size, def){
        if (email === undefined || email.trim() === '') {
            return "";
        }

        size = size || 80;
        def = Utils.encodeURI(def) || '404';

        return "//www.gravatar.com/avatar/" + Utils.md5((email.toLowerCase()).trim()) + '?size=' + size + '&d=' + def;
    },

    get: function(){
        var element = this.element, o = this.options;
        var img = element[0].tagName === 'IMG' ? element : element.find("img");
        if (img.length === 0) {
            return;
        }
        img.attr("src", this.getImageSrc(o.email, o.size, o.default));

        Utils.exec(o.onGravatarCreate, null, element[0]);
        element.fire("gravatarcreate");

        return this;
    },

    resize: function(new_size){
        this.options.size = new_size !== undefined ? new_size : this.element.attr("data-size");
        this.get();
    },

    email: function(new_email){
        this.options.email = new_email !== undefined ? new_email : this.element.attr("data-email");
        this.get();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-size': this.resize(); break;
            case 'data-email': this.email(); break;
        }
    },

    destroy: function(){
        return this.element;
    }
});
