(function( $ ) {
    $.widget("metro.tablecontrol", {

        version: "1.0.0",

        options: {
            width: '100%',
            height: 'auto',
            cls: 'table',
            checkRow: false,
            colModel: [],
            data: []
        },

        _create: function(){
            var element = this.element,
                table;

            element.css({
                width: this.options.width,
                height: this.options.height
            });

            table = this.createTable(element);

            this.addHeader(table, this.options.colModel);
            this.addTableData(table, this.options.data);

            table.addClass(this.options.cls);
        },

        addHeader: function(container, data){
            var thead = $("<thead/>").appendTo(container);
            var th, tr = $("<tr/>").appendTo(thead);
            $.each(data, function(index, column){
                th = $("<th/>").addClass(column.hcls).html(column.caption).appendTo(tr);
            });
        },

        createTable: function(container){
            return $("<table/>").appendTo(container);
        },

        addTableData: function(container, data){
            var that = this,
                tbody = $("<tbody/>").appendTo(container);

            $.each(data, function(i, row){
                that.addRowData(tbody, row);
            });
        },

        addRowData: function(container, row){
            var td, tr = $("<tr/>").appendTo(container);
            if (row.__row_class != undefined) {
                tr.addClass(row.__row_class);
            }
            $.each(this.options.colModel, function(index, val){
                td = $("<td/>").css("width", val.width).addClass(val.cls).html(row[val.field]).appendTo(tr);
            });
        },

        _destroy: function(){
        },

        _setOption: function(key, value){
            this._super('_setOption', key, value);
        }
    })
})( jQuery );

$(function(){
    $('[data-role=table]').tablecontrol();
});