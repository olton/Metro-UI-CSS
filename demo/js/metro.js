(function($){
    $.fn.metro = function(){
        var currentSectionIndex = 0;
        /*
        var tilesSections = $(".metro-section");
        var currentSection = tilesSections[currentSectionIndex];
        var maxSectionIndex = tilesSections.length - 1;
        var scrollTarget = $(".next-section")[currentSectionIndex];
        */
        $(".metro-sections").mousewheel(function(event, delta, deltaX, deltaY){
            var scrollNext = delta < 0;
            return false;
        });


        $(".next-section").bind("click", function(){
            var target = $(this);
            if ($(this).hasClass("back")) {
                currentSectionIndex -=1;
                if (currentSectionIndex == 0) {
                    target = target.parent(".metro-section");
                } else {
                    target = $($($(this).attr("data-prior")).parent().children(".metro-section")[0]).children("a.next-section");
                }
                $(this).removeClass("back");
            } else {
                currentSectionIndex +=1;
                var target = $(this);
                $(this).addClass("back");
            }
            $(".metro").scrollTo($(target), 700, {
                onAfter: function(el, target){

                }
            });
        })

        // Tiles click&hover effects
        var tiles = $(".tile");
        $.each(tiles, function(i, e){
            var el = $(this);

            el.mousedown(function(e){
                var mouse = {
                    x: e.pageX - el.offset().left,
                    y: e.pageY - el.offset().top
                };
                //console.log(mouse);
                if (mouse.x < el.outerWidth() / 2) {
                    console.log("left");
                    el.toggleClass("tile-active-left");
                } else {
                    console.log("right");
                    el.toggleClass("tile-active-right");
                }
            }).mouseup(function(e){
                var mouse = {
                    x: e.pageX - el.offset().left,
                    y: e.pageY - el.offset().top
                };
                if (mouse.x < el.outerWidth() / 2) {
                    console.log("left");
                    el.toggleClass("tile-active-left");
                } else {
                    console.log("right");
                    el.toggleClass("tile-active-right");
                }
            }).mouseenter(function(){
                if (el.hasClass("tile-multi-content")){
                    var c_main = $(el.children(".tile-content-main"));
                    var c_sub = $(el.children(".tile-content-sub"));
                    var subHeight = c_sub.height()+5;
                    c_main.animate({"marginTop": - subHeight}, 100);
                    c_sub.css("opacity", 1);
                }
            }).mouseleave(function(){
                if (el.hasClass("tile-multi-content")){
                    var c_main = $(el.children(".tile-content-main"));
                    var c_sub = $(el.children(".tile-content-sub"));
                    var subHeight = c_sub.height();
                    c_main.animate({"marginTop": 0}, 100);
                    c_sub.css("opacity", .1);
                }
            }).mouseout(function(){
                //if( el.data('metro').clicking ){
                //   el.mouseup()
                //}
            })
        })

        // Selectable
        var selectables = $(".selectable");
        $.each(selectables, function(i, e){
            var el = $(this);
            var items = el.children(".metro-image, .metro-image-overlay, .metro-icon-text, .metro-image-text");
            items.bind("click", function(){
                if ($(this).hasClass("disabled")) return;
                $(this).toggleClass("selected");
            })
        })

        // Metro-Switchers
        var switchers = $(".metro-switch");
        switchers.bind("click", function(){
            var el = $(this);
            if (el.hasClass('disabled') || el.hasClass('static')) return false;
            el.toggleClass("state-on");
        })
    }
})(jQuery)