(function($) {
    var _dialog = false;

    $.Dialog = function(params) {
        if(!$.Dialog.opened) {
            $.Dialog.opened = true;
        } else {
            return _dialog;
        }

        $.Dialog.settings = params;

        params = $.extend({
            icon: false,
            title: '',
            content: '',
            flat: false,
            shadow: false,
            overlay: false,
            width: 'auto',
            height: 'auto',
            position: 'default',
            padding: false,
            overlayClickClose: true,
            sysButtons: {
                btnClose: true
            },
            onShow: function(_dialog){}
        }, params);

        var _overlay, _window, _caption, _content;

        _overlay = $("<div/>").addClass("metro window-overlay");

        if (params.overlay) {
            _overlay.css({
                backgroundColor: 'rgba(0,0,0,.7)'
            });
        }

        _window = $("<div/>").addClass("window");
        if (params.flat) _window.addClass("flat");
        if (params.shadow) _window.addClass("shadow").css('overflow', 'hidden');
        _caption = $("<div/>").addClass("caption");
        _content = $("<div/>").addClass("content");
        _content.css({
            paddingTop: 32 + params.padding,
            paddingLeft: params.padding,
            paddingRight: params.padding,
            paddingBottom: params.padding
        });

        if (params.sysButtons) {
            if (params.sysButtons.btnClose) {
                $("<button/>").addClass("btn-close").on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    $.Dialog.close();
                }).appendTo(_caption);
            }
            if (params.sysButtons.btnMax) {
                $("<button/>").addClass("btn-max").on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                }).appendTo(_caption);
            }
            if (params.sysButtons.btnMin) {
                $("<button/>").addClass("btn-min").on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                }).appendTo(_caption);
            }
        }

        if (params.icon) $(params.icon).addClass("icon").appendTo(_caption);
        $("<div/>").addClass("title").html(params.title).appendTo(_caption);

        _content.html(params.content);

        _caption.appendTo(_window);
        _content.appendTo(_window);
        _window.appendTo(_overlay);

        if (params.width != 'auto') _window.css('min-width', params.width);
        if (params.height != 'auto') _window.css('min-height', params.height);

        _overlay.hide().appendTo('body').fadeIn('fast');

        _dialog = _window;


        _window
            .css("position", "fixed")
            .css("top", ($(window).height() - _dialog.outerHeight()) / 2 )
            .css("left", ($(window).width() - _window.outerWidth()) / 2)
/*
            .css("width", _content.outerWidth()+params.padding)
            .css("height", _content.outerHeight()+params.padding)
*/
        ;


        //console.log( $(window).height());

        addTouchEvents(_window[0]);

        if(params.draggable) {
            _caption.on("mousedown", function(e) {
                $.Dialog.drag = true;
                _caption.css('cursor', 'move');

                var z_idx = _window.css('z-index'),
                    drg_h = _window.outerHeight(),
                    drg_w = _window.outerWidth(),
                    pos_y = _window.offset().top + drg_h - e.pageY,
                    pos_x = _window.offset().left + drg_w - e.pageX;

                _window.css('z-index', 99999).parents().on("mousemove", function(e) {
                    var t = (e.pageY > 0)?(e.pageY + pos_y - drg_h):(0);
                    var l = (e.pageX > 0)?(e.pageX + pos_x - drg_w):(0);

                    if ($.Dialog.drag) {
                        if(t >= 0 && t <= window.innerHeight - _window.outerHeight()) {
                            _window.offset({top: t});
                        }
                        if(l >= 0 && l <= window.innerWidth - _window.outerWidth()) {
                            _window.offset({left: l});
                        }
                    }

                    _window.on("mouseup", function() {
                        $(this).removeClass('draggable').css('z-index', z_idx);
                        $.Dialog.drag = false;
                        _caption.css('cursor', 'default');
                    });
                });
                e.preventDefault();
            }).on("mouseup", function() {
                _window.removeClass('draggable');
                $.Dialog.drag = false;
                _caption.css('cursor', 'default');
            });
        }

        _window.on('click', function(e){
            e.stopPropagation();
        });

        if (params.overlayClickClose) {
            _overlay.on('click', function(e){
                e.preventDefault();
                $.Dialog.close();
            });
        }

        params.onShow(_dialog);

        $.Dialog.autoResize();

        return _dialog;
    }

    $.Dialog.content = function(newContent) {
        if(!$.Dialog.opened) {
            return false;
        }

        if(newContent) {
            _dialog.children(".content").html(newContent);
            $.Dialog.autoResize();
        } else {
            return _dialog.children(".content").html();
        }
    }

    $.Dialog.title = function(newTitle) {
        if(!$.Dialog.opened) {
            return false;
        }

        var _title = _dialog.children('.caption').children('.title');

        if(newTitle) {
            _title.html(newTitle);
        } else {
            _title.html();
        }
    }

    $.Dialog.autoResize = function(){
        if(!$.Dialog.opened) {
            return false;
        }

        var _content = _dialog.children(".content");

        console.log(_content);

        var top = ($(window).height() - _dialog.outerHeight()) / 2;
        var left = ($(window).width() - _dialog.outerWidth()) / 2;

        _dialog.css({
            width: _content.outerWidth(),
            height: _content.outerHeight()//+36
        })
        .css("top",  top)
        .css("left", left);

    }

    $.Dialog.close = function() {
        if(!$.Dialog.opened || _dialog == undefined) {
            return false;
        }

        $.Dialog.opened = false;
        var _overlay = _dialog.parent(".window-overlay");
        _overlay.fadeOut(function(){
            $(this).remove();
        });
    }
})(jQuery);
