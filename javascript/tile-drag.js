/**
 * jQuery plugin for drag'n'drop tiles
 */
(function($) {

    $.TileDrag = function(element, options) {

        var defaults = {
        };

        var plugin = this;

        plugin.settings = {};

        var $element = $(element),
            tiles,
            $draggingTile,
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
            plugin.settings = $.extend({}, defaults, options);

            $element.css({
                'position': 'relative'
            });

            // select all tiles within group
            tiles = $element.children('.tile');

            tiles.on('mousedown', startDrag);

        };

        var startDrag = function(event) {
            var $tile,
                /*tileOffset,
                tileOffsetX,
                tileOffsetY,*/
                tilePosition,
                tilePositionX,
                tilePositionY,
                groupOffset;

            event.preventDefault();

            $draggingTile = $tile = $(this);

            draggingTileWidth = $tile.outerWidth();
            draggingTileHeight = $tile.outerHeight();

            $phantomTile = $('<div></div>');
            //$phantom.data('phantomTile', true);
            $phantomTile.css({
                'background': 'none'
            });
            $phantomTile.addClass('tile');
            if ($tile.hasClass('double')) {
                $phantomTile.addClass('double');
            } else if ($tile.hasClass('double-vertical')) {
                $phantomTile.addClass('double-vertical');
            }

            /*tileOffset = $tile.offset();
            tileOffsetX = tileOffset.left;
            tileOffsetY = tileOffset.top;*/

            tilePosition = $tile.position();
            tilePositionX = tilePosition.left;
            tilePositionY = tilePosition.top;

            groupOffset = $element.offset();
            groupOffsetX = groupOffset.left;
            groupOffsetY = groupOffset.top;

            tileDeltaX = event.pageX - groupOffsetX - tilePositionX;
            tileDeltaY = event.pageY - groupOffsetY - tilePositionY;

            $phantomTile.insertAfter($tile);

            $tile.detach();
            $tile.appendTo($element);

            $tile.css({
                'position':     'absolute',
                'left':         tilePositionX,
                'top':          tilePositionY,
                'z-index':      100000
            });

            $tile.data('dragging', true);
            storeTilesCoordinates();

            $(document).on('mousemove.tiledrag', dragTile);
            $(document).on('mouseup.tiledrag', dragStop);
        };

        var dragTile = function (event) {

            var findTileIndex;

            event.preventDefault();

            $draggingTile.css({
                'left': event.pageX - groupOffsetX - tileDeltaX,
                'top':  event.pageY - groupOffsetY - tileDeltaY
            });

            findTileIndex = findTileUnderCursor(event);
            if (findTileIndex) {
                clearPlaceForTile($(tiles[findTileIndex]));
            } else {
                return;
            }
        };

        var dragStop = function (event) {

            event.preventDefault();

            $(document).off('mousemove.tiledrag');
            $(document).off('mouseup.tiledrag');

            $draggingTile.detach();
            $draggingTile.insertAfter($phantomTile);

            $phantomTile.remove();

            $draggingTile.css({
                'position': '',
                'left':     '',
                'top':      '',
                'z-index':  ''
            });

            $draggingTile.data('dragging', false);
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

                if ($tile.data('dragging')) return;

                offset = $tile.offset();
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

            // detect side of tile (left or right)
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

        var clearPlaceForTile = function ($tileUnderCursor) {
            var $oldPhantomTile;
            $oldPhantomTile = $phantomTile;
            $phantomTile = $oldPhantomTile.clone();

            /*$phantomTile.css({
                'width':    0,
                'height':   0
            });*/
            if (tileUnderCursorSide === 'before') {
                $phantomTile.insertBefore($tileUnderCursor);
            } else {
                $phantomTile.insertAfter($tileUnderCursor);
            }

            /*$oldPhantomTile.animate({
                'width':    0,
                'height':   0
            }, function () {
                $oldPhantomTile.remove();
            });

            $phantomTile.animate({
                'width':    draggingTileWidth,
                'height':   draggingTileHeight
            }, function () {
                storeTilesCoordinates();
            });*/

            $oldPhantomTile.remove();
            storeTilesCoordinates();
        };

        plugin.init();

    };

    $.fn.TileDrag = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('TileDrag')) {
                var plugin = new $.TileDrag(this, options);
                $(this).data('TileDrag', plugin);
            }
        });

    };

})(jQuery);

$(function(){
    var allTileGroups = $('[data-role=tile-drag], .tile-drag');
    allTileGroups.each(function (index, tileGroup) {
        var params = {};
        $tileGroup = $(tileGroup);
        //params.vote         = $rating.data('paramVote');

        $tileGroup.TileDrag(params);
    });
});