(function($) {
    if (METRO_DIALOG == undefined) {
        //var METRO_DIALOG = false;
    }

    $.Dialog = function(params) {
        if(!$.Dialog.opened) {
            $.Dialog.opened = true;
        } else {
            return METRO_DIALOG;
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
            onShow: function(_dialog){},
            sysBtnCloseClick: function(event){},
            sysBtnMinClick: function(event){},
            sysBtnMaxClick: function(event){}
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
                    params.sysBtnCloseClick(e);
                }).appendTo(_caption);
            }
            if (params.sysButtons.btnMax) {
                $("<button/>").addClass("btn-max").on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    params.sysBtnMaxClick(e);
                }).appendTo(_caption);
            }
            if (params.sysButtons.btnMin) {
                $("<button/>").addClass("btn-min").on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    params.sysBtnMinClick(e);
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

        METRO_DIALOG = _window;

        _window
            .css("position", "fixed")
            .css("z-index", parseInt(_overlay.css('z-index'))+1)
            .css("top", ($(window).height() - METRO_DIALOG.outerHeight()) / 2 )
            .css("left", ($(window).width() - _window.outerWidth()) / 2)
        ;

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

        params.onShow(METRO_DIALOG);

        $.Dialog.autoResize();

        return METRO_DIALOG;
    }

    $.Dialog.content = function(newContent) {
        if(!$.Dialog.opened || METRO_DIALOG == undefined) {
            return false;
        }

        if(newContent) {
            METRO_DIALOG.children(".content").html(newContent);
            $.Dialog.autoResize();
            return true;
        } else {
            return METRO_DIALOG.children(".content").html();
        }
    }

    $.Dialog.title = function(newTitle) {
        if(!$.Dialog.opened || METRO_DIALOG == undefined) {
            return false;
        }

        var _title = METRO_DIALOG.children('.caption').children('.title');

        if(newTitle) {
            _title.html(newTitle);
        } else {
            _title.html();
        }

        return true;
    }

    $.Dialog.autoResize = function(){
        if(!$.Dialog.opened || METRO_DIALOG == undefined) {
            return false;
        }

        var _content = METRO_DIALOG.children(".content");

        var top = ($(window).height() - METRO_DIALOG.outerHeight()) / 2;
        var left = ($(window).width() - METRO_DIALOG.outerWidth()) / 2;

        METRO_DIALOG.css({
            width: _content.outerWidth(),
            height: _content.outerHeight(),
            top: top,
            left: left
        });

        return true;
    }

    $.Dialog.close = function() {
        if(!$.Dialog.opened || METRO_DIALOG == undefined) {
            return false;
        }

        $.Dialog.opened = false;
        var _overlay = METRO_DIALOG.parent(".window-overlay");
        _overlay.fadeOut(function(){
            $(this).remove();
        });

        return false;
    }
})(jQuery);
