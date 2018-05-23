var Table = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this.sort = {
            dir: "asc",
            colIndex: 0
        };

        this.heads = this.element.find("thead > tr > *");

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        sortable: true,
        editable: true,
        filter: true,
        pagination: true,

        sortDir: "asc",
        sortContent: null,

        clsTable: "",
        clsHead: "",
        clsHeadRow: "",
        clsHeadCell: "",
        clsBody: "",
        clsBodyRow: "",
        clsBodyCell: "",
        clsFooter: "",
        clsFooterRow: "",
        clsFooterCell: "",

        onSortStart: Metro.noop,
        onSortStop: Metro.noop,
        onSortItemSwitch: Metro.noop,
        onTableCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onCreate, [element]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;

    },

    _resetSortClass: function(el){
        $(el)
            .removeClass("sort-asc")
            .removeClass("sort-desc");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".sortable-column", function(){
            var col = $(this);
            that.sort.colIndex = col.index();
            if (!col.has("sort-asc") && !col.hasClass("sort-desc")) {
                that.sort.dir = o.sortDir;
            } else {
                if (col.hasClass("sort-asc")) {
                    that.sort.dir = "desc";
                } else {
                    that.sort.dir = "asc";
                }
            }
            that._resetSortClass(element.find(".sortable-column"));
            col.addClass("sort-"+that.sort.dir);
            that.sorting();

            console.log(that.sort);
        })
    },

    _getItemContent: function(row){
        var o = this.options;
        var content = "", items;
        var col = $(row).children("td:nth-child("+(this.sort.colIndex + 1)+")");
        var result;
        var format = $(this.heads[this.sort.colIndex]).data("format");

        if (o.sortContent === null) {
            content = col[0].textContent;
        } else {
            items = col.find(o.sortContent);
            if (items.length === 0) {
                content = col[0].textContent;
            } else {
                $.each(items, function(){
                    content += " " + this.textContent;
                })
            }
        }

        result = content.toLowerCase().trim();

        if (format !== undefined) {
            switch (format) {
                case "date": result = Utils.isDate(result) ? new Date(result) : ""; break;
                case "number": result = Number(result); break;
                case "int": result = parseInt(result); break;
                case "float": result = parseFloat(result); break;
                case "money": result = Number(parseFloat(result.replace(/[^0-9-.]/g, ''))); break;
            }
        }

        return result;
    },

    sorting: function(dir){
        var that = this, element = this.element, o = this.options;
        var items;
        var body = element.find("tbody");

        if (dir !== undefined && dir !== null) {
            this.sort.dir = dir;
        }

        Utils.exec(o.onSortStart, [element], element[0]);

        items = body.children("tr").get();

        items.sort(function(a, b){
            var c1 = that._getItemContent(a);
            var c2 = that._getItemContent(b);

            if (c1 < c2 ) {
                return -1;
            }

            if (c1 > c2 ) {
                return 1;
            }

            return 0;
        });

        if (this.sort.dir === "desc") {
            items.reverse();
        }

        body.html("");
        $.each(items, function(){
            $(this).appendTo(body);
        });

        Utils.exec(o.onSortStop, [element], element[0]);
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('table', Table);