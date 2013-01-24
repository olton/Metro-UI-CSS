/**
 * use this plugin if you want to make tiled menu like windows 8 start menu
 * what plugin needs for?
 * it needs for following elements structure
 *  <div class="page">
 *      <div class="tiles">
 *          <div class="tile-group">
 *              <div class="tile"></div>
 *              <div class="tile"></div>
 *              .........
 *              <div class="tile"></div>
 *          </div>
 *      </div>
 *  </div>
 *  
 * if you do some changes, for example, move tile from one group, you have to use
 * $('.tiles').trigger('changed')
 * and all tiles will placed to own place
 */
(function($) {

    $.StartMenu = function(element, options) {

        var $startMenu,
            plugin = this,
            maxGroupHeight;

        plugin.init = function() {
            var resizeTimer;

            $startMenu = $('.tiles');
            
            addMouseWheel();
            setPageWidth();
            tuneUpStartMenu(); // need twice

            $(window).on('resize', function(){
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function(){
                    tuneUpStartMenu();
                }, 200);
            });
            $startMenu.on('changed', function(){
                tuneUpStartMenu();
            });
        };

        /**
         * called on init 
         * and on resize window
         * and any tiles moves
         */
        var tuneUpStartMenu = function () {
            var $groups = $startMenu.find('.tile-group');
            if ($groups.length === 0) {
                return;
            }
            
            maxGroupHeight = $(window).height() - $($groups.get(0)).offset().top;
            
            $groups.each(function(index, group){
                var $group = $(group);
                // finding min width for group
                var groupWidth = 0;
                var $tiles = $group.find('.tile');
                if ($tiles.length === 0) {
                    return;
                }
                // finding min width according to the widest tile
                $tiles.each(function(index, tile){
                    var $tile = $(tile);
                    var tileWidth = 161;
                    if ($tile.hasClass('double')) {
                        tileWidth = 322;
                    } else if ($tile.hasClass('triple')) {
                        tileWidth = 483;
                    } else if ($tile.hasClass('quadro')) {
                        tileWidth = 644;
                    }
                    
                    if (tileWidth > groupWidth) {
                        groupWidth = tileWidth;
                    }
                });
                
                $group.css({
                    width: 'auto',
                    maxWidth: groupWidth
                });
                
                var counter, groupHeight_,
                groupHeight = $group.height();
                while (groupHeight > maxGroupHeight) {
                    if (counter > $tiles.length) { // protection from endless loop
                        break;
                    } else if (groupHeight === groupHeight_) {
                        counter++;
                    } else {
                        counter = 1;
                    }
                    groupHeight_ = groupHeight;
                    groupWidth += 161;
                    $group.css({
                        'maxWidth': groupWidth
                    });
                    groupHeight = $group.height();
                }
            });
            
            setPageWidth();
        };
        
        var setPageWidth = function () {
            var tilesWidth = 0;
            
            $startMenu.find(".tile-group").each(function(){
                tilesWidth += $(this).outerWidth() + 80;
            });

            $startMenu.css("width", 120 + tilesWidth + 20);
            
            $(".page").css('width', '').css({
                width: $(document).width()
            });
        };
        
        var addMouseWheel = function (){
            $("body").mousewheel(function(event, delta){
                var scroll_value = delta * 50;
                $(document).scrollLeft($(document).scrollLeft() - scroll_value);
                return false;
            });
        };
        
        plugin.init();

    };

    $.fn.StartMenu = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('StartMenu')) {
                var plugin = new $.StartMenu(this, options);
                $(this).data('StartMenu', plugin);
            }
        });
    };

})(jQuery);

$(function(){
    $.StartMenu();
});