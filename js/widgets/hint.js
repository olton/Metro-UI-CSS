$.widget("metro.hint", {

    version: "3.0.0",

    options: {
        hintPosition: "auto", // bottom, top, left, right, auto
        hintBackground: '#FFFCC0',
        hintColor: '#000000',
        hintMaxSize: 200,
        hintMode: 'default',
        hintShadow: false,
        hintBorder: true,
        hintTimeout: 0,
        hintTimeDelay: 0,

        _hint: undefined
    },

    _create: function(){
        var that = this, element = this.element;
        var o = this.options;


        this.element.on('mouseenter', function(e){
            $(".hint, .hint2").remove();
            if (o.hintTimeDelay > 0) {
                setTimeout(function(){
                    that.createHint();
                    o._hint.show();
                }, o.hintTimeDelay);
            } else {
                that.createHint();
                o._hint.show();
            }
            e.preventDefault();
        });

        this.element.on('mouseleave', function(e){
            if (o._hint.length) {
                o._hint.hide().remove();
            }
            e.preventDefault();
        });

        //element.data('hint', this);

    },

    createHint: function(){
        var that = this, element = this.element,
            hint = element.data('hint').split("|"),
            o = this.options;

        var _hint;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });

        if (element[0].tagName === 'TD' || element[0].tagName === 'TH') {
            var wrp = $("<div/>").css("display", "inline-block").html(element.html());
            element.html(wrp);
            element = wrp;
        }

        var hint_title = hint.length > 1 ? hint[0] : false;
        var hint_text = hint.length > 1 ? hint[1] : hint[0];


        _hint = $("<div/>").appendTo('body');
        if (o.hintMode === 2) {
            _hint.addClass('hint2');
        } else {
            _hint.addClass('hint');
        }

        if (!o.hintBorder) {
            _hint.addClass('no-border');
        }

        if (hint_title) {
            $("<div/>").addClass("hint-title").html(hint_title).appendTo(_hint);
        }
        $("<div/>").addClass("hint-text").html(hint_text).appendTo(_hint);

        _hint.addClass(o.position);

        if (o.hintShadow) {_hint.addClass("shadow");}
        if (o.hintBackground) {
            if (o.hintBackground.isColor()) {
                _hint.css("background-color", o.hintBackground);
            } else {
                _hint.addClass(o.hintBackground);
            }
        }
        if (o.hintColor) {
            if (o.hintColor.isColor()) {
                _hint.css("color", o.hintColor);
            } else {
                _hint.addClass(o.hintColor);
            }
        }

        if (o.hintMaxSize > 0) {
            _hint.css({
                'max-width': o.hintMaxSize
            });
        }

        //if (o.hintMode !== 'default') {
        //    _hint.addClass(o.hintMode);
        //}

        if (o.hintPosition === 'top') {
            _hint.addClass('top');
            _hint.css({
                top: element.offset().top - $(window).scrollTop() - _hint.outerHeight() - 20,
                left: o.hintMode === 2 ? element.offset().left + element.outerWidth()/2 - _hint.outerWidth()/2  - $(window).scrollLeft(): element.offset().left - $(window).scrollLeft()
            });
        } else if (o.hintPosition === 'right') {
            _hint.addClass('right');
            _hint.css({
                top: o.hintMode === 2 ? element.offset().top + element.outerHeight()/2 - _hint.outerHeight()/2 - $(window).scrollTop() - 10 : element.offset().top - 10 - $(window).scrollTop(),
                left: element.offset().left + element.outerWidth() + 15 - $(window).scrollLeft()
            });
        } else if (o.hintPosition === 'left') {
            _hint.addClass('left');
            _hint.css({
                top: o.hintMode === 2 ? element.offset().top + element.outerHeight()/2 - _hint.outerHeight()/2 - $(window).scrollTop() - 10 : element.offset().top - 10 - $(window).scrollTop(),
                left: element.offset().left - _hint.outerWidth() - 10 - $(window).scrollLeft()
            });
        } else {
            _hint.addClass('bottom');
            _hint.css({
                top: element.offset().top - $(window).scrollTop() + element.outerHeight(),
                left: o.hintMode === 2 ? element.offset().left + element.outerWidth()/2 - _hint.outerWidth()/2  - $(window).scrollLeft(): element.offset().left - $(window).scrollLeft()
            });
        }

        o._hint = _hint;

        if (o.hintTimeout > 0) {
            setTimeout(function(){
                if (o._hint.length) {
                    o._hint.hide().remove();
                }
            }, o.hintTimeout);
        }
    },

    _destroy: function(){
    },

    _setOption: function(key, value){
        this._super('_setOption', key, value);
    }
});
