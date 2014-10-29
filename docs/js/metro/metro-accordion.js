(function( $ ) {
    $.widget("metro.accordion", {

        version: "1.0.0",

        options: {
            closeAny: true,
            open: function(frame){},
            action: function(frame){}
        },

        _frames: {},

        _create: function(){
            var element = this.element;

            if (element.data('closeany') != undefined) this.options.closeAny = element.data('closeany');

            this.init();
        },

        init: function(){
            var that = this;

            that.element.on('click', '.accordion-frame > .heading', function(e){
                e.preventDefault();
                e.stopPropagation();

                if ($(this).attr('disabled') || $(this).data('action') == 'none') return;

                if (that.options.closeAny) that._closeFrames();

                var frame = $(this).parent(), content = frame.children('.content');
                console.log(this);

                if ($(content).is(":hidden")) {
                    $(content).slideDown();
                    $(this).removeClass("collapsed");
                    that._trigger("frame", e, {frame: frame});
                    that.options.open(frame);
                } else {
                    $(content).slideUp();
                    $(this).addClass("collapsed");
                }
                that.options.action(frame);
            });

            var frames = this.element.children('.accordion-frame');


            frames.each(function(){
                var frame = this,
                    a = $(this).children(".heading"),
                    content = $(this).children(".content");

                if ($(frame).hasClass("active") && !$(frame).attr('disabled') && $(frame).data('action') != 'none') {
                    $(content).show();
                    $(a).removeClass("collapsed");
                } else {
                    $(a).addClass("collapsed");
                }
            });


        },

        _closeFrames: function(){
            var frames = this.element.children('.accordion-frame');
            $.each(frames, function(){
                var frame = $(this);
                frame.children('.heading').addClass('collapsed');
                frame.children('.content').slideUp();
            });
            //this._frames.children(".content").slideUp().parent().children('.heading').addClass("collapsed");
        },

        _destroy: function(){},

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

