(function($) {
    var _notify_container = false;
    var _notifies = [];

    $.Notify = function(params) {

        //$.Notify.settings = params;

        params = $.extend({
            icon: '',
            caption: '',
            content: '',
            shadow: true,
            width: 'auto',
            height: 'auto',
            style: false, // {background: '', color: ''}
            position: 'right', //right, left
            timeout: 5000
        }, params);

        var _container = _notify_container || $("<div/>").addClass("metro notify-container").appendTo('body'); _notify_container = _container;

        //console.log(_container);

        if (params.content == '' || params.content == undefined) return;

        var _notify;

        _notify = $("<div/>").addClass("notify");

        if (params.shadow) _notify.addClass("shadow");
        if (params.style && params.style.background != undefined) _notify.css("background-color", params.style.background);
        if (params.style && params.style.color != undefined) _notify.css("color", params.style.color);

        // add title
        if (params.caption != '' && params.caption != undefined) {
            $("<div/>").addClass("caption").html(params.caption).appendTo(_notify);
        }
        // add content
        if (params.content != '' && params.content != undefined) {
            $("<div/>").addClass("content").html(params.content).appendTo(_notify);
        }

        if (params.width != 'auto') _notify.css('min-width', params.width);
        if (params.height != 'auto') _notify.css('min-height', params.height);

        _notify.hide().appendTo(_container).fadeIn('slow');
        _notifies.push( _notify );

        setTimeout(function(){
            $.Notify.close(_notify);
        }, params.timeout);
    };

    $.Notify.show = function(message, title){
        $.Notify({
            content: message,
            caption: title
        });
    };

    $.Notify.close = function(_notify) {
        if(_notify == undefined) {
            return false;
        }

        _notify.fadeOut('slow', function(){
            $(this).remove();
            _notifies.splice(_notifies.indexOf(_notify), 1);
        });

        return true;
    };
})(jQuery);
