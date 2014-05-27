(function( $ ) {
    $.widget("metro.dragtile", {

        version: "1.0.0",

        options: {
        },

        _create: function(){
            var that = this, element = tile = this.element,
                area = element.parents('.tile-area'),
                tiles = area.find(".tile"),
                groups = area.find(".tile-group");

            tile.attr("draggable", "true");

            addTouchEvents(tile[0]);

            tile[0].addEventListener('dragstart', this._dragStart, false);
            tile[0].addEventListener('dragend', this._dragEnd, false);

            tile.on('mousedown', function(e){
            });

            tile.on('mouseup', function(e){
            });
        },

        _dragStart: function(e){
            $(this).css('opacity',.4);
        },

        _dragEnd: function(e){
            $(this).css('opacity',1);
        },

        _destroy: function(){

        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

