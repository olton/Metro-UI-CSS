(function( $ ) {
    $.widget("metro.fluentmenu", {

        version: "1.0.0",

        options: {
            onSpecialClick: function(e, el){},
            onTabClick: function(e, el){}
        },

        _create: function(){
            var that = this, element = this.element, o = this.options,
                tabs = element.find('.tabs-holder > li > a');

            this._hidePanels();
            this._showPanel();

            tabs.on('click', function(e){
                if ($(this).parent('li').hasClass('special')) {
                    o.onSpecialClick(e, $(this));
                } else {
                    var panel = $($(this).attr('href'));

                    that._hidePanels();
                    that._showPanel(panel);
                    element.find('.tabs-holder > li').removeClass('active');
                    $(this).parent('li').addClass('active');

                    o.onTabClick(e, $(this));
                }
                e.preventDefault();
            });
        },

        _hidePanels: function(){
            this.element.find('.tab-panel').hide();
        },

        _showPanel: function(panel){
            if (panel == undefined) {
                panel = this.element.find('.tabs-holder li.active a').attr('href');
            }
            $(panel).show();
        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );



