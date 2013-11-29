(function( $ ) {
    $.widget("metro.hint", {

        version: "1.0.0",

        options: {
            position: 'bottom', // top or bottom
            _hint: undefined
        },

        _create: function(){
            var that = this, element = this.element,
                hint = element.data('hint').split("|"),
                o = this.options;

            var _hint;

            if (element.data('hintPosition') != undefined) o.position = element.data('hintPosition');

            var hint_title = hint.length > 1 ? hint[0] : false;
            var hint_text = hint.length > 1 ? hint[1] : hint[0];

            _hint = $("<div/>").addClass("hint").appendTo(element.parent());
            if (hint_title) {
                $("<div/>").addClass("hint-title").html(hint_title).appendTo(_hint);
            }
            $("<div/>").addClass("hint-text").html(hint_text).appendTo(_hint);

            _hint.addClass(o.position);

            if (o.position == 'top') {
                _hint.css({
                    top: element.position().top - _hint.outerHeight() - 20,
                    left: element.position().left
                });
            } else if (o.position == 'bottom') {
                _hint.css({
                    top: element.position().top + element.outerHeight(),
                    left: element.position().left
                });
            } else if (o.position == 'right') {
                _hint.css({
                    top: element.position().top - 10,
                    left: element.position().left + element.outerWidth() + 10
                });
            } else if (o.position == 'left') {
                _hint.css({
                    top: element.position().top - 10,
                    left: element.position().left - _hint.outerWidth() - 10
                });
            }

            element.on('mouseenter', function(e){
                _hint.fadeIn();
                e.preventDefault();
            });

            element.on('mouseleave', function(e){
                _hint.fadeOut();
                e.preventDefault();
            });

            o._hint = _hint;
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

$(function () {
    $('[data-hint]').hint();
});

function reinitHints(){
    $('[data-hint]').hint();
}