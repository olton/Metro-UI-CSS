import {Animation} from "@olton/animation";

globalThis["Animation"] = Animation

if (globalThis.$) {
    $.easing = Animation.easing
    $.fn.extend({
        animate: function(options){
            return this.each(function(){
                Animation.animate({
                    el: this,
                    ...options
                }).then(() => {})
            })
        },

        animationChain: function(arr, options){
            return this.each(function(){
                const el = this;
                $.each(arr, function(){
                    this.el = el;
                });
                Animation.chain(arr, options).then(() => {});
            });
        },

        animationStop: function(done){
            return this.each(function(){
                const el = this;
                $.each(Animation.elements, function(k, o){
                    if (o.element === el) {
                        Animation.stop(k, done);
                    }
                });
            });
        },

        animationPause: function(){
            return this.each(function(){
                const el = this;
                $.each(Animation.elements, function(k, o){
                    if (o.element === el) {
                        Animation.pause(k);
                    }
                });
            });
        },

        animationResume: function(){
            return this.each(function(){
                const el = this;
                $.each(Animation.elements, function(k, o){
                    if (o.element === el) {
                        Animation.resume(k);
                    }
                });
            });
        }
    })
}
