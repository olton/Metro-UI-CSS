/**
 * Created by JetBrains PhpStorm.
 * User: olton
 * Date: 04.03.12
 * Time: 23:42
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.metro = function(){
        //$("a").bind("click", function(){return false;})

        $("#metro-ui-setions").mousewheel(function(event, delta){
            return false;
        })

        // Slide Sections
        $(".metro-ui-next, .metro-ui-back").bind("click", function(){
            var target = $(this).attr("data-next");
            $(".metro-ui").scrollTo(target, 1000, {
                onAfter: function(el, target){
                    //$("#page-title").html($(el).children(".metro-ui-section-title").html())
                }
            });
        })

        // Make Sortable
        $(".metro-ui-section ul").sortable();
        $(".metro-ui-section ul").disableSelection();

        // Effects
        /*
        $("a.tile").bind("mouseenter", function(){
            var el = $(this);
            el.transition({
                scale: 1.05
            });
        })

        $("a.tile").bind("mouseleave", function(){
            var el = $(this);
            el.transition({
                scale: 1
            });
        })
        */

        $("a.tile").bind("click", function(){
            var el = $(this);
            el.transition({scale: .95}).transition({scale: 1});
            return false;
        })

        $(".metro-ui-imageOverlay").bind("click", function(){
            var el = $(this);
            el.toggleClass("selected");
        })

        $(".metro-ui-item").bind("click", function(){
            var el = $(this);
            el.toggleClass("selected");
            return false;
        })

        $(".metro-ui-thumb").bind("click", function(){
            var el = $(this);
            el.toggleClass("selected");
            return false;
        })

        $(".metro-ui-app-item").bind("click", function(){
            var el = $(this);
            el.toggleClass("selected");
            return false;
        })

        clock(".current-time");
        $(".current-day").html(Date.today().toString("dddd"));
        $(".current-date").html(Date.today().toString("dd MMMM yyyy"));

    }
})(jQuery)