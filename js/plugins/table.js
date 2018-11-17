var Table = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.currentPage = 1;
        this.pagesCount = 1;
        this.searchString = "";
        this.data = null;
        this.activity = null;
        this.busy = false;
        this.filters = [];
        this.wrapperInfo = null;
        this.wrapperSearch = null;
        this.wrapperRows = null;
        this.wrapperPagination = null;
        this.filterIndex = null;
        this.filtersIndexes = [];
        this.component = null;
        this.inspector = null;
        this.view = {};
        this.viewDefault = {};
        this.locale = Metro.locales["en-US"];
        this.input_interval = null;
        this.searchFields = [];

        this.sort = {
            dir: "asc",
            colIndex: 0
        };

        this.service = [];
        this.heads = [];
        this.items = [];
        this.foots = [];

        this.filteredItems = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        locale: METRO_LOCALE,

        crud: false,
        crudTitle: "CRUD",
        editButton: true,
        delButton: true,
        addButton: true,
        editButtonIcon: "<span class='default-icon-pencil'></span>",
        delButtonIcon: "<span class='default-icon-minus'></span>",
        addButtonIcon: "<span class='default-icon-plus'></span>",
        clsEditButton: "",
        clsDelButton: "",
        clsAddButton: "",

        horizontalScroll: false,
        check: false,
        checkType: "checkbox",
        checkStyle: 1,
        checkColIndex: 0,
        checkName: null,
        checkStoreKey: "TABLE:$1:KEYS",
        rownum: false,
        rownumTitle: "#",

        filters: null,
        filtersOperator: "and",

        source: null,

        searchMinLength: 1,
        searchThreshold: 500,
        searchFields: null,

        showRowsSteps: true,
        showSearch: true,
        showTableInfo: true,
        showPagination: true,
        paginationShortMode: true,
        showActivity: true,
        muteTable: true,

        rows: 10,
        rowsSteps: "10,25,50,100",

        staticView: false,
        viewSaveMode: "client",
        viewSavePath: "TABLE:$1:OPTIONS",

        sortDir: "asc",
        decimalSeparator: ".",
        thousandSeparator: ",",

        tableRowsCountTitle: "Show entries:",
        tableSearchTitle: "Search:",
        tableInfoTitle: "Showing $1 to $2 of $3 entries",
        paginationPrevTitle: "Prev",
        paginationNextTitle: "Next",
        allRecordsTitle: "All",
        inspectorTitle: "Inspector",

        activityType: "cycle",
        activityStyle: "color",
        activityTimeout: 100,

        searchWrapper: null,
        rowsWrapper: null,
        infoWrapper: null,
        paginationWrapper: null,

        cellWrapper: true,

        clsComponent: "",
        clsTableContainer: "",
        clsTable: "",

        clsHead: "",
        clsHeadRow: "",
        clsHeadCell: "",

        clsBody: "",
        clsBodyRow: "",
        clsBodyCell: "",
        clsCellWrapper: "",

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

        clsEvenRow: "",
        clsOddRow: "",
        clsRow: "",

        onDraw: Metro.noop,
        onDrawRow: Metro.noop,
        onDrawCell: Metro.noop,
        onAppendRow: Metro.noop,
        onAppendCell: Metro.noop,
        onSortStart: Metro.noop,
        onSortStop: Metro.noop,
        onSortItemSwitch: Metro.noop,
        onSearch: Metro.noop,
        onRowsCountChange: Metro.noop,
        onDataLoad: Metro.noop,
        onDataLoaded: Metro.noop,
        onFilterRowAccepted: Metro.noop,
        onFilterRowDeclined: Metro.noop,
        onCheckClick: Metro.noop,
        onCheckClickAll: Metro.noop,
        onCheckDraw: Metro.noop,
        onViewSave: Metro.noop,
        onViewGet: Metro.noop,
        onViewCreated: Metro.noop,
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
        var id = Utils.elementId("table");

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", id);
        }

        if (Utils.isValue(Metro.locales[o.locale])) {
            this.locale = Metro.locales[o.locale];
        }

        if (Utils.isValue(o.searchFields)) {
            this.searchFields = Utils.strToArray(o.searchFields);
        }

        if (o.source !== null) {
            Utils.exec(o.onDataLoad, [o.source], element[0]);

            $.get(o.source, function(data){
                if (typeof data !== "object") {
                    throw new Error("Data for table is not a object");
                }
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
        var that = this, element = this.element, o = this.options;
        var view, id = element.attr("id");

        o.rows = parseInt(o.rows);

        this.items = [];
        this.heads = [];
        this.foots = [];

        if (Utils.isValue(data)) {
            this._createItemsFromJSON(data);
        } else {
            this._createItemsFromHTML()
        }

        this.view = this._createView();
        this.viewDefault = Utils.objectClone(this.view);

        if (o.viewSaveMode.toLowerCase() === "client") {
            view = Metro.storage.getItem(o.viewSavePath.replace("$1", id));
            if (Utils.isValue(view) && Utils.objectLength(view) === Utils.objectLength(this.view)) {
                this.view = view;
                Utils.exec(o.onViewGet, [view], element[0]);
            }
            this._final();
        } else {
            $.get(
                o.viewSavePath,
                {
                    id: id
                },
                function(view){
                    if (Utils.isValue(view) && Utils.objectLength(view) === Utils.objectLength(that.view)) {
                        that.view = view;
                        Utils.exec(o.onViewGet, [view], element[0]);
                    }
                    that._final();
                }
            ).fail(function(jqXHR, textStatus) {
                that._final();
                console.log("Warning! View " + textStatus + " for table " + element.attr('id') + " ");
            });
        }
    },

    _final: function(){
        var element = this.element, o = this.options;
        var id = element.attr("id");

        Metro.storage.delItem(o.checkStoreKey.replace("$1", id));

        this._service();
        this._createStructure();
        this._createInspector();
        this._createEvents();

        Utils.exec(o.onTableCreate, [element], element[0]);
    },

    _service: function(){
        var o = this.options;

        this.service = [
            {
                // CRUD
                title: o.crudTitle,
                format: undefined,
                name: undefined,
                sortable: false,
                sortDir: undefined,
                clsColumn: "crud-cell" + (o.crud === true ? "" : " d-none "),
                cls: "crud-cell" + (o.crud === true ? "" : " d-none "),
                colspan: undefined,
                type: "button"
            },
            {
                // Rownum
                title: o.rownumTitle,
                format: undefined,
                name: undefined,
                sortable: false,
                sortDir: undefined,
                clsColumn: "rownum-cell " + (o.rownum !== true ? "d-none" : ""),
                cls: "rownum-cell " + (o.rownum !== true ? "d-none" : ""),
                colspan: undefined,
                type: "rownum"
            },
            {
                // Check
                title: o.checkType === "checkbox" ? "<input type='checkbox' data-role='checkbox' class='table-service-check-all' data-style='"+o.checkStyle+"'>" : "",
                format: undefined,
                name: undefined,
                sortable: false,
                sortDir: undefined,
                clsColumn: "check-cell " + (o.check !== true ? "d-none" : ""),
                cls: "check-cell "+(o.check !== true ? "d-none" : ""),
                colspan: undefined,
                type: "rowcheck"
            }
        ];
    },

    _createView: function(){
        var view, o = this.options;

        view = {};

        $.each(this.heads, function(i){

            if (Utils.isValue(this.cls)) {this.cls = this.cls.replace("hidden", "");}
            if (Utils.isValue(this.clsColumn)) {this.clsColumn = this.clsColumn.replace("hidden", "");}

            view[i] = {
                "index": i,
                "index-view": i,
                "show": !Utils.isValue(this.show) ? true : this.show,
                "size": Utils.isValue(this.size) ? this.size : ""
            }
        });

        Utils.exec(o.onViewCreated, [view], view);
        return view;
    },

    _createInspectorItems: function(table){
        var that = this, o = this.options;
        var j, tds = [], row;
        var cells = this.heads;

        table.html("");

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(i){
            row = $("<tr>");
            row.data('index', i);
            row.data('index-view', i);
            $("<td>").html("<input type='checkbox' data-style='"+o.checkStyle+"' data-role='checkbox' name='column_show_check[]' value='"+i+"' "+(Utils.bool(that.view[i]['show']) ? "checked" : "")+">").appendTo(row);
            $("<td>").html(this.title).appendTo(row);
            $("<td>").html("<input type='number' data-role='spinner' name='column_size' value='"+that.view[i]['size']+"' data-index='"+i+"'>").appendTo(row);
            $("<td>").html("" +
                "<button class='button square js-table-inspector-field-up' type='button'><span class='mif-arrow-up'></span></button>" +
                "<button class='button square js-table-inspector-field-down' type='button'><span class='mif-arrow-down'></span></button>" +
                "").appendTo(row);
            tds[that.view[i]['index-view']] = row;
        });

        //
        for (j = 0; j < cells.length; j++){
            tds[j].appendTo(table);
        }
    },

    _createInspector: function(){
        var o = this.options;
        var component = this.component;
        var inspector, table_wrap, table, tbody, actions;

        inspector = $("<div data-role='draggable' data-drag-element='.table-inspector-header' data-drag-area='body'>").addClass("table-inspector");

        $("<div class='table-inspector-header'>"+o.inspectorTitle+"</div>").appendTo(inspector);

        table_wrap = $("<div>").addClass("table-wrap").appendTo(inspector);

        table = $("<table>").addClass("table subcompact");
        tbody = $("<tbody>").appendTo(table);

        table.appendTo(table_wrap);

        this._createInspectorItems(tbody);

        actions = $("<div class='table-inspector-actions'>").appendTo(inspector);
        $("<button class='button primary js-table-inspector-save' type='button'>").html(this.locale.buttons.save).appendTo(actions);
        $("<button class='button secondary js-table-inspector-reset ml-2 mr-2' type='button'>").html(this.locale.buttons.reset).appendTo(actions);
        $("<button class='button link js-table-inspector-cancel place-right' type='button'>").html(this.locale.buttons.cancel).appendTo(actions);

        this.inspector = inspector;

        component.append(inspector);

        this._createInspectorEvents();
    },

    _resetInspector: function(){
        var inspector = this.inspector;
        var table = inspector.find("table tbody");
        this._createInspectorItems(table);
        this._createInspectorEvents();
    },

    _createHeadsFormHTML: function(){
        var that = this, element = this.element;
        var head = element.find("thead");

        if (head.length > 0) $.each(head.find("tr > *"), function(){
            var item = $(this);
            var dir, head_item, item_class;

            if (Utils.isValue(item.data('sort-dir'))) {
                dir = item.data('sort-dir');
            } else {
                if (item.hasClass("sort-asc")) {
                    dir = "asc";
                } else if (item.hasClass("sort-desc")) {
                    dir = "desc"
                } else {
                    dir = undefined;
                }
            }

            item_class = item[0].className.replace("sortable-column", "");
            item_class = item_class.replace("sort-asc", "");
            item_class = item_class.replace("sort-desc", "");
            item_class = item_class.replace("hidden", "");

            head_item = {
                type: "data",
                title: item.html(),
                name: Utils.isValue(item.data("name")) ? item.data("name") : item.text().replace(" ", "_"),
                sortable: item.hasClass("sortable-column") || (Utils.isValue(item.data('sortable')) && JSON.parse(item.data('sortable') === true)),
                sortDir: dir,
                format: Utils.isValue(item.data("format")) ? item.data("format") : "string",
                clsColumn: Utils.isValue(item.data("cls-column")) ? item.data("cls-column") : "",
                cls: item_class,
                colspan: item.attr("colspan"),
                size: Utils.isValue(item.data("size")) ? item.data("size") : "",
                show: !(item.hasClass("hidden") || (Utils.isValue(item.data('show')) && JSON.parse(item.data('show')) === false)),

                required: Utils.isValue(item.data("required")) ? JSON.parse(item.data("required")) === true  : false,
                field: Utils.isValue(item.data("field")) ? item.data("field") : "input",
                fieldType: Utils.isValue(item.data("field-type")) ? item.data("field-type") : "text",
                validator: Utils.isValue(item.data("validator")) ? item.data("validator") : null
            };
            that.heads.push(head_item);
        });
    },

    _createFootsFromHTML: function(){
        var that = this, element = this.element;
        var foot = element.find("tfoot");

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

    _createItemsFromHTML: function(){
        var that = this, element = this.element;
        var body = element.find("tbody");

        if (body.length > 0) $.each(body.find("tr"), function(){
            var row = $(this);
            var tr = [];
            $.each(row.children("td"), function(){
                var td = $(this);
                tr.push(td.html());
            });
            that.items.push(tr);
        });

        this._createHeadsFormHTML();
        this._createFootsFromHTML();
    },

    _createItemsFromJSON: function(source){
        var that = this;

        if (typeof source === "string") {
            source = JSON.parse(source);
        }

        if (source.header !== undefined) {
            that.heads = source.header;
        } else {
            this._createHeadsFormHTML();
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
        } else {
            this._createFootsFromHTML();
        }
    },

    _createTableHeader: function(){
        var element = this.element, o = this.options;
        var head = $("<thead>").html('');
        var tr, th, tds = [], j, cells;
        var view = o.staticView ? this._createView() : this.view;

        element.find("thead").remove();

        head.addClass(o.clsHead);

        if (this.heads.length === 0) {
            return head;
        }

        tr = $("<tr>").addClass(o.clsHeadRow).appendTo(head);

        $.each(this.service, function(){
            var item = this, classes = [];
            th = $("<th>").appendTo(tr);
            if (Utils.isValue(item.title)) {th.html(item.title);}
            if (Utils.isValue(item.size)) {th.css({width: item.size});}
            if (Utils.isValue(item.cls)) {classes.push(item.cls);}
            classes.push(o.clsHeadCell);
            th.addClass(classes.join(" "));
        });

        cells = this.heads;

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(cell_index){
            var item = this;
            var classes = [];

            th = $("<th>");
            th.data("index", cell_index);

            if (Utils.isValue(item.title)) {th.html(item.title);}
            if (Utils.isValue(item.format)) {th.attr("data-format", item.format);}
            if (Utils.isValue(item.name)) {th.attr("data-name", item.name);}
            if (Utils.isValue(item.colspan)) {th.attr("colspan", item.colspan);}
            if (Utils.isValue(view[cell_index]['size'])) {th.css({width: view[cell_index]['size']});}
            if (item.sortable === true) {
                classes.push("sortable-column");

                if (Utils.isValue(item.sortDir)) {
                    classes.push("sort-" + item.sortDir);
                }
            }
            if (Utils.isValue(item.cls)) {classes.push(item.cls);}
            if (Utils.bool(view[cell_index]['show']) === false) {
                classes.push("hidden");
            }

            classes.push(o.clsHeadCell);

            if (Utils.bool(view[cell_index]['show'])) {
                Utils.arrayDelete(classes, "hidden");
            }

            th.addClass(classes.join(" "));

            tds[view[cell_index]['index-view']] = th;
        });

        for (j = 0; j < cells.length; j++){
            tds[j].appendTo(tr);
        }

        element.prepend(head);
    },

    _createTableBody: function(){
        var body, head, element = this.element;

        head  = element.find("thead");
        element.find("tbody").remove();
        body = $("<tbody>").addClass(this.options.clsBody);
        body.insertAfter(head);
    },

    _createTableFooter: function(){
        var element = this.element, o = this.options;
        var foot = $("<tfoot>").addClass(o.clsFooter);
        var tr, th;

        element.find("tfoot").remove();

        if (this.foots.length === 0) {
            element.append(foot);
            return;
        }

        tr = $("<tr>").addClass(o.clsHeadRow).appendTo(foot);
        $.each(this.foots, function(){
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

        element.append(foot);
    },

    _createTopBlock: function (){
        var that = this, element = this.element, o = this.options;
        var top_block = $("<div>").addClass("table-top").addClass(o.clsTableTop).insertBefore(element.parent());
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
            var val = parseInt(this);
            var option = $("<option>").attr("value", val).text(val === -1 ? o.allRecordsTitle : val).appendTo(rows_select);
            if (val === parseInt(o.rows)) {
                option.attr("selected", "selected");
            }
        });
        rows_select.select({
            filter: false,
            prepend: o.tableRowsCountTitle,
            onChange: function (val) {
                val = parseInt(val);
                if (val === parseInt(o.rows)) {
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
        var bottom_block = $("<div>").addClass("table-bottom").addClass(o.clsTableBottom).insertAfter(element.parent());
        var info, pagination;

        info = Utils.isValue(this.wrapperInfo) ? this.wrapperInfo : $("<div>").addClass("table-info").addClass(o.clsTableInfo).appendTo(bottom_block);
        if (o.showTableInfo !== true) {
            info.hide();
        }

        pagination = Utils.isValue(this.wrapperPagination) ? this.wrapperPagination : $("<div>").addClass("table-pagination").addClass(o.clsTablePagination).appendTo(bottom_block);
        if (o.showPagination !== true) {
            pagination.hide();
        }

        return bottom_block;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var table_container, table_component, columns;
        var w_search = $(o.searchWrapper), w_info = $(o.infoWrapper), w_rows = $(o.rowsWrapper), w_paging = $(o.paginationWrapper);

        if (w_search.length > 0) {this.wrapperSearch = w_search;}
        if (w_info.length > 0) {this.wrapperInfo = w_info;}
        if (w_rows.length > 0) {this.wrapperRows = w_rows;}
        if (w_paging.length > 0) {this.wrapperPagination = w_paging;}

        table_component = $("<div>").addClass("table-component");
        table_component.insertBefore(element);

        table_container = $("<div>").addClass("table-container").addClass(o.clsTableContainer).appendTo(table_component);
        element.appendTo(table_container);

        if (o.horizontalScroll === true) {
            table_container.addClass("horizontal-scroll");
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

        this._createTableHeader();
        this._createTableBody();
        this._createTableFooter();

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
            columns = element.find("thead th");
            this._resetSortClass(columns);
            $(columns.get(this.sort.colIndex + that.service.length)).addClass("sort-"+this.sort.dir);
            this.sorting();
        }

        var filter_func;

        if (Utils.isValue(o.filters)) {
            $.each(Utils.strToArray(o.filters), function(){
                filter_func = Utils.isFunc(this);
                if (filter_func !== false) {
                    that.filtersIndexes.push(that.addFilter(filter_func));
                }
            });
        }

        this.currentPage = 1;

        this.component = table_component;
        this._draw();
    },

    _resetSortClass: function(el){
        $(el).removeClass("sort-asc sort-desc");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var component = element.closest(".table-component");
        var search = component.find(".table-search-block input");
        var customSearch;
        var id = element.attr("id");

        element.on(Metro.events.click, ".sortable-column", function(){

            if (o.muteTable === true) element.addClass("disabled");

            if (that.busy) {
                return false;
            }
            that.busy = true;

            var col = $(this);

            that.activity.show(o.activityTimeout, function(){
                that.currentPage = 1;
                that.sort.colIndex = col.data("index");
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

        element.on(Metro.events.click, ".table-service-check input", function(){
            var check = $(this);
            var status = check.is(":checked");
            var val = ""+check.val();
            var store_key = o.checkStoreKey.replace("$1", id);
            var storage = Metro.storage;
            var data = storage.getItem(store_key);

            if (status) {
                if (!Utils.isValue(data)) {
                    data = [val];
                } else {
                    if (Array(data).indexOf(val) === -1) {
                        data.push(val);
                    }
                }
            } else {
                if (Utils.isValue(data)) {
                    Utils.arrayDelete(data, val);
                } else {
                    data = [];
                }
            }

            storage.setItem(store_key, data);

            Utils.exec(o.onCheckClick, [status], this);
        });

        element.on(Metro.events.click, ".table-service-check-all input", function(){
            var status = $(this).is(":checked");
            var store_key = o.checkStoreKey.replace("$1", id);
            var data = [];

            if (status) {
                $.each(that.filteredItems, function(){
                    if (data.indexOf(this[o.checkColIndex]) !== -1) return ;
                    data.push(""+this[o.checkColIndex]);
                });
            } else {
                data = [];
            }

            Metro.storage.setItem(store_key, data);

            that._draw();

            Utils.exec(o.onCheckClickAll, [status], this);
        });

        var _search = function(){
            that.searchString = this.value.trim().toLowerCase();

            clearInterval(that.input_interval); that.input_interval = false;
            if (!that.input_interval) that.input_interval = setTimeout(function(){
                that.currentPage = 1;
                that._draw();
                clearInterval(that.input_interval); that.input_interval = false;
            }, o.searchThreshold);
        };

        search.on(Metro.events.inputchange, _search);

        if (Utils.isValue(this.wrapperSearch)) {
            customSearch = this.wrapperSearch.find("input");
            if (customSearch.length > 0) {
                customSearch.on(Metro.events.inputchange, _search);
            }
        }

        function pageLinkClick(l){
            var link = $(l);
            var item = link.parent();
            if (that.filteredItems.length === 0) {
                return ;
            }

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

        this._createInspectorEvents();

        element.on(Metro.events.click, ".js-table-crud-button", function(){

        });
    },

    _createInspectorEvents: function(){
        var that = this, inspector = this.inspector;
        // Inspector event

        this._removeInspectorEvents();

        inspector.on(Metro.events.click, ".js-table-inspector-field-up", function(){
            var button = $(this), tr = button.closest("tr");
            var tr_prev = tr.prev("tr");
            var index = tr.data("index");
            var index_view;
            if (tr_prev.length === 0) {
                return ;
            }
            tr.insertBefore(tr_prev);
            tr.addClass("flash");
            setTimeout(function(){
                tr.removeClass("flash");
            }, 1000);
            index_view = tr.index();

            tr.data("index-view", index_view);
            that.view[index]['index-view'] = index_view;

            $.each(tr.nextAll(), function(){
                var t = $(this);
                index_view++;
                t.data("index-view", index_view);
                that.view[t.data("index")]['index-view'] = index_view;
            });

            that._createTableHeader();
            that._draw();
        });

        inspector.on(Metro.events.click, ".js-table-inspector-field-down", function(){
            var button = $(this), tr = button.closest("tr");
            var tr_next = tr.next("tr");
            var index = tr.data("index");
            var index_view;
            if (tr_next.length === 0) {
                return ;
            }
            tr.insertAfter(tr_next);
            tr.addClass("flash");
            setTimeout(function(){
                tr.removeClass("flash");
            }, 1000);
            index_view = tr.index();

            tr.data("index-view", index_view);
            that.view[index]['index-view'] = index_view;

            $.each(tr.prevAll(), function(){
                var t = $(this);
                index_view--;
                t.data("index-view", index_view);
                that.view[t.data("index")]['index-view'] = index_view;
            });

            that._createTableHeader();
            that._draw();
        });

        inspector.on(Metro.events.click, "input[type=checkbox]", function(){
            var check = $(this);
            var status = check.is(":checked");
            var index = check.val();
            var op = ['cls', 'clsColumn'];

            if (status) {
                $.each(op, function(){
                    var a;
                    a = Utils.isValue(that.heads[index][this]) ? Utils.strToArray(that.heads[index][this]) : [];
                    Utils.arrayDelete(a, "hidden");
                    that.heads[index][this] = a.join(" ");
                    that.view[index]['show'] = true;
                });
            } else {
                $.each(op, function(){
                    var a;

                    a = Utils.isValue(that.heads[index][this]) ? Utils.strToArray(that.heads[index][this]) : [];
                    if (a.indexOf("hidden") === -1) {
                        a.push("hidden");
                    }
                    that.heads[index][this] = a.join(" ");
                    that.view[index]['show'] = false;
                });
            }

            that._createTableHeader();
            that._draw();
        });

        inspector.find("input[type=number]").on(Metro.events.inputchange, function(){
            var input = $(this);
            var index = input.attr("data-index");
            var val = parseInt(input.val());

            that.view[index]['size'] = val === 0 ? "" : val;

            that._createTableHeader();
        });

        inspector.on(Metro.events.click, ".js-table-inspector-save", function(){
            that._saveTableView();
            that.openInspector(false);
        });

        inspector.on(Metro.events.click, ".js-table-inspector-cancel", function(){
            that.openInspector(false);
        });

        inspector.on(Metro.events.click, ".js-table-inspector-reset", function(){
            that.resetView();
        });
    },

    _removeInspectorEvents: function(){
        var inspector = this.inspector;
        inspector.off(Metro.events.click, ".js-table-inspector-field-up");
        inspector.off(Metro.events.click, ".js-table-inspector-field-down");
        inspector.off(Metro.events.click, "input[type=checkbox]");
        inspector.off(Metro.events.click, ".js-table-inspector-save");
        inspector.off(Metro.events.click, ".js-table-inspector-cancel");
        inspector.off(Metro.events.click, ".js-table-inspector-reset");
        inspector.find("input[type=number]").off(Metro.events.inputchange);
    },

    _saveTableView: function(){
        var element = this.element, o = this.options;
        var view = this.view;
        var id = element.attr("id");

        if (o.viewSaveMode.toLowerCase() === "client") {
            Metro.storage.setItem(o.viewSavePath.replace("$1", id), view);
            Utils.exec(o.onViewSave, [o.viewSavePath, view], element[0]);
        } else {
            $.post(
                o.viewSavePath,
                {
                    id : element.attr("id"),
                    view : view
                },
                function(data, status, xhr){
                    Utils.exec(o.onViewSave, [o.viewSavePath, view, data, status, xhr], element[0]);
                }
            );
        }
    },

    _info: function(start, stop, length){
        var element = this.element, o = this.options;
        var component = element.closest(".table-component");
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
        var component = element.closest(".table-component");
        var pagination_wrapper = Utils.isValue(this.wrapperPagination) ? this.wrapperPagination : component.find(".table-pagination");
        var i, prev, next;
        var shortDistance = 5;
        var pagination;

        pagination_wrapper.html("");

        pagination = $("<ul>").addClass("pagination").addClass(o.clsPagination).appendTo(pagination_wrapper);

        if (this.items.length === 0) {
            return ;
        }

        if (o.rows === -1) {
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

        if (o.paginationShortMode !== true || this.pagesCount <= 7) {
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

        if (this.filteredItems.length === 0) {
            pagination.addClass("disabled");
            pagination.children().addClass("disabled");
        }
    },

    _filter: function(){
        var that = this, o = this.options, element = this.element;
        var items;
        if ((Utils.isValue(this.searchString) && that.searchString.length >= o.searchMinLength) || this.filters.length > 0) {
            items = this.items.filter(function(row){

                var row_data = "", result, search_result, i, j = 0;

                if (that.filters.length > 0) {

                    result = o.filtersOperator.toLowerCase() === "and";
                    for (i = 0; i < that.filters.length; i++) {
                        if (Utils.isNull(that.filters[i])) continue;
                        j++;
                        result = o.filtersOperator.toLowerCase() === "and" ?
                            result && Utils.exec(that.filters[i], [row, that.heads]) :
                            result || Utils.exec(that.filters[i], [row, that.heads])
                        ;
                    }

                    if (j === 0) result = true;
                } else {
                    result = true;
                }

                if (that.searchFields.length > 0) {
                    $.each(that.heads, function(i, v){
                        if (that.searchFields.indexOf(v.name) > -1) {
                            row_data += "•"+row[i];
                        }
                    })
                } else {
                    row_data = row.join("•");
                }

                row_data = row_data.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim().toLowerCase();
                search_result = Utils.isValue(that.searchString) && that.searchString.length >= o.searchMinLength ? ~row_data.indexOf(that.searchString) : true;

                result = result && search_result;

                if (result) {
                    Utils.exec(o.onFilterRowAccepted, [row], element[0]);
                } else {
                    Utils.exec(o.onFilterRowDeclined, [row], element[0]);
                }

                return result;
            });

            Utils.exec(o.onSearch, [that.searchString, items], element[0])
        } else {
            items = this.items;
        }

        this.filteredItems = items;

        return items;
    },

    _draw: function(cb){
        var that = this, element = this.element, o = this.options;
        var body = element.find("tbody");
        var i;
        var start = parseInt(o.rows) === -1 ? 0 : o.rows * (this.currentPage - 1),
            stop = parseInt(o.rows) === -1 ? this.items.length - 1 : start + o.rows - 1;
        var items;
        var stored_keys = Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr('id')));

        var view = o.staticView ? this.viewDefault : this.view;

        body.html("");

        items = this._filter();

        for (i = start; i <= stop; i++) {
            var j, tr, td, check, cells = [], tds = [], is_even_row;
            if (Utils.isValue(items[i])) {
                tr = $("<tr>").addClass(o.clsBodyRow);

                // CRUD buttons
                td = $("<td>");
                if (that.service[0].clsColumn !== undefined) {
                    td.addClass(that.service[0].clsColumn);
                }
                var crud_container = $("<div>").addClass("crud-container").appendTo(td);
                if (o.editButton === true) {
                    $("<button>")
                        .addClass("button")
                        .addClass("js-table-crud-button js-table-crud-button-edit")
                        .addClass(o.clsEditButton)
                        .html(o.editButtonIcon)
                        .data("uid", items[i][o.checkColIndex])
                        .appendTo(crud_container);
                }
                if (o.addButton === true) {
                    $("<button>")
                        .addClass("button")
                        .addClass("js-table-crud-button js-table-crud-button-add")
                        .addClass(o.clsAddButton)
                        .html(o.addButtonIcon)
                        .data("uid", null)
                        .appendTo(crud_container);
                }
                if (o.delButton === true) {
                    $("<button>")
                        .addClass("button")
                        .addClass("js-table-crud-button js-table-crud-button-del")
                        .addClass(o.clsDelButton)
                        .html(o.delButtonIcon)
                        .data("uid", items[i][o.checkColIndex])
                        .appendTo(crud_container);
                }
                td.appendTo(tr);

                // Rownum

                is_even_row = i % 2 === 0;

                td = $("<td>").html(i + 1);
                if (that.service[1].clsColumn !== undefined) {
                    td.addClass(that.service[1].clsColumn);
                }
                td.appendTo(tr);

                // Checkbox
                td = $("<td>");
                if (o.checkType === "checkbox") {
                    check = $("<input type='checkbox' data-style='"+o.checkStyle+"' data-role='checkbox' name='" + (Utils.isValue(o.checkName) ? o.checkName : 'table_row_check') + "[]' value='" + items[i][o.checkColIndex] + "'>");
                } else {
                    check = $("<input type='radio' data-style='"+o.checkStyle+"' data-role='radio' name='" + (Utils.isValue(o.checkName) ? o.checkName : 'table_row_check') + "' value='" + items[i][o.checkColIndex] + "'>");
                }

                if (Utils.isValue(stored_keys) && Array.isArray(stored_keys) && stored_keys.indexOf(""+items[i][o.checkColIndex]) > -1) {
                    check.prop("checked", true);
                }

                check.addClass("table-service-check");
                Utils.exec(o.onCheckDraw, [check], check[0]);
                check.appendTo(td);
                if (that.service[2].clsColumn !== undefined) {
                    td.addClass(that.service[2].clsColumn);
                }
                td.appendTo(tr);

                cells = items[i];

                for (j = 0; j < cells.length; j++){
                    tds[j] = null;
                }

                $.each(cells, function(cell_index){
                    if (o.cellWrapper === true) {
                        td = $("<td>");
                        $("<div>").addClass("cell-wrapper").addClass(o.clsCellWrapper).html(this).appendTo(td);
                    } else {
                        td = $("<td>").html(this);
                    }
                    td.addClass(o.clsBodyCell);
                    if (Utils.isValue(that.heads[cell_index].clsColumn)) {
                        td.addClass(that.heads[cell_index].clsColumn);
                    }

                    if (Utils.bool(view[cell_index].show) === false) {
                        td.addClass("hidden");
                    }

                    if (Utils.bool(view[cell_index].show)) {
                        td.removeClass("hidden");
                    }

                    tds[view[cell_index]['index-view']] = td;
                    Utils.exec(o.onDrawCell, [td, this, cell_index, that.heads[cell_index]], td[0]);
                });

                for (j = 0; j < cells.length; j++){
                    tds[j].appendTo(tr);
                    Utils.exec(o.onAppendCell, [tds[j], tr, j, element], tds[j][0])
                }

                Utils.exec(o.onDrawRow, [tr, that.view, that.heads, element], tr[0]);

                tr.addClass(o.clsRow).addClass(is_even_row ? o.clsEvenRow : o.clsOddRow).appendTo(body);

                Utils.exec(o.onAppendRow, [tr, element], tr[0]);
            }
        }

        this._info(start + 1, stop + 1, items.length);
        this._paging(items.length);

        if (this.activity) this.activity.hide();

        Utils.exec(o.onDraw, [element], element[0]);

        if (cb !== undefined) {
            Utils.exec(cb, [element], element[0])
        }
    },

    _getItemContent: function(row){
        var result, col = row[this.sort.colIndex];
        var format = this.heads[this.sort.colIndex].format;
        var formatMask = Utils.isValue(this.heads[this.sort.colIndex].formatMask) ? this.heads[this.sort.colIndex].formatMask : "%Y-%m-%d";
        var o = this.options;

        result = (""+col).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

        if (Utils.isValue(format)) {

            if (['number', 'int', 'float', 'money'].indexOf(format) !== -1 && (o.thousandSeparator !== "," || o.decimalSeparator !== "." )) {
                result = Utils.parseNumber(result, o.thousandSeparator, o.decimalSeparator);
            }

            switch (format) {
                case "date": result = Utils.isValue(formatMask) ? result.toDate(formatMask) : new Date(result); break;
                case "number": result = Number(result); break;
                case "int": result = parseInt(result); break;
                case "float": result = parseFloat(result); break;
                case "money": result = Utils.parseMoney(result); break;
                case "card": result = Utils.parseCard(result); break;
                case "phone": result = Utils.parsePhone(result); break;
            }
        }

        return result;
    },

    deleteItem: function(fieldIndex, value){
        var i, deleteIndexes = [];
        var is_func = Utils.isFunc(value);
        for(i = 0; i < this.items.length; i++) {
            if (is_func) {
                if (Utils.exec(value, [this.items[i][fieldIndex]])) {
                    deleteIndexes.push(i);
                }
            } else {
                if (this.items[i][fieldIndex] === value) {
                    deleteIndexes.push(i);
                }
            }
        }

        this.items = Utils.arrayDeleteByMultipleKeys(this.items, deleteIndexes);

        return this;
    },

    deleteItemByName: function(fieldName, value){
        var i, fieldIndex, deleteIndexes = [];
        var is_func = Utils.isFunc(value);

        for(i = 0; i < this.heads.length; i++) {
            if (this.heads[i]['name'] === fieldName) {
                fieldIndex = i;
                break;
            }
        }

        for(i = 0; i < this.items.length; i++) {
            if (is_func) {
                if (Utils.exec(value, [this.items[i][fieldIndex]])) {
                    deleteIndexes.push(i);
                }
            } else {
                if (this.items[i][fieldIndex] === value) {
                    deleteIndexes.push(i);
                }
            }
        }

        this.items = Utils.arrayDeleteByMultipleKeys(this.items, deleteIndexes);

        return this;
    },

    draw: function(){
        this._draw();
        return this;
    },

    sorting: function(dir){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(dir)) {
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

        return this;
    },

    search: function(val){
        this.searchString = val.trim().toLowerCase();
        this.currentPage = 1;
        this._draw();
        return this;
    },

    _rebuild: function(review){
        var that = this, element = this.element;
        var need_sort = false, sortable_columns;

        if (review === true) {
            this.view = this._createView();
        }

        this._createTableHeader();
        this._createTableBody();
        this._createTableFooter();

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
            $(sortable_columns.get(that.sort.colIndex)).addClass("sort-"+that.sort.dir);
            this.sorting();
        }

        that.currentPage = 1;

        that._draw();
    },

    setHeads: function(data){
        this.heads = data;
        return this;
    },

    setHeadItem: function(name, data){
        var i, index;
        for(i = 0; i < this.heads.length; i++) {
            if (item.name === name) {
                index = i;
                break;
            }
        }
        this.heads[index] = data;
        return this;
    },

    setItems: function(data){
        this.items = data;
        return this;
    },

    setData: function(/*obj*/ data){
        this.items = [];
        this.heads = [];
        this.foots = [];

        this._createItemsFromJSON(data);

        this._rebuild(true);

        return this;
    },

    loadData: function(source, review){
        var that = this, element = this.element, o = this.options;

        if (!Utils.isValue(review)) {
            review = true;
        }

        element.html("");

        if (!Utils.isValue(source)) {

            this._rebuild(review);

        } else {
            o.source = source;

            Utils.exec(o.onDataLoad, [o.source], element[0]);

            $.get(o.source, function(data){

                that.items = [];
                that.heads = [];
                that.foots = [];

                that._createItemsFromJSON(data);

                that._rebuild(review);

                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
            }).fail(function( jqXHR, textStatus, errorThrown) {
                console.log(textStatus); console.log(jqXHR); console.log(errorThrown);
            });
        }
    },

    reload: function(review){
        this.loadData(this.options.source, review);
    },

    next: function(){
        if (this.items.length === 0) return ;
        this.currentPage++;
        if (this.currentPage > this.pagesCount) {
            this.currentPage = this.pagesCount;
            return ;
        }
        this._draw();
        return this;
    },

    prev: function(){
        if (this.items.length === 0) return ;
        this.currentPage--;
        if (this.currentPage === 0) {
            this.currentPage = 1;
            return ;
        }
        this._draw();
        return this;
    },

    first: function(){
        if (this.items.length === 0) return ;
        this.currentPage = 1;
        this._draw();
        return this;
    },

    last: function(){
        if (this.items.length === 0) return ;
        this.currentPage = this.pagesCount;
        this._draw();
        return this;
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
        return this;
    },

    addFilter: function(f, redraw){
        var filterIndex = null, i, func = Utils.isFunc(f);
        if (func === false) {
            return ;
        }

        for(i = 0; i < this.filters.length; i++) {
            if (Utils.isNull(this.filters[i])) {
                filterIndex = i;
                this.filters[i] = func;
                break;
            }
        }

        if (Utils.isNull(filterIndex)) {
            this.filters.push(func);
            filterIndex = this.filters.length - 1;
        }

        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }

        return filterIndex
    },

    removeFilter: function(key, redraw){
        this.filters[key] = null;
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
        return this;
    },

    getItems: function(){
        return this.items;
    },

    getHeads: function(){
        return this.heads;
    },

    getView: function(){
        return this.view;
    },

    getFilteredItems: function(){
        return this.filteredItems.length > 0 ? this.filteredItems : this.items;
    },

    getSelectedItems: function(){
        var element = this.element, o = this.options;
        var stored_keys = Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr("id")));
        var selected = [];

        if (!Utils.isValue(stored_keys)) {
            return [];
        }

        $.each(this.items, function(){
            if (stored_keys.indexOf(""+this[o.checkColIndex]) !== -1) {
                selected.push(this);
            }
        });
        return selected;
    },

    getStoredKeys: function(){
        var element = this.element, o = this.options;
        return Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr("id")), []);
    },

    clearSelected: function(redraw){
        var element = this.element, o = this.options;
        Metro.storage.setItem(o.checkStoreKey.replace("$1", element.attr("id")), []);
        element.find("table-service-check-all input").prop("checked", false);
        if (redraw === true) this._draw();
    },

    getFilters: function(){
        return this.filters;
    },

    getFiltersIndexes: function(){
        return this.filtersIndexes;
    },

    openInspector: function(mode){
        this.inspector[mode ? "addClass" : "removeClass"]("open");
    },

    closeInspector: function(){
        this.openInspector(false);
    },

    toggleInspector: function(){
        this.inspector.toggleClass("open");
    },

    resetView: function(){

        this.view = this._createView();

        this._createTableHeader();
        this._createTableFooter();
        this._draw();

        this._resetInspector();
        this._saveTableView();
    },

    export: function(to, mode, filename, options){
        var that = this, o = this.options;
        var table = document.createElement("table");
        var head = $("<thead>").appendTo(table);
        var body = $("<tbody>").appendTo(table);
        var i, j, cells, tds = [], items, tr, td;
        var start, stop;

        if (typeof Export.tableToCSV !== 'function') {
            return ;
        }

        mode = Utils.isValue(mode) ? mode.toLowerCase() : "all-filtered";
        filename = Utils.isValue(filename) ? filename : Utils.elementId("table")+"-export.csv";

        // Create table header
        tr = $("<tr>");
        cells = this.heads;

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(cell_index){
            var item = this;
            if (Utils.bool(that.view[cell_index]['show']) === false) {
                return ;
            }
            td = $("<th>");
            if (Utils.isValue(item.title)) {
                td.html(item.title);
            }
            tds[that.view[cell_index]['index-view']] = td;
        });

        for (j = 0; j < cells.length; j++){
            if (Utils.isValue(tds[j])) tds[j].appendTo(tr);
        }
        tr.appendTo(head);

        // Create table data
        if (mode === "checked") {
            items = this.getSelectedItems();
            start = 0; stop = items.length - 1;
        } else if (mode === "view") {
            items = this._filter();
            start = parseInt(o.rows) === -1 ? 0 : o.rows * (this.currentPage - 1);
            stop = parseInt(o.rows) === -1 ? items.length - 1 : start + o.rows - 1;
        } else if (mode === "all") {
            items = this.items;
            start = 0; stop = items.length - 1;
        } else {
            items = this._filter();
            start = 0; stop = items.length - 1;
        }

        for (i = start; i <= stop; i++) {
            if (Utils.isValue(items[i])) {
                tr = $("<tr>");

                cells = items[i];

                for (j = 0; j < cells.length; j++){
                    tds[j] = null;
                }

                $.each(cells, function(cell_index){
                    if (Utils.bool(that.view[cell_index].show) === false) {
                        return ;
                    }
                    td = $("<td>").html(this);
                    tds[that.view[cell_index]['index-view']] = td;
                });

                for (j = 0; j < cells.length; j++){
                    if (Utils.isValue(tds[j])) tds[j].appendTo(tr);
                }

                tr.appendTo(body);
            }
        }

        switch (to) {
            default: Export.tableToCSV(table, filename, options);
        }
        table.remove();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        function dataCheck(){
            o.check = Utils.bool(element.attr("data-check"));
            that._service();
            that._createTableHeader();
            that._draw();
        }

        function dataRownum(){
            o.rownum = Utils.bool(element.attr("data-rownum"));
            that._service();
            that._createTableHeader();
            that._draw();
        }

        switch (attributeName) {
            case "data-check": dataCheck(); break;
            case "data-rownum": dataRownum(); break;
        }
    }
};

Metro.plugin('table', Table);