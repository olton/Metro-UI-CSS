/*  Author: Darwin Correa (vabatta)

 *  Description: Function to create notifications with metro style

 *  Version: 0.49a

 *

 *  Params:

 *      title - Title of the Notify

 *      content - Content of the notify (HTML format)

 *      closeButton - Enable or disable the close button, available: true, false (default: false)      

 *      zone - Zone of the Notify (JSON format)

 *          vertical - Zone vertical of the Notify, available: top, bottom (default: top)

 *          horizontal - Zone horizontal of the Notify, available: left, right (default: right)

 *      image1 - Absolute path of de image 1 (default: "" without image)

 *      image2 - Absolute path of de image 2 (default: "" without image)

 *      autoOcult- set the timeout to auto-ocult in milisegundos, "0" to no auto-ocult, (default:5s)

 *      color- background color of the notify, available: red, black, blue, green, purple (default: purple)

 *

 *    Example: $.Notify({

 *                'title': 'Titulo',

 *                'content': 'Mi notificación',

 *                'closeButton': false,

 *                'zone': {

 *                    'horizontal': 'right',

 *                    'vertical': 'bottom'

 *                },

 *                'image1': '',

 *                'image2': '',

 *                'autoOcult': 0,

 *                'color': 'red'

 *            }

 *            );

 *

 *

 *

 *   Goal for next versions:

 *      Add style param to set custom css to the Notify

 *      

 */



(function ($) {

    var itemCount = 0;

    $.Notify = function (params) {

        itemCount++;

        var _notyCount = itemCount;

        params = $.extend({ 'zone': { 'vertical': 'top', 'horizontal': 'right' }, 'autoOcult': 5000, 'closeButton': false }, params);

        if (params.zone.vertical === "top") {

            if (!($('#notify-top').length)) {

                var xl = '<div class="notices span5" id="notify-top"/>';

                $(xl).appendTo('body').fadeIn();

                $('#notify-top').css("position", "fixed").css("top", "5px").css("right", "4px").css("z-index", "1001");



            }



        } else {

            //            params.zone.horizontal = "right";

            params.zone.vertical = "bottom";

            if (!($('#notify-bottom').length)) {

                var xl = '<div class="notices span5" id="notify-bottom"/>';

                $(xl).appendTo('body').fadeIn();

                $('#notify-bottom').css("bottom", 5 + "px").css("right", 4 + "px").css("position", "fixed").css("z-index", "1001");

            }

        }

        var markup = [

            // If overlay is true, set it                        



			'<div class="bg-color-', params.color, '" id="notify-', _notyCount, '">',

			params.closeButton ? ('<a href="#" class="close"></a>') : (''),

                                    '<div class="notice-icon">',

                                    (params.image1 != "") ? ('<img src="' + params.image1 + '">') : (''), '</div>',

                                    '<div class="notice-image">',

                                    (params.image2 != "") ? ('<img src="' + params.image2 + '">') : (''), '</div>',



                                    '<div class="notice-header fg-color-yellow">',

                                    params.title,

                                    '</div>',

                                    '<div class="notice-text">', params.content, '</div>',

                                    '</div>',



        ].join('');

        options = { direction: (params.zone.horizontal === "left" ? "left" : "right") };

        $(markup).hide().appendTo('#notify-' + params.zone.vertical).show("slide", options, 500, ((params.autoOcult) ? (callbackOcult) : (null)));

        function callbackOcult() {

            setTimeout(function () {

                $.Notify.hide('#notify-' + _notyCount);

            }, params.autoOcult);

        };





        $('#notify-' + _notyCount + ' .close').click(function () {

            // Bind close button to hide notyfi

            $.Notify.hide('#notify-' + _notyCount);

            return false;

        });



    }



    $.Notify.hide = function (id) {

        $(id).animate({

            opacity: 0

        }, 300, function () {

            $(id).animate({ height: 0 }, 300, function () {

                $(id).remove();

            })

        })



        

    }

})(jQuery);
