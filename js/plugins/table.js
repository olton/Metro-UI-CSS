var Table = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.currentPage = 1;
        this.pagesCount = 1;
        this.filterString = "";
        this.data = null;
        this.activity = null;
        this.busy = false;
        this.filters = [];
        this.wrapperInfo = null;
        this.wrapperSearch = null;
        this.wrapperRows = null;
        this.wrapperPagination = null;
        this.filterIndex = null;
        this.filtersIndexes = null;

        this.sort = {
            dir: "asc",
            colIndex: 0
        };

        this.heads = [];
        this.items = [];
        this.foots = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {

        filter: null,
        filters: null,
        source: null,

        showRowsSteps: true,
        showSearch: true,
        showTableInfo: true,
        showPagination: true,
        showAllPages: false,
        showActivity: true,

        muteTable: true,

        rows: 10,
        rowsSteps: "10,25,50,100",

        sortDir: "asc",
        decimalSeparator: ".",
        thousandSeparator: ",",

        tableRowsCountTitle: "Show entries:",
        tableSearchTitle: "Search:",
        tableInfoTitle: "Showing $1 to $2 of $3 entries",
        paginationPrevTitle: "Prev",
        paginationNextTitle: "Next",

        activityType: "cycle",
        activityStyle: "color",
        activityTimeout: 100,

        searchWrapper: null,
        rowsWrapper: null,
        infoWrapper: null,
        paginationWrapper: null,

        clsComponent: "",
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

        clsTableTop: "",
        clsRowsCount: "",
        clsSearch: "",

        clsTableBottom: "",
        clsTableInfo: "",
        clsTablePagination: "",

        clsPagination: "",

        onDraw: Metro.noop,
        onDrawRow: Metro.noop,
        onSortStart: Metro.noop,
        onSortStop: Metro.noop,
        onSortItemSwitch: Metro.noop,
        onSearch: Metro.noop,
        onRowsCountChange: Metro.noop,
        onDataLoad: Metro.noop,
        onDataLoaded: Metro.noop,
        onFilterRowAccepted: Metro.noop,
        onFilterRowDeclined: Metro.noop,
        onTableCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

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

        if (o.source !== null) {
            Utils.exec(o.onDataLoad, [o.source], element[0]);

            $.get(o.source, function(data){
                that._build(data);
                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
            }).fail(function( jqXHR, textStatus, errorThrown) {
                console.log(textStatus); console.log(jqXHR); console.log(errorThrown);
            });
        } else {
            that._build();
        }
    },

    _build: function(data){
        var element = this.element, o = this.options;

        if (Utils.isValue(data)) {
            this._createItemsFromJSON(data);
        } else {
            this._createItemsFromHTML()
        }

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onTableCreate, [element], element[0]);
    },

    _createItemsFromHTML: function(){
        var that = this, element = this.element;
        var body = element.find("tbody");
        var head = element.find("thead");
        var foot = element.find("tfoot");

        this.items = [];
        this.heads = [];
        this.foots = [];

        if (body.length > 0) $.each(body.find("tr"), function(){
            var row = $(this);
            var tr = [];
            $.each(row.children("td"), function(){
                var td = $(this);
                tr.push(td.html());
            });
            that.items.push(tr);
        });

        if (head.length > 0) $.each(head.find("tr > *"), function(){
            var item = $(this);
            var dir, head_item, item_class;

            if (item.hasClass("sort-asc")) {
                dir = "asc";
            } else if (item.hasClass("sort-desc")) {
                dir = "desc"
            } else {
                dir = undefined;
            }

            item_class = item[0].className.replace("sortable-column", "");
            item_class = item_class.replace("sort-asc", "");
            item_class = item_class.replace("sort-desc", "");

            head_item = {
                title: item.html(),
                format: Utils.isValue(item.data("format")) ? item.data("format") : undefined,
                name: Utils.isValue(item.data("name")) ? item.data("name") : undefined,
                sortable: item.hasClass("sortable-column"),
                sortDir: dir,
                clsColumn: Utils.isValue(item.data("cls-column")) ? item.data("cls-column") : "",
                cls: item_class,
                colspan: item.attr("colspan")
            };
            that.heads.push(head_item);
        });

        if (foot.length > 0) $.each(foot.find("tr > *"), function(){
            var item = $(this);
            var foot_item;

            foot_item = {
                title: item.html(),
                name: Utils.isValue(item.data("name")) ? item.data("name") : false,
                cls: item[0].className,
                colspan: item.attr("colspan")
            };

            that.foots.push(foot_item);
        });

    },

    _createItemsFromJSON: function(source){
        var that = this;

        this.items = [];
        this.heads = [];
        this.foots = [];

        if (source.header !== undefined) {
            that.heads = source.header;
        }

        if (source.data !== undefined) {
            $.each(source.data, function(){
                var row = this;
                var tr = [];
                $.each(row, function(){
                    var td = this;
                    tr.push(td);
                });
                that.items.push(tr);
            });
        }

        if (source.footer !== undefined) {
            this.foots = source.footer;
        }
    },

    _createTableHeader: function(){
        var o = this.options;
        var head = $("<thead>");
        var tr, th;

        head.addClass(o.clsHead);

        if (this.heads.length === 0) {
            return head;
        }

        tr = $("<tr>").addClass(o.clsHeadRow).appendTo(head);
        $.each(this.heads, function(){
            var item = this;
            th = $("<th>").appendTo(tr);
            if (item.sortable === true) {
                th.addClass("sortable-column");
                if (item.sortDir !== undefined) {
                    th.addClass("sort-" + item.sortDir);
                }
            }
            if (item.title !== undefined) {
                th.html(item.title);
            }
            if (item.format !== undefined) {
                th.attr("data-format", item.format);
            }
            if (item.name !== undefined) {
                th.addClass("column-name-" + item.name);
            }
            if (item.size !== undefined) {
                th.css({
                    width: item.size
                })
            }
            if (item.cls !== undefined) {
                th.addClass(item.cls);
            }

            if (Utils.isValue(item.colspan)) {
                th.attr("colspan", item.colspan);
            }

            th.addClass(o.clsHeadCell);
        });

        return head;
    },

    _createTableBody: function(){
        return $("<tbody>").addClass(this.options.clsBody);
    },

    _createTableFooter: function(){
        var that = this, o = this.options;
        var foot = $("<tfoot>").addClass(o.clsFooter);
        var tr, th;

        if (this.foots.length === 0) {
            return foot;
        }

        tr = $("<tr>").addClass(o.clsHeadRow).appendTo(foot);
        $.each(this.foots, function(i){
            var item = this;
            th = $("<th>").appendTo(tr);

            if (item.title !== undefined) {
                th.html(item.title);
            }

            if (item.name !== undefined) {
                th.addClass("foot-column-name-" + item.name);
            }

            if (item.cls !== undefined) {
                th.addClass(item.cls);
            }

            if (Utils.isValue(item.colspan)) {
                th.attr("colspan", item.colspan);
            }

            th.appendTo(tr);
        });

        return foot;
    },

    _createTopBlock: function (){
        var that = this, element = this.element, o = this.options;
        var top_block = $("<div>").addClass("table-top").addClass(o.clsTableTop).insertBefore(element);
        var search_block, search_input, rows_block, rows_select;

        search_block = Utils.isValue(this.wrapperSearch) ? this.wrapperSearch : $("<div>").addClass("table-search-block").addClass(o.clsSearch).appendTo(top_block);

        search_input = $("<input>").attr("type", "text").appendTo(search_block);
        search_input.input({
            prepend: o.tableSearchTitle
        });

        if (o.showSearch !== true) {
            search_block.hide();
        }

        rows_block = Utils.isValue(this.wrapperRows) ? this.wrapperRows : $("<div>").addClass("table-rows-block").addClass(o.clsRowsCount).appendTo(top_block);

        rows_select = $("<select>").appendTo(rows_block);
        $.each(Utils.strToArray(o.rowsSteps), function () {
            var option = $("<option>").attr("value", this).text(this).appendTo(rows_select);
            if (parseInt(this) === parseInt(o.rows)) {
                option.attr("selected", "selected");
            }
        });
        rows_select.select({
            filter: false,
            prepend: o.tableRowsCountTitle,
            onChange: function (val) {
                if (parseInt(val) === parseInt(o.rows)) {
                    return;
                }
                o.rows = val;
                that.currentPage = 1;
                that._draw();
                Utils.exec(o.onRowsCountChange, [val], element[0])
            }
        });

        if (o.showRowsSteps !== true) {
            rows_block.hide();
        }

        return top_block;
    },

    _createBottomBlock: function (){
        var element = this.element, o = this.options;
        var bottom_block = $("<div>").addClass("table-bottom").addClass(o.clsTableBottom).insertAfter(element);
        var info, pagination;

        info = $("<div>").addClass("table-info").addClass(o.clsTableInfo).appendTo(bottom_block);
        if (o.showTableInfo !== true) {
            info.hide();
        }

        pagination = $("<div>").addClass("table-pagination").addClass(o.clsTablePagination).appendTo(bottom_block);
        if (o.showPagination !== true) {
            pagination.hide();
        }

        return bottom_block;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var table_component, sortable_columns;
        var w_search = $(o.searchWrapper), w_info = $(o.infoWrapper), w_rows = $(o.rowsWrapper), w_paging = $(o.paginationWrapper);

        if (w_search.length > 0) {this.wrapperSearch = w_search;}
        if (w_info.length > 0) {this.wrapperInfo = w_info;}
        if (w_rows.length > 0) {this.wrapperRows = w_rows;}
        if (w_paging.length > 0) {this.wrapperPagination = w_paging;}

        if (!element.parent().hasClass("table-component")) {
            table_component = $("<div>").addClass("table-component").insertBefore(element);
            element.appendTo(table_component);
        } else {
            table_component = element.parent();
        }

        table_component.addClass(o.clsComponent);

        this.activity =  $("<div>").addClass("table-progress").appendTo(table_component);
        $("<div>").activity({
            type: o.activityType,
            style: o.activityStyle
        }).appendTo(this.activity);

        if (o.showActivity !== true) {
            this.activity.css({
                visibility: "hidden"
            })
        }

        element.html("").addClass(o.clsTable);

        element.append(this._createTableHeader());
        element.append(this._createTableBody());
        element.append(this._createTableFooter());

        this._createTopBlock();
        this._createBottomBlock();

        var need_sort = false;
        if (this.heads.length > 0) $.each(this.heads, function(i){
            var item = this;
            if (!need_sort && ["asc", "desc"].indexOf(item.sortDir) > -1) {
                need_sort = true;
                that.sort.colIndex = i;
                that.sort.dir = item.sortDir;
            }
        });

        if (need_sort) {
            sortable_columns = element.find(".sortable-column");
            this._resetSortClass(sortable_columns);
            $(sortable_columns.get(this.sort.colIndex)).addClass("sort-"+this.sort.dir);
            this.sorting();
        }

        var filter_func;

        if (Utils.isValue(o.filter)) {
            filter_func = Utils.isFunc(o.filter);
            if (filter_func === false) {
                filter_func = Utils.func(o.filter);
            }
            that.filterIndex = that.addFilter(filter_func);
        }

        if (Utils.isValue(o.filters)) {
            $.each(Utils.strToArray(o.filters), function(){
                filter_func = Utils.isFunc(this);
                if (filter_func !== false) {
                    that.filtersIndexes.push(that.addFilter(filter_func));
                }
            });
        }

        this.currentPage = 1;

        this._draw();
    },

    _resetSortClass: function(el){
        $(el).removeClass("sort-asc sort-desc");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var component = element.parent();
        var search = component.find(".table-search-block input");
        var customSearch;

        element.on(Metro.events.click, ".sortable-column", function(){

            if (o.muteTable === true) element.addClass("disabled");

            if (that.busy) {
                return false;
            }
            that.busy = true;

            var col = $(this);

            that.activity.show(o.activityTimeout, function(){
                that.currentPage = 1;
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
                that._draw(function(){
                    that.busy = false;
                    if (o.muteTable === true) element.removeClass("disabled");
                });
            });
        });

        search.on(Metro.events.inputchange, function(){
            that.filterString = this.value.trim().toLowerCase();
            if (that.filterString[that.filterString.length - 1] === ":") {
                return ;
            }
            that.currentPage = 1;
            that._draw();
        });

        if (Utils.isValue(this.wrapperSearch)) {
            customSearch = this.wrapperSearch.find("input");
            if (customSearch.length > 0) {
                customSearch.on(Metro.events.inputchange, function(){
                    that.filterString = this.value.trim().toLowerCase();
                    if (that.filterString[that.filterString.length - 1] === ":") {
                        return ;
                    }
                    that.currentPage = 1;
                    that._draw();
                });
            }
        }

        function pageLinkClick(l){
            var link = $(l);
            var item = link.parent();

            if (item.hasClass("active")) {
                return ;
            }

            if (item.hasClass("service")) {
                if (link.data("page") === "prev") {
                    that.currentPage--;
                    if (that.currentPage === 0) {
                        that.currentPage = 1;
                    }
                } else {
                    that.currentPage++;
                    if (that.currentPage > that.pagesCount) {
                        that.currentPage = that.pagesCount;
                    }
                }
            } else {
                that.currentPage = link.data("page");
            }

            that._draw();
        }

        component.on(Metro.events.click, ".pagination .page-link", function(){
            pageLinkClick(this)
        });

        if (Utils.isValue(this.wrapperPagination)) {
            this.wrapperPagination.on(Metro.events.click, ".pagination .page-link", function(){
                pageLinkClick(this)
            });
        }
    },

    _info: function(start, stop, length){
        var element = this.element, o = this.options;
        var component = element.parent();
        var info = Utils.isValue(this.wrapperInfo) ? this.wrapperInfo : component.find(".table-info");
        var text;

        if (info.length === 0) {
            return ;
        }

        if (stop > length) {
            stop = length;
        }

        if (this.items.length === 0) {
            start = stop = length = 0;
        }

        text = o.tableInfoTitle;
        text = text.replace("$1", start);
        text = text.replace("$2", stop);
        text = text.replace("$3", length);
        info.html(text);
    },

    _paging: function(length){
        var that = this, element = this.element, o = this.options;
        var component = element.parent();
        var pagination_wrapper = Utils.isValue(this.wrapperPagination) ? this.wrapperPagination : component.find(".table-pagination");
        var i, prev, next;
        var shortDistance = 5;
        var pagination;

        pagination_wrapper.html("");

        pagination = $("<ul>").addClass("pagination").addClass(o.clsPagination).appendTo(pagination_wrapper);

        if (this.items.length === 0) {
            return ;
        }

        this.pagesCount = Math.ceil(length / o.rows);

        var add_item = function(item_title, item_type, data){
            var li, a;

            li = $("<li>").addClass("page-item").addClass(item_type);
            a  = $("<a>").addClass("page-link").html(item_title);
            a.data("page", data);
            a.appendTo(li);

            return li;
        };

        prev = add_item(o.paginationPrevTitle, "service prev-page", "prev");
        pagination.append(prev);

        pagination.append(add_item(1, that.currentPage === 1 ? "active" : "", 1));

        if (o.showAllPages === true || this.pagesCount <= 7) {
            for (i = 2; i < this.pagesCount; i++) {
                pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
            }
        } else {
            if (that.currentPage < shortDistance) {
                for (i = 2; i <= shortDistance; i++) {
                    pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
                }

                if (this.pagesCount > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }
            } else if (that.currentPage <= that.pagesCount && that.currentPage > that.pagesCount - shortDistance + 1) {
                if (this.pagesCount > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }

                for (i = that.pagesCount - shortDistance + 1; i < that.pagesCount; i++) {
                    pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
                }
            } else {
                pagination.append(add_item("...", "no-link", null));

                pagination.append(add_item(that.currentPage - 1, "", that.currentPage - 1));
                pagination.append(add_item(that.currentPage, "active", that.currentPage));
                pagination.append(add_item(that.currentPage + 1, "", that.currentPage + 1));

                pagination.append(add_item("...", "no-link", null));
            }
        }

        if (that.pagesCount > 1 || that.currentPage < that.pagesCount) pagination.append(add_item(that.pagesCount, that.currentPage === that.pagesCount ? "active" : "", that.pagesCount));

        next = add_item(o.paginationNextTitle, "service next-page", "next");
        pagination.append(next);

        if (this.currentPage === 1) {
            prev.addClass("disabled");
        }

        if (this.currentPage === this.pagesCount) {
            next.addClass("disabled");
        }
    },

    _draw: function(cb){
        var that = this, element = this.element, o = this.options;
        var body = element.find("tbody");
        var i;
        var start = o.rows === -1 ? 0 : o.rows * (this.currentPage - 1),
            stop = o.rows === -1 ? this.items.length - 1 : start + o.rows - 1;
        var items;
        var flt, idx = -1;

        body.html("");

        if (Utils.isValue(this.filterString) || this.filters.length > 0) {
            flt = this.filterString.split(":");
            if (flt.length > 1) {
                $.each(that.heads, function (i, v) {
                    if (flt[0] === v.title.toLowerCase()) {
                        idx = i;
                    }
                })
            }
            items = this.items.filter(function(row){
                var row_data = "" + (flt.length > 1 && idx > -1 ? row[idx] : row.join());
                var c1 = row_data.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim().toLowerCase();
                var result = Utils.isValue(that.filterString) ? c1.indexOf(flt.length > 1 ? flt[1] : flt[0]) > -1 : true;

                if (result === true && that.filters.length > 0) {
                    for (i = 0; i < that.filters.length; i++) {
                        if (Utils.exec(that.filters[i], [row]) !== true) {
                            result = false;
                            break;
                        }
                    }
                }

                if (result) {
                    Utils.exec(o.onFilterRowAccepted, [row], element[0]);
                } else {
                    Utils.exec(o.onFilterRowDeclined, [row], element[0]);
                }

                return result;
            });

            Utils.exec(o.onSearch, [that.filterString, items], element[0])
        } else {
            items = this.items;
        }

        for (i = start; i <= stop; i++) {
            var tr = $("<tr>").addClass(o.clsBodyRow);
            if (items[i] !== undefined) $.each(items[i], function(cell_i){
                var td = $("<td>").html(this);
                td.addClass(o.clsBodyCell);
                if (that.heads[cell_i].clsColumn !== undefined) {
                    td.addClass(that.heads[cell_i].clsColumn);
                }
                td.appendTo(tr);
            });
            tr.appendTo(body);
            Utils.exec(o.onDrawRow, [tr], element[0]);
        }

        this._info(start + 1, stop + 1, items.length);
        this._paging(items.length);

        this.activity.hide();

        Utils.exec(o.onDraw, [element], element[0]);

        if (cb !== undefined) {
            Utils.exec(cb, [element], element[0])
        }
    },

    _getItemContent: function(row){
        var result, col = row[this.sort.colIndex];
        var format = this.heads[this.sort.colIndex].format;
        var o = this.options;

        result = (""+col).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

        if (Utils.isValue(format)) {

            if (['number', 'int', 'float', 'money'].indexOf(format) !== -1 && (o.thousandSeparator !== "," || o.decimalSeparator !== "." )) {
                result = Utils.parseNumber(result, o.thousandSeparator, o.decimalSeparator);
            }

            switch (format) {
                case "date": result = Utils.isDate(result) ? new Date(result) : ""; break;
                case "number": result = Number(result); break;
                case "int": result = parseInt(result); break;
                case "float": result = parseFloat(result); break;
                case "money": result = Utils.parseMoney(result); break;
            }
        }

        return result;
    },

    draw: function(){
        return this._draw();
    },

    sorting: function(dir){
        var that = this, element = this.element, o = this.options;

        if (dir !== undefined && dir !== null) {
            this.sort.dir = dir;
        }

        Utils.exec(o.onSortStart, [this.items], element[0]);

        this.items.sort(function(a, b){
            var c1 = that._getItemContent(a);
            var c2 = that._getItemContent(b);
            var result = 0;

            if (c1 < c2) {
                result = that.sort.dir === "asc" ? -1 : 1;
            }
            if (c1 > c2) {
                result = that.sort.dir === "asc" ? 1 : -1;
            }

            if (result !== 0) {
                Utils.exec(o.onSortItemSwitch, [a, b, result], element[0]);
            }

            return result;
        });

        Utils.exec(o.onSortStop, [this.items], element[0]);
    },

    filter: function(val){
        this.filterString = val.trim().toLowerCase();
        this.currentPage = 1;
        this._draw();
    },

    loadData: function(source){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(source) !== true) {
            return ;
        }

        o.source = source;

        Utils.exec(o.onDataLoad, [o.source], element[0]);

        $.get(o.source, function(data){
            var need_sort = false;
            var sortable_columns;

            that._createItemsFromJSON(data);

            element.html("");

            element.append(that._createTableHeader());
            element.append(that._createTableBody());
            element.append(that._createTableFooter());

            if (that.heads.length > 0) $.each(that.heads, function(i){
                var item = this;
                if (!need_sort && ["asc", "desc"].indexOf(item.sortDir) > -1) {
                    need_sort = true;
                    that.sort.colIndex = i;
                    that.sort.dir = item.sortDir;
                }
            });

            if (need_sort) {
                sortable_columns = element.find(".sortable-column");
                that._resetSortClass(sortable_columns);
                $(sortable_columns.get(that.sort.colIndex)).addClass("sort-"+that.sort.dir);
                that.sorting();
            }

            that.currentPage = 1;

            that._draw();

            Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
        }).fail(function( jqXHR, textStatus, errorThrown) {
            console.log(textStatus); console.log(jqXHR); console.log(errorThrown);
        });
    },

    next: function(){
        if (this.items.length === 0) return ;
        this.currentPage++;
        if (this.currentPage > this.pagesCount) {
            this.currentPage = this.pagesCount;
            return ;
        }
        this._draw();
    },

    prev: function(){
        if (this.items.length === 0) return ;
        this.currentPage--;
        if (this.currentPage === 0) {
            this.currentPage = 1;
            return ;
        }
        this._draw();
    },

    first: function(){
        if (this.items.length === 0) return ;
        this.currentPage = 1;
        this._draw();
    },

    last: function(){
        if (this.items.length === 0) return ;
        this.currentPage = this.pagesCount;
        this._draw();
    },

    page: function(num){
        if (num <= 0) {
            num = 1;
        }

        if (num > this.pagesCount) {
            num = this.pagesCount;
        }

        this.currentPage = num;
        this._draw();
    },

    addFilter: function(f, redraw){
        var func = Utils.isFunc(f);
        if (func === false) {
            return ;
        }
        this.filters.push(func);

        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }

        return this.filters.length - 1;
    },

    removeFilter: function(key, redraw){
        Utils.arrayDeleteByKey(this.filters, key);
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
        return this;
    },

    removeFilters: function(redraw){
        this.filters = [];
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
    },

    getFilters: function(){
        return this.filters;
    },

    getFilterIndex: function(){
        return this.filterIndex;
    },

    getFiltersIndexes: function(){
        return this.filtersIndexes;
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('table', Table);