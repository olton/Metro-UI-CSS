(function( $ ) {
    $.widget("metro.tabcontrol", {

        version: "1.0.0",

        options: {
            effect: 'none',
            activateStoredTab: false,
            tabclick: function(tab){},
            tabchange: function(tab){}
        },

        _create: function(){
            var that = this,
                element = this.element,
                tabs = $(element.children(".tabs")).children("li"),
                frames = $(element.children(".frames")).children(".frame"),
                element_id = element.attr("id");

            if (element.data('effect') != undefined) {
                this.options.effect = element.data('effect');
            }

            this.init(tabs, frames);

            tabs.each(function(){

                var tab = $(this).children("a");

                tab.on('click', function(e){
                    e.preventDefault();

                    that.options.tabclick(this);

                    if ($(this).parent().hasClass('disabled')) {
                        return false;
                    }

                    tabs.removeClass("active");
                    tab.parent("li").addClass("active");

                    frames.hide();
                    var current_frame = $(tab.attr("href"));
                    switch (that.options.effect) {
                        case 'slide': current_frame.slideDown(); break;
                        case 'fade': current_frame.fadeIn(); break;
                        default: current_frame.show();
                    }

                    that._trigger('change', null, current_frame);
                    that.options.tabchange(this);

                    if (element_id != undefined) window.localStorage.setItem(element_id+"-current-tab", $(this).attr("href"));
                });
            });

            if (this.options.activateStoredTab) this._activateStoredTab(tabs);
        },

        init: function(tabs, frames){
            var that = this;
            tabs.each(function(){
                if ($(this).hasClass("active")) {
                    var current_frame = $($($(this).children("a")).attr("href"));
                    frames.hide();
                    current_frame.show();
                    that._trigger('change', null, current_frame);
                }
            });
        },

        _activateStoredTab: function(tabs){
            var current_stored_tab = window.localStorage.getItem(this.element.attr('id')+'-current-tab');

            if (current_stored_tab != undefined) {
                tabs.each(function(){
                    var a = $(this).children("a");
                    if (a.attr("href") == current_stored_tab) {
                        a.click();
                    }
                });
            }
        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );



