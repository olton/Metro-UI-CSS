/*
 * flexible appbar, which automatically collapse if not enough space avaiable
 * @author rewritten by Daniel Milbrandt, xiphe.com
 * 
 * PS: You are doing great work Sergey! Greats Daniel
 */
(function (jQuery) {

    "use strict";

    jQuery.widget("metro.appbar", {
        version: "3.0.0",
        options: {
            flexstyle: "app-bar-menu", //app-bar-menu | YOUR_OWN class for the pull flexmenu, basic support for "sidebar2" are integrated in the appbar.less file
            flexclean: false,           //true | false. if set all entries except the no-flexible ones will removed
            flextolerance: 3               //in px. if set the freespace is runnig out a little bit earlier, so floats 
                                        //and not no-wrap elements have no chance to wrap. help for rounding errors also
        },
        _create: function () {
            var that = this, element = this.element, o = this.options;

            jQuery.each(element.data(), function (key, value) {
                if (key in o) {
                    try {
                        o[key] = jQuery.parseJSON(value);
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
            menusParentWidth = jQuery(that.menusParent).width();

            //get the width of all visible children
            children = jQuery(that.menusParent).children(":visible").not(".app-bar-pullmenu");


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
                floatState = jQuery(children[i]).css("float");
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
            children = jQuery(children);

            //=== calculate the width of the elements with margin support ===

            //adds the left margin dedicated to the first child
            childrenWidth += parseInt(jQuery(children).first().css("margin-left"));

            //walk trough the children and add the size, 
            for (var i = 0, len = children.length - 1; i <= len; i++) {
                childrenWidth += jQuery(children[i]).outerWidth();
                if (i !== len) {
                    //the highest margin between two elements counts
                    childrenWidth += Math.max(
                            parseInt(jQuery(children[i]).css("margin-right")),
                            parseInt(jQuery(children[i + 1]).css("margin-left"))

                            );
                }
            }
            //the right margin for the right child
            childrenWidth += parseInt(jQuery(children[len]).css("margin-right"));

            //now we have all data for calculation. Yippie-Ya-Yeah, Schweinebacke!! (much cooler German translation of B. W. Yippie-Ya-Yeah, Motherf***er)
            freeSpace = menusParentWidth - childrenWidth;

            //writing the data we found out to the element's data
            that.freeSpace = freeSpace;                     //not used space within the parent(mostly the appbar itself)
            that.childrenWidth = childrenWidth;             //the total width of the children
            that.menusParentWidth = menusParentWidth;       //the width without padding or something

            return freeSpace;
        },
        _originIndexMove: function(menu, child) {
                //find all children which are lower than we
                var flexChildren = jQuery(menu).children().filter(function () {
                    return parseInt(jQuery(this).attr("data-flexorderorigin")) < parseInt(jQuery(child).attr("data-flexorderorigin"));
                });
                
                if (flexChildren.length > 0) {
                    //because we are greater, we set it after the childern which are lower
                    jQuery(flexChildren).last().after(child);
                } else {
                    //find all children which are greater than we are
                    flexChildren = jQuery(menu).children().filter(function () {
                        return parseInt(jQuery(this).attr("data-flexorderorigin")) > parseInt(jQuery(child).attr("data-flexorderorigin"));
                    });
                    if (flexChildren.length > 0) {
                        //because we are lower, we set us before the childern which are greater
                        jQuery(flexChildren).first().before(child);
                    } else {
                        //we have no children, just append it
                        jQuery(menu).append(child);
                    }
                }
        },
        _moveMenuEntry: function (direction) {
            var that = this, element = this.element, o = this.options;

            direction = direction || "toPullMenu"; // "fromPullMenu" is also an option

            if (direction === "toPullMenu") {
                //get next candidate which could be moved to the pullmenu, in fact the last which not have a mark as pullmenu-entry

                var nextToHide = jQuery(that.allMenuEntries).not(".app-bar-pullmenu-entry").last();

                if (nextToHide.length === 0) {
                    //nothing left, we have nothing to do
                    return false;
                }


                //find out in which menubar we are located in
                var topMenu = jQuery(nextToHide).parent(); //this is only a appbar-menu not the appbar itself
                //find out where we have to go
                var topMenuIndex = jQuery(that.flexVisibles).index(jQuery(nextToHide).parent());
                var pullMenuBar = jQuery(that.pullMenu).find(".app-bar-pullmenubar").eq(topMenuIndex); //TODO: Make the class app-bar-menu configurable - perhaps sidebar

                that._originIndexMove(pullMenuBar, nextToHide);
                //move it to the pullmenu
//                if (jQuery(topMenu).is("[data-flexdirection='reverse']")) {//data-flexdirection="reverse" support
//                    jQuery(nextToHide).appendTo(pullMenuBar);
//                } else {                                             //normal way
//                    jQuery(nextToHide).prependTo(pullMenuBar);
//                }

                //mark the entry as a entry of the pullmenu
                jQuery(nextToHide).addClass("app-bar-pullmenu-entry");

                //the menubar is initiated with the hidden class, so we do not see empty pullmenubars, we must unhide them
                //it does not matter, if we see it already, we do it always:
                jQuery(pullMenuBar).removeClass("hidden")
                        .show();

                //in case there are no more entries in the top menu bar we can hide it
                if (jQuery(topMenu).children().length === 0) {
                    jQuery(topMenu).addClass("hidden");
                }

                //we show the pullbutton now
                jQuery(that.pullButton).show();

                return nextToHide;

            } else if (direction === "fromPullMenu") {
                //get next candidate which could be moved to the topbar menu, in fact the first which is still marked as pullmenu-entry
                var nextToShow = jQuery(that.allMenuEntries).filter(".app-bar-pullmenu-entry").first();


                //find out in which pullmenu we are located in
                var pullMenuBar = jQuery(nextToShow).parent(); //only one single menu, not the whole thing

                //find out where we have to go
                var topMenuIndex = jQuery(pullMenuBar).index(); //it is the same structur as that.flexVisibles, so we can use the simple index
                var topMenu = jQuery(that.flexVisibles).eq(topMenuIndex);

                jQuery(topMenu).removeClass("hidden");
                //remove the mark as a entry of the pullmenu and move it to the normal top menu
                jQuery(nextToShow).removeClass("app-bar-pullmenu-entry");

                //cosider the flexorder

                //walk trough the children in topMenu and find out what we must do

                //find all children which are lower than we
                that._originIndexMove(topMenu, nextToShow);

                //in case there are no more entries left, we can hide the pullbar menu from this entry
                if (jQuery(pullMenuBar).children().length === 0) {
                    jQuery(pullMenuBar).addClass("hidden")
                            .hide();
                }

                //in case we have no more menus in the pullbar area, we hide the pullbar thing
                if (jQuery(that.pullMenu).children(".app-bar-pullmenubar").not(".hidden").length === 0) {
                    jQuery(that.pullMenu).hide().addClass("hidden");
                    jQuery(that.pullButton).hide();
                }

                if (nextToShow.length === 0) {
                    //nothing left, we have nothing to do
                    return false;
                }
                return nextToShow;
            }
        },
        _checkMenuEntries: function () {
            var that = this, element = this.element, o = this.options;

            var forceEndLoop = false;

            for (var maxLoop = 0, maxLoopLen = that.allMenuEntries.length; maxLoop < maxLoopLen; maxLoop++) {  //we do nothing with this, we could use while(true) but there is a danger of infinite loops

                //calculate the empty space within the appbar we can use for hidden children
                that._calculateFreeSpace();
                var freeSpace = that.freeSpace;

                if (freeSpace < o.flextolerance || o.flexclean) { //3px is tolerance and to be faster than the wrapping. TODO: make this configurable
                    //no space left, we hide a menu entry now

                    //move the menu entry to the pullbar and check if there are more menuentries left
                    if (!(that._moveMenuEntry("toPullMenu"))) {
                        //nothing left to hide
                        break;
                    } else {
                        //we moved successfully, perhaps we can hide more entries, we recheck the appbar, 
                        //remember, we are in a endless loop, which checks this for us

                        if (!forceEndLoop) {
                            continue;
                        }
                    }

                } else {
                    //we have space here, we try to get more entries there

                    //check if there is something to do
                    if (!(that._moveMenuEntry("fromPullMenu"))) {
                        //nothing left to show
                        break;
                    } else {
                        forceEndLoop = true;
                        continue;
                    }

                }

                //we continue manually. if we reach the end of the loop we end this better so we do not produce infinite loop accidentally
                break;
            }
        },
        resize: function () {
            var that = this, element = this.element, o = this.options;

            if (that.initiatedAsFlex) {
                this._checkMenuEntries();
            }
        },
        _initBar: function () {
            var that = this, element = this.element, o = this.options;

            that.lastFlexAction = undefined;

            that.pullButton = jQuery(element).find('.app-bar-pullbutton');
            var menus = jQuery(element).find('.app-bar-menu');

            that.initiatedAsFlex = false;   //we change it later in the code - conditionally
            o.flexclean = jQuery(element).is("[data-flexclean='true']") || o.flexclean;
            o.flexstyle = jQuery(element).attr("data-flexstyle") || o.flexstyle;

            var flexVisible, menuEntries; //temporarly used vars

            that.flexVisibles = jQuery();    //the menus which are directly in the appbar
            that.allMenuEntries = jQuery();  //all menu entries in a sorted order
            that.menusParent = jQuery();     //common parent from the menus, which can but do not need to be this.element. We get the max width from it
            that.pullMenu = jQuery();

            if (menus.length > 0 && jQuery(element).is(":not('.no-flexible')")) {
                //strip off all .no-flexible menus
                that.flexVisibles = jQuery(menus).not(".no-flexible");

                if (that.flexVisibles.length > 0) {

                    that.initiatedAsFlex = true;

                    //sort the menus according to the data-flexorder attribute
                    that.flexVisibles.sort(function (a, b) {
                        var aValue = (parseInt(jQuery(a).data("flexorder")) || jQuery(a).index() + 1);
                        var bValue = (parseInt(jQuery(b).data("flexorder")) || jQuery(b).index() + 1);
                        return aValue - bValue;
                    });

                    //get all children in a sorted order according to the data-flexorder attribute
                    jQuery(that.flexVisibles).each(function () {
                        flexVisible = this;

                        menuEntries = jQuery(flexVisible).children();

                        //give  all menuEntries a flexorder which have not one and save the original order
                        jQuery(menuEntries).each(function () {
                            jQuery(this).attr("data-flexorderorigin", jQuery(this).index());
                            
                            if(!(jQuery(this).is("[data-flexorder]"))) {
                                jQuery(this).attr("data-flexorder", jQuery(this).index() + 1);
                            }
                        });

                        menuEntries.sort(function (a, b) {
                            var aValue = parseInt(jQuery(a).data("flexorder"));
                            var bValue = parseInt(jQuery(b).data("flexorder"));
                            return aValue - bValue;
                        });

                        //data-flexdirection="reverse" support 
                        if (jQuery(flexVisible).is("[data-flexdirection='reverse']")) {
                            menuEntries.reverse();
                        }

                        jQuery.merge(that.allMenuEntries, jQuery(menuEntries).not(".no-flexible")); //strip off all .no-flexible elements
                    });

                    //find the parent, which contains all menus
                    that.menusParent = jQuery(element).find(".app-bar-menu").first().parent();

                    // === create a pull down button + pull menu ===
                    //check if a pulldown button already exists, if not we create one
                    if (!(that.pullButton.length > 0)) {
                        //DOC: We can create a display:none button, if we want to force to not show a pull button
                        that.pullButton = jQuery('<div class="app-bar-pullbutton automatic"></div>');
                        jQuery(that.menusParent).append(that.pullButton);
                    }

                    //create a pullmenu
                    that.pullMenu = jQuery('<nav class="app-bar-pullmenu hidden" />');

                    //create menubars within the pullmenu
                    that.flexVisibles.each(function () {
                        jQuery(that.pullMenu).append(jQuery('<ul class="app-bar-pullmenubar hidden ' + o.flexstyle + '" />'));
                    });
                    
                    
                    
                    // WORKAROUND: this is because a :after:before clearfix for the pullmenu do not work for some reason
                    //position: absolute does not work if we do not break the float. another pure css solution should be written in the appbar.less
                    //after that remove this line
                    jQuery(that.menusParent).append(jQuery('<div class="clearfix" style="width: 0;">'));
                    //-----------
                    
                    
                    jQuery(that.pullMenu).addClass("flexstyle-" + o.flexstyle);

                    jQuery(that.menusParent).append(that.pullMenu);

                    //check for the first time the menu entries /hide them if needed, etc.
                    that._checkMenuEntries();



                    //===  EVENTS =================================================

                    //activate the click event for the pull button
                    jQuery(that.pullButton).on("click", function () {

                        //who am i?
                        that = jQuery(this).closest("[data-role=appbar]").data("appbar");

                        //we show /hide the pullmenu
                        if (jQuery(that.pullMenu).is(":hidden")) {
                            jQuery(that.pullMenu).show();
                            jQuery(that.pullMenu).find(".app-bar-pullmenubar")
                                    .hide().not(".hidden").slideDown("fast");
                        } else {
                            jQuery(that.pullMenu).find(".app-bar-pullmenubar")
                                    .not(".hidden").show().slideUp("fast", function () {
                                jQuery(that.pullMenu).hide();
                            });
                        }

                    });


                    //we have to calculate everything new, if the user resizes or zooms the window
                    jQuery(window).resize(function () {
                        jQuery("[data-role=appbar]:not(.no-flexible)").each(function () {
                            jQuery(this).data("appbar").resize();
                        });
                    });


                    //because fonts(also icon-fonts) are often loaded async after the page has loaded and this script walked through already, 
                    //we have to check again after these elements loaded. Because there is no way to observe only specific elements, we do it for the window
                    jQuery(window).load(function () {
                        jQuery("[data-role=appbar]:not(.no-flexible)").each(function () {
                            jQuery(this).data("appbar").resize();
                        });
                    });

                    //pictures (or other outside stuff was loaded - pictures are also often loaded async or have a lazy load or are injected after a while. 
                    //a picture can change a size of the element from the appbar, so we must recheck it again.
                    jQuery("[data-role=appbar]:not(.no-flexible) [src]").on("load", function () {
                        //who am i?
                        var appbar = jQuery(this).closest("[data-role=appbar]").data("appbar");
                        appbar.resize();
                    });
                }
            }

        },
        _destroy: function () {
        },
        _setOption: function (key, value) {
            this._super('_setOption', key, value);
        }
    });

})(jQuery);