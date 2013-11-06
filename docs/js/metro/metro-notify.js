(function($) {
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
            position: 'top-right', //default: bottom-right, top-right, top-left, bottom-left
            timeout: 3000
        }, params);

        if (params.content == '' || params.content == undefined) return;

        var _wrapper, _notify;

        _wrapper = $("<div/>").addClass("metro notify-wrapper");
        _notify = $("<div/>").addClass("notify");

        if (params.shadow) _wrapper.addClass("shadow");
        if (params.style && params.style.background != undefined) _wrapper.css("background-color", params.style.background);
        if (params.style && params.style.color != undefined) _wrapper.css("color", params.style.color);

        // add title
        if (params.caption != '' && params.caption != undefined) {
            $("<div/>").addClass("caption").html(params.caption).appendTo(_notify);
        }
        // add content
        if (params.content != '' && params.content != undefined) {
            $("<div/>").addClass("content").html(params.content).appendTo(_notify);
        }
        _notify.appendTo(_wrapper);

        if (params.width != 'auto') _wrapper.css('min-width', params.width);
        if (params.height != 'auto') _wrapper.css('min-height', params.width);

        _wrapper.hide().appendTo('body').fadeIn('fast');
        _notifies.push( _notify );

        if (params.position == 'default' || params.position == 'bottom-right') {
            var bottom_position = 5;
            $.each(_notifies, function(i, n){
                if (i == _notifies.length-1) return;
                bottom_position += n.parent('.notify-wrapper').outerHeight()+5;
            });
            _wrapper.css({
                bottom: bottom_position,
                right: 5
            });
        } else if (params.position == 'top-right') {
            var top_position = 5;
            $.each(_notifies, function(i, n){
                if (i == _notifies.length-1) return;
                top_position += n.parent('.notify-wrapper').outerHeight()+5;
            });
            _wrapper.css({
                top: top_position,
                right: 5
            });
        } else if (params.position == 'bottom-left') {
            var bottom_position = 5;
            $.each(_notifies, function(i, n){
                if (i == _notifies.length-1) return;
                bottom_position += n.parent('.notify-wrapper').outerHeight()+5;
            });
            _wrapper.css({
                bottom: bottom_position,
                left: 5
            });
        } else {
            var top_position = 5;
            $.each(_notifies, function(i, n){
                if (i == _notifies.length-1) return;
                top_position += n.parent('.notify-wrapper').outerHeight()+5;
            });
            _wrapper.css({
                top: top_position,
                left: 5
            });
        }

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

        var _wrapper = _notify.parent(".notify-wrapper");
        _wrapper.fadeOut(function(){
            $(this).remove();
            _notifies.splice(_notifies.indexOf(_notify), 1);
        });

        return true;
    };
})(jQuery);
