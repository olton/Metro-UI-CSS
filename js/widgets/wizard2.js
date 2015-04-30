(function ( $ ) {

    "use strict";

    $.widget( "metro.wizard2" , {

        version: "3.0.0",

        options: {
            start: 1,
            finish: 'default',
            buttonLabels: {
                prev: '&lt;',
                next: '&gt;',
                finish: 'OK',
                help: '?'
            },
            onPrevClick: function(step){return true;},
            onNextClick: function(step){return true;},
            onFinishClick: function(step){},
            onHelpClick: function(step){}
        },

        _step: 1,
        _steps: undefined,

        _create: function () {
            var that = this, element = this.element, o = this.options;

            $.each(element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = $.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            this._step = o.start;
            this._steps = element.children('.step');
            this._height = 0;
            this._width = 0;

            if (o.finish === 'default') {
                o.finish = this._steps.length;
            }

            $.each(this._steps, function(i, v){
                if ($(v).outerHeight() > that._height) {that._height = $(v).outerHeight();}
                //console.log(i, $(v).outerHeight(), that._height);
                if ($(v).hasClass('active')) {
                    that._step = i + 1;
                }
            });

            this._width = element.innerWidth() - ( (this._steps.length - 1) * 24 +  (this._steps.length));

            element.children('.step').css({
                height: this._height + 48
            });

            $(window).resize(function(){
                that._width = element.innerWidth() - ( (that._steps.length - 1) * 24 +  (that._steps.length));
                that.step(that._step);
            });

            this._createActionBar();
            this.step(o.start);
            this._placeActionBar();

            element.data('wizard2', this);
        },

        _createActionBar: function(){
            var that = this, element = this.element, o = this.options;
            var bar = $("<div/>").addClass('action-bar').appendTo(element);
            var btn_prev, btn_next, btn_help, btn_finish;

            btn_help = $("<button/>").html(o.buttonLabels.help).addClass('button cycle-button medium-button wiz-btn-help place-left').appendTo(bar);
            btn_finish = $("<button/>").html(o.buttonLabels.finish).addClass('button cycle-button medium-button wiz-btn-finish place-right').appendTo(bar);
            btn_next = $("<button/>").html(o.buttonLabels.next).addClass('button cycle-button medium-button wiz-btn-next place-right').appendTo(bar);
            btn_prev = $("<button/>").html(o.buttonLabels.prev).addClass('button cycle-button medium-button wiz-btn-prev place-right').appendTo(bar);

            btn_help.on('click', function(){
                if (typeof o.onHelpClick === 'string') {
                    window[o.onHelpClick](that._step);
                } else {
                    o.onHelpClick(that._step);
                }
            });

            btn_finish.on('click', function(){
                if (typeof o.onFinishClick === 'string') {
                    window[o.onFinishClick](that._step);
                } else {
                    o.onFinishClick(that._step);
                }
            });

            btn_prev.on('click', function(){
                if (typeof o.onPrevClick === 'string') {
                    if (window[o.onPrevClick](that._step)) {that.prev();}
                } else {
                    if (o.onPrevClick(that._step)) {that.prev();}
                }
            });

            btn_next.on('click', function(){
                if (typeof o.onNextClick === 'string') {
                    if (window[o.onNextClick](that._step)) {that.next();}
                } else {
                    if (o.onNextClick(that._step)) {that.next();}
                }
            });
        },

        _placeActionBar: function(){
            var element = this.element, o = this.options;
            var action_bar = element.find('.action-bar');
            var curr_frame = element.find('.step.active');
            var left = curr_frame.position().left, right = curr_frame.innerWidth();

            action_bar.css({
                left: left,
                width: right
            });
        },

        step: function(index){
            var o = this.options;

            this.element.children('.step')
                .removeClass('active prev next');

            $(this.element.children('.step')[index - 1])
                .addClass('active')
                .css('width', this._width);

            this.element.children('.step.active').prevAll().addClass('prev').css('width', 0);
            this.element.children('.step.active').nextAll().addClass('next').css('width', 0);

            this._placeActionBar();

            if (index === 1) {
                this.element.find('.wiz-btn-prev').hide();
            } else {
                this.element.find('.wiz-btn-prev').show();
            }

            if (index === this._steps.length) {
                this.element.find('.wiz-btn-next').hide();
            } else {
                this.element.find('.wiz-btn-next').show();
            }

            if (index !== o.finish) {
                this.element.find('.wiz-btn-finish').hide();
            } else {
                this.element.find('.wiz-btn-finish').show();
            }

        },

        prev: function(){
            var new_step = this._step - 1;
            if (new_step <= 0) {
                return false;
            }

            this._step = new_step;

            this.step(new_step);

            return true;
        },

        next: function(){
            var new_step = this._step + 1;
            if (new_step > this._steps.length) {return false;}

            this._step = new_step;

            this.step(new_step);

            return true;
        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });
})( jQuery );