(function( $ ) {
    $.widget("metro.rating", {

        version: "1.0.0",

        options: {
            score: 0,
            half: false,
            stars: 5,
            static: true,
            hints: ['bad', 'poor', 'regular', 'good', 'gorgeous'],
            showHint: false,
            showScore: false,
            scoreHint: "Current score: ",
            click: function(value, rating){}
        },

        _create: function(){
            var that = this,
                element = this.element;

            if (element.data('score') != undefined) {
                this.options.score = element.data('score');
            }
            if (element.data('half') != undefined) {
                this.options.half = element.data('half');
            }
            if (element.data('stars') != undefined) {
                this.options.stars = element.data('stars');
            }
            if (element.data('showHint') != undefined) {
                this.options.showHint = element.data('showHint');
            }
            if (element.data('static') != undefined) {
                this.options.static = element.data('static');
            }
            if (element.data('showScore') != undefined) {
                this.options.showScore = element.data('showScore');
            }
            if (element.data('scoreHint') != undefined) {
                this.options.scoreHint = element.data('scoreHint');
            }

            this._showRating();
        },

        rate: function(value){
            this.options.score = value;
            this._showRating();
        },

        _showRating: function(){
            var that = this,
                element = this.element,
                options = this.options,
                ul, li;

            element.addClass("rating");
            element.html('');
            ul = $("<ul/>");

            if (!options.static){
                element.addClass("active");
            }

            for(var i=0; i<options.stars;i++){
                li = $("<li/>"); li.data('value', i+1);

                if (options.showHint) li.attr('title', options.hints[i]);

                if (i <= options.score - 1) {
                    li.addClass("rated");
                }
                li.on("click", function(){
                    options.click($(this).data('value'), that);
                });
                li.appendTo(ul);
            }

            ul.appendTo(element);

            if (options.showScore) {
                $("<span/>").addClass('score-hint').html(options.scoreHint+options.score).appendTo(element);
                element.css('height', 'auto');
            } else {
                element.find('ul').css('margin-bottom', 0);
            }
        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

