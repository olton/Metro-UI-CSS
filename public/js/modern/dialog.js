/*  Author: Valerio Battaglia (vabatta)
 *  Description: Function to create dialog box. You can have a dialog box open at once.
 *  Version: 1.0a
 *
 *  Params:
 *      title - Title of the dialog box (HTML format)
 *      content - Content of the dialog box (HTML format)
 *      draggable - Set draggable to dialog box, available: true, false (default: false)
 *      overlay - Set the overlay of the page, available: true, false (default: true)
 *      closeButton - Enable or disable the close button, available: true, false (default: false)
 *      buttonsAlign - Align of the buttons, available: left, center, right (default: center)
 *      buttons - Set buttons in the action bar (JSON format)
 *          name - Text of the button (JSON format)
 *              action - Function to bind to the button
 *      position - Set the initial position of the dialog box (JSON format)
 *          zone - Zone of the dialog box, available: left, center, right (default: center)
 *          offsetY - Top offset pixels
 *          offsetX - Left offset pixels
 *      
 *   Goal for next versions:
 *      Add style param to set custom css to the dialog box controls
 *      Add possibility to resize window
 */

(function($) {
    $.Dialog = function(params) {
        if(!$.DialogOpened) {
            $.DialogOpened = true;
        } else {
            return false;
        }

        params = $.extend({'position':{'zone':'center'},'overlay':true}, params);

        var buttonsHTML = '<div';

        // Buttons position
        if(params.buttonsAlign)
        {
            buttonsHTML += ' style=" float: ' + params.buttonsAlign + ';">';
        } else {
            buttonsHTML += '>';
        }

        $.each(params.buttons, function(name,obj) {
            // Generating the markup for the buttons

            buttonsHTML += '<button>' + name + '</button>';
            
            if(!obj.action) 
            {
                obj.action = function() {};
            }
        });

        buttonsHTML += '</div>';

        var markup = [
            // If overlay is true, set it

            '<div id="dialogOverlay">',
            '<div id="dialogBox" class="dialog">',
            '<div class="header">',
            params.title,
            (params.closeButton)?('<div><button><i class="icon-cancel-2"></i></button></div>'):(''),
            '</div>',
            '<div class="content">', params.content, '</div>',
            '<div class="action" id="dialogButtons">',
            buttonsHTML,
            '</div></div></div>'
        ].join('');

        $(markup).hide().appendTo('body').fadeIn();

        if(!params.overlay) {
            $('#dialogOverlay').css('background-color', 'rgba(255, 255, 255, 0)');
        }
        
        // Setting initial position
        if(params.position.zone == "left")
        {
            $('#dialogBox').css("top", Math.max(0, (($(window).height() - $('#dialogBox').outerHeight()) / 3) + 
                                                $(window).scrollTop()) + "px");
            $('#dialogBox').css("left", 0);
        } 
        else if(params.position.zone == "right")
        {
            $('#dialogBox').css("top", Math.max(0, (($(window).height() - $('#dialogBox').outerHeight()) / 3) + 
                                                $(window).scrollTop()) + "px");
            $('#dialogBox').css("left", Math.max(0, (($(window).width() - $('#dialogBox').outerWidth())) + 
                                                            $(window).scrollLeft()) + "px");
        } 
        else
        {
            $('#dialogBox').css("top", (params.position.offsetY)?(params.position.offsetY):(Math.max(0, (($(window).height() - $('#dialogBox').outerHeight()) / 3) + 
                                                                                                $(window).scrollTop()) + "px"));
            $('#dialogBox').css("left", (params.position.offsetX)?(params.position.offsetX):(Math.max(0, (($(window).width() - $('#dialogBox').outerWidth()) / 2) + 
                                                                                                $(window).scrollLeft()) + "px"));
        }

        if(params.draggable) {
            // Make draggable the window

            $('#dialogBox div.header').css('cursor', 'move').on("mousedown", function(e) {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');

                var z_idx = $drag.css('z-index'),
                    drg_h = $drag.outerHeight(),
                    drg_w = $drag.outerWidth(),
                    pos_y = $drag.offset().top + drg_h - e.pageY,
                    pos_x = $drag.offset().left + drg_w - e.pageX;
                $drag.css('z-index', 99999).parents().on("mousemove", function(e) {
                    $('.draggable').offset({
                        top:e.pageY + pos_y - drg_h,
                        left:e.pageX + pos_x - drg_w
                    }).on("mouseup", function() {
                        $(this).removeClass('draggable').css('z-index', z_idx);
                    });
                });
                e.preventDefault(); // disable selection
            }).on("mouseup", function() {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            });
        }

        $('#dialogBox .header button').click(function() { 
            // Bind close button to hide dialog

            $.Dialog.hide();
            return false;
        });

        var buttons = $('#dialogBox .action button'),
            i = 0;

        $.each(params.buttons,function(name,obj){
            buttons.eq(i++).click(function(){
                // Calling function and hide the dialog   

                obj.action();
                $.Dialog.hide();
                return false;
            });
        });
    }

    $.Dialog.hide = function(){
        $('#dialogOverlay').fadeOut(function(){
            $.DialogOpened = false;
            $(this).remove();
        });
    }
})(jQuery);
