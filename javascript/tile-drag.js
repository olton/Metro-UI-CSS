/**
 * jQuery plugin for drag'n'drop tiles
 *
 * to init plugin just add class 'tile-drag' to your tile-group element
 * or add attribute data-role="tile-drag"
 *
 * to handle drag/drop events use next code

$(function(){
    $('#tile_group_id').on('drag', function(e, draggingTile, parentGroup){
       ... your code ...
    });
    $('#tile_group_id').on('drop', function(e, draggingTile, targetGroup){
        ... your code ...
    });
});

 *
 * if you want to use drag'n'drop between groups use attribute data-param-group="any_id" to link groups
 */
(function($) {

    $.TileDrag = function(element, options) {

        var defaults = {
            // if group sets and exists other same groups, it is possible to drag'n'drop from one group to another
            group: null
        };

        var plugin = this;

        plugin.settings = {};

        var $element = $(element),
            $groups,
            settings,
            tiles,
            $draggingTile,
            $parentGroup, // parent group for dragging tile
            draggingTileWidth,
            draggingTileHeight,
            $phantomTile,
            tileDeltaX,
            tileDeltaY,
            groupOffsetX,
            groupOffsetY,
            tilesCoordinates,
            tileSearchCount = 0, // uses for findTileUnderCursor function
            tileUnderCursorIndex,
            tileUnderCursorSide;

        plugin.init = function() {
            settings = plugin.settings = $.extend({}, defaults, options);

            // if group is set
            if (settings.group) {
                // search other elements with same group
                $groups = $('[data-role=tile-drag], .tile-drag').filter('[data-param-group=' + settings.group + ']');
            } else {
                $groups = $element;
            }

            // any tile-group must be relative
            $groups.css({
                'position': 'relative'
            });

            // select all tiles within group
            tiles = $groups.children('.tile');

            tiles.on('mousedown', startDrag);

        };

        var startDrag = function(event) {
            var $tile,
                tilePosition,
                tilePositionX,
                tilePositionY,
                groupOffset;

            event.preventDefault();

            // currently dragging tile
            $draggingTile = $tile = $(this);

            // search parent group
            $parentGroup = $tile.parents('.tile-drag');

            // dragging tile dimentions
            draggingTileWidth = $tile.outerWidth();
            draggingTileHeight = $tile.outerHeight();

            // hidden tile to place it where dragging tile will dropped
            $phantomTile = $('<div></div>');
            $phantomTile.css({
                'background': 'none'
            });
            $phantomTile.addClass('tile');
            if ($tile.hasClass('double')) {
                $phantomTile.addClass('double');
            } else if ($tile.hasClass('triple')) {
                $phantomTile.addClass('triple');
            } else if ($tile.hasClass('quadro')) {
                $phantomTile.addClass('quadro');
            } else if ($tile.hasClass('double-vertical')) {
                $phantomTile.addClass('double-vertical');
            } else if ($tile.hasClass('triple-vertical')) {
                $phantomTile.addClass('triple-vertical');
            } else if ($tile.hasClass('quadro-vertical')) {
                $phantomTile.addClass('quadro-vertical');
            }

            // dragging tile position within group
            tilePosition = $tile.position();
            tilePositionX = tilePosition.left;
            tilePositionY = tilePosition.top;

            // group element offset relate to document border
            groupOffset = $parentGroup.offset();
            groupOffsetX = groupOffset.left;
            groupOffsetY = groupOffset.top;

            // pixels count between cursor and dragging tile border
            tileDeltaX = event.pageX - groupOffsetX - tilePositionX;
            tileDeltaY = event.pageY - groupOffsetY - tilePositionY;

            // place phantom tile instead dragging one
            $phantomTile.insertAfter($tile);

            /*$tile.detach();
            $tile.appendTo($parentGroup);*/

            // still now it absolutely positioned
            $tile.css({
                'position':     'absolute',
                'left':         tilePositionX,
                'top':          tilePositionY,
                'z-index':      100000
            });

            // store it for future
            $tile.data('dragging', true);
            storeTilesCoordinates();

            // some necessary event handlers
            $(document).on('mousemove.tiledrag', dragTile);
            $(document).on('mouseup.tiledrag', dragStop);

            // triggering event
            $groups.trigger('drag', [$draggingTile, $parentGroup]);
        };

        /**
         * it function called on every mousemove event
         */
        var dragTile = function (event) {

            // all we need is index of tile under cursor (and under dragging tile) if it exists
            var findTileIndex;

            event.preventDefault();

            // move dragging tile
            $draggingTile.css({
                'left': event.pageX - groupOffsetX - tileDeltaX,
                'top':  event.pageY - groupOffsetY - tileDeltaY
            });

            findTileIndex = findTileUnderCursor(event);
            if (findTileIndex) {
                clearPlaceForTile($(tiles[findTileIndex]));
            }
        };

        /**
         * when this function called dragging tile dropping to clear place (instead phantom tile)
         * removing events
         * and some other necessary changes
         */
        var dragStop = function (event) {
            var targetGroup;

            event.preventDefault();

            $(document).off('mousemove.tiledrag');
            $(document).off('mouseup.tiledrag');

            $draggingTile.detach();
            $draggingTile.insertAfter($phantomTile);

            targetGroup = $phantomTile.parents('.tile-drag');
            $phantomTile.remove();

            $draggingTile.css({
                'position': '',
                'left':     '',
                'top':      '',
                'z-index':  ''
            });

            $draggingTile.data('dragging', false);

            $groups.trigger('drop', [$draggingTile, targetGroup]);
        };

        /*
         * stores tiles coordinates for future finding one tile under cursor
         * excluding current dragging tile
         */
        var storeTilesCoordinates = function () {
            tilesCoordinates = {};
            tiles.each(function (index, tile) {
                var $tile, offset;

                $tile = $(tile);

                // we dont need dragging tile coordinates
                if ($tile.data('dragging')) return;

                offset = $tile.offset();
                // it is not real coordinates related to document border
                // but corrected for less computing during dragging (tile moving)
                tilesCoordinates[index] = {
                    x1: offset.left + tileDeltaX - draggingTileWidth / 2,
                    y1: offset.top + tileDeltaY - draggingTileHeight / 2,
                    x2: offset.left + $tile.outerWidth() + tileDeltaX - draggingTileWidth / 2,
                    y2: offset.top + $tile.outerHeight() + tileDeltaY - draggingTileHeight / 2
                }
            });
        };

        /**
         * search tile under cursor using tileCoordinates from storeTilesCoordinates function
         * search occurred only one time per ten times for less load and more smooth
         */
        var findTileUnderCursor = function (event) {
            var i, coord,
                tileIndex = false,
                tileSide;

            if (tileSearchCount < 10) {
                tileSearchCount++;
                return false;
            }
            tileSearchCount = 0;

            for (i in tilesCoordinates) {
                if (!tilesCoordinates.hasOwnProperty(i)) return;
                coord = tilesCoordinates[i];
                if (coord.x1 < event.pageX && event.pageX < coord.x2 && coord.y1 < event.pageY && event.pageY < coord.y2) {
                    tileIndex = i;
                    break;
                }
            }

            // detect side of tile (left or right) to clear place before or after tile
            if (tileIndex) {
                if (event.pageX < coord.x1 + $(tiles[tileIndex]).outerWidth() / 2) {
                    tileSide = 'before';
                } else {
                    tileSide = 'after';
                }
            }
            if (tileSide === tileUnderCursorSide && tileIndex === tileUnderCursorIndex) {
                return false;
            }
            tileUnderCursorSide = tileSide;
            tileUnderCursorIndex = tileIndex;

            return tileIndex;
        };

        /**
         * just put phantom tile near tile under cursor (before or after)
         * and remove previous phantom tile
         */
        var clearPlaceForTile = function ($tileUnderCursor) {
            var $oldPhantomTile,
                groupOffset;

            $oldPhantomTile = $phantomTile;
            $phantomTile = $oldPhantomTile.clone();

            // before or after, this is question ...
            if (tileUnderCursorSide === 'before') {
                $phantomTile.insertBefore($tileUnderCursor);
            } else {
                $phantomTile.insertAfter($tileUnderCursor);
            }

            $oldPhantomTile.remove();
            // it is necessary to store new tile coordinates
            storeTilesCoordinates();
            // and parent group coordinates
            groupOffset = $parentGroup.offset();
            groupOffsetX = groupOffset.left;
            groupOffsetY = groupOffset.top;
        };

        // return all groups involved to this plugin
        plugin.getGroups = function () {
            return $groups;
        };

        plugin.init();

    };

    $.fn.TileDrag = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('TileDrag')) {
                var plugin = new $.TileDrag(this, options);
                var $groups = plugin.getGroups();
                $groups.data('TileDrag', plugin);
            }
        });

    };

})(jQuery);

$(function(){
    var allTileGroups = $('[data-role=tile-drag], .tile-drag');
    allTileGroups.each(function (index, tileGroup) {
        var params = {};
        $tileGroup = $(tileGroup);
        params.group         = $tileGroup.data('paramGroup');
        $tileGroup.TileDrag(params);
    });
});