(function ( $ ) {

    "use strict";

    $.widget( "metro.appbar" , {

        version: "3.0.0",

        options: {
        },

        _create: function () {
            var that = this, element = this.element, o = this.options;

            $.each(element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = $.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            this._initBar();

            element.data('appbar', this);

        },

        _initBar: function(){
            var that = this, element = this.element, o = this.options;
            var pull = $(element).find('.app-bar-pull');
            var menu = $(element).find('.app-bar-menu').not(".flexible");
            
            
            var flexMenu = $(element).find('.app-bar-menu.flexible');
            
            if(flexMenu.length > 0) {
              //Make a copy of the normal menu
              var flexMenuToggle = flexMenu.clone().removeClass("flexible");
              flexMenuToggle.css("display", "none").children().css("display", "none");
              $(element).append(flexMenuToggle);
              menu = menu.add(flexMenuToggle);
              
              //get the base data for calculation
              var appBarWidth = $(element).width();
                      
              
              /* calculation: appBarWidth - all visible children */
              var checkVisibleFlexMenus = function() {
                var appBarElemsWidth = 0;
                //get the width of all visible children
                $(element).children(":visible").each(function() {
                  appBarElemsWidth += $(this).outerWidth(true);
                });

                if(appBarWidth < appBarElemsWidth) { //running out of space

                  //hide the last element of flexmenu
                  var menuEntryIndex = flexMenu.children(":visible").last().index();
                  flexMenu.children(":eq(" + menuEntryIndex + ")").css("display", "none");
                  //show the element in the hidden app bar menu
                  flexMenuToggle.children(":eq(" + menuEntryIndex + ")").css("display", "");
                  
                  //do it again, for the case that the menu does not fit already
                  checkVisibleFlexMenus();
                }
              };
              checkVisibleFlexMenus();
            }
            
            
            if (menu.length === 0 || flexMenu.children().not(":visible").length === 0) {
                pull.hide();
            }

            if (pull.length > 0) {
                pull.on('click', function(e){
                    menu.slideToggle('fast');
                    e.preventDefault();
                    e.stopPropagation();
                });
            }

            if (menu.length > 0) {
                $(window).resize(function(){
                    var device_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                    if (device_width > 800) {
                        $(".app-bar:not(.no-responsive-future) .app-bar-menu:not(.flexible)").show();
                    } else {
                        $(".app-bar:not(.no-responsive-future) .app-bar-menu:not(.flexible)").hide();
                    }
                });
            }
        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });

})( jQuery );