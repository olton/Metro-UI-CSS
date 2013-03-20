/**
 * drag'n'drop plugin
 *
 * this plugin allows to drag tiles between groups
 *
 * this plugin auto enabled to 'tile-group' elements
 * or elements with attribute data-role="tile-group"
 *
 * to handle drag/drop events use next code
 *

 $(function(){
    $('#tile_group_id').on('drag', function(e, draggingTile, parentGroup){
       ... your code ...
    });
    $('#tile_group_id').on('drop', function(e, draggingTile, targetGroup){
        ... your code ...
    });
});

 *
 */
(function($) {

    $.TileDrag = function(element, options) {

        var defaults = {};

        var plugin = this;

        plugin.settings = {};

        var $element = $(element),
            $startMenu,
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
            tilesCoordinates,
            tileSearchCount = 0, // uses for findTileUnderCursor function
            tileUnderCursorIndex,
            tileUnderCursorSide,
            newGroupsCoordinates,
            newGroupSearchCount = 0,
            newGroupPhantom,
            targetType, // 'new' or 'existing' group
            groupsMaxHeight,
            mouseMoved,
            tileDragTimer,
            tileStartDragTimer;

        plugin.init = function() {
            settings = plugin.settings = $.extend({}, defaults, options);

            $startMenu = $('.tiles');

            // search other 'tile-group' elements
            $groups = $('[data-role=tile-group], .tile-group');

            // select all tiles within group
            tiles = $groups.children('.tile');

            tiles.on('mousedown', function(event) {
                event.preventDefault();
                clearTimeout(tileStartDragTimer);
                var el = $(this);
                tileStartDragTimer = setTimeout(function() {
                    startDrag(el, event);
                }, 1000);
            }).on('mouseup mouseout', function() {
                clearTimeout(tileStartDragTimer);
            });

            //tiles.on('mousedown', startDrag);
        };

        var startDrag = function(el, event) {
            var $tile,
                tilePosition,
                tilePositionX,
                tilePositionY;

            event.preventDefault();

            // currently dragging tile
            $tile = $draggingTile = el;
            //$tile.animate({"width": "-=20px", "height": "-=20px"}, "fast").animate({"width": "+=20px", "height": "+=20px"}, "fast");

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
            }
            if ($tile.hasClass('double-vertical')) {
                $phantomTile.addClass('double-vertical');
            } else if ($tile.hasClass('triple-vertical')) {
                $phantomTile.addClass('triple-vertical');
            } else if ($tile.hasClass('quadro-vertical')) {
                $phantomTile.addClass('quadro-vertical');
            }

            // place phantom tile instead dragging one
            $phantomTile.insertAfter($tile);
            targetType = 'existing';

            // search parent group
            $parentGroup = $tile.parents('.tile-group');

            // dragging tile position within group
            tilePosition = $tile.offset();
            tilePositionX = tilePosition.left - (event.pageX - event.clientX);
            tilePositionY = tilePosition.top - (event.pageY - event.clientY);

            // pixels count between cursor and dragging tile border
            tileDeltaX = event.clientX - tilePositionX;
            tileDeltaY = event.clientY - tilePositionY;

            // move tile element to $draggingTileContainer
            $tile.detach();
            $tile.insertAfter($($groups.get(-1))); // it need for invalid IE z-index

            // from now it fixed positioned
            $tile.css({
                'position':     'fixed',
                'left':         tilePositionX,
                'top':          tilePositionY,
                'z-index':      100000
            });

            // store it for future
            $tile.data('dragging', true);
            storeTilesCoordinates();
            storeNewGroupsCoordinates();

            // some necessary event handlers
            $(document).on('mousemove.tiledrag', dragTile);
            $(document).one('mouseup.tiledrag', dragStop);

            mouseMoved = false;

            // triggering event
            $groups.trigger('drag', [$draggingTile, $parentGroup]);
        };

        /**
         * it function called on every mousemove event
         */
        var dragTile = function (event) {
            mouseMoved = true;

            event.preventDefault();

            // move dragging tile
            $draggingTile.css({
                'left': event.clientX - tileDeltaX,
                'top':  event.clientY - tileDeltaY
            });

            clearTimeout(tileDragTimer);
            tileDragTimer = setTimeout(function(){
                findPlace(event);
            }, 50);
        };

        // finding place where put dragging tile
        var findPlace = function (event) {
            // all we need is index of tile under cursor (and under dragging tile) if it exists
            var findTileIndex,
                findNewGroup;

            findTileIndex = findTileUnderCursor(event);
            if (findTileIndex) {
                clearPlaceForTile($(tiles[findTileIndex]));
            } else {
                findNewGroup = findNewGroupUnderCursor(event);
                if (findNewGroup) {
                    showNewGroupPhantom(findNewGroup.group, findNewGroup.side);
                }
            }
        };

        /**
         * when this function called dragging tile dropping to clear place (instead phantom tile)
         * removing events
         * and some other necessary changes
         */
        var dragStop = function (event) {
            var targetGroup;

            if (!mouseMoved) {
                // emulate default click behavior
                if ($draggingTile.is('a')) {
                    if ($draggingTile.prop('target') === '_blank') {
                        window.open($draggingTile.attr('href'));
                    } else {
                        window.location.href = $draggingTile.attr('href');
                    }
                }
            } else {
                event.preventDefault();
            }

            clearTimeout(tileDragTimer);
            findPlace(event);

            $draggingTile.detach();
            // it is two way now: drop to existing group or drop to new group
            // first drop to existing group
            if (targetType === 'existing') {
                $draggingTile.insertAfter($phantomTile);
                targetGroup = $phantomTile.parents('.tile-group');
                $phantomTile.remove();
            } else {
                newGroupPhantom.css({
                    'backgroundColor': '',
                    'width': 'auto',
                    'max-width': '322px',
                    'height': ''
                });
                $draggingTile.appendTo(newGroupPhantom);
                targetGroup = newGroupPhantom;
                newGroupPhantom = undefined;
            }

            // remove parent group if it was a last tile there
            if ($parentGroup.find('.tile').length === 0) {
                $parentGroup.remove();
            }

            $draggingTile.css({
                'position': '',
                'left':     '',
                'top':      '',
                'z-index':  ''
            });

            $draggingTile.data('dragging', false);
            $(document).off('mousemove.tiledrag');

            $groups = $('[data-role=tile-group], .tile-group');
            $groups.trigger('drop', [$draggingTile, targetGroup]);

            $startMenu.trigger('changed');
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
         * if tile dragging under this place it will creating new group there
         */
        var storeNewGroupsCoordinates = function () {
            groupsMaxHeight = 0;
            newGroupsCoordinates = [];
            $groups.each(function(index){
                var offset,
                    width,
                    height,
                    $group;

                $group = $(this);

                offset = $group.offset();

                width = $group.width();
                height = $group.height();

                // make it possible to insert new group before first one
                if (index === 0) {
                    newGroupsCoordinates.push({
                        x1: offset.left - 70 + tileDeltaX - draggingTileWidth / 2,
                        x2: offset.left + tileDeltaX - draggingTileWidth / 2,
                        y1: offset.top + tileDeltaY - draggingTileHeight / 2,
                        y2: offset.top + height + tileDeltaY - draggingTileHeight / 2,
                        side: 'before',
                        group: $group
                    });
                }

                newGroupsCoordinates.push({
                    x1: offset.left + width + tileDeltaX - draggingTileWidth / 2,
                    x2: offset.left + width + 70 + tileDeltaX - draggingTileWidth / 2,
                    y1: offset.top + tileDeltaY - draggingTileHeight / 2,
                    y2: offset.top + height + tileDeltaY - draggingTileHeight / 2,
                    side: 'after',
                    group: $group
                });

                if (groupsMaxHeight < height) {
                    groupsMaxHeight = height;
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

        var findNewGroupUnderCursor = function (event) {
            var i, coord, newGroup = false;

            for (i in newGroupsCoordinates) {
                if (!newGroupsCoordinates.hasOwnProperty(i)) return;
                coord = newGroupsCoordinates[i];
                if (coord.x1 < event.pageX && event.pageX < coord.x2 && coord.y1 < event.pageY && event.pageY < coord.y2) {
                    newGroup = coord;
                    break;
                }
            }

            if (!newGroup) {
                return false;
            } else {
                return newGroup;
            }
        };

        /**
         * just put phantom tile near tile under cursor (before or after)
         * and remove previous phantom tile
         */
        var clearPlaceForTile = function ($tileUnderCursor) {
            var $oldPhantomTile,
                $newParentGroup;

            $oldPhantomTile = $phantomTile;
            $phantomTile = $oldPhantomTile.clone();
            targetType = 'existing';

            // before or after, this is question ...
            if (tileUnderCursorSide === 'before') {
                $phantomTile.insertBefore($tileUnderCursor);
            } else {
                $phantomTile.insertAfter($tileUnderCursor);
            }

            if (newGroupPhantom) {
                newGroupPhantom.remove();
            }
            $oldPhantomTile.remove();

            // check if it was last tile in group and it drag out
            if ($parentGroup.find('.tile').length === 0) {
                $newParentGroup = $tileUnderCursor.parent('.tile-group');
                if ($parentGroup[0] !== $newParentGroup[0]) {
                    // and if it true, make parent group invisible
                    $parentGroup.css({
                        'width': 0,
                        'margin': 0
                    });
                }
            }

            $startMenu.trigger('changed');
            storeAllNecessaryCoordinates();
        };

        /**
         * makes visible new group place
         * @param relGroup relative group
         * @param side 'after' or 'before'
         */
        var showNewGroupPhantom = function (relGroup, side) {
            if ($phantomTile) {
                $phantomTile.remove()
            }
            if (newGroupPhantom) {
                newGroupPhantom.remove();
            }

            newGroupPhantom = $('<div class="tile-group"></div>');
            newGroupPhantom.css({
                'height': groupsMaxHeight,
                'width': '70px',
                'backgroundColor': '#333333',
                'position': 'relative'
            });
            relGroup[side](newGroupPhantom);
            targetType = 'new';

            // check if it was last tile in group and it drag out
            if ($parentGroup.find('.tile').length === 0) {
                $parentGroup.css({
                    'width': 0,
                    'margin': 0
                });
            }

            $startMenu.trigger('changed');
            storeAllNecessaryCoordinates();
        };

        var storeAllNecessaryCoordinates = function () {
            storeTilesCoordinates();
            storeNewGroupsCoordinates();
        };

        // return all groups involved to this plugin
        plugin.getGroups = function () {
            return $groups;
        };

        plugin.init();

    };

    $.fn.TileDrag = function(options) {

        //this.each(function() {
        var group = $(this[0]);
        if (undefined == group.data('TileDrag')) {
            var plugin = new $.TileDrag(group, options);
            var $groups = plugin.getGroups();
            $groups.data('TileDrag', plugin);
        }
        //});

    };

})(jQuery);

$(function(){
    var allTileGroups = $('[data-role=tile-group], .tile-group');
    if (allTileGroups.length > 0) {
        $(allTileGroups).TileDrag({});
    }
});
