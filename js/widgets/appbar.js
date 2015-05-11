/*
 * flexible appbar, which automatically collapse if not enough space avaiable
 * @author Daniel Milbrandt, xiphe.com
 * 
 * PS: You are doing great work Sergey!
 */
(function ($) {

    "use strict";

    $.widget("metro.appbar", {
        version: "3.0.0",
        options: {
        },
        _create: function () {
            var that = this, element = this.element, o = this.options;

            $.each(element.data(), function (key, value) {
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
        _calculateFreeSpace: function () {
            var that = this, element = this.element, o = this.options;
            var menusParentWidth = 0, childrenWidth = 0, children;
            var freeSpace;

            //get the overall free space from the wrapping parent of the menus
            menusParentWidth = $(that.menusParent).width();

            //get the width of all visible children
            children = $(that.menusParent).children(":visible");


            //margin support: because there could be margins between elements, we do not summarize the width up with a one liner
            //but calculate width of all children in an intelligent way, we takte the left offsett of the first element and right offset of the right element
            //for that we have to support float left and right too:
            //float left and right support: we can not be sure that the first element in dom is on the left and the last is on the right
            //right floated
            //   - sort the children as the user see them

            //sort the children as the user see them according to the css float
            var childrenLeftFloated = [];
            var childrenRightFloated = [];
            var childrenAsUsual = [];
            var floatState;

            for (var i = 0, len = children.length; i < len; i++) {
                floatState = $(children[i]).css("float");
                switch (floatState) {
                    case "left":
                        childrenLeftFloated.push(children[i]);
                        break;
                    case "right":
                        childrenRightFloated.push(children[i]);
                        break;
                    default:
                        childrenAsUsual.push(children[i]);
                }
            }
            //right floats are from right to left
            childrenRightFloated.reverse();

            //=== build up the new children jquery object ===
            //join the left, right and normal children   
            children = new Array();
            children = childrenLeftFloated.concat(childrenAsUsual, childrenRightFloated);

            //convert the array to jquery object again
            children = $(children);

            //=== calculate the width of the elements with margin support ===

            //adds the left margin dedicated to the first child
            childrenWidth += parseInt($(children).first().css("margin-left"));
            console.log("margin of left: " + childrenWidth)
            //walk trough the children and add the size, 
            for (var i = 0, len = children.length - 1; i <= len; i++) {
                childrenWidth += $(children[i]).outerWidth();
                if (i !== len) {
                    //the highest margin between two elements counts
                    childrenWidth += Math.max(
                            parseInt($(children[i]).css("margin-right")),
                            parseInt($(children[i + 1]).css("margin-left"))

                            );
                }
            }
            //the right margin for the right child
            childrenWidth += parseInt($(children[len]).css("margin-right"));

            //now we have all data for calculation. Yippie-Ya-Yeah, Schweinebacke!! (much cooler German translation of B. W. Yippie-Ya-Yeah, Motherf***er)
            freeSpace = menusParentWidth - childrenWidth;

            //writing the data we found out to the element's data
            that.freeSpace = freeSpace;                     //not used space within the parent(mostly the appbar itself)
            that.childrenWidth = childrenWidth;             //the total width of the children
            that.menusParentWidth = menusParentWidth;       //the width without padding or something

            return freeSpace;
        },
        _moveMenuEntry: function (direction) {
            var that = this, element = this.element, o = this.options;

            direction = direction || "toPullMenu"; // "fromPullMenu" is also an option

            if (direction === "toPullMenu") {
                //get next candidate which could be moved to the pullmenu, in fact the last which not have a mark as pullmenu-entry
                var nextToHide = $(that.allMenuEntries).not(".app-bar-pullmenu-entry").last();

                if (nextToHide.length === 0) {
                    //nothing left, we have nothing to do
                    return false;
                }


                //find out in which menubar we are located in
                var topMenuBar = $(nextToHide).parent(); //this is only the appbar-menu-bar not the appbar itself
                //find out where we have to go
                var topMenuBarIndex = $(that.flexVisibles).index($(nextToHide).parent());
                var pullMenuBar = $(that.pullMenu).find(".app-bar-menu").eq(topMenuBarIndex); //TODO: Make the class app-bar-menu configurable - perhaps sidebar
                
                //mark the entry as a entry of the pullmenu and move it to the pullmenu
                $(nextToHide)
                        .prependTo(pullMenuBar)
                        .addClass("app-bar-pullmenu-entry");
                
                //the menubar is initiated with the hidden class, so we do not see empty pullmenubars, we must unhide them
                //it does not matter, if we see it already, we do it always:
                $(pullMenuBar).removeClass("hidden");

                //in case there are no more entries in the top menu bar we can hide it
                if($(topMenuBar).children().length === 0) {
                    $(topMenuBar).addClass("hidden");
                }


                //we show the pullbutton now
                $(that.pullButton).show();

                return nextToHide;
                
            } else if (direction === "fromPullMenu") {
                //get next candidate which could be moved to the topbar menu, in fact the first which is still marked as pullmenu-entry
                var nextToShow = $(that.allMenuEntries).filter(".app-bar-pullmenu-entry").first();

                if (nextToShow.length === 0) {
                    //nothing left, we have nothing to do
                    return false;
                }

                //remove the mark as a entry of the pullmenu and move it to the normal standard bar
                //$(nextToHide).removeClass("app-bar-pullmenu-entry").appendTo(mark!!);
            }
        },
        _checkMenuEntries: function () {
            var that = this, element = this.element, o = this.options;
            var recheck = true;
            while (recheck) {

                //calculate the empty space within the appbar we can use for hidden children
                that._calculateFreeSpace();
                var freeSpace = that.freeSpace;

                console.log("freeSpace: " + freeSpace);

                if (freeSpace < 0) {
                    //no space left, we hide a menu entry now

                    //move the menu entry and check if there are more menuentries left
                    if (!(this._moveMenuEntry("toPullMenu"))) {
                        //nothing left to hide
                        recheck = false;
                        break;
                    } else {
                        //we moved successfully, perhaps we can hide more entries, we recheck the appbar, 
                        //remember, we are in a endless loop, which checks this for us
                        continue;
                    }

                } else {
                    //we have space here, we try to get more entries there

                    //this._moveMenuEntry("fromPullMenu");
                    //check if there is something to do


                    break;
                }

            }
        },
        resize: function() {
            var that = this, element = this.element, o = this.options;
            
            this._checkMenuEntries();
        },
        _initBar: function () {
            var that = this, element = this.element, o = this.options;
            that.initiatedAs;
            console.log("------")
            that.pullButton = $(element).find('.app-bar-pullbutton');
            var menus = $(element).find('.app-bar-menu');

            var flexVisible, menuEntries; //temporarly used vars

            that.flexVisibles = $();    //the menus which are directly in the appbar
            that.allMenuEntries = $();  //all menu entries in a sorted order
            that.menusParent = $();     //common parent from the menus, which can but do not need to be this.element. We get the max width from it
            that.pullMenu = $();

            if (menus.length > 0) {
                //strip off all .no-flexible menus
                that.flexVisibles = $(menus).not(".no-flexible");


                //sort the menus according to the data-flexorder attribute
                that.flexVisibles.sort(function (a, b) {
                    var aValue = (parseInt($(a).data("flexorder")) || $(a).index() + 1);
                    var bValue = (parseInt($(b).data("flexorder")) || $(b).index() + 1);
                    return aValue - bValue;
                });

                //get all children in a sorted order according to the data-flexorder attribute
                $(that.flexVisibles).each(function () {
                    flexVisible = this;

                    menuEntries = $(flexVisible).children().not(".no-flexible")  //strip off all .no-flexible elements
                    menuEntries.sort(function (a, b) {
                        var aValue = (parseInt($(a).data("flexorder")) || $(a).index() + 1);
                        var bValue = (parseInt($(b).data("flexorder")) || $(b).index() + 1);
                        return aValue - bValue;
                    });


                    $.merge(that.allMenuEntries, menuEntries);
                });

                //find the parent, which contains all menus
                that.menusParent = $(element).find(".app-bar-menu").first().parent();

                // === create a pull down button + pull menu ===
                //check if a pulldown button already exists, if not we create one
                if (!(that.pullButton.length > 0)) {
                    //DOC: We can create a invisible button, if we want to force to not show a pull button
                    that.pullButton = $('<div class="app-bar-pullbutton automatic"></div>');
                    $(that.menusParent).append(that.pullButton);
                }

                //create a pullmenu 
                that.pullMenu = $('<nav class="app-bar-pullmenu" />');

                //create menubars within the pullmenu
                that.flexVisibles.each(function () {
                    $(that.pullMenu).append($('<ul class="app-bar-pullmenubar hidden app-bar-menu" />'));  //TODO: Make the class app-bar-menu configurable - perhaps sidebar, in that case we have to position absolute in the appbar.less
                });


                $(that.menusParent).append(that.pullMenu);

                //check for the first time the menu entries /hide them if needed, etc.
                that._checkMenuEntries();
                
                
                
                //===  EVENTS =================================================

                //activate the click event for the pull button
                $(that.pullButton).on("click", function() {
                    
                    //who am i?
                    that = $(this).closest("[data-role=appbar]").data("appbar");

                    //we show /hide the pullmenu
                    if($(that.pullMenu).is(":hidden")) {
                        $(that.pullMenu).show();
                        $(that.pullMenu).find(".app-bar-pullmenubar").slideDown("fast");            //TODO: make the animation effect configurable
                    } else {
                        $(that.pullMenu).find(".app-bar-pullmenubar").slideUp("fast", function() {  //TODO: make the animation effect configurable
                             $(that.pullMenu).hide();
                        });
                    }
                });
                
                
                //we have to calculate everything new, if the user resizes or zooms the window
                $(window).resize(function() {
                    $("[data-role=appbar]:not(.no-flexible)").each(function() {
                       $(this).data("appbar").resize();
                    });
                });
                
                
                //because fonts(also icon-fonts) are often loaded async after the page has loaded and this script walked through already, 
                //we have to check again after these elements loaded. Because there is no way to observe only specific elements, we do it for the window
                $(window).load(function() {
                    $("[data-role=appbar]:not(.no-flexible)").each(function() {
                       $(this).data("appbar").resize();
                    });
                });
                
                //pictures (or other outside stuff was loaded - pictures are also often loaded async or have a lazy load or are injected after a while. 
                //a picture can change a size of the element from the appbar, so we must recheck it again.
                $("[data-role=appbar]:not(.no-flexible) [src]").on("load", function() {
                    //who am i?
                    var appbar = $(this).closest("[data-role=appbar]").data("appbar");
                    appbar.resize();
                });
                
            }

        },
        _destroy: function () {
        },
        _setOption: function (key, value) {
            this._super('_setOption', key, value);
        }
    });

})(jQuery);