(function(Metro, $) {
    'use strict';

    var RemoteDatasetDefaultConfig = {
        caption: "",
        url: "",
        searchUrl: "",
        method: "GET",
        limit: 10,
        offset: 0,
        fields: "",
        sort: "",
        sortOrder: "asc",
        captions: null,
        limitKey: "limit",
        offsetKey: "offset",
        searchKey: "query",
        totalKey: "total",
        dataKey: "data",
        sortKey: "sortBy",
        orderKey: "order",
        shortPagination: false,
        rows: 10,
        rowsSteps: "10,25,50,100",

        template: "",

        clsBody: "",
        clsItem: "",
        clsPagination: "",
        
        onLoad: f => f,
        onDrawRow: Metro.noop,
        onDrawCell: Metro.noop,
        onDatasetCreate: Metro.noop
    };

    Metro.remoteDatasetSetup = function (options) {
        RemoteDatasetDefaultConfig = $.extend({}, RemoteDatasetDefaultConfig, options);
    };

    if (typeof window["metroRemoteDatasetSetup"] !== undefined) {
        Metro.remoteDatasetSetup(window["metroRemoteDatasetSetup"]);
    }

    Metro.Component('remote-dataset', {
        init: function( options, elem ) {
            this._super(elem, options, RemoteDatasetDefaultConfig, {
                // define instance vars here
                data: null,
                total: 0,
            });
            return this;
        },

        _create: function(){
            var that = this, element = this.element, o = this.options;

            this.offset = o.offset
            this.fields = o.fields.toArray(",")
            this.captions = o.captions ? o.captions.toArray(",") : null
            this.rowSteps = o.rowsSteps.toArray(",")
            this.limit = +o.rows
            this.url = o.url
            this.search = ""
            this.sortField = o.sort
            this.sortOrder = o.sortOrder
            this.template = Metro.utils.exec(o.template)

            this._createStructure();
            this._createEvents();

            this._loadData().then(() => {});

            this._fireEvent('dataset-create');
        },

        _loadData: async function (append = false){
            const o = this.options
            if (!this.url) { return }
            let url = this.url + "?" + o.limitKey + "=" + this.limit + "&" + o.offsetKey + "=" + this.offset
            if (this.sortField) { url += "&" + o.sortKey + "=" + this.sortField + "&" + o.orderKey + "=" + this.sortOrder; }
            if (this.search) { url += "&" + o.searchKey + "=" + this.search; }
            const response = await fetch(url, { method: o.method })
            if (response.ok === false) { return ; }
            this.data = Metro.utils.exec(o.onLoad, [await response.json()], this);
            this._createEntries(append)
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            let entries

            element.addClass("remote-dataset")
            element.append(entries = $("<div>").addClass("dataset-entry"))

            entries.html(`
                <div class="search-block row">
                    <div class="cell-sm-10">
                        <input name="search" type="text" data-role="input" 
                            data-prepend="${this.strings.label_search}" 
                            data-search-button="true" 
                            />
                    </div>
                   
                    <div class="cell-sm-2">
                        <select name="rows-count" data-role="select" data-prepend="${this.strings.label_rows_count}" data-filter="false">
                            ${this.rowSteps.map(step => `<option value="${step}" ${+step === this.rowsCount ? 'selected' : ''}>${step}</option>`).join("")}
                        </select>
                    </div>
                </div>
                <div class="dataset-body">
                    ...
                </div>
            `)
            this.body = entries.find(".dataset-body").addClass(o.clsBody)

            this.loadMore = $("<div>").addClass("dataset-load-more")
            this.loadMore.html(`
                <button class="button large cycle link load-more-button">
                    <span class="icon">⟳</span>
                    ${this.strings.label_load_more}
                </button>
            `).appendTo(element)
            
            element.append(
                this.pagination = $("<div>").addClass("dataset-pagination")
            )
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;

            element.on("click", ".page-link", function(){
                const parent = $(this).parent()
                if (parent.hasClass("service")) {
                    if (parent.hasClass("prev-page")) {
                        that.offset -= that.limit;
                        if (that.offset < 0) {
                            that.offset = 0;
                        }
                    } else {
                        that.offset += that.limit;
                    }
                    that._loadData().then(() => {})
                    return
                }
                that.offset = $(this).data("page") * that.limit - that.limit;
                that._loadData().then(() => {})
            })

            const searchFn = Hooks.useDebounce(() => {
                const val = element.find("input[name=search]").val().trim()
                if (val === "") {
                    this.search = ""
                    this.url = o.url
                    this._loadData().then(() => {})
                    return
                }
                if (val.length < 3) {
                    return
                }
                this.search = val
                this.url = o.searchUrl
                this._loadData().then(() => {})
            }, 300)

            element.on(Metro.events.inputchange, "input[name=search]", searchFn)

            element.on("change", "select[name=rows-count]", function(){
                that.limit = +$(this).val()
                that.offset = 0
                that._loadData().then(() => {})
            })
            
            element.on("click", ".load-more-button", function(){
                that.offset += that.limit
                that._loadData(true).then(() => {})
            })
        },

        _createEntries: function (append = false){
            var that = this, element = this.element, o = this.options;

            if (!this.data) {
                return ;
            }

            const usePagination = Metro.utils.isValue(this.data[o.totalKey])

            this.entries = this.data[o.dataKey];
            this.total = this.data[o.totalKey];

            if (append === false) this.body.clear()
            
            this.entries.forEach((entry, index) => {
                const item = $("<div>").addClass("dataset-item").addClass(o.clsItem).addClass(index % 2 === 0 ? "even" : "odd")
                const html = Metro.utils.exec(o.template, [entry], entry)
                item.html(html).appendTo(that.body)
            });

            if (usePagination && !o.shortPagination) {
                Metro.pagination({
                    length: this.total,
                    rows: this.limit,
                    current: this.offset === 0 ? 1 : Math.round(this.offset / this.limit) + 1,
                    target: this.pagination,
                    clsPagination: o.clsPagination
                })
            } else {
                this.pagination.html(`
                    <div class="short-pagination">
                        <div class="button service prev-page"><a href="javascript:void(0)" class="page-link">${this.strings.label_prev}</a></div>
                        <div class="button service next-page"><a href="javascript:void(0)" class="page-link">${this.strings.label_next}</a></div>
                    </div>
                `)
            }
        },

        changeAttribute: function(attr, newValue){
        },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));