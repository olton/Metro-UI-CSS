(function( $ ) {
    $.widget("metro.hint", {

        version: "1.0.0",

        options: {
            position: "bottom",
            background: '#FFFCC0',
            shadow: false,
            border: false,
            mode: 1,
            _hint: undefined
        },

        _create: function(){
            var that = this;
            var o = this.options;


            this.element.on('mouseenter', function(e){
                $(".hint, .hint2").remove();
                that.createHint();
                //o._hint.stop().fadeIn();
                o._hint.show();
                e.preventDefault();
            });

            this.element.on('mouseleave', function(e){
//                o._hint.stop().fadeOut(function(){
//                    o._hint.remove();
//                });
                o._hint.hide().remove();
                e.preventDefault();
            });
        },

        createHint: function(){
            var that = this, element = this.element,
                hint = element.data('hint').split("|"),
                o = this.options;

            var _hint;

            if (element.data('hintPosition') != undefined) o.position = element.data('hintPosition');
            if (element.data('hintBackground') != undefined) o.background = element.data('hintBackground');
            if (element.data('hintShadow') != undefined) o.shadow = element.data('hintShadow');
            if (element.data('hintBorder') != undefined) o.border = element.data('hintBorder');
            if (element.data('hintMode') != undefined) o.mode = element.data('hintMode');

            if (element[0].tagName == 'TD' || element[0].tagName == 'TH') {
                var wrp = $("<div/>").css("display", "inline-block").html(element.html());
                element.html(wrp);
                element = wrp;
            }

            var hint_title = hint.length > 1 ? hint[0] : false;
            var hint_text = hint.length > 1 ? hint[1] : hint[0];

            //_hint = $("<div/>").addClass("hint").appendTo(element.parent());

            _hint = $("<div/>").appendTo('body');
            if (o.mode == 2) {
                _hint.addClass('hint2');
            } else {
                _hint.addClass('hint');
            }

            if (hint_title) {
                $("<div/>").addClass("hint-title").html(hint_title).appendTo(_hint);
            }
            $("<div/>").addClass("hint-text").html(hint_text).appendTo(_hint);

            _hint.addClass(o.position);

            if (o.shadow) _hint.addClass("shadow");
            if (o.background) {_hint.css("background-color", o.background);}
            if (o.border) _hint.css("border-color", o.border);

            //console.log(_hint);

            if (o.position == 'top') {
                //console.log(element.offset().top - $(window).scrollTop()  - 20);
                _hint.css({
                    top: element.offset().top - $(window).scrollTop() - _hint.outerHeight() - 20,
                    left: o.mode == 2 ? element.offset().left + element.outerWidth()/2 - _hint.outerWidth()/2  - $(window).scrollLeft(): element.offset().left - $(window).scrollLeft()
                });
            } else if (o.position == 'bottom') {
                _hint.css({
                    top: element.offset().top - $(window).scrollTop() + element.outerHeight(),
                    left: o.mode == 2 ? element.offset().left + element.outerWidth()/2 - _hint.outerWidth()/2  - $(window).scrollLeft(): element.offset().left - $(window).scrollLeft()
                });
            } else if (o.position == 'right') {
                _hint.css({
                    top: o.mode == 2 ? element.offset().top + element.outerHeight()/2 - _hint.outerHeight()/2 - $(window).scrollTop() - 10 : element.offset().top - 10 - $(window).scrollTop(),
                    left: element.offset().left + element.outerWidth() + 15 - $(window).scrollLeft()
                });
            } else if (o.position == 'left') {
                _hint.css({
                    top: o.mode == 2 ? element.offset().top + element.outerHeight()/2 - _hint.outerHeight()/2 - $(window).scrollTop() - 10 : element.offset().top - 10 - $(window).scrollTop(),
                    left: element.offset().left - _hint.outerWidth() - 10 - $(window).scrollLeft()
                });
            }

            o._hint = _hint;
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );



